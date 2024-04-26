import {Text, View, TextInput, TouchableOpacity, Alert} from "react-native"
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../services/firebaseConfig";
import {useState, useEffect} from "react"

//styles
import styles from "../../styles/resetPasswordStyles";
import globalStyles from "../../styles/globalStyles";

function ResetPassword(props) {

  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isButtonActive, setIsButtonActive] = useState(false);

  useEffect(() => {
    const emailRegex = /\S+@\S+\.\S+/;
    setIsValidEmail(emailRegex.test(email));
  }, [email]);

  useEffect(() => {
    if (email.length > 0 && isValidEmail) {
      setIsButtonActive(true);
    } else {
      setIsButtonActive(false);
    }
  }, [email]);

  function resetPassword(){

    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        Alert.alert("Email sent!", "Check your mail inbox! You will see mail from 5Sense Security that conatins a link which enables you to reset the password for your account. Check spam folder if you cant find the mail");

        backToLogin();
      })
      .catch((error) => {
        const errorCode = error.code;
        //make the error message more readable
        const errorMessage = errorCode.substring(5).replace("-", " ");
        Alert.alert("Error sending email", errorMessage); 
      });
        
  }

  function backToLogin(){
    props.goBackToLogin();
  }

  function clearInput(){
    setEmail("");
  }

  return (
    <>

      <View>
        <Text style = {styles.title}>Forgot your password? </Text>
        <Text style = {styles.infoText}>Enter your email address and we will send you an email to reset your password </Text>
      </View>

      <TextInput 
          style = {globalStyles.inputStyle}
          autoCapitalize="none"
          value={email}
          inputMode="email"
          returnKeyType="next"
          placeholder="Email address"
          onChangeText={(text) => setEmail(text)}
      />
      {email.length > 0 && !isValidEmail && (
        <Text style={globalStyles.errorText}>Email is not valid.</Text>
      )}

      <TouchableOpacity 
        style={
          isButtonActive
            ? globalStyles.buttonActive
            : globalStyles.buttonDisabled
        }
        disabled={!isButtonActive}
        onPress={() => {
          resetPassword();
          clearInput();
        }}
      >
        <Text style = {isButtonActive ? styles.text : styles.textInactive} > Send email </Text>
      </TouchableOpacity>

      <View style = {styles.backButtonContainer}>
        <TouchableOpacity onPress = {backToLogin} style = {styles.backButton}>
          <Text style = {styles.backButtonIcon}>BACK TO LOGIN</Text>
        </TouchableOpacity>
      </View>

    </>
  )
}

export default ResetPassword