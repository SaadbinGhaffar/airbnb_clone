import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Colors from '@/constants/Colors'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'


const Layout = () => {
  return (
                //name is always the name of the file
      <Tabs screenOptions={{
        tabBarActiveTintColor:Colors.primary,
        tabBarLabelStyle:{
            fontFamily:'mon-sb'
        }
      }}>
        <Tabs.Screen name='index' options={{
            tabBarLabel:'Explore',
            tabBarIcon:({color,size})=><Ionicons name='search' color={color} size={size} />

        }} />

<Tabs.Screen name='wishlist' options={{
            tabBarLabel:'Wishlist',
            tabBarIcon:({color,size})=><Ionicons name='heart-outline' color={color} size={size} />

        }} />

<Tabs.Screen name='trips' options={{
            tabBarLabel:'Trips',
            tabBarIcon:({color,size})=><FontAwesome5 name='airbnb' color={color} size={size} />

        }} />

<Tabs.Screen name='inbox' options={{
            tabBarLabel:'Inbox',
            tabBarIcon:({color,size})=><MaterialCommunityIcons name='message-outline' color={color} size={size} />

        }} />

<Tabs.Screen name='profile' options={{
            tabBarLabel:'Profile',
            tabBarIcon:({color,size})=><Ionicons name='person-circle-outline' color={color} size={size} />

        }} />
      </Tabs>
    
  )
}

export default Layout