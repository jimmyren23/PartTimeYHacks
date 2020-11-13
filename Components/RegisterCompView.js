import React, {useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {addCompany} from './backend';
import {UploadFileCompany} from './UploadFile/index.js';
import {HeaderView} from './Header';

export function RegisterCompView() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [imageURI, setImageURI] = useState();
  const [error, setError] = useState();

  const navigation = useNavigation();
  function handleChange(e) {
    setImageURI(e.uri);
  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderView />
      <View style={styles.registerInfoView}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.registerInput}
            placeholder="Company Email"
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.registerInput}
            placeholder="Company Name"
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.registerInput}
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
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
            try {
              await addCompany(email, password, {imageURI}, name);
              navigation.navigate('Settings');
            } catch (err) {
              setError(String(err));
            }
          }}>
          <Text style={styles.innerButton}>Sign up</Text>
        </TouchableOpacity>
        <Text> {error} </Text>
        <TouchableOpacity
          style={styles.alrd}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.innerLogin}>
            Already have an account? Sign in
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  signin: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'white',
  },
  titleText: {
    fontSize: 60,
    padding: 10,
    marginTop: 70,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'marker felt',
    color: 'black',
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
  innerLogin: {
    textAlign: 'center',
  },
  bottom: {
    marginTop: 350,
    textAlign: 'center',
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
});
