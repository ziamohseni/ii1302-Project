import { useState } from "react";
import { TouchableOpacity, View, Text, Vibration} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

// Contexts
import { useRaspberryHubs } from "../../contexts/RaspberryHubsContext";

//styles
import styles from "../../styles/deviceInfoModalStyles"
import globalStyles from "../../styles/globalStyles";

function DeviceActivationButton(props){
    const [isDeviceOn, setIsDeviceOn] = useState(props.item.status === "active"); //temporary
    const [buttonPressTimer, setButtonPressTimer] = useState(null);
    const { toggleDeviceStatus } = useRaspberryHubs();
    
    function handlePressIn(){
        const timer = setTimeout(() => {
            setIsDeviceOn(!isDeviceOn);
            toggleDeviceStatus(props.item.id);
            Vibration.vibrate(100);
          }, 3000);
          setButtonPressTimer(timer);
    };

    function handlePressOut(){
        if (buttonPressTimer) {
            clearTimeout(buttonPressTimer);
            setButtonPressTimer(null);
        }
    };

    return(

        <View  style={styles.buttonContainer}>

            {isDeviceOn?
            <Text style = {styles.activationText}>Device is Active</Text>
            :
            <Text style = {styles.activationText}>Device is Inactive</Text>
            }
            
            <TouchableOpacity
                style={[
                    isDeviceOn ? styles.buttonOn : styles.buttonOff,
                    globalStyles.shadow,
                ]}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                delayLongPress={3000}
                >
                <Ionicons name="power" size={60} color={"white"} />
            </TouchableOpacity>

            <Text style = {styles.infoText}>Hold down button for 3 seconds to turn {isDeviceOn? "off" : "on"} device</Text>
        </View>  
    );
}

export default DeviceActivationButton