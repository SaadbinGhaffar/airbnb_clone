import { View, Text, Button, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import * as ImagePicker from 'expo-image-picker'

import { defaultStyles } from '@/hooks/Styles';

const Profile = () => {
  const { signOut, isSignedIn } = useAuth();
  const { user } = useUser();
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.emailAddresses[0].emailAddress)
  const [edit, setEdit] = useState(false)

  useEffect(() => {
    if (!user) return;
    setFirstName(user.firstName)
    setLastName(user.lastName);
    setEmail(user.emailAddresses[0].emailAddress)
  }, [user])


  const onSaveUser = async () => {
    try {
      if (!firstName || !lastName) return;
      await user?.update({
        firstName,
        lastName
      })
    } catch (error) {
      console.log(error)
    } finally {
      setEdit(false)
    }

  }

  const onCaptureImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.75,
      base64: true//i will be able to upload it directly to Clerk
    })
    if (!result.canceled) {
      const base64 = `data:image/png;base64,${result.assets[0].base64}`
      user?.setProfileImage({
        file: base64,
      })
    }

  }

  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={{ fontFamily: 'mon-sb', fontSize: 24 }}>Profile</Text>
        <Ionicons name='notifications-outline' size={26} />
      </View>

      {user && <View style={styles.card}>
        <TouchableOpacity onPress={onCaptureImage}>
          <Image source={{ uri: user?.imageUrl }} style={styles.avatar} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', gap: 6 }}>
          {edit ? (
            <View style={styles.editRow}>
              <TextInput placeholder='First Name' value={firstName || ''}
                onChangeText={setFirstName}
                style={[defaultStyles.inputField, { width: 100 }]}
              >
              </TextInput>

              <TextInput placeholder='Last Name' value={lastName || ''}
                onChangeText={setLastName}
                style={[defaultStyles.inputField, { width: 100 }]}
              >
              </TextInput>

              <TouchableOpacity onPress={onSaveUser}>
                <Ionicons name='checkmark-outline' size={24} color='#000' />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.editRow}>
              <Text style={{ fontFamily: 'mon-sb', fontSize: 22 }} >{firstName}  {lastName}</Text>
              <TouchableOpacity onPress={() => setEdit(true)}>
                <Ionicons name='create-outline' size={24} color='#000' />
              </TouchableOpacity>
            </View>
          )}

        </View>
        <Text>{email}</Text>
        <Text>{user?.createdAt?.toLocaleDateString()}</Text>
      </View>}

      {isSignedIn && <Button title='Logout' onPress={() => signOut()} />}

      {!isSignedIn &&
        <Link href={'/(modals)/login'} asChild>
          <Button title='Login' color={Colors.dark} />
        </Link>
      }
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    padding: 24,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  card: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    marginHorizontal: 24,
    marginTop: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 1
    },
    alignItems: 'center',
    gap: 14,
    marginBottom: 24

  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.grey,

  },
  editRow: {
    height: 60,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8
  }
})