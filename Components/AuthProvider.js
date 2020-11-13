import React, {useContext, useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const AuthContext = React.createContext(null);

// export async function companyOrUserNew() {
//   var user = auth().currentUser;
//   if (user !== null) {
//     const ref = firestore().collection('users').doc(user.uid);
//     const doc = await ref.get();
//     if (doc.exists) {
//       setIsCompany(false);
//     } else {
//       setIsCompany(true);
//     }
//   }
// };
// The AuthProvider is responsible for user management and provides the
// AuthContext value to its descendants. Components under an AuthProvider can
// use the useAuth() hook to access the auth value.
const AuthProvider = ({children}) => {
  const [initializing, setInitializing] = useState(true);
  const [entity, setEntity] = useState(null);
  const [isCompany, setIsCompany] = useState(false);

  //Use Effect, checking if
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(function (user) {
      setEntity(user);
      if (initializing) {
        setInitializing(false);
      }
      companyOrUser(user);
    });
    return () => subscriber(); // unsubscribe on unmount
  });

  // The log in function takes an email and password and uses the emailPassword
  // authentication provider to log in.
  const logIn = async (email, password) => {
    await auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User signed in!');
      });
  };

  const companyOrUser = async (user) => {
    if (user !== null) {
      const ref = firestore().collection('users').doc(user.uid);
      console.log(ref);
      await ref.get().then((doc) => {
        if (doc.exists) {
          setIsCompany(false);
        } else {
          setIsCompany(true);
        }
      });
    }
  };

  // Log out the current user.
  const logOut = async () => {
    await auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
      });
  };

  return (
    <AuthContext.Provider
      value={{
        logIn,
        logOut,
        entity,
        isCompany,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

// The useAuth hook can be used by components under an AuthProvider to access
// the auth context value.
const useAuth = () => {
  const auth = useContext(AuthContext);
  if (auth == null) {
    throw new Error('useAuth() called outside of a AuthProvider?');
  }
  return auth;
};

export {AuthProvider, useAuth};
