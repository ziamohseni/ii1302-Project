import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";

// Assets
import logo from "../../../assets/fss-logo.png";

// Styles
import globalStyles from "../../styles/globalStyles";
import loginStyles from "../../styles/loginScreenStyles";
import signUpStyles from "../../styles/signUpStyles";

const SignUp = ({ goBackToLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonActive, setIsButtonActive] = useState(false);

  const handleSignUp = () => {
    // Implement sign up logic here
  };

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
      <TextInput
        style={loginStyles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={loginStyles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {/* Sign up button */}
      <TouchableOpacity
        style={
          isButtonActive ? loginStyles.buttonActive : loginStyles.buttonDisabled
        }
        onPress={handleSignUp}
        disabled={!isButtonActive}
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
