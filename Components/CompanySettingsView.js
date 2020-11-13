import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {getCompanyDoc, getCompanyImage} from './backend';

export function CompanySettingsView() {
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [imageURL, setImage] = useState();
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getCompanyDoc().then((result) => {
        if (result !== undefined) {
          setEmail(result.email);
          setName(result.name);
        }
      });

      getCompanyImage()
        .then((result) => {
          if (result !== undefined) {
            setImage(result);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    console.log('Image has loaded in!');
  }, [imageURL]);

  getCompanyImage()
    .then((result) => {
      if (result !== undefined) {
        setImage(result);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  getCompanyDoc().then((result) => {
    if (result !== undefined) {
      setEmail(result.email);
      setName(result.name);
    }
  });

  return (
    // Display company information, allow for edits
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}> Company Profile </Text>
      </View>
      <View style={styles.imageContainer}>
        <Image source={{uri: imageURL}} style={styles.image} />
      </View>
      <View style={styles.detail}>
        <Text style={styles.nameStyle}> {name} </Text>
      </View>
      <View style={styles.detail}>
        <Text style={styles.textStyle}> {email} </Text>
      </View>
      <View style={styles.edit}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('UpdateCompanySettings')}>
          <View style={styles.buttonSection}>
            <Text style={styles.buttonText}> Edit Profile </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  edit: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flex: 0.45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    alignItems: 'center',
    display: 'flex',
    flex: 0.2,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 42,
    fontWeight: '600',
  },
  nameStyle: {
    fontSize: 40,
    fontWeight: '500',
    marginHorizontal: 15,
  },
  textStyle: {
    fontSize: 23,
    marginTop: 10,
  },
  detail: {
    alignItems: 'center',
    flex: 0.1,
    justifyContent: 'center',
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 23,
    marginBottom: 15,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonSection: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 40,
    borderColor: '#94BAEB',
    borderWidth: 2,
  },
  buttonText: {
    fontSize: 18,
  },
});
