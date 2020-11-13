import React from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import {Header} from 'native-base';

export function HeaderView() {
  return (
    <View style={styles.container}>
      <Header>
        <View style={styles.title}>
          <Image
            style={styles.image}
            source={require('./img/logo.png')}
          />
        </View>
      </Header>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  image: {
    resizeMode: 'contain',
    width: 254,
  },
  title: {
    marginTop: -8,
    borderBottomWidth: 1,
    borderBottomColor: '#E7E0DE',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flex: 1,
  },
});
