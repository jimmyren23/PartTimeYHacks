import {View, Text, StyleSheet, Image, Linking} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {getUserDoc, getUserImage} from './backend';
import {TouchableOpacity} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

export function UserSettingsView() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [imageURL, setImage] = useState('');
  const [resumeURL, setResume] = useState('');

  const navigation = useNavigation();
  var user = auth().currentUser;

  if (user !== undefined && user !== null) {
    var storageRef = storage().ref('users/' + user.uid + '/resume.pdf');
    storageRef
      .getDownloadURL()
      .then(function (url) {
        setResume(url);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getUserDoc().then((result) => {
        if (result !== undefined) {
          setEmail(result.email);
          setName(result.name);
        }
      });
      getUserImage()
        .then((result) => {
          if (result !== undefined) {
            setImage(result);
          }
        })
        .catch((error) => {
          console.log(error);
        });
      if (user !== undefined && user !== null) {
        var storageRef = storage().ref('users/' + user.uid + '/resume.pdf');
        storageRef
          .getDownloadURL()
          .then(function (url) {
            setResume(url);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation, user]);

  useEffect(() => {
    getUserDoc().then((result) => {
      if (result !== undefined) {
        setEmail(result.email);
        setName(result.name);
      }
    });
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getUserDoc().then((result) => {
        if (result !== undefined) {
          setEmail(result.email);
          setName(result.name);
        }
      });
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    console.log('Image has loaded in!');
  }, []);

  getUserImage()
    .then((result) => {
      if (result !== undefined) {
        setImage(result);
      }
    })
    .catch((error) => {
      console.log(error);
    });

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.title}>
          <Text style={styles.titleText}> User Profile </Text>
        </View>
        <View style={styles.imageContainer}>
          <View style={styles.image}>
            {imageURL !== '' ? (
              <>
                <Image source={{uri: imageURL}} style={styles.image} />
              </>
            ) : (
              <>
                <Text> Loading </Text>
              </>
            )}
          </View>
        </View>
        <View style={styles.detail}>
          <Text style={styles.nameStyle}> {name} </Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.textStyle}> {email} </Text>
        </View>
        <View style={styles.detail}>
          <TouchableOpacity
            style={styles.alrd}
            onPress={() => Linking.openURL(resumeURL)}>
            <Image style={styles.pic} source={require('./img/document.png')} />
            <Text style={styles.buttonText}> View Resume </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.buttonText}
          onPress={() => navigation.navigate('UpdateUserSettings')}>
          <View style={styles.buttonSection}>
            <Text style={styles.innerLogin}>Change User Settings</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 23,
    marginBottom: 15,
  },
  title: {
    alignItems: 'center',
    display: 'flex',
    flex: 0.2,
    justifyContent: 'center',
  },
  nameStyle: {
    fontSize: 44,
    fontWeight: '500',
  },
  titleText: {
    fontSize: 50,
    fontWeight: '600',
  },
  detail: {
    alignItems: 'center',
    flex: 0.13,
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 25,
    marginBottom: 10,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  buttonSection: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    margin: 40,
    marginHorizontal: 80,
    borderRadius: 40,
    borderColor: '#94BAEB',
    borderWidth: 2,
  },
  buttonText: {
    fontSize: 18,
  },
  alrd: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    padding: 5,
  },
});
