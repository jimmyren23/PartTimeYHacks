import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Image} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {imagePickerOptions} from '../../utils';
import DocumentPicker from 'react-native-document-picker';

export function UploadFile(props) {
  const [imageURI, setImageURI] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const uploadFile = () => {
    ImagePicker.launchImageLibrary(imagePickerOptions, (response) => {
      if (response.didCancel) {
        console.log('Post canceled');
      } else if (response.error) {
        console.log('An error occurred: ', response.error);
      } else {
        setImageURI({uri: response.uri});
        console.log(response);
        props.onChange(response);
        setIsSelected(true);
      }
    });
  };

  return (
    <View style={styles.center}>
      {isSelected ? (
        <View style={styles.button}>
          <TouchableOpacity
            onPress={uploadFile}
            style={[styles.buttonPic, {backgroundColor: '#94BAEB'}]}>
            <Image style={styles.pic} source={require('../img/profile.png')} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.button}>
          <TouchableOpacity
            onPress={uploadFile}
            style={[styles.buttonPic, {backgroundColor: 'white'}]}>
            <Image style={styles.pic} source={require('../img/profile.png')} />
          </TouchableOpacity>
        </View>
      )}
      <Text>Picture</Text>
    </View>
  );
}

export function UploadPDF(props) {
  const [, setFileURI] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const uploadResume = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      setFileURI(res.uri);
      props.onChange(res);
      setIsSelected(true);
      console.log(res.uri);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  return (
    <View style={styles.center}>
      {isSelected ? (
        <View style={styles.button}>
          <TouchableOpacity
            onPress={uploadResume}
            style={[styles.buttonPic, {backgroundColor: '#94BAEB'}]}>
            <Image style={styles.pic} source={require('../img/document.png')} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.button}>
          <TouchableOpacity
            onPress={uploadResume}
            style={[styles.buttonPic, {backgroundColor: 'white'}]}>
            <Image style={styles.pic} source={require('../img/document.png')} />
          </TouchableOpacity>
        </View>
      )}
      <Text>Resume</Text>
    </View>
  );
}

export function UploadFileCompany(props) {
  const [imageURI, setImageURI] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const uploadFile = () => {
    ImagePicker.launchImageLibrary(imagePickerOptions, (response) => {
      if (response.didCancel) {
        console.log('Post canceled');
      } else if (response.error) {
        console.log('An error occurred: ', response.error);
      } else {
        setImageURI({uri: response.uri});
        console.log(response);
        props.onChange(response);
        setIsSelected(true);
      }
    });
  };

  return (
    <View style={styles.center1}>
      {isSelected ? (
        <View style={styles.button}>
          <TouchableOpacity
            onPress={uploadFile}
            style={[styles.buttonPic, {backgroundColor: '#94BAEB'}]}>
            <Image style={styles.pic} source={require('../img/profile.png')} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.button}>
          <TouchableOpacity
            onPress={uploadFile}
            style={[styles.buttonPic, {backgroundColor: 'white'}]}>
            <Image style={styles.pic} source={require('../img/profile.png')} />
          </TouchableOpacity>
        </View>
      )}
      <Text>Picture</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center1: {
    alignItems: 'center',
    flex: 1,
  },
  center: {
    alignItems: 'center',
    flex: 1,
  },
  button: {
    flex: 1,
  },
  buttonPic: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 20,
    borderColor: 'gray',
    borderWidth: 1,
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#94BAEB',
  },
  pic: {
    height: 50,
    width: 50,
    borderRadius: 20,
  },
});
