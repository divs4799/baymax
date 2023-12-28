import React ,{useState} from "react";
import { Formik } from "formik";
import axios  from "axios";
import { StatusBar } from 'expo-status-bar';
import {
    StyledContainer,
    InnerContainer,
    PageTittle,
    SubTitle, 
    StyledFormArea,
    LeftIcon,
    RightIcon,
    StyledTextInput,
    StyledInputLabel,
    StyledButton,
    ButtonText,
    Line,
    MsgBox,
    ExtraView,
    ExtraText,
    TextLink
} from "../components/styles";
import { View,ActivityIndicator } from "react-native";
import {Fontisto} from '@expo/vector-icons'
import {Octicons} from '@expo/vector-icons';
import {Ionicons} from '@expo/vector-icons';
import { Colors } from "../components/styles";
const {brand,darkLight,primary} =Colors;

const Signup = ({navigation}) => {
    const [hidePassword,setHidePassword] = useState(true);
    const [message,setMessage] = useState("");
    const handleSignUp = (cred)=>{
        const url = "https://chatbot-backend-e8qp.onrender.com/user/signup"
        // const url = "http://192.168.1.3:3000/user/signup"
        axios.post(url,cred).then((response)=>{
            const result = response.data;
            const {message,status,data} = result;
            if(status!=="SUCCESS"){
                setMessage(message);
            }else{
                console.log("data :",data)
                navigation.navigate("Welcome",{...data})
            }
        }).catch((err)=>{console.log(err)});
    };


    return (
        <StyledContainer>
            
            <StatusBar style="dark" />
            <InnerContainer>
                <PageTittle> Bay Max</PageTittle>
                <SubTitle>Account Sign Up</SubTitle>
                <Formik
                    initialValues={{name:'', email: '', password: '',confirmpassword:'' }}
                    onSubmit={(values) => {
                        handleSignUp(values);
                    }}
                >
                    {({handleChange,handleBlur,handleSubmit,isSubmitting,values}) => <StyledFormArea>
                         <TextInput 
                         label = "User Name"
                         icon= "person" 
                         placeholder= "Full Name"
                         placeholderTextColor={darkLight}
                         onChangeText={handleChange('name')}
                         onBlur={handleBlur('name')}  
                         value={values.name}                     
                         keyboardType='email-address'
                         />

                         <TextInput 
                         label = "Email Address"
                         icon= "mail" 
                         placeholder= "Enter email"
                         placeholderTextColor={darkLight}
                         onChangeText={handleChange('email')}
                         onBlur={handleBlur('email')}  
                         value={values.email}                     
                         keyboardType='email-address'
                         />

                         <TextInput 
                         label = "Password"
                         icon= "lock"
                         placeholder= "*******"
                         placeholderTextColor={Colors.darkLight}
                         onChangeText={handleChange('password')}
                         onBlur={handleBlur('password')}                       
                         value={values.password}
                        secureTextEntry={hidePassword}
                        isPassword = {true}
                        hidePassword ={hidePassword}
                        setHidePassword= {setHidePassword}
                         />

                         <TextInput 
                         label = "Confirm Password"
                         icon= "lock"
                         placeholder= "*******"
                         placeholderTextColor={Colors.darkLight}
                         onChangeText={handleChange('confirmpassword')}
                         onBlur={handleBlur('confirmpassword')}                       
                         value={values.confirmpassword}
                        secureTextEntry={hidePassword}
                        isPassword = {true}
                        hidePassword ={hidePassword}
                        setHidePassword= {setHidePassword}
                         />
                            <MsgBox  >{message}</MsgBox>

                        { !isSubmitting && <StyledButton onPress={handleSubmit} >
                            <ButtonText>
                                Sign Up
                            </ButtonText>
                         </StyledButton>}

                { isSubmitting && <StyledButton disabled={true} >
                            <ActivityIndicator size={"large"} color={primary} ></ActivityIndicator>
                         </StyledButton> }
                         <Line />
                         <ExtraView>
                            <ExtraText>Already have an Account ?</ExtraText>
                            <TextLink onPress={()=>navigation.navigate("Login")} >
                                <ExtraText>Sign In</ExtraText>
                            </TextLink>
                         </ExtraView>
                         </StyledFormArea>}
                </Formik>
            </InnerContainer>
        </StyledContainer>
    )
}
const TextInput = ({label,icon,isPassword,hidePassword,setHidePassword, ...props}) => {
    return(
        <View>
            <LeftIcon>
            <Octicons name={icon} size={30} color={brand}/>
            </LeftIcon>
         <StyledInputLabel>{label}</StyledInputLabel>
         <StyledTextInput {...props}/>
         {isPassword && (
            <RightIcon onPress={()=>setHidePassword(!hidePassword) }  >
            <Ionicons size={30} name = {hidePassword ? 'eye-off':'eye'} color={darkLight} />
            </RightIcon>
         )}
        </View>
    )
}
export default Signup;