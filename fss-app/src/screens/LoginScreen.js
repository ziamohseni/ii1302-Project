import { useState } from "react";
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
import logo from "../../assets/fss-logo.png";

// Styles
import globalStyles from "../styles/globalStyles";
import styles from "../styles/loginScreenStyles";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Login function
  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User logged in!", user);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

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
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          value={password}
          autoCapitalize="none"
          returnKeyType="done"
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={styles.buttonActive} onPress={handleLogin}>
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
