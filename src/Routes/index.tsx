import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Home from '../pages/Home';
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Register from '../pages/Register';
import { RootState } from '../store/reducers';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Chat from '../pages/Chat';
import Profile from '../pages/Profile';
import { themeStyledComponents } from '../../App';
import PersonalInfo from '../pages/Profile/components/PersonalInfo';
import Favorites from '../pages/Profile/components/Favorites';
import Help from '../pages/Profile/components/Help';
import AboutUs from '../pages/Profile/components/AboutUs';
import { navigationRef } from './RootNavigation';
import Message from '../pages/Chat/components/Message';

const mapStateToProps = ({ auth }: RootState) => ({
  isAuth: auth.getIn(['isAuth']),
});

const connector = connect(mapStateToProps);

type ReduxProps = ConnectedProps<typeof connector>;

const Routes = ({ isAuth }: ReduxProps) => {
  const Stack = createNativeStackNavigator();

  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer ref={navigationRef}>
      {!isAuth ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="LandingPage" component={Landing} />
          <Stack.Screen name="RegisterScreen" component={Register} />
          <Stack.Screen name="LoginScreen" component={Login} />
        </Stack.Navigator>
      ) : (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarIcon: () => (
                <FontAwesome5Icon
                  name="home"
                  color={themeStyledComponents.colors.primary}
                  size={20}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Chat"
            component={Chat}
            options={{
              tabBarIcon: () => (
                <FontAwesome5Icon
                  name="comment"
                  color={themeStyledComponents.colors.primary}
                  size={20}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Perfil"
            component={Profile}
            options={{
              tabBarIcon: () => (
                <FontAwesome5Icon
                  name="user"
                  size={20}
                  color={themeStyledComponents.colors.primary}
                />
              ),
            }}
          />

          <Tab.Screen
            options={{
              tabBarStyle: { display: 'none' },
              tabBarButton: () => null,
            }}
            name="PersonalInfoScreen"
            component={PersonalInfo}
          />

          <Tab.Screen
            options={{
              tabBarStyle: { display: 'none' },
              tabBarButton: () => null,
            }}
            name="FavoritesScreen"
            component={Favorites}
          />

          <Tab.Screen
            options={{
              tabBarStyle: { display: 'none' },
              tabBarButton: () => null,
            }}
            name="HelpScreen"
            component={Help}
          />

          <Tab.Screen
            options={{
              tabBarStyle: { display: 'none' },
              tabBarButton: () => null,
            }}
            name="AboutScreen"
            component={AboutUs}
          />
          <Tab.Screen
            options={{
              tabBarStyle: { display: 'none' },
              tabBarButton: () => null,
            }}
            name="MessageScreen"
            component={Message}
          />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
};

export default connector(Routes);
