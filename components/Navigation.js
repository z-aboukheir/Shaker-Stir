import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Image } from 'react-native';
import { useIsFocused } from '@react-navigation/native';


import ListeCocktails from './ListeCocktails';
import DetailsCocktail from './DetailsCocktail';
import Inscription from './Inscription';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ListeCocktailsStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Cocktails"
                component={ListeCocktails}
                options={{ title: 'Liste des Cocktails' }}
            />
            <Stack.Screen
                name="DetailsCocktail"
                component={DetailsCocktail}
                options={{ title: 'Détails du Cocktail' }}
            />
        </Stack.Navigator>
    );
};

const Navigation = () => {
    return (
        <Tab.Navigator
        tabBarOptions={{
            style: {
              flexDirection: 'row',
              justifyContent: 'space-around'
            }
          }}
            >
            <Tab.Screen
                name="Shaker&Stir"
                component={ListeCocktailsStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                      <Image
                        source={require('../assets/cocktail.png')}
                        style={{ width: size, height: size, tintColor: color }}
                      />
                    )
                  }}
                />
            <Tab.Screen
                name="Inscription"
                component={Inscription}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                      <Image
                        source={require('../assets/profil.png')}
                        style={{ width: size, height: size, tintColor: color }}
                      />
                    )
                  }}
               />
        </Tab.Navigator>
    );
};

export default Navigation;
