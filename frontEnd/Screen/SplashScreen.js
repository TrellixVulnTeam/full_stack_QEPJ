// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View, StyleSheet, Image} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import axios from 'axios';
const http = axios.create({ baseURL: 'http://localhost:5000/api', withCredentials: true })

const SplashScreen = ({navigation}) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen
      // AsyncStorage.getItem('user_id').then((value) =>
      //   navigation.replace(value === null ? 'Auth' : 'DrawerNavigationRoutes'),
      // );

      http.get('/protected').then(
        response => response.data
      ).then((responseJson) => {
        console.log(responseJson);
        // If server response message same as Data Matched
        navigation.replace(responseJson.result ? 'DrawerNavigationRoutes':'Auth' )
      }).catch(function (error) {
        console.log(error);
      });

      // fetch('http://192.168.1.2:5000/api/protected', {
      //   method: 'GET',
      //   headers: {
      //     'Accept': 'application/json',
      //     'Content-Type': 'application/json'
      //   }
      // })
      //   .then((response) => response.json())
      //   .then((responseJson) => {
      //     //Hide Loader
      //     console.log("responseJson",responseJson);
      //     // If server response message same as Data Matched
      //     navigation.replace(responseJson.result ? 'DrawerNavigationRoutes':'Auth' )
      //   })
      //   .catch((error) => {
      //     //Hide Loader
      //     console.error(error);
      //   });

    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../Image/aboutreact.png')}
        style={{width: '90%', resizeMode: 'contain', margin: 30}}
      />
      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#307ecc',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});
