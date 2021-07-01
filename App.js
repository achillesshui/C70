import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import BookTransaction from './screens/BookTransaction';
import SearchScreen from './screens/SearchScreen';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

export default class App extends React.Component{
  render(){
    return (
        <AppNavigator/>
  );
  }
}

const TabNavigator = createBottomTabNavigator(
  {
    Transaction: { screen: BookTransaction },
    Search: { screen: SearchScreen },
  },
  {
  defaultNavigationOptions:({navigation})=>({
      tabBarIcon:()=>{
        const routeName = navigation.state.routeName;
        console.log(routeName);
        if(routeName==='Transaction'){
          return(
            <Image
              source={require('./assets/book.png')}
              style={{width:30, height:30}}
            />
          )
        }
        else if(routeName==='Search'){
          return(
            <Image
              source={require('./assets/searchingbook.png')}
              style={{width:30, height:30}}
            />
          )
        }
      }
  })
  }
)

const AppNavigator = createAppContainer(TabNavigator)

const styles = StyleSheet.create({
});
