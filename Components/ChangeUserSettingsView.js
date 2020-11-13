import {SafeAreaView, View, Text, StyleSheet, Image} from 'react-native';
import React, {useState} from 'react';
import {getUserDoc, getUserImage} from './backend';
import {TouchableOpacity} from 'react-native-gesture-handler';

export function UpdateUserSettingsView() {
  const [email, setEmail] = useState('hello');
  const [name, setName] = useState('hello');
  const [imageURL, setImage] = useState('hello');

  getUserDoc().then((result) => {
    if (result !== undefined) {
      setEmail(result.email);
      setName(result.name);
    }
  });

  getUserImage().then((result) => {
    if (result !== undefined) {
      setImage(result);
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.title}>
          <Text> User Settings </Text>
        </View>
        <View style={styles.image}>
          <Image
            source={{uri: imageURL}}
            // insane formatting life @suraj
            style={styles.image}
          />
        </View>

        <View style={styles.myInfo}>
          <View style={styles.detail}>
            <Text> {name} </Text>
          </View>
          <View style={styles.detail}>
            <Text> {email} </Text>
          </View>
          <View style={styles.detail}>
            <TouchableOpacity>
              <Text> View Resume </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.detail}>
            <TouchableOpacity>
              <Text> Change Settings! </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    display: 'flex',
    flex: 1,
  },
  title: {
    backgroundColor: '#94BAEB',
  },
  baseText: {
    fontFamily: 'Cochin',
  },
  image: {
    height: 200,
    resizeMode: 'stretch',
    margin: 5,
  },
  titleText: {
    fontSize: 30,
    padding: 50,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  registerInfoView: {
    backgroundColor: 'yellow',
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  registerInfo: {
    backgroundColor: 'teal',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
  },
  registerInput: {
    backgroundColor: 'teal',
    padding: 20,
  },
  subheading: {
    backgroundColor: 'blue',
  },
  submit: {
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
});
