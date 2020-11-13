import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {getUserDoc} from './backend';
import auth from '@react-native-firebase/auth';
import {UploadFile} from './UploadFile/index.js';
import {UploadPDF} from './UploadFile/index.js';
import firestore from '@react-native-firebase/firestore';
import {FooterView} from './Footer';
import storage from '@react-native-firebase/storage';
import {HeaderView} from './Header';
import {ScrollView} from 'react-native-gesture-handler';

export function UpdateUserSettingsView() {
  const [email, setEmail] = useState('');
  const [newName, setName] = useState('');
  const [imageURI, setImageURI] = useState('');
  const [fileURI, setFileURI] = useState('');
  const [currentName, setCurrentName] = useState('');
  const [currentEmail, setCurrentEmail] = useState('');
  const [password, setPassword] = useState('');

  var user = auth().currentUser;
  getUserDoc().then((result) => {
    if (result !== undefined) {
      setCurrentEmail(result.email);
      setCurrentName(result.name);
    }
  });

  function handleChange(e) {
    setImageURI(e.uri);
  }
  function handleFileChange(e) {
    setFileURI(e.uri);
  }
  async function handleNameChange(change) {
    await firestore().collection('users').doc(user.uid).update({name: change});
  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderView />
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleText}> Update User Settings </Text>
        </View>
        <ScrollView style={styles.allInfo}>
          <View style={styles.registerInfoView}>
            <View style={styles.detail}>
              <TextInput
                style={styles.registerInput}
                defaultValue={currentName}
                placeholder="Name"
                onChangeText={(text) => setName(text)}
              />
            </View>
            <View style={styles.detail}>
              <TextInput
                style={styles.registerInput}
                defaultValue={currentEmail}
                placeholder="New Email"
                onChangeText={(text) => setEmail(text)}
              />
            </View>
            <View style={styles.detail}>
              <TextInput
                style={styles.registerInput}
                placeholder="New Password"
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
              />
            </View>
          </View>
          <View style={styles.sameLine}>
            <View style={styles.detail}>
              <UploadFile value={imageURI} onChange={handleChange} />
            </View>
            <View style={styles.detail}>
              <UploadPDF value={fileURI} onChange={handleFileChange} />
            </View>
          </View>
          <View style={styles.detail}>
            <TouchableOpacity
              style={styles.button}
              onPress={async () => {
                if (newName !== '') {
                  handleNameChange(newName);
                }
                if (email !== '') {
                  user
                    .updateEmail(email)
                    .then(function () {
                      console.log('updated email');
                    })
                    .catch(function (error) {
                      console.log(error);
                    });
                }
                if (password !== '') {
                  user
                    .updatePassword(password)
                    .then(function () {
                      console.log('updated password');
                    })
                    .catch(function (error) {
                      console.log(error);
                    });
                }
                if (imageURI !== '') {
                  await storage()
                    .ref('users/' + user.uid + '/profile.jpg')
                    .putFile(imageURI)
                    .then(function () {
                      console.log('Image succesfully uploaded!');
                    })
                    .catch((error) => {
                      console.log('Image upload unsuccessful!');
                    });
                }
                if (fileURI !== '') {
                  await storage()
                    .ref('users/' + user.uid + '/resume.pdf')
                    .putFile(fileURI)
                    .then(function () {
                      console.log('Resume succesfully uploaded!');
                    })
                    .catch((error) => {
                      console.log('Resume upload unsuccessful!');
                    });
                }
              }}>
              <Text style={styles.innerButton}> Update </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <FooterView />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sameLine: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  body: {
    flex: 1,
  },
  container: {
    backgroundColor: 'white',
    display: 'flex',
    flex: 1,
  },
  title: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detail: {
    flex: 0.2,
  },
  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    fontSize: 30,
    padding: 50,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  registerInput: {
    backgroundColor: 'white',
    borderBottomWidth: 0.8,
    borderColor: 'gray',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  submit: {
    backgroundColor: 'white',
  },
  allInfo: {
    flex: 1,
    marginTop: -50,
  },
  registerInfoView: {
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: 8,
    marginRight: 8,
    padding: 20,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  button: {
    alignItems: 'center',
    fontWeight: 'bold',
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 40,
    marginHorizontal: 80,
    borderRadius: 40,
    borderColor: '#94BAEB',
    borderWidth: 2,
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#94BAEB',
  },
  button: {
    marginTop: 30,
    padding: 10,
    borderWidth: 0,
    marginHorizontal: 110,
    backgroundColor: '#94BAEB',
    borderRadius: 5,
    marginBottom: 10,
  },
  innerButton: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
});
