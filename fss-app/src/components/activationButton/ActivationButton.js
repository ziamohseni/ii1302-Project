import {Text, TouchableOpacity, View} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

//styles
import styles from "../../styles/activationButtonStyles"
import { useState } from "react";

function ActivationButton(){
    
    const [isArmed, setIsArmed] = useState(false);
    
    function changeAlarmSatus(){
        //more code?
        
        if(isArmed){
            setIsArmed(false)
        }
        else{
            setIsArmed(true)
        }
    }

    return (

        <View style = {styles.buttonContainer}>

            {isArmed ? 
                (<Text style = {styles.alarmStatusText}>ALARM ON</Text>)
                : 
                (<Text style = {styles.alarmStatusText}>ALARM OFF</Text>)
            }
            
            <TouchableOpacity 
                style = { isArmed ? styles.buttonOn : styles.buttonOff }
                onLongPress={changeAlarmSatus}
                delayLongPress={3000}
            >
                <Ionicons name="power" size={200} color={"white"} />
            </TouchableOpacity>

            <Text style = {styles.infoText}>
                HOLD DOWN BUTTON FOR 3 SECONDS
            </Text>
            {isArmed? <Text> TO TURN OFF ALARM </Text> : <Text> TO TURN ON ALARM </Text>}
        
        </View>

    );
}

export default ActivationButton;