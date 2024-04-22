import React from 'react';
import { Text } from 'react-native';
import { useContext } from 'react';
import UserContext from './UserContext';

function UserEmail() {
  const { userEmail } = useContext(UserContext);

  return (

    <Text> You now are logged as the user: {userEmail} </Text>
    
  );
}

export default UserEmail;