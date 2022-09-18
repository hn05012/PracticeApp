import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GlobalProvider} from './Providers/GlobalProvider';
import UserData from './Components/UserData';
import UserForm from './Components/UserForm';
const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <GlobalProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="UserData" component={UserData} />
          <Stack.Screen name="UserForm" component={UserForm} />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalProvider>
  );
}
