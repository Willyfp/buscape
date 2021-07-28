import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
 
import Login from './src/Pages/Login';
import Registrar from './src/Pages/Registrar';
import TwoFactor from './src/Pages/TwoFactor';
 
const AppStack = createStackNavigator();
 
const Routes = () => {
    return (
        <NavigationContainer>
            <AppStack.Navigator headerMode="none">
                <AppStack.Screen name="Login" component={Login} />
                <AppStack.Screen name="Registrar" component={Registrar} />
                <AppStack.Screen name="TwoFactor" component={TwoFactor} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}
 
export default Routes;