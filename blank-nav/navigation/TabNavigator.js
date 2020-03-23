import React from 'react';
import { Platform, Text } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
// import { Colors } from '../colors/colors'

import HomeScreen from '../screens/HomeScreen';
import ScreenTwo from '../screens/ScreenTwo';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
    },
    // header title in the top nav
    headerTitleStyle: {
        fontFamily: 'custom-font-name',
    },
    // header title on back (usually iOS only)
    headerBackTitle: {
        fontFamily: 'custom-font-name'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
    HeaderTitle: 'Header Title'
};

// sample from video
// const MealsNavigator = createStackNavigator(
//     {
//         Categories: {
//             screen: CategoriesScreen
//         },
//         CategoryMeals: {
//             screen: CategoryMealsScreen
//         },
//         MealDetails: MealDetailsScreen
//     },
//     {
//         // initialRouteName: 'Categories',
//         defaultNavigationOptions: {
//             headerStyle: {
//                 backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : 'white'
//             },
//             headerTintColor: 
//                 Platform.OS === 'android' ? 'white' : Colors.primaryColor,
//             headerTitle: 'A screen'
//         }
//     }
// )

const tabScreenConfig = {
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return (
                    <Ionicons
                        name="ios-restaurant"
                        size={25}
                        color={tabInfo.tintColor}
                    />
                )
            },
            // only works with shifting:
            tabBarColor: Colors.primaryColor,
            tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: 'custom-bold'}}>Home</Text> : 'Home'
        }
    },
    ScreenTwo: {
        screen: ScreenTwo,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return (
                    <Ionicons
                        name="star"
                        size={25}
                        color={tabInfo.tintColor}
                    />
                )
            },
            // only works with shifting:
            // sets bottom bar color to accent color when active with ripple effect
            tabBarColor: Colors.accentColor,
            tabBarLabel: Platform.OS === 'android' ? <Text style={{ fontFamily: 'custom-bold' }}>ScreenTwo</Text> : 'ScreenTwo'
        }
    }
}

// called MealsFavTabNavigator in video:
// set up material design bottom footer tabs if on android
const TabNavigator = 
    Platform.OS === 'android' 
        ? createMaterialBottomTabNavigator(tabScreenConfig, {
            activeColor: 'white',
            // shifting: true removes the label if not active
            // tabBarColor only works if shifting is yes
            shifting: true
            // if shifting false this is how to set bottom bar bg color: 
            // barStyle: {
            //     backgroundColor: Colors.primaryColor
            // }
        }) 
        : createBottomTabNavigator(tabScreenConfig, {
            tabBarOptions: {
                labelStyle: {
                    fontFamily: 'bold-font'
                },
                activeTintColor: Colors.accentColor
            }
        });

export default createAppContainer(TabNavigator);