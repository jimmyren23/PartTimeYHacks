import React, {useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {HeaderView} from './Header';
import {FooterView} from './Footer';
import Geolocation from '@react-native-community/geolocation';
import {newListing} from './backend';
import {useNavigation} from '@react-navigation/native';
import Geocoder from 'react-native-geocoding';

const key = 'AIzaSyB3CEpguc8hsupRN6ju9d0Dlb1wFR2P1y0';
Geocoder.init(key);

export function CreateListingView() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [positions, setPositions] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [compensation, setCompensation] = useState();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll}>
        <HeaderView />
        <View style={styles.title}>
          <Text style={styles.titleText}>Create New Listing</Text>
        </View>
        <View style={styles.registerInfoView}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.registerInput}
              placeholder="Position"
              onChangeText={(text) => setPositions(text)}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.registerInput}
              placeholder="Hourly Wage"
              onChangeText={(text) => setCompensation(text)}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.registerInput}
              placeholder="Description"
              multiline
              numberOfLines={4}
              onChangeText={(text) => setDescription(text)}
            />
          </View>
          <View style={styles.sameLine}>
            <View style={styles.pop}>
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
                            console.log(typeof position.coords.longitude);
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
                <Text> Location </Text>
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
          <View style={styles.submit}>
            <TouchableOpacity
              style={styles.button}
              onPress={async () => {
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
                      newListing(
                        data.results[0].geometry.location.lat,
                        data.results[0].geometry.location.lng,
                        positions,
                        compensation,
                        description,
                      );
                    });
                } else {
                  newListing(
                    latitude,
                    longitude,
                    positions,
                    compensation,
                    description,
                  );
                }
                navigation.navigate('CompanyListings');
              }}>
              <Text style={styles.innerButton}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <FooterView />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'white',
  },
  scroll: {
    display: 'flex',
    flex: 1,
  },
  pop: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  geo: {
    flex: 1,
    display: 'flex',
  },
  title: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView: {
    display: 'flex',
    flex: 1,
    padding: 30,
  },
  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 40,
  },
  registerInfoView: {
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: -30,
    marginLeft: 8,
    marginRight: 8,
    padding: 20,
    borderRadius: 20,
  },
  registerInput: {
    borderBottomWidth: 0.8,
    borderColor: 'gray',
    padding: 15,
    borderRadius: 8,
    marginBottom: -40,
  },
  buttons: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  buttonPic: {
    alignItems: 'center',
    padding: 5,
    borderRadius: 20,
    borderColor: 'gray',
    borderWidth: 1,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 20,
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
  text: {
    marginLeft: 20,
  },
  ges: {
    justifyContent: 'center',
  },
  singularLine: {
    flexDirection: 'row',
    width: 50,
  },
  sameLine: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    display: 'flex',
    flex: 0.5,
    marginTop: 35,
  },
  registerAddress: {
    backgroundColor: 'white',
    borderBottomWidth: 0.8,
    width: 250,
    borderColor: 'gray',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  registerCitSt: {
    backgroundColor: 'white',
    borderBottomWidth: 0.8,
    width: 125,
    borderColor: 'gray',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
});
