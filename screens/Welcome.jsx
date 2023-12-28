import React ,{useState,useEffect} from "react";
import {MaterialCommunityIcons} from "react-native-vector-icons";
import { FlatList, View,Text } from "react-native";
import axios from "axios";
import {Container,Card, UserInfo, UserImgWrapper, UserImg, TextSection, UserInfoText, UserName, PostTime, MessageText} from "../components/MessageStyles";
import {
    StyledContainer,
    StyledTextInput,
    StyledButton,
    ButtonText,
    Header,
    HeaderText
} from "../components/styles";
import { Colors } from "../components/styles";


const messages= [
    {
        _id: 0,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        }}, {
        id:2,
        title:"New Chat",
        userImg: require("../assets/chat.png"),
        description:"Click This to start a new Chat",
        time:"now"
    }
]



const Welcome = ({navigation,route})=>{
    
    const userImg = require("../assets/chat.png")
    const {username,email} = route.params;
    console.log("params : ",email);
    // console.log("params",route.params.article);

    const [chatList ,setchatList] = useState([]);
    const [logout,setLogout] = useState(false);
    var defaultMessage=[{
        _id: -1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        }
      }]

const getData = async ()=>{
    const url = "https://chatbot-backend-e8qp.onrender.com/user/getData"
    // const url= "http://192.168.1.3:3000/user/getData"
    // const response = await axios.get(url,{email:email});
    axios.post(url,{email}).then((response)=> {
        const data = response.data;
        const article = data.data.article;
        setchatList(article);
    }).catch((error)=>{console.log("error in getData :",error)})
    
}

useEffect(()=>{
    getData();
},[])


    useEffect(()=>{
        navigation.addListener('beforeRemove',(e)=>{
            if(!logout){
                e.preventDefault();
            }else{
                navigation.dispatch(e.data.action);
            }
        })
    })
    const getDate = (dateTime)=>{
        var date = new Date(dateTime);
        return date.toLocaleDateString();
    } 
    const getTime= (dateTime)=>{
        var date = new Date(dateTime);
        let options = { timeStyle: 'short', hour12: true };
        // var time = date.getHours()+":"+date.getMinutes();
        var time = date.toLocaleTimeString('en-US',options);
        return time
    }
    const handleLogout=()=>{
        setLogout(true);

        navigation.navigate("Login")
    }
    return <StyledContainer style={{flexDirection:"column",justifyContent:"space-between",flex:1}} >
        <Header style={{height:"10px",padding:"20px"}} >
                <HeaderText>Welcome { username} </HeaderText>
                {/* <HeaderText>Welcome { "Hello World"} </HeaderText> */}
                <StyledButton style={{height:"30px",marginVertical:0}} onPress={()=>{handleLogout()}} >
                <ButtonText  style={{textAlign:"left"}}>Logout</ButtonText>
                </StyledButton>

        </Header>
        <Container>
        <Card onPress={()=>{navigation.navigate("ChatScreen",{title:"New Chat",email:email,newChat:true,message:defaultMessage})}}>
                    <UserInfo>
                        <UserImgWrapper>
                            <MaterialCommunityIcons 
                            name="message-plus"
                            size={50}
                            color="#6D28D9"
                            />
                        </UserImgWrapper>
                        <TextSection>
                            <UserInfoText>
                                <UserName>New Chat</UserName>
                                <PostTime>Now</PostTime>
                            </UserInfoText>
                            <Text>Click this to open a new Chat</Text>
                        </TextSection>
                    </UserInfo>
                </Card>
            <FlatList 
            data={chatList}
            keyExtractor={item=>item.chatId}
            renderItem={({item})=>(
                <Card onPress={()=>{navigation.navigate("ChatScreen",{title:item.title,email:email,newChat:false,message:item.messages})}}>
                    <UserInfo>
                        <UserImgWrapper>
                            <UserImg source={userImg} />
                        </UserImgWrapper>
                        <TextSection>
                            <UserInfoText>
                                <UserName>{item.title}</UserName>
                                <View style={{}}>
                                <PostTime>{getDate(item.time)} </PostTime>
                                <Text>{getTime(item.time)}</Text>
                                </View>
                            </UserInfoText>
                            <MessageText  >{item.description}</MessageText>
                        </TextSection>
                    </UserInfo>
                </Card>

            )}
            />

            
</Container>
    </StyledContainer>
}


export default Welcome;