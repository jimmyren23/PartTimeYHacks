import React from 'react';
import {Text, SafeAreaView, StyleSheet, Image} from 'react-native';
import {Footer, FooterTab, Button} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from './AuthProvider';

export function FooterView() {
  const {isCompany, logOut} = useAuth();
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      {isCompany ? (
        <>
          <Footer style={styles.foot}>
            <FooterTab>
              <Button onPress={() => navigation.navigate('Settings')}>
                <Image
                  style={styles.image}
                  source={require('./img/settings.png')}
                />
                <Text note> Settings </Text>
              </Button>
              <Button onPress={() => navigation.navigate('CreateListing')}>
                <Image
                  style={styles.image}
                  source={require('./img/create.png')}
                />
                <Text note> Create </Text>
              </Button>
              <Button onPress={() => navigation.navigate('CompanyListings')}>
                <Image
                  style={styles.image}
                  source={require('./img/applic.png')}
                />
                <Text note> View </Text>
              </Button>
              <Button
                onPress={async () => {
                  navigation.navigate('Login');
                  await logOut();
                }}>
                <Image
                  style={styles.image}
                  source={require('./img/logout.png')}
                />
                <Text note>Logout</Text>
              </Button>
            </FooterTab>
          </Footer>
        </>
      ) : (
        <>
          <Footer style={styles.foot}>
            <FooterTab>
              <Button onPress={() => navigation.navigate('Settings')}>
                <Image
                  style={styles.image}
                  source={require('./img/settings.png')}
                />
                <Text note> Settings </Text>
              </Button>
              <Button onPress={() => navigation.navigate('AppliedListings')}>
                <Image
                  style={styles.image}
                  source={require('./img/applic.png')}
                />
                <Text note> Applications </Text>
              </Button>
              <Button onPress={() => navigation.navigate('Listings')}>
                <Image
                  style={styles.image}
                  source={require('./img/swipe.png')}
                />
                <Text note> Swipe </Text>
              </Button>
              <Button
                onPress={async () => {
                  await logOut();
                  navigation.navigate('Login');
                }}>
                <Image
                  style={styles.image}
                  source={require('./img/logout.png')}
                />
                <Text note> Log Out</Text>
              </Button>
            </FooterTab>
          </Footer>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 40,
    width: 40,
    borderRadius: 4,
  },
  foot: {
    marginBottom: -40,
    height: 80,
    backgroundColor: 'white',
  },
});
