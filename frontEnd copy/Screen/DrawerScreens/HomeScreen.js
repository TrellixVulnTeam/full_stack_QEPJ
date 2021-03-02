// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, SafeAreaView} from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

import AsyncStorage from '@react-native-community/async-storage';

import axios from 'axios';
const http = axios.create({ baseURL: 'http://localhost:5000/api', withCredentials: true })

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 }
});

const HomeScreen = () => {
  const [user_id, setUser_id] = useState('');
  const [user_name, setUser_name] = useState('');
  const [clinic_data, setClinic_data] = useState({
    tableHead: [],
    tableData: [[]]
  });
  // const [user_email, setUser_email] = useState('');
  // const [user_pwd, setUser_pwd] = useState('');
  useEffect(() => {
    // AsyncStorage.getItem('user_id').then((value) => setUser_id(value))
    // AsyncStorage.getItem('user_name').then((value) => setUser_name(value))
    // AsyncStorage.getItem('user_email').then((value) => setUser_email(value))
    // AsyncStorage.getItem('user_pwd').then((value) => setUser_pwd(value))

    http.get('/userData').then(
      response => response.data
    ).then((responseJson) => {
      console.log("responseJson",responseJson)
      if (responseJson) {
        setUser_id(responseJson.id);
        setUser_name(responseJson.name);
      }
    }).catch(function (error) {
      console.log(error);
    });

    // fetch('http://192.168.1.2:5000/clinicData', {
    //   method: 'GET',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   credentials: 'same-origin'
    // })
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     if (responseJson.data.length >= 1) {
    //       console.log("responseJson.data",responseJson.data);
    //     } else {
    //       console.log("responseJson.data",responseJson.data);
    //     }
    //   })
    //   .catch((error) => {
    //     //Hide Loader
    //     setLoading(false);
    //     console.error(error);
    //   });

  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 16}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
              marginBottom: 16,
            }}>
            Hello {user_name} [ID: {user_id}]
            {/* Hello World!!! */}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            color: 'grey',
          }}>
          Splash, Login and Register Example{'\n'}React Native
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: 'grey',
          }}>
          www.aboutreact.com
        </Text>
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={clinic_data.tableHead} style={styles.head} textStyle={styles.text}/>
          <Rows data={clinic_data.tableData} textStyle={styles.text}/>
        </Table>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
