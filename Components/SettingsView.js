import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Content} from 'native-base';
import {UserSettingsView} from './UserSettingsView';
import {CompanySettingsView} from './CompanySettingsView';
import {useAuth} from './AuthProvider';
import {FooterView} from './Footer';
import {HeaderView} from './Header';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export function SettingsView() {
  const [hasUser, setHasUser] = useState(false);
  const {isCompany} = useAuth();
  const {entity} = useAuth();
  // useEffect(() => {
  //   auth().onAuthStateChanged(function (user) {
  //     if (user) {
  //       setHasUser(true);
  //     } else {
  //       setHasUser(false);
  //     }
  //   });
  // });
  console.log('Is company: ' + isCompany);

  return (
    <View style={styles.container}>
      <HeaderView />
      {entity !== null ? (
        <View style={styles.container}>
          {isCompany ? (
            <View style={styles.container}>
              <CompanySettingsView style={styles.view} />
            </View>
          ) : (
            <View style={styles.container}>
              <UserSettingsView style={styles.view} />
            </View>
          )}
        </View>
      ) : (
        <>
          <Text> Hi </Text>
        </>
      )}
      <FooterView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'white',
  },
  view: {
    display: 'flex',
    flex: 1,
  },
});
