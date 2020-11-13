import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

// export async function getPersonalListings() {
//   const listings = firestore().collection('listings');
//   await listings.get().then((querySnapshot) => {
//     const list = [];
//     querySnapshot.forEach((doc) => {
//       list.push(doc.id);
//     });
//     return list;
//   });
//   //    const snapshot = await firestore().collection('listings').get();
//   //  return snapshot.docs.map(doc => doc.data());
// }

export async function getCompanyDoc() {
  var employer = auth().currentUser;
  if (employer !== null) {
    const companyRef = firestore().collection('companies').doc(employer.uid);
    const company = await companyRef.get();
    return company.data();
  }
}

export async function getCompanyDocID(id) {
  const companyRef = firestore().collection('companies').doc(id);
  const company = await companyRef.get();
  return company.data();
}

export async function getCompanyImage() {
  var employer = auth().currentUser;
  if (employer !== null) {
    const ref = storage().ref('companies/' + employer.uid + '/profile.jpg');
    return ref.getDownloadURL();
  }
}

export async function getCompanyImageID(id) {
  const ref = storage().ref('companies/' + id + '/profile.jpg');
  return ref.getDownloadURL();
}

export async function getUserDoc() {
  var user = auth().currentUser;
  if (user !== null) {
    const userRef = firestore().collection('users').doc(user.uid);
    const userDoc = await userRef.get();
    return userDoc.data();
  }
}

export async function getUserDocID(id) {
  const userRef = firestore().collection('users').doc(id);
  const userDoc = await userRef.get();
  return userDoc.data();
}

export async function getUserImage() {
  var user = auth().currentUser;
  if (user !== null) {
    const ref = storage().ref('users/' + user.uid + '/profile.jpg');
    return ref.getDownloadURL();
  }
}

export async function getUserImageID(id) {
  const ref = storage().ref('users/' + id + '/profile.jpg');
  return ref.getDownloadURL();
}

// export async function uploadImage(id, uri) {
//   var imageRef = storage().ref('users/' + id + '/profile.jpg');
//   await imageRef.putFile(uri);
//   return;
// }

export async function addUser(
  email,
  password,
  image,
  resume,
  nameIn,
  phone_number,
  lat,
  long,
) {
  await auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async () => {
      var user = auth().currentUser;
      firestore()
        .collection('users')
        .doc(user.uid)
        .set({
          name: nameIn,
          email: email,
          phone: phone_number,
          location: new firestore.GeoPoint(parseFloat(lat), parseFloat(long)),
          swipedLeft: [],
          swipedRight: [],
        });
      await storage()
        .ref('users/' + user.uid + '/profile.jpg')
        .putFile(image.imageURI);
      console.log('Image succesfully uploaded!');
      await storage()
        .ref('users/' + user.uid + '/resume.pdf')
        .putFile(resume.fileURI);
      console.log('File succesfully uploaded!');
    });
  console.log('User account created & signed in!');
}

export async function addCompany(email, password, image, companyName) {
  await auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async () => {
      console.log('Employer account created & signed in!');
      var user = auth().currentUser;
      firestore().collection('companies').doc(user.uid).set({
        name: companyName,
        email: email,
      });
      await storage()
        .ref('companies/' + user.uid + '/profile.jpg')
        .putFile(image.imageURI)
        .then(function () {
          console.log('Image succesfully uploaded!');
        })
        .catch((error) => {
          console.log('Image upload unsuccessful!');
        });
    })
    .catch((error) => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }

      console.error(error);
    });
}

export function newListing(lat, long, pos, comp, desc) {
  var employer = auth().currentUser;
  console.log(employer);
  firestore()
    .collection('listings')
    .add({
      employer: employer.uid,
      location: new firestore.GeoPoint(parseFloat(lat), parseFloat(long)),
      position: pos,
      compensation: comp,
      description: desc,
      potentialApplicants: [],
    })
    .then(function (docRef) {
      console.log('Listing succesfully uploaded!');
      firestore()
        .collection('companies')
        .doc(employer.uid)
        .update({
          listings: firestore.FieldValue.arrayUnion(docRef.id),
        });
    })
    .catch((error) => {
      console.log(error);
    });
}

export function swipeLeftUser(jobListing) {
  var user = auth().currentUser;
  var ref = firestore().collection('users').doc(user.uid);
  ref.update({
    swipedLeft: firestore.FieldValue.arrayUnion(jobListing),
  });
}

export function swipeRightUser(jobListing) {
  var user = auth().currentUser;
  var ref = firestore().collection('users').doc(user.uid);
  ref.update({
    swipedRight: firestore.FieldValue.arrayUnion(jobListing),
  });
}

export function addListingApplicant(jobListing) {
  var user = auth().currentUser;
  var ref = firestore().collection('listings').doc(jobListing);
  ref.update({
    potentialApplicants: firestore.FieldValue.arrayUnion(user.uid),
  });
}

// export async function companyListings() {
//   var employer = auth().currentUser;
//   const doc = await firestore().collection('companies').doc(employer.uid);
//   return doc
//     .get()
//     .then((snapshot) => {
//       //var listingInformation = [];
//       //snapshot.data().listings.forEach(async (listing) => {
//       //  const doc2 = await firestore()
//       //    .collection('listings')
//       //    .doc(listing)
//       //    .get();
//       //  //  doc2.get().then((snapshot2) => {
//       //    //console.log(doc2.data());
//       //    listingInformation.push(doc2.data().compensation);
//       //  //  });
//       //});
//       return snapshot.data().listings;
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }

export async function potentialapplicants(listingId) {
  const doc = await firestore().collection('listings').doc(listingId);

  return doc
    .get()
    .then((snapshot) => {
      return snapshot.data().potentialApplicants;
    })
    .catch((error) => {
      console.log('doesnt work');
    });
}
