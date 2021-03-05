// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';

import AsyncStorage from '@react-native-community/async-storage';

import axios from 'axios';

const http = axios.create({ baseURL: process.env.backEndUrl, withCredentials: true })

const HomeScreen = () => {
  const [user_id, setUser_id] = useState('');
  const [user_name, setUser_name] = useState('');
  const [data, setData] = useState([]);
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
      if (responseJson) {
        setUser_id(responseJson.id);
        setUser_name(responseJson.name);
      }
    }).catch(function (error) {
      console.log(error);
    });

    http.get('/clinicData').then(
      response => response.data
    ).then((responseJson) => {
      console.log("/clinicData", "responseJson", responseJson.data)
      setData(responseJson.data)
      // if (responseJson) {
      //   setUser_id(responseJson.id);
      //   setUser_name(responseJson.name);
      // }
    }).catch(function (error) {
      console.log(error);
    });
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DataTable style={{ height: 1 }}>
        <DataTable.Header>
          <DataTable.Title numeric>User ID</DataTable.Title>
          <DataTable.Title numeric>Doctor ID</DataTable.Title>
          <DataTable.Title numeric>Patient ID</DataTable.Title>
          <DataTable.Title numeric>Medication ID</DataTable.Title>
          <DataTable.Title numeric>Diagnosis detail</DataTable.Title>
        </DataTable.Header>
        <View>
          <ScrollView>
            {
              data && data.length > 0 ?
                data.map((item, index) => {
                  console.log("item.NAME",item.NAME)
                  return (
                    <DataTable.Row key={index}>
                      <DataTable.Cell numeric>{item.user_id}</DataTable.Cell>
                      <DataTable.Cell numeric>{item.doctor_id}</DataTable.Cell>
                      <DataTable.Cell numeric>{item.patient_id}</DataTable.Cell>
                      <DataTable.Cell numeric>{item.medication_id}</DataTable.Cell>
                      <DataTable.Cell numeric>{item.diagnosis_detail}</DataTable.Cell>
                    </DataTable.Row>
                  );
                })
                :
                false
            }
          </ScrollView>
        </View>
      </DataTable>
      <View style={{ flex: 1, padding: 16, justifyContent: 'flex-end', alignItems: 'center',color: 'grey' }}>
        <Text>
          User: {user_name}, ID: {user_id}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
