import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {HeaderView} from './Header';
import {FooterView} from './Footer';
export function CompanyListingsView() {
  const [listings, setListings] = useState([]);
  const navigation = useNavigation();
  var employer = auth().currentUser;
  useEffect(() => {
    const subscriber = firestore()
      .collection('listings')
      .where('employer', '==', employer.uid)
      .onSnapshot((querySnapshot) => {
        if (querySnapshot !== null) {
          const AllListing = [];
          querySnapshot.forEach((documentSnapshot) => {
            AllListing.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
          setListings(AllListing);
        }
      });
    //console.log(listings);
    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, [employer]);

  async function removeListing(listing) {
    firestore()
      .collection('users')
      .where('swipedRight', 'array-contains', listing.key)
      .onSnapshot((querySnapshot) => {
        if (querySnapshot !== null) {
          querySnapshot.forEach((documentSnapshot) => {
            firestore()
              .collection('users')
              .doc(documentSnapshot.id)
              .update({
                swipedRight: firestore.FieldValue.arrayRemove(listing.key),
              });
          });
        }
      });
    firestore()
      .collection('users')
      .where('swipedLeft', 'array-contains', listing.key)
      .onSnapshot((querySnapshot) => {
        if (querySnapshot !== null) {
          querySnapshot.forEach((documentSnapshot) => {
            firestore()
              .collection('users')
              .doc(documentSnapshot.id)
              .update({
                swipedLeft: firestore.FieldValue.arrayRemove(listing.key),
              });
          });
        }
      });
    firestore()
      .collection('companies')
      .doc(listing.employer)
      .update({
        listings: firestore.FieldValue.arrayRemove(listing.key),
      });
    await firestore().collection('listings').doc(listing.key).delete();
  }

  return (
    // Display company information, allow for edits
    <View style={styles.container}>
      <HeaderView />
      <View style={styles.title}>
        <Text style={styles.titleText}> Your Job Listings </Text>
      </View>
      <View style={styles.allInfo}>
        <FlatList
          data={listings}
          contentContainerStyle={styles.listContent}
          renderItem={({item}) => (
            <View style={styles.buttonRow}>
              <View style={styles.listItem}>
                <Text style={styles.pos}> {item.position} </Text>
              </View>
              <View style={styles.cent}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('ListingApplicants', {
                      itemId: item.key,
                      listing: item,
                    });
                  }}>
                  <Image
                    style={styles.imageRight}
                    source={require('./img/view.png')}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.cent}>
                <TouchableOpacity onPress={() => removeListing(item)}>
                  <Image
                    style={styles.imageRight}
                    source={require('./img/trash.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
      <FooterView />
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    width: 260,
    justifyContent: 'center',
    marginLeft: -12,
  },
  cent: {
    marginLeft: 20,
    justifyContent: 'center',
  },
  pos: {
    fontSize: 21,
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderRadius: 7,
    marginHorizontal: 10,
    padding: 25,
    marginBottom: 5,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 2,
    shadowOffset: {width: 1, height: 3},
    marginBottom: 5,
  },
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'white',
  },
  imageRight: {
    height: 30,
    width: 30,
    borderRadius: 0,
  },
  title: {
    alignItems: 'center',
    display: 'flex',
    flex: 0.2,
    justifyContent: 'center',
  },
  allInfo: {
    display: 'flex',
    flex: 1,
  },
  titleText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  detail: {
    alignItems: 'center',
    flex: 0.1,
    justifyContent: 'center',
  },
  buttonSection: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    margin: 40,
    marginHorizontal: 80,
    borderRadius: 40,
    borderColor: '#94BAEB',
    borderWidth: 2,
  },
  buttonText: {
    fontSize: 18,
  },
  listContent: {
    paddingBottom: 100,
  },
});
