import { useEffect, useState } from "react";
import {
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import logo from "../../assets/fss-logo.png";

// Styles
import globalStyles from "../styles/globalStyles";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User is signed in!");
      } else {
        console.log("User is signed out!");
      }
    });

    return unsubscribe;
  }, []);

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
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={{ width: 200, height: 200 }} />
      </View>
      <TextInput
        style={styles.input}
        value={email}
        autoCapitalize="none"
        placeholder="Email address"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        secureTextEntry={true}
        style={styles.input}
        value={password}
        autoCapitalize="none"
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
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: globalStyles.lightColor.color,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  input: {
    fontWeight: "bold",
    backgroundColor: "#eeeeee",
    color: globalStyles.darkColor.color,
    height: 65,
    borderColor: globalStyles.secondLightColor.color,
    borderWidth: 1,
    borderRadius: 15,
    marginVertical: 10,
    padding: 10,
    shadowColor: globalStyles.darkColor.color,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 25,
  },
  buttonActive: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginTop: 30,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: globalStyles.primaryColor.color,
  },
  buttonDisabled: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginTop: 30,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: globalStyles.secondLightColor.color,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
