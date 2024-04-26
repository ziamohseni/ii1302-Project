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
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth, database } from "../../services/firebaseConfig";
import { ref, set } from "firebase/database";

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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);

  // Function to add user to Firebase Realtime Database
  const addUserToDatabase = (user) => {
    const userId = user.uid;
    const newUser = {
      first_name: firstName,
      last_name: lastName,
      hubs_owned: ["null"],
      hubs_accessible: ["null"],
    };

    // Reference to the user's data in the database
    const userRef = ref(database, "users/" + userId);

    // Set the user data at the reference
    set(userRef, newUser)
      .then(() => console.log("User added successfully!"))
      .catch((error) => console.error("Failed to add user: ", error));
  };

  // Create user account
  const handleSignUp = () => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setEmail("");
        setPassword("");
        console.log("User created: ", user);

        // Add user to database
        addUserToDatabase(user);

        // Send email verification
        sendEmailVerification(user).then(() => {
          setShowVerificationMessage(true);
          setIsLoading(false);
        });
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
    if (
      email.length > 0 &&
      password.length >= 8 &&
      isValidEmail &&
      firstName.length > 0 &&
      lastName.length > 0
    ) {
      setIsButtonActive(true);
    } else {
      setIsButtonActive(false);
    }
  }, [email, password, isValidEmail, firstName, lastName]);

  // Show loading spinner while logging in
  if (isLoading) {
    return <ActivityIndicatorComponent />;
  }

  return (
    <View style={globalStyles.verticalPadding}>
      <View style={loginStyles.logoContainer}>
        <Image source={logo} style={{ width: 200, height: 200 }} />
      </View>
      {showVerificationMessage ? (
        <View style={signUpStyles.welcomeContainer}>
          <Text style={signUpStyles.createAccount}>Account Created!</Text>
          <Text style={loginStyles.welcomeSubtitle}>
            Please check your email for a verification link to activate your
            account. If you don't see the email, please check your spam folder.
          </Text>
          {/* Back to login */}
          <View style={signUpStyles.loginButton}>
            <Button
              title="Go back to login"
              onPress={() => goBackToLogin()}
            ></Button>
          </View>
        </View>
      ) : (
        <>
          <View style={signUpStyles.welcomeContainer}>
            <Text style={signUpStyles.createAccount}>Create Account</Text>
            <Text style={loginStyles.welcomeSubtitle}>
              Please enter your details below to create an account with 5Sense
              Security.
            </Text>
          </View>
          {/* First name input */}
          <TextInput
            style={globalStyles.inputStyle}
            value={firstName}
            autoCapitalize="words"
            returnKeyType="next"
            placeholder="First name"
            onChangeText={(text) => setFirstName(text)}
          />
          {/* Last name input */}
          <TextInput
            style={globalStyles.inputStyle}
            value={lastName}
            autoCapitalize="words"
            returnKeyType="next"
            placeholder="Last name"
            onChangeText={(text) => setLastName(text)}
          />
          {/* Email input */}
          <TextInput
            style={globalStyles.inputStyle}
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
            style={globalStyles.inputStyle}
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
              isButtonActive
                ? globalStyles.buttonActive
                : globalStyles.buttonDisabled
            }
            onPress={handleSignUp}
            disabled={!isButtonActive || isLoading}
          >
            <Text
              style={isButtonActive ? loginStyles.text : loginStyles.textDark}
            >
              SING UP
            </Text>
          </TouchableOpacity>
          {/* Already have an account */}
          <View style={signUpStyles.loginButton}>
            <Button
              title="Already have an account? Log in."
              onPress={() => goBackToLogin()}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default SignUp;
