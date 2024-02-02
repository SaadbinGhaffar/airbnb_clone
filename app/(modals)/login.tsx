import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useWarmupBrowser } from "@/hooks/useWarmupBrowser";
import { defaultStyles } from "@/hooks/Styles";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useOAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";


enum Strategy{
  Google='oauth_google',
  Instagram='oauth_instagram',
  Facebook='oauth_facebook'
}

const Login = () => {
  const router=useRouter();
  useWarmupBrowser();

  const {startOAuthFlow:googleAuth}=useOAuth({strategy:"oauth_google"})
  const {startOAuthFlow:instaAuth}=useOAuth({strategy:"oauth_instagram"})
  const {startOAuthFlow:facebookAuth}=useOAuth({strategy:"oauth_facebook"})

  const onAuthSelect=async (strategy:Strategy)=>{
    const selectAuth={
      [Strategy.Google]:googleAuth,
      [Strategy.Facebook]:facebookAuth,
      [Strategy.Instagram]:instaAuth,
    }[strategy]

    try {
      const {createdSessionId,setActive}= await selectAuth();

      console.log("Created Session id", createdSessionId )

      if(createdSessionId){
        setActive!({session:createdSessionId})
        router.push('/(tabs)/inbox');
      }


    } catch (error) {
      console.error("OAuth Error->->",error)
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        placeholder="Email"
        style={[defaultStyles.inputField, { marginBottom: 30 }]}
      />
      <TouchableOpacity style={defaultStyles.btn}>
        <Text style={defaultStyles.btnText}>Continue</Text>
      </TouchableOpacity>
      <View style={styles.seperatorView}>
        <View
          style={{
            flex: 1,
            borderBottomColor: "#000",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        ></View>
        <Text style={styles.seperator}>Or</Text>
        <View
          style={{
            flex: 1,
            borderBottomColor: "#000",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        ></View>
      </View>
      <View style={{gap:20}}>
        <TouchableOpacity style={styles.btnOutline} >
          <Ionicons name="call-outline" size={24}  style={defaultStyles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continue With Phone</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnOutline} onPress={()=>onAuthSelect(Strategy.Instagram)}>
          <Ionicons name="logo-instagram" size={24}  style={defaultStyles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continue With Instagram</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnOutline} onPress={()=>onAuthSelect(Strategy.Google)}>
          <Ionicons name="logo-google" size={24}  style={defaultStyles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continue With Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnOutline} onPress={()=>onAuthSelect(Strategy.Facebook)}>
          <Ionicons name="logo-facebook" size={24}  style={defaultStyles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continue With Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 26,
  },
  seperatorView: {
    flexDirection: "row",
    gap:10,
    alignItems:'center',
    marginVertical:30
  },
  seperator: {
    fontFamily: "mon-sb",
    color: Colors.grey,
  },
  btnOutline: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Colors.grey,
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
    
    btnOutlineText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'mon-sb'}
});

export default Login;
