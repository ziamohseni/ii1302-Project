import {Text, View, TextInput, TouchableOpacity, Alert} from "react-native"
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../services/firebaseConfig";
import {useState} from "react"

//styles
import styles from "../../styles/resetPasswordStyles";

function ResetPassword(props) {

  const [email, setEmail] = useState("");

  function resetPassword(){

    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        // ..
        Alert.alert("Email sent!", "Look in your email inbox");
      })
      .catch((error) => {
        const errorCode = error.code;
        Alert.alert("Error sending email", errorCode.substring(5).replace("-", " "));
      });
        
  }

  function backToLogin(){
    props.goBackToLogin();
  }

  return (
    <>
    
      <View style = {styles.backButtonContainer}>
        <TouchableOpacity onPress = {backToLogin} style = {styles.backButton}>
          <Text style = {styles.backButtonIcon}> 🔙</Text>
        </TouchableOpacity>
      </View>

      <View>
        <Text style = {styles.title}>Forgot your password? </Text>
        <Text style = {styles.infoText}>Enter your email address and we will send you an email to reset your password </Text>
      </View>

      <TextInput 
          style = {styles.input}
          autoCapitalize="none"
          value={email}
          inputMode="email"
          returnKeyType="next"
          placeholder="Email address"
          onChangeText={(text) => setEmail(text)}
      />

      <TouchableOpacity 
        style = {styles.button} 
        onPress = {resetPassword}
      >
        <Text style = {styles.text} > Send email </Text>
      </TouchableOpacity>

    </>
  )
}

export default ResetPassword