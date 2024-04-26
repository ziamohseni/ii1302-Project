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

        <>
        
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
        
        </>
    );
}

export default ActivationButton;