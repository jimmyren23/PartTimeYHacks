import {View, Text, StyleSheet, Image, Linking} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {getUserDocID, getUserImageID} from './backend';
import {TouchableOpacity} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import {HeaderView} from './Header';
import {FooterView} from './Footer';

export function UserDetailsView({route}) {
  const {itemId} = route.params;
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [imageURL, setImage] = useState('');
  const [resumeURL, setResume] = useState('');

  const navigation = useNavigation();

  var storageRef = storage().ref('users/' + itemId + '/resume.pdf');
  storageRef.getDownloadURL().then(function (url) {
    setResume(url);
  });

  getUserDocID(itemId).then((result) => {
    if (result !== undefined) {
      setEmail(result.email);
      setName(result.name);
    }
  });

  useEffect(() => {
    console.log('Image has loaded in!');
  }, [imageURL]);

  getUserImageID(itemId).then((result) => {
    if (result !== undefined) {
      setImage(result);
    }
  });

  return (
    <View style={styles.container}>
      <HeaderView />
      <View style={styles.content}>
        <View style={styles.title}>
          <Text style={styles.titleText}> User Profile </Text>
          {/* <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text> Go Back</Text>
          </TouchableOpacity> */}
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
      </View>
      <FooterView />
    </View>
  );
}

const styles = StyleSheet.create({
  nameStyle: {
    fontSize: 44,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    fontFamily: 'Cabin-Bold',
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
    borderWidth: 1,
    marginBottom: 15,
  },
  title: {
    alignItems: 'center',
    display: 'flex',
    flex: 0.2,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  detail: {
    alignItems: 'center',
    flex: 0.1,
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 30,
    marginBottom: 10,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  buttonText: {
    fontSize: 25,
  },
  alrd: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    padding: 5,
    marginTop: 80,
  },
});
