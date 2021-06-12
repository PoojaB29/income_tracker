import React, { Component, useState, useEffect } from 'react';
import GlobalStyles from './GlobalStyles';
import { Dimensions,StyleSheet,TouchableOpacity,Text ,View, SafeAreaView,TextInput,Button,Platform } from 'react-native';
import {LineChart} from "react-native-chart-kit"; 
import dayjs from 'dayjs';

function Homepage({navigation}) {
    var localizedFormat = require('dayjs/plugin/localizedFormat')
    dayjs.extend(localizedFormat)
    const screenWidth = Dimensions.get("window").width;
    const [description,setDescription] = useState('')
    const [amount,setAmount] = useState('')
    const [data,setData] = useState([
      {date:dayjs().format('l'),amount : 499},
      {date:dayjs().subtract(1,'day').format('l'), amount: 2500},
      {date:dayjs().subtract(1,'day').format('l'), amount: 2500},
      {date:dayjs().subtract(2,'day').format('l'),amount: 5500},
      {date:dayjs().subtract(3,'day').format('l'),amount: 3200},
      {date:dayjs().subtract(4,'day').format('l'),amount: 6459},
      {date:dayjs().subtract(5,'day').format('l'),amount: 4500},
      {date:dayjs().subtract(6,'day').format('l'),amount: 7500},
      {date:dayjs().subtract(7,'day').format('l'),amount: 2500},
      {date:dayjs().subtract(8,'day').format('l'),amount: 500},
      {date:dayjs().subtract(8,'day').format('l'),amount: 500},
      {date:dayjs().subtract(9,'day').format('l'),amount: 5000},
      {date:dayjs().subtract(10,'day').format('l'),amount: 4400},
      {date:dayjs().subtract(10,'day').format('l'),amount: 4400},
      {date:dayjs().subtract(11,'day').format('l'),amount: 3200},
      {date:dayjs().subtract(12,'day').format('l'),amount: 2200},
      {date:dayjs().subtract(13,'day').format('l'),amount: 4000},
      {date:dayjs().subtract(14,'day').format('l'),amount: 500},
      {date:dayjs().subtract(15,'day').format('l'),amount: 2000},
    ])
    const [transformedData,setTransformedData] = useState([]);
    useEffect (() =>{
      setTransformedData(transformData(groupBy(data,'date')));
    },[data])

    const groupBy =(array,key) =>
      array.reduce((rv,x) => {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      },{});
    const [total,setTotal] = useState(0)
    const [gigs,setGigs] = useState([{
      description: 'Freelancing', 
      amount: 499.99,
      timestamp: dayjs(new Date()).format('l'),
    }
  ])
    
    const getDates = () => transformedData.map(pair => pair.date);
    const getAmounts = () => transformedData.map(pair =>pair.amount);
    const transformData = (groupedData) => {
      const transformedArray = [];

      Object.entries(groupedData).forEach(entry => {
        const total = entry[1].reduce((total,pair) => total + pair.amount,0)
        transformedArray.push({date:dayjs(entry[0]).format('l'), amount:total})  
      })

      const sortedArray = transformedArray.sort((a,b) => dayjs(a['date']).diff(dayjs(b['date'])))
  
      return sortedArray;
    }

    console.log('Debug',data);
    console.log('The dates',getDates());
    console.log('The amounts',getAmounts());
    console.log('the grouped values are',Object.entries(groupBy(data,'date')));
    console.log('total grouped values are',transformData(groupBy(data,'date')));

    useEffect(() => {
      setTotal(gigs.reduce((total, gig) => total+Number(gig.amount), 0)); 
    },[gigs])

    const addGig =() =>{
      setGigs([...gigs,{
        description: description,
        amount:Number(amount),
        timestamp:dayjs(new Date()).format('l'),
      }]);
      setData([
        ...data,
        {
        date: dayjs().format('l'),
        amount: Number(amount)
        }
      ]);
      setDescription('');
      setAmount('');
    }

    return (
      <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <View>
          <Text style={{fontSize: 30, fontWeight: "bold", fontWeight: "bold"}}>
            React Native App for Freelancer Devs to Track Income🚀🚀🚀
          </Text>
        </View>
        {Platform.OS === 'ios' ? <TouchableOpacity
            style={styles.loginScreenButton}
            onPress={() => navigation.navigate('Login')}
            underlayColor='#fff'>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity> : 
                <Button  title="Login" onPress={() => navigation.navigate('Login')}/>
          }
        <View>
  <Text>Bezier Line Chart</Text>
  <LineChart
  width={screenWidth}
    data={{
      labels: getDates(),
      datasets: [
        {
          data: getAmounts(),
        }
      ]
    }}
    width={Dimensions.get("window").width} 
    height={220}
    yAxisLabel="₹"
    yAxisInterval={1} 
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "green",
      backgroundGradientTo: "green",
      decimalPlaces: 1, 
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
    />
  </View>
        <Text style={{fontSize: 20, fontWeight: "bold"}}>Total Income: {total}</Text>
          <TextInput 
          style = {{height: 40, padding:20, borderColor: "red",borderWidth:1,marginTop:10,...Platform.select({
            android: {
              height: 60
            },
            ios:{
              height: 60,
            }})}}
          value = {description}  
          placeholder="Enter a description"        
          onChangeText ={text => setDescription(text)}
          />
          <TextInput    
          style = {{height: 40, padding: 20, borderColor: "red",borderWidth:1,marginTop:10,...Platform.select({
            android: {
              height: 60
            },
            ios:{
              height: 60,
            }
          }) }}
          value = {amount} 
          placeholder="Enter the amount you made in Rs (₹)" 
          keyboardType = 'numeric'       
          onChangeText ={text => setAmount(text)}
          />
        <Button disabled={!description && !amount} title='Add Gig🚀' onPress={addGig}/>
        {gigs.map((gig,i)=>(
            <View key={i}>
                <Text >{gig.description}</Text>
              <Text>₹{gig.amount}</Text>
            </View>
        ))}
      </SafeAreaView> 
    );
  }

export default Homepage;
const styles = StyleSheet.create({
  loginScreenButton:{
    marginRight:0,
    marginLeft:0,
   marginTop:10,
    paddingTop:5,
    paddingBottom:5,
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
