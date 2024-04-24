import {Text} from "react-native"
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

function ResetPassword() {

    function resetPassword(){

        const auth = getAuth();
        sendPasswordResetEmail(auth, email)
          .then(() => {
            // Password reset email sent!
            // ..
            Alert.alert("sent email");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            Alert.alert("Error reseting password", error.message);
          });
          
      }


    return (
        <Text>ResetPassword</Text>
    )
}

export default ResetPassword