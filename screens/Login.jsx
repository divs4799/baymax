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

const Login = ({navigation}) => {

    const handleLogin = (cred,setSubmitting)=>{
        const url = "https://chatbot-backend-e8qp.onrender.com/user/signin"
        // const url = "http://192.168.1.3:3000/user/signin"
        axios.post(url,cred)
        .then((response)=>{
            const result = response.data;
            const {message,status,data} = result;

            if(status!== "SUCCESS"){
                setMessage(message);
            }else{
                console.log("gone");
                navigation.navigate("Welcome",{ ...data[0] });
            }
            setSubmitting(false);
        })
        .catch(err=>{console.log(err);
            setSubmitting(false);
            setMessage("An error occured.Chechk your internet and try again.")
        })
    }   
    const [hidePassword,setHidePassword] = useState(true);
    const [message,setMessage] = useState("");
    return (
        <StyledContainer>
            
            <StatusBar style="dark" />
            <InnerContainer>
                <PageTittle> Bay Max</PageTittle>
                <SubTitle>Login</SubTitle>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    onSubmit={(values,{setSubmitting}) => {
                        if(values.email=='' || values.password ==''){
                            setMessage("Please fill all the fields");
                            setSubmitting(false);
                        }else{
                            handleLogin(values,setSubmitting);
                        }
                    }}
                >
                    {({handleChange,handleBlur,handleSubmit,values,isSubmitting}) => <StyledFormArea>
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
                         onBlur={handleBlur('email')}                       
                         value={values.password}
                        secureTextEntry={hidePassword}
                        isPassword = {true}
                        hidePassword ={hidePassword}
                        setHidePassword= {setHidePassword}
                         />
                            <MsgBox  >{message}</MsgBox>

                         { !isSubmitting && <StyledButton onPress={handleSubmit} >
                            <ButtonText>
                                Login
                            </ButtonText>
                         </StyledButton> }
                         { isSubmitting && <StyledButton disabled={true} >
                            <ActivityIndicator size={"large"} color={primary} ></ActivityIndicator>
                         </StyledButton> }
                         <Line />
                         
                         <ExtraView>
                            <ExtraText>Dont't have an Account ?</ExtraText>
                            <TextLink onPress={()=>navigation.navigate("Signup")} >
                                <ExtraText>Sign Up</ExtraText>
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
export default Login;