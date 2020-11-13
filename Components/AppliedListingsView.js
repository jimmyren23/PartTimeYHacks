import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {HeaderView} from './Header';
import {FooterView} from './Footer';
import {getUserDoc} from './backend';

export function AppliedListingsView() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    getUserDoc().then((result) => {
      firestore()
        .collection('listings')
        .onSnapshot((querySnapshot) => {
          if (querySnapshot !== null) {
            const AllListing = [];
            querySnapshot.forEach((documentSnapshot) => {
              if (result.swipedRight.includes(documentSnapshot.id)) {
                AllListing.push({
                  ...documentSnapshot.data(),
                  key: documentSnapshot.id,
                });
              }
            });
            setListings(AllListing);
          }
        });
    });
  }, [] );

  return (
    // Display company information, allow for edits
    <SafeAreaView style={styles.container}>
      <HeaderView />
      <View style={styles.title}>
        <Text style={styles.titleText}> Applications </Text>
      </View>
      <View style={styles.allInfo}>
        <FlatList
          data={listings}
          contentContainerStyle={{paddingBottom: 100}}
          renderItem={({item}) => (
            <View style={styles.buttonRow}>
              <View>
                <Image
                  style={styles.image}
                  source={require('./img/document.png')}
                />
              </View>
              <View style={styles.listItem}>
                <Text style={styles.positionText}> {item.position} </Text>
                <Text style={styles.companyText}> Google </Text>
                <Text style={styles.hourText}>${item.compensation}/ hour</Text>
              </View>
            </View>
          )}
        />
      </View>
      <FooterView />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  positionText: {
    fontWeight: '700',
    fontSize: 16,
  },
  companyText: {
    fontWeight: '500',
    fontSize: 14.5,
  },
  hourText: {
    fontSize: 14,
  },
  buttonRow: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderRadius: 7,
    marginHorizontal: 20,
    padding: 12,
    marginBottom: 5,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 2,
    shadowOffset: {width: 1, height: 3},
  },
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 5,
    marginLeft: 3,
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
    marginTop: -38,
  },
  titleText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: -30,
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
  listItem: {
    marginLeft: 20,
  },
  listContent: {
    paddingBottom: 100,
  },
});
