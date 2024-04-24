import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Text,
  Image,
  Alert,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebaseConfig";

// Assets
import logo from "../../../assets/fss-logo.png";

// Styles
import globalStyles from "../../styles/globalStyles";
import loginStyles from "../../styles/loginScreenStyles";
import signUpStyles from "../../styles/signUpStyles";
import ActivityIndicatorComponent from "../global/ActivityIndicatorComponent";

const SignUp = ({ goBackToLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = () => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setEmail("");
        setPassword("");
        goBackToLogin();
        console.log("User created: ", user);
        setIsLoading(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const emailInUse =
          errorCode === "auth/email-already-in-use"
            ? "Email is already in use. Please use another email address."
            : "";
        Alert.alert("Error creating user", emailInUse);
        setIsLoading(false);
      });
  };

  // Check if email is valid
  useEffect(() => {
    const emailRegex = /\S+@\S+\.\S+/;
    setIsValidEmail(emailRegex.test(email));
  }, [email]);

  // Check if email and password are not empty
  useEffect(() => {
    if (email.length > 0 && password.length >= 8 && isValidEmail) {
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
    <View>
      <View style={loginStyles.logoContainer}>
        <Image source={logo} style={{ width: 200, height: 200 }} />
      </View>
      <View style={signUpStyles.welcomeContainer}>
        <Text style={signUpStyles.createAccount}>Create Account</Text>
        <Text style={loginStyles.welcomeSubtitle}>
          Please enter your details below to create an account with 5Sense
          Security.
        </Text>
      </View>
      {/* Email input */}
      <TextInput
        style={loginStyles.input}
        value={email}
        autoCapitalize="none"
        inputMode="email"
        returnKeyType="next"
        placeholder="Email address"
        onChangeText={(text) => setEmail(text)}
      />
      {/* Email invalid  message */}
      {email.length > 0 && !isValidEmail && (
        <Text style={globalStyles.errorText}>Email is not valid.</Text>
      )}
      {/* Password input */}
      <TextInput
        secureTextEntry={true}
        style={loginStyles.input}
        value={password}
        autoCapitalize="none"
        returnKeyType="done"
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
      />
      {/* Password length message */}
      {password.length > 0 && password.length < 8 && (
        <Text style={globalStyles.errorText}>
          Password must be at least 8 characters long.
        </Text>
      )}
      {/* Sign up button */}
      <TouchableOpacity
        style={
          isButtonActive ? loginStyles.buttonActive : loginStyles.buttonDisabled
        }
        onPress={handleSignUp}
        disabled={!isButtonActive || isLoading}
      >
        <Text style={loginStyles.text}>SING UP</Text>
      </TouchableOpacity>
      {/* Already have an account */}
      <View style={signUpStyles.loginButton}>
        <Button
          title="Already have an account? Log in."
          onPress={() => goBackToLogin()}
        />
      </View>
    </View>
  );
};

export default SignUp;
