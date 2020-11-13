import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginView} from './Components/LoginView';
import {RegisterView} from './Components/RegisterView';
import {ListingsView} from './Components/ListingsView';
import {CreateListingView} from './Components/CreateListingView';
import {SettingsView} from './Components/SettingsView';
import {AuthProvider} from './Components/AuthProvider';
import {CompanyListingsView} from './Components/CompanyListingsView';
import {ListingApplicantsView} from './Components/ListingApplicantsView';
import {AppliedListingsView} from './Components/AppliedListingsView';
import {UpdateUserSettingsView} from './Components/UpdateUserSettingsView';
import {UserDetailsView} from './Components/UserDetailsView';
import {UpdateCompanySettingsView} from './Components/UpdateCompanySettingsView';

const Stack = createStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerLeft: null,
            animationEnabled: true,
            headerShown: false,
          }}>
          <Stack.Screen name="Login" component={LoginView} />
          <Stack.Screen name="Register" component={RegisterView} />
          <Stack.Screen name="Listings" component={ListingsView} />
          <Stack.Screen name="CreateListing" component={CreateListingView} />
          <Stack.Screen name="Settings" component={SettingsView} />
          <Stack.Screen
            name="CompanyListings"
            component={CompanyListingsView}
          />
          <Stack.Screen
            name="ListingApplicants"
            component={ListingApplicantsView}
          />
          <Stack.Screen
            name="AppliedListings"
            component={AppliedListingsView}
          />
          <Stack.Screen
            name="UpdateUserSettings"
            component={UpdateUserSettingsView}
          />
          <Stack.Screen
            name="UpdateCompanySettings"
            component={UpdateCompanySettingsView}
          />
          <Stack.Screen name="UserDetails" component={UserDetailsView} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
