import { useState, useEffect } from "react";
import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import ActivityIndicatorComponent from "../components/global/ActivityIndicatorComponent";
import React, { useContext } from 'react';
import UserContext from '../components/global/UserContext';

// Assets
import logo from "../../assets/fss-logo.png";

// Styles
import globalStyles from "../styles/globalStyles";
import styles from "../styles/loginScreenStyles";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { setUser } = useContext(UserContext);

  // Login function
  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      
      const user = userCredential.user;
      console.log("User logged in!", user);
      setUser(user.email);

    } catch (error) {
      
      if(error.code == "auth/invalid-credential"){
        Alert.alert("Error logging in", "Invalid user credentials :(")
      }
      else if(error.code == "auth/too-many-requests"){
        Alert.alert("Error logging in", "Too many requests!")
      }
      else{
        Alert.alert("Error logging in", error.code.substring(5).replace("-", " ")); 
      }
  
    }
    setIsLoading(false);
  };

  // Check if email is valid
  useEffect(() => {
    const emailRegex = /\S+@\S+\.\S+/;
    setIsValidEmail(emailRegex.test(email));
  }, [email]);

  // Check if email and password are not empty
  useEffect(() => {
    if (email.length > 0 && password.length > 0 && isValidEmail) {
      setIsButtonActive(true);
    } else {
      setIsButtonActive(false);
    }
  }, [email, password]);

  // Show loading spinner while logging in
  if (isLoading) {
    return <ActivityIndicatorComponent />;
  }

  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets
      contentContainerStyle={styles.scrollContainer}
      alwaysBounceVertical={false}
      alwaysBounceHorizontal={false}
    >
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={logo} style={{ width: 200, height: 200 }} />
        </View>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeTitle}>Welcome!</Text>
          <Text style={styles.welcomeSubtitle}>To Five Sense Security</Text>
        </View>
        <TextInput
          style={styles.input}
          value={email}
          autoCapitalize="none"
          inputMode="email"
          returnKeyType="next"
          placeholder="Email address"
          onChangeText={(text) => setEmail(text)}
        />
        {email.length > 0 && !isValidEmail && (
          <Text style={styles.errorText}>Email is not valid.</Text>
        )}
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          value={password}
          autoCapitalize="none"
          returnKeyType="done"
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity
          style={isButtonActive ? styles.buttonActive : styles.buttonDisabled}
          onPress={handleLogin}
          disabled={!isButtonActive}
        >
          <Text style={styles.text}>LOG IN</Text>
        </TouchableOpacity>
        <Button
          title="FORGOT YOUR PASSWORD?"
          color={globalStyles.primaryColor.color}
          onPress={() => Alert.alert("Forgot pass button pressed")}
        />
      </View>
    </ScrollView>
  );
}

export default LoginScreen;
