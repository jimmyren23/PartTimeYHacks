import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, Button} from '@react-navigation/native';
import {getUserDoc, getUserImage} from './backend';
import auth from '@react-native-firebase/auth';
import {UploadFileCompany} from './UploadFile/index.js';
import {UploadPDF} from './UploadFile/index.js';
import firestore from '@react-native-firebase/firestore';
import {FooterView} from './Footer';
import {ScrollView} from 'react-native-gesture-handler';
import {HeaderView} from './Header';
import storage from '@react-native-firebase/storage';
export function UpdateCompanySettingsView() {
  const [email, setEmail] = useState('');
  const [newName, setName] = useState('');
  const [imageURI, setImageURI] = useState('');
  const [currentName, setCurrentName] = useState('');
  const [currentEmail, setCurrentEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');
  const navigation = useNavigation();
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

  async function handleNameChange(nameInput) {
    await firestore()
      .collection('companies')
      .doc(user.uid)
      .update({name: nameInput});
    setSuccess('Succesful Change!');
  }

  async function handleEmailChange(emailInput) {
    await firestore()
     .collection('companies')
      .doc(user.uid)
      .update({email: emailInput});
    setSuccess('Succesful Change!');
  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderView />
      <View style={styles.body}>
        <View style={styles.title}>
          <Text style={styles.titleText}> Update Settings </Text>
        </View>
        <ScrollView style={styles.allInfo}>
          <View style={styles.registerInfoView}>
            <View>
              <TextInput
                style={styles.registerInput}
                defaultValue={currentName}
                placeholder="Name"
                onChangeText={(text) => setName(text)}
              />
            </View>
            <View>
              <TextInput
                style={styles.registerInput}
                defaultValue={currentEmail}
                placeholder="New Email"
                onChangeText={(text) => setEmail(text)}
              />
            </View>
            <View>
              <TextInput
                style={styles.registerInput}
                placeholder="New Password"
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
              />
            </View>
          </View>
          <View style={styles.pop}>
            <UploadFileCompany
              styles={styles.propic}
              value={imageURI}
              onChange={handleChange}
            />
          </View>
          <View style={styles.submit}>
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
                      setSuccess('Succesful Change!');
                    })
                    .catch(function (error) {
                      console.log(error);
                    });
                  handleEmailChange(email);
                }
                if (password !== '') {
                  user
                    .updatePassword(password)
                    .then(function () {
                      console.log('updated password');
                      setSuccess('Succesful Change!');
                    })
                    .catch(function (error) {
                      console.log(error);
                    });
                }
                if (imageURI !== '') {
                  await storage()
                    .ref('companies/' + user.uid + '/profile.jpg')
                    .putFile(imageURI)
                    .then(function () {
                      console.log('Image succesfully uploaded!');
                      setSuccess('Succesful Change!');
                    })
                    .catch((error) => {
                      console.log('Image upload unsuccessful!');
                    });
                }
              }}>
              <Text style={styles.innerButton}> Update </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.s}>
            <Text style={styles.ss}> {success} </Text>
          </View>
        </ScrollView>
      </View>
      <FooterView />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  s: {
    alignItems: 'center',
  },
  ss: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    flex: 1,
  },
  allInfo: {
    flex: 1,
    marginTop: -50,
  },
  uploadButtons: {
    flex: 1,
    height: 100,
    backgroundColor: 'green',
  },
  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    fontSize: 30,
    padding: 20,
    textAlign: 'center',
    fontWeight: 'bold',
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
  registerInput: {
    backgroundColor: 'white',
    borderBottomWidth: 0.8,
    borderColor: 'gray',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  subheading: {
    backgroundColor: 'blue',
  },
  submit: {
    backgroundColor: 'white',
    flex: 1,
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#94BAEB',
  },
  propic: {
    justifyContent: 'center',
    display: 'flex',
    flex: 1,
  },
  alrd: {
    marginTop: -17,
  },
  pop: {
    flex: 0.214,
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
