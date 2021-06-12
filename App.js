import React from 'react';
import ReactDom from 'react-dom';
import {SafeAreaView } from 'react-native';
import Homepage from './Homepage';
import LoginPage from './LoginPage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const App = () =>{
return(
  
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Home" component={Homepage} />
        <Stack.Screen name="Login" component={LoginPage} options={{
          title:"Sign in to your account"
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
);

}
export default App;

