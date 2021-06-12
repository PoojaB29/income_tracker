import React,{useState} from 'react'
import { View, Text,Button,StyleSheet,TouchableOpacity,TextInput,Platform} from 'react-native';

const LoginPage = ({navigation}) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const login =() => {
        if(username === 'admin' && password === 'admin'){
            navigation.navigate('Home');
        }
    }

    return (
        <View>
            <Text>It's quick and easy</Text>
            <TextInput 
          style = {{height: 40, padding:20, borderColor: "black",borderWidth:1,marginTop:10,...Platform.select({
            android: {
              height: 60
            },
            ios:{
              height: 60
            }
          })}}
          value = {username}  
          placeholder="Enter your username"        
          onChangeText ={text => setUsername(text)}
          />
          <TextInput 
          style = {{height: 40, padding:20, borderColor: "black",borderWidth:1,marginTop:10,...Platform.select({
            android: {
              height: 60
            },
            ios:{
              height: 60
            }})}}
          value = {password} 
          secureTextEntry={true}
          placeholder="Enter your password"        
          onChangeText ={text => setPassword(text)}
          />
          {Platform.OS === 'ios' ? <TouchableOpacity
            style={styles.loginScreenButton}
            onPress={login}
            underlayColor='#fff'>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity> : 
                <Button  title="Login" onPress={login}/>
          }
        </View>
    )
}

export default LoginPage;

const styles = StyleSheet.create({
  loginScreenButton:{
    marginRight:0,
    marginLeft:0,
   marginTop:10,
    paddingTop:20,
    paddingBottom:20,
    backgroundColor:'#007AFF',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  loginText:{
      color:'#fff',
      fontSize:20,
      fontWeight:'bold',
      textAlign:'center',
      paddingLeft : 10,
      paddingRight : 10
  }
  });
