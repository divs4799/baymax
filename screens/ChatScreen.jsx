import React, { useState, useCallback, useEffect } from 'react'
import { View,BackHandler,Alert } from 'react-native'
import { StyledContainer,Header,HeaderText,StyledButton,ButtonText } from '../components/styles';
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
export function ChatScreen({navigation,route}) {
  
  const [messages, setMessages] = useState([])
  const {title,email} = route.params;
  var messageList = route.params.message;

  useEffect(()=>{
    
      messageList.sort(function(a,b){
        if(a.createdAt<b.createdAt){
          return 1;
        }
        if(a.createdAt>b.createdAt){return -1}
      });
      
      setMessages(previousMessages => GiftedChat.append(previousMessages, messageList));
  },[])
  
  
  
  const apiKey="";
  // const apiUrl="https://api.openai.com/v1/engines/text-davinci-002/completions";
  
  const getReply = async(message)=>{
    try {
      const response = await axios.post("https://api.openai.com/v1/chat/completions",{
        "model": "gpt-3.5-turbo",
        "messages": [{"role":"user","content":message}],
        "temperature": 1,
        "max_tokens": 125,
        "top_p": 1,
        "frequency_penalty": 0,
        "presence_penalty": 0
      },{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
             }
      });
      
      var text =  response.data.choices[0].message.content;
      return text;
    } catch (error) {console.log(error)}
  }
  
  function saveData(saveList,email){
    const url = "https://chatbot-backend-e8qp.onrender.com/user/saveData"
    // const url ="http://192.168.1.3:3000/user/saveData"
    axios.post(url,{saveList,email}).then((response)=>{
      const result = response.data;
        
      const {message,status,data} = result;
      
      if(status == "SUCCESS"){
        console.log("go back")
        navigation.goBack()
      }
    }).catch(err=>{console.log(err);})
  }

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Do You want to save the chat?', [
        {
          text: 'No',
          onPress: () => navigation.goBack(),
          style: 'cancel',
        },
        {text: 'YES', onPress: () => {saveData(messageList,email); }},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  
  const  onSend = async (newMessages=[]) =>{
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
    messageList.push(newMessages[0]);
    const userMessage = newMessages[0].text;
    var reply = await getReply(userMessage)
    
    
  
    const botMessage = {
      _id: Math.random().toString(36).substring(7),
      text: reply,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
      }
    }
    messageList.push(botMessage);
    
    setMessages(previousMessages => GiftedChat.append(previousMessages, [botMessage]));
    
  }

  function renderBubble(props){
    return(
      <Bubble
        {...props}
        wrapperStyle={{
            right:{
            backgroundColor: '#6D28D9'
            }
        }}
        textStyle={{
            right:{
                color:'#FFF'
            }
        }}
    />);
  }
const renderSend=(props)=>{
    return(
        
        <Send {...props} >
        <View>
            <MaterialCommunityIcons
            name='send'
            style={{marginBottom:5,marginRight:10,padding:2}}
            size={38}
            color={'#6D28D9'}
            />
        </View>
        </Send>
    )
}
  return (
    <StyledContainer style={{flexDirection:"column",justifyContent:"space-between",flex:1,}} >
        <Header style={{height:"10px"}} >
               
                <HeaderText>{title}</HeaderText>

        </Header>
        <View style={{flex:10}} >
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    
      renderBubble={renderBubble}
      alwaysShowSend={true}
      renderSend={renderSend}
    />
    </View>
    </StyledContainer>
  )
}
