import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './../screens/Login';
import Signup from './../screens/Signup';
import Welcome from "./../screens/Welcome";
import { Colors } from "../components/styles";
import { ChatScreen } from '../screens/ChatScreen';
const {third,primary} =Colors;

const Stack = createNativeStackNavigator();
const RootStack = ()=>{
return(
    <NavigationContainer>
<Stack.Navigator
    screenOptions={{
        headerStyle:{
            backgroundColor:"transparent"
        },
        headerTintColor:third,
        headerTransparent:true,
        headerTitle:"",
        headerLeftContainerStyle :{
            paddingLeft:20
        }
    }}
    initialRouteName='Login'
>
    <Stack.Screen name ="Login" component= {Login} />
    <Stack.Screen name ="Signup" component= {Signup} />
    <Stack.Screen name ="ChatScreen" component= {ChatScreen} options={({route})=>({headerBackVisible:false})} />
    <Stack.Screen options={{headerBackVisible:false}} name ="Welcome" component= {Welcome}  />
</Stack.Navigator>
    </NavigationContainer>
)
}

export default RootStack;