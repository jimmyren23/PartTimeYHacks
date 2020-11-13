import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {RegisterUserView} from './RegisterUserView';
import {RegisterCompView} from './RegisterCompView';

export function RegisterView() {
  const [isCompany, setIsCompany] = useState(false);
  return (
    <View style={styles.container}>
      {isCompany === false ? (
        <>
          <RegisterUserView isCompany={isCompany} />
          <View style={styles.submit}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setIsCompany(!isCompany)}>
              <Text style={styles.buttonText}> Register as a Company</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <RegisterCompView isCompany={isCompany} />
          <View style={styles.submit}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setIsCompany(!isCompany)}>
              <Text style={styles.buttonText}> Register as a User</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
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
