import React, {useEffect} from 'react';
import { NavigationContainer, useNavigation, CommonActions } from '@react-navigation/native';
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
  const navigation = useNavigation(); // Ajout de la référence à la navigation

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     // Appel de la fonction reset sur la référence de navigation
  //     navigation.reset({
  //       index: 0,
  //       routes: [{ name: 'Cocktails' }],
  //     });
  //   });

  //   return unsubscribe;
  // }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Cocktails' }],
        })
      );
    });
  
    return unsubscribe;
  }, [navigation]);


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
