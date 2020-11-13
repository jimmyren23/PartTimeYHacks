import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

import {
  getUserDoc,
  getCompanyDocID,
  getCompanyImageID,
  swipeLeftUser,
  swipeRightUser,
  addListingApplicant,
} from './backend';

import {Image, View, StyleSheet} from 'react-native';
import {Text, Content} from 'native-base';
import {FooterView} from './Footer';
import {HeaderView} from './Header';
import Swiper from 'react-native-deck-swiper';
import storage from '@react-native-firebase/storage';
export function ListingsView() {
  const [listings, setListings] = useState([]);
  const [images, setImages] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [companyImage, setCompanyImage] = useState('');

  function getDistanceGeopoints(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = (lat2 - lat1) * (Math.PI / 180);
    var dLon = (lon2 - lon1) * (Math.PI / 180);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((Math.PI * lat1) / 180) *
        Math.cos((Math.PI * lat2) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    var miles = d / 1.609; // Distance in miles
    return miles;
  }
  useEffect(() => {
    console.log('entered');
  }, [companyImage, companyName]);

  useEffect(() => {
    getUserDoc().then((result) => {
      firestore()
        .collection('listings')
        .onSnapshot((querySnapshot) => {
          if (querySnapshot !== null) {
            const AllListing = [];
            var userLocation = result.location;
            querySnapshot.forEach((documentSnapshot) => {
              var listingLocation = documentSnapshot.data().location;
              if (
                !result.swipedRight.includes(documentSnapshot.id) &&
                !result.swipedLeft.includes(documentSnapshot.id) &&
                getDistanceGeopoints(
                  userLocation.latitude,
                  userLocation.longitude,
                  listingLocation.latitude,
                  listingLocation.longitude,
                ) < 30
              ) {
                AllListing.push({
                  ...documentSnapshot.data(),
                  key: documentSnapshot.id,
                  //imageURL:
                  //  'companies/' + documentSnapshot.employer + '/profile.jpg',
                });
              }
            });
            setListings(AllListing);
          }
        });
    });
  }, []);

  return (
    <View style={styles.container}>
      <HeaderView />
      <Content style={styles.view}>
        {isEmpty ? (
          <>
            <View style={styles.none}>
              <Text style={styles.no}>
                {' '}
                There are no current opportunities available in your area. Check
                back later for more!{' '}
              </Text>
            </View>
          </>
        ) : (
          <></>
        )}
        {listings.length > 0 ? (
          <>
            <Swiper
              cards={listings}
              renderCard={(card) => {
                getCompanyDocID(card.employer).then((result) => {
                  if (result !== undefined) {
                    setCompanyName(result.name);
                  }
                });
                getCompanyImageID(card.employer).then((result) => {
                  if (result !== undefined) {
                    console.log(result);
                    setCompanyImage(result);
                  }
                });
                return (
                  <View style={styles.card}>
                    <View style={styles.cardContent}>
                      <>
                        <Image
                          source={require('./img/generic.png')}
                          style={styles.companyimg}
                        />
                      </>
                      <Text style={styles.pos}> {card.position} </Text>
                      <Text style={styles.comp}>
                        {' '}
                        ${card.compensation}/hour{' '}
                      </Text>
                      <Text style={styles.desc}> {card.description} </Text>
                    </View>
                  </View>
                );
              }}
              onSwiped={(cardIndex) => {
                console.log(cardIndex);
              }}
              onSwipedLeft={(cardIndex) => {
                swipeLeftUser(listings[cardIndex].key);
                console.log('swipedLeft');
              }}
              onSwipedRight={(cardIndex) => {
                swipeRightUser(listings[cardIndex].key);
                addListingApplicant(listings[cardIndex].key);
                console.log('swipedRight');
              }}
              onSwipedAll={() => {
                console.log('onSwipedAll');
                setIsEmpty(true);
                console.log(isEmpty);
              }}
              cardIndex={0}
              stackSize={3}
              disableBottomSwipe={true}
              disableTopSwipe={true}
              backgroundColor={'white'}
            />
          </>
        ) : (
          <>
            <View style={styles.none}>
              <Text style={styles.no}>
                There are no current opportunties available in your area. Check
                back later for more!
              </Text>
            </View>
          </>
        )}
      </Content>
      <FooterView />
    </View>
  );
}

const styles = StyleSheet.create({
  pos: {
    fontSize: 40,
    fontWeight: '700',
    flex: 1,
  },
  emp: {
    fontSize: 28,
    fontWeight: '600',
    flex: 1,
  },
  comp: {
    marginTop: -40,
    fontSize: 20,
    fontWeight: '400',
    flex: 1,
  },
  desc: {
    marginTop: -40,
    fontSize: 20,
    fontWeight: '400',
    flex: 1,
  },
  none: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    borderWidth: 2,
    marginTop: 50,
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
  },
  no: {
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
  },
  card: {
    height: 600,
    borderRadius: 50,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation: 2,
    marginTop: -30,
    marginLeft: 15,
    marginRight: 15,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
  },
  carditem: {
    display: 'flex',
    flex: 1,
    borderRadius: 50,
    borderWidth: 0.5,
    borderColor: 'white',
  },
  body: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginBottom: 20,
  },
  companyimg: {
    height: 300,
    width: 300,
    borderRadius: 50,
  },
  cardContent: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    borderRadius: 50,
    marginTop: 30,
  },
  coname: {
    fontSize: 25,
    marginTop: 20,
  },
  content: {
    textAlign: 'left',
    display: 'flex',
    width: '100%',
    marginTop: 10,
  },
});
