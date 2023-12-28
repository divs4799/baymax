import styled from "styled-components";
import { View,Text,Image } from "react-native";
import Constants from 'expo-constants';

const StatusBarHeight = Constants.statusBarHeight;
export const Colors ={
    primary:"#ffffff",
    secondary :"#E5E7EB",
    third:"#1F2937",
    darkLight:"#9CA3AF",
    brand:"#6D28D9",
    green:"#10B981",
    red:"#EF4444"
};
const {primary,secondary,third,darkLight,brand,green,red} = Colors;
export const StyledContainer = styled.View`
flex:1;
padding-top: ${StatusBarHeight+30}px;
background-color : ${primary};
`;

export const InnerContainer = styled.View`
flex:1;
width:100%;
align-items:center;
`;
export const PageTittle = styled.Text`
font-size:30px;
text-align:center;
font-weight:bold;
color:${brand};
padding:10px;
`;
export const SubTitle = styled.Text`
font-size:18px;
margin-bottom:20px;
letter-spacing:1px;
font-weight:bold;
color:${third};
`;

export const StyledFormArea = styled.View`
width:90%;
`;
export const StyledTextInput = styled.TextInput` background-color: ${secondary};
 padding: 15px; 
 padding-left: 55px;
 padding-right: 55px;
 border-radius: 5px;
 font-size: 16px;
 height: 60px;
margin-vertical: 3px;
margin-bottom: 10px;
 color: ${third}; `;

export const StyledInputLabel = styled.Text`
color:${third};
font-size:13px;
text-align:left;`

export const LeftIcon = styled.TouchableOpacity`
left:15px;
top:38px;
position:absolute;
z-index:1;`

export const RightIcon = styled.TouchableOpacity`
right:15px;
top:38px;
position:absolute;
z-index:1;`

export const StyledButton = styled.TouchableOpacity`
padding:15px;
background-color:${brand};
justify-content:center;
border-radius:5px;
margin-vertical:5px;
align-items:center;
height:60px;
${(props)=>props.google==true && `
background-color:${green};
flex-direction:row;
justify-content:center;`}
`;
export const ButtonText = styled.Text`
color:${primary};
font-size:16px;
${(props)=>props.google==true && `
padding-left:7px;`}
`; 
export const MsgBox = styled.Text`
height:fit-content;
text-align:left;
font-size:13px;
color:red;
padding:2px;
`;

export const Line = styled.View`
height:1px;
width:100%;
background-color:${darkLight};
margin-vertical:10px;
`;

export const ExtraView = styled.View`
justify-content:center;
flex-direction : row;
align-items:center;
padding:10px;
 `;

export const  ExtraText = styled.Text`
justify-content: center;
align-content:center;
color : ${third};
font-size:15px;
`;

export const TextLink = styled.TouchableOpacity`
justify-content : center;
align-items:center;
`;
// welcome page
export const Header = styled.View`
margin-top:0;
height:20px;
margin:0;
background-color:${brand};
flex-direction:row;
flex-wrap:wrap;
align-items:center;
justify-content:space-around;

`
export const HeaderText = styled.Text`
color:${primary};
font-size:25px;`
export const LogoutButton = styled.TouchableOpacity`
width:10%;
`
