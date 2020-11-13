import {View, Text, FlatList, StyleSheet, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {HeaderView} from './Header';
import {FooterView} from './Footer';

export function ListingApplicantsView({route}) {
  const {itemId, listing} = route.params;
  const [users, setUsers] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .where('swipedRight', 'array-contains', itemId)
      .onSnapshot((querySnapshot) => {
        if (querySnapshot !== null) {
          const AllUsers = [];
          querySnapshot.forEach((documentSnapshot) => {
            AllUsers.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
          setUsers(AllUsers);
        }
      });
    return () => subscriber();
  }, [itemId]);

  return (
    // Display company information, allow for edits
    <View style={styles.container}>
      <HeaderView />
      <View style={styles.allInfo}>
        <FlatList
          ListHeaderComponent={
            <View style={styles.title}>
              <Text style={styles.pos}> {listing.position} </Text>
              <Text style={styles.app}> Applicants: </Text>
            </View>
          }
          data={users}
          contentContainerStyle={styles.contentContainer}
          renderItem={({item}) => (
            <View style={styles.buttonRow}>
              <View>
                <Image
                  style={styles.image}
                  source={require('./img/user.png')}
                />
              </View>
              <View style={styles.listItem}>
                <Text style={styles.userText}>{item.name}</Text>
                <Text style={styles.smallText}>({item.phone.substring(0,3)})-{item.phone.substring(3,6)}-{item.phone.substring(6,10)}</Text>
              </View>
              <View style={styles.cent}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('UserDetails', {
                      itemId: item.key,
                    });
                  }}>
                  <Image
                    style={styles.imageRight}
                    source={require('./img/forward.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
      {/* <View>
        <TouchableOpacity
          style={styles.goback} 
          onPress={() => navigation.goBack()}>
          <Text> Go Back</Text>
        </TouchableOpacity>
      </View> */}
      <FooterView />
    </View>
  );
}

const styles = StyleSheet.create({
  goback: {
    marginTop: 30,
    padding: 10,
    borderWidth: 1,
    marginHorizontal: 170,
    borderRadius: 5,
    marginBottom: 10,
  },
  pos: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  app: {
    fontSize: 25,
    fontWeight: '500',
    marginBottom: 10,
  },
  userText: {
    fontWeight: '600',
    fontSize: 32,
    marginLeft: 0,
  },
  smallText: {
    fontWeight: '400',
    fontSize: 14.5,
    marginLeft: 0,
  },
  cent: {
    justifyContent: 'center',
  },
  container: {
    display: 'flex',
    flex: 1,
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
  },
  allInfo: {
    display: 'flex',
    flex: 1,
  },
  image: {
    height: 75,
    width: 75,
    borderRadius: 5,
    marginLeft: -20,
  },
  imageRight: {
    height: 30,
    width: 30,
    marginLeft: 90,
  },
  title: {
    alignItems: 'center',
    display: 'flex',
    flex: 0.2,
    justifyContent: 'center',
  },
  contentContainer: {
    paddingBottom: 100,
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
  imageContainer: {
    alignItems: 'center',
    backgroundColor: 'green',
    justifyContent: 'center',
    display: 'flex',
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
    justifyContent: 'center',
  },
});
