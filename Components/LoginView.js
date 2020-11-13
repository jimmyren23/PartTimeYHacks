import React, {useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from './AuthProvider';
import auth from '@react-native-firebase/auth';

export function LoginView() {
  const navigation = useNavigation();
  const {logIn} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState();
  const [error, setError] = useState('');
  const [forgotPassword, setForgotPassword] = useState('');
  //console.log('person' + auth().currentUser.uid);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <Image style={styles.image} source={require('./img/logo.png')} />
      </View>

      <View style={styles.loginInfoView}>
        <TextInput
          style={styles.loginInput}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          secureTextEntry={true}
          style={styles.loginInput}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
        />
        <View style={styles.sameLine}>
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={async () => {
                try {
                  await logIn(email, password).then(() => {
                    setError(null);
                    navigation.navigate('Settings', {email: email});
                  });
                } catch (err) {
                  setError(String(err));
                }
              }}>
              <Text style={styles.innerButton}>Log in</Text>
            </TouchableOpacity>
            <Text> {error} </Text>
          </View>
          <View style={styles.submit}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                if (email === '') {
                  setForgotPassword('Enter your email, and then try again');
                } else {
                  auth()
                    .sendPasswordResetEmail(email)
                    .then(function () {
                      setForgotPassword(
                        'A link has been sent to your email to reset your password',
                      );
                    })
                    .catch(function (er) {
                      setForgotPassword(er);
                    });
                }
              }}>
              <Text style={styles.innerButton}>Forgot Password</Text>
            </TouchableOpacity>
            <Text> {forgotPassword} </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.register}>
        <Text
          style={styles.innerRegister}
          onPress={() => navigation.navigate('Register')}>
          Don't have an account yet? Sign up
        </Text>
      </TouchableOpacity>
      <View style={styles.bottom}>
        <Text style={styles.innerRegister}> Powered by React Native</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sameLine: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  alrd: {
    marginTop: -25,
  },
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
  image: {
    width: 390,
    height: 100,
  },
  title: {
    fontSize: 60,
    padding: 10,
    marginTop: 150,
    marginBottom: 25,
    justifyContent: 'center',
    flex: 1,
  },
  loginInfoView: {
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: 8,
    marginRight: 8,
    padding: 20,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  loginInput: {
    backgroundColor: 'white',
    borderWidth: 0.5,
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
  },
  button: {
    marginTop: 20,
    padding: 10,
    borderWidth: 0,
    marginHorizontal: 110,
    backgroundColor: '#94BAEB',
    borderRadius: 5,
    width: 140,
  },
  innerButton: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
  innerRegister: {
    marginTop: -20,
    textAlign: 'center',
  },
  bottom: {
    marginTop: 380,
    textAlign: 'center',
  },
});
