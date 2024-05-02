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
  SafeAreaView,
} from "react-native";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import ActivityIndicatorComponent from "../components/global/ActivityIndicatorComponent";
import ResetPassword from "../components/loginscreen/ResetPassword";
import SignUp from "../components/loginscreen/SignUp";
import Ionicons from "@expo/vector-icons/Ionicons";

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
  const [formType, setFormType] = useState("LOG_IN"); // LOG_IN, SIGN_UP, RESET_PASSWORD

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
      // Check if user is verified
      if (!user.emailVerified) {
        signOut(auth);
        setIsLoading(false);
        Alert.alert(
          "Email not verified",
          "Please verify your email address before logging in."
        );
      }
      console.log("User logged in!", user);
    } catch (error) {
      setIsLoading(false);
      Alert.alert(
        "Error logging in",
        error.message == "Firebase: Error (auth/user-not-found)."
          ? "User not found. Please sign up."
          : "Invalid email or password. Please try again."
      );
    }
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

  function goBack() {
    setFormType("LOG_IN");
  }

  return (
    <SafeAreaView style={globalStyles.containerWithoutPadding}>
      <ScrollView
        automaticallyAdjustKeyboardInsets
        contentContainerStyle={styles.scrollContainer}
        alwaysBounceVertical={formType == "SIGN_UP" ? true : false}
        alwaysBounceHorizontal={false}
      >
        <View style={styles.container}>
          {formType == "RESET_PASSWORD" ? (
            <ResetPassword goBackToLogin={goBack} />
          ) : formType == "SIGN_UP" ? (
            <SignUp goBackToLogin={goBack} />
          ) : (
            <>
              <View style={styles.logoContainer}>
                <Image source={logo} style={{ width: 200, height: 200 }} />
              </View>
              <View style={styles.welcomeContainer}>
                <Text style={styles.welcomeTitle}>Welcome!</Text>
                <Text style={styles.welcomeSubtitle}>
                  To Five Sense Security
                </Text>
              </View>
              <TextInput
                style={globalStyles.inputStyle}
                value={email}
                autoCapitalize="none"
                inputMode="email"
                returnKeyType="next"
                placeholder="Email address"
                onChangeText={(text) => setEmail(text)}
              />
              {email.length > 0 && !isValidEmail && (
                <Text style={globalStyles.errorText}>Email is not valid.</Text>
              )}
              <TextInput
                secureTextEntry={true}
                style={globalStyles.inputStyle}
                value={password}
                autoCapitalize="none"
                returnKeyType="done"
                placeholder="Password"
                onChangeText={(text) => setPassword(text)}
              />
              {/* Forgot pass button */}
              <View>
                <TouchableOpacity
                  style={styles.forgotPassButton}
                  title="FORGOT YOUR PASSWORD?"
                  color={globalStyles.primaryColor.color}
                  onPress={() => setFormType("RESET_PASSWORD")}
                >
                  <Text style={styles.forgotPassText}>FORGOT PASSWORD?</Text>
                </TouchableOpacity>
              </View>
              {/* Login button */}
              <TouchableOpacity
                style={
                  isButtonActive
                    ? globalStyles.buttonActive
                    : globalStyles.buttonDisabled
                }
                onPress={handleLogin}
                disabled={!isButtonActive}
              >
                <Text style={isButtonActive ? styles.text : styles.textDark}>
                  LOG IN
                </Text>
                <Ionicons
                  name="log-in-outline"
                  size={26}
                  color={globalStyles.darkColor.color}
                />
              </TouchableOpacity>

              {/* Sign up button */}
              <View>
                <TouchableOpacity
                  title="SIGN UP"
                  color={globalStyles.primaryColor.color}
                  onPress={() => setFormType("SIGN_UP")}
                  style={styles.forgotPassButton}
                >
                  <Text style={styles.signUpButton}>SIGN UP</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default LoginScreen;
