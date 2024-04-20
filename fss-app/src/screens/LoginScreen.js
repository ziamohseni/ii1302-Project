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
    } catch (error) {
      Alert.alert("Error logging in", error.message);
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
          color={globalStyles.darkColor.color}
          onPress={() => Alert.alert("Forgot pass button pressed")}
        />
      </View>
    </ScrollView>
  );
}

export default LoginScreen;
