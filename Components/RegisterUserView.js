import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {addUser} from './backend.js';
import Geolocation from '@react-native-community/geolocation';
import {useNavigation} from '@react-navigation/native';
import {UploadFile} from './UploadFile/index.js';
import {UploadPDF} from './UploadFile/index.js';
import {HeaderView} from './Header';
import auth from '@react-native-firebase/auth';
import Geocoder from 'react-native-geocoding';
import {set} from 'react-native-reanimated';
const key = 'AIzaSyB3CEpguc8hsupRN6ju9d0Dlb1wFR2P1y0';
Geocoder.init(key);

export function RegisterUserView() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [imageURI, setImageURI] = useState('');
  const [fileURI, setFileURI] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [error, setError] = useState();
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const navigation = useNavigation();
  function handleChange(e) {
    setImageURI(e.uri);
  }
  function handleFileChange(e) {
    setFileURI(e.uri);
  }
  return (
    <View style={styles.container}>
      <HeaderView />
      <View style={styles.registerInfoView}>
        <TextInput
          style={styles.registerInput}
          placeholder="Full Name"
          onChangeText={(text) => setName(text)}
        />
        <View>
          <TextInput
            style={styles.registerInput}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View>
          <TextInput
            style={styles.registerInput}
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />
        </View>
        <View>
          <TextInput
            style={styles.registerInput}
            placeholder="Phone Number"
            onChangeText={(text) => setPhone(text)}
          />
        </View>
        <View style={styles.sameLine}>
          <View style={styles.ges}>
            <View styles={styles.geo}>
              {latitude === null ? (
                <>
                  <TouchableOpacity
                    style={[styles.buttonPic, {backgroundColor: 'white'}]}
                    onPress={() => {
                      Geolocation.requestAuthorization();
                      Geolocation.getCurrentPosition(
                        (position) => {
                          setLatitude(position.coords.latitude);
                          setLongitude(position.coords.longitude);
                          Geocoder.from(
                            position.coords.latitude,
                            position.coords.longitude,
                          )
                            .then((json) => {
                              var streetNumber =
                                json.results[0].address_components[0]
                                  .short_name;
                              var street =
                                json.results[0].address_components[1]
                                  .short_name;
                              var city =
                                json.results[0].address_components[2]
                                  .short_name;
                              var state =
                                json.results[0].address_components[5]
                                  .short_name;
                              setAddress(streetNumber + ' ' + street);
                              setCity(city);
                              setState(state);
                            })
                            .catch((error) => console.warn(error));
                        },
                        (err) => {
                          console.log('map error: ', err);
                          console.log(err.code, err.message);
                        },
                        {
                          enableHighAccuracy: false,
                          timeout: 15000,
                          maximumAge: 500,
                        },
                      );
                    }}>
                    <Image
                      style={styles.image}
                      source={require('./img/globe.png')}
                    />
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TouchableOpacity
                    style={[styles.buttonPic, {backgroundColor: '#94BAEB'}]}
                    onPress={() => {
                      Geolocation.requestAuthorization();
                      Geolocation.getCurrentPosition(
                        (position) => {
                          setLatitude(position.coords.latitude);
                          setLongitude(position.coords.longitude);
                          Geocoder.from(
                            position.coords.latitude,
                            position.coords.longitude,
                          )
                            .then((json) => {
                              var streetNumber =
                                json.results[0].address_components[0]
                                  .short_name;
                              var street =
                                json.results[0].address_components[1]
                                  .short_name;
                              var city =
                                json.results[0].address_components[2]
                                  .short_name;
                              var state =
                                json.results[0].address_components[5]
                                  .short_name;
                              setAddress(streetNumber + ' ' + street);
                              setCity(city);
                              setState(state);
                            })
                            .catch((error) => console.warn(error));
                        },
                        (err) => {
                          console.log('map error: ', err);
                          console.log(err.code, err.message);
                        },
                        {
                          enableHighAccuracy: false,
                          timeout: 15000,
                          maximumAge: 500,
                        },
                      );
                    }}>
                    <Image
                      style={styles.image}
                      source={require('./img/globe.png')}
                    />
                  </TouchableOpacity>
                </>
              )}
              <Text> Get Location </Text>
            </View>
          </View>
          <View style={styles.text}>
            <View>
              <TextInput
                style={styles.registerAddress}
                placeholder="Street Address"
                defaultValue={address}
                onChangeText={(text) => setAddress(text)}
              />
            </View>
            <View style={styles.singularLine}>
              <View>
                <TextInput
                  style={styles.registerCitSt}
                  placeholder="City"
                  defaultValue={city}
                  onChangeText={(text) => setCity(text)}
                />
              </View>
              <View>
                <TextInput
                  style={styles.registerCitSt}
                  placeholder="State"
                  defaultValue={state}
                  onChangeText={(text) => setState(text)}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.buttonRow}>
        <UploadFile
          styles={styles.propic}
          value={imageURI}
          onChange={handleChange}
        />
        <UploadPDF
          styles={styles.propic}
          value={fileURI}
          onChange={handleFileChange}
        />
      </View>
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            console.log('New user is trying to be created!');
            try {
              if (latitude == null) {
                var addressWithPlus = address.replace(/ /g, '+');
                var cityWithPlus = city.replace(/ /g, '+');
                let url =
                  'https://maps.googleapis.com/maps/api/geocode/json?address=' +
                  addressWithPlus +
                  ',+' +
                  cityWithPlus +
                  ',+' +
                  state +
                  '&key=' +
                  key;
                console.log(url);
                await fetch(url)
                  .then((response) => response.json())
                  .then(async (data) => {
                    await addUser(
                      email,
                      password,
                      {imageURI},
                      {fileURI},
                      name,
                      phone,
                      data.results[0].geometry.location.lat,
                      data.results[0].geometry.location.lng,
                    );
                  });
              } else {
                await addUser(
                  email,
                  password,
                  {imageURI},
                  {fileURI},
                  name,
                  phone,
                  latitude,
                  longitude,
                );
              }
              console.log(auth().currentUser);
              auth()
                .currentUser.sendEmailVerification()
                .then(function () {
                  console.log('Sent Email');
                })
                .catch(function (er) {
                  console.log('Didnt send email');
                });
              setError(null);
              navigation.navigate('Settings');
            } catch (err) {
              setError(String(err));
            }
          }}>
          <Text style={styles.innerButton}> Sign up </Text>
        </TouchableOpacity>
        <Text> {error} </Text>
        <TouchableOpacity
          style={styles.alrd}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.innerLogin}>
            {' '}
            Already have an account? Sign in{' '}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  alrd: {
    marginTop: -17,
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
  registerAddress: {
    backgroundColor: 'white',
    borderBottomWidth: 0.8,
    width: 260,
    borderColor: 'gray',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  registerCitSt: {
    backgroundColor: 'white',
    borderBottomWidth: 0.8,
    width: 130,
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 90,
    marginTop: 0,
    marginBottom: 0,
    flex: 0.45,
  },
  sameLine: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 20,
  },
  buttonPic: {
    alignItems: 'center',
    padding: 5,
    borderRadius: 20,
    borderColor: 'gray',
    borderWidth: 1,
  },
  propic: {
    justifyContent: 'center',
    display: 'flex',
    flex: 1,
  },
  ges: {
    justifyContent: 'center',
  },
  singularLine: {
    flexDirection: 'row',
    width: 50,
  },
  text: {
    marginLeft: 20,
  },
});
