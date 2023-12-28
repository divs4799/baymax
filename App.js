import react from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RootStack  from "./navigators/RootStack";
//Screens
import Login from './screens/Login';
import Signup from './screens/Signup';
export default function App() {
  return (
    <RootStack />
    
  )
};