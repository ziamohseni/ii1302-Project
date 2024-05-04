import { Modal, Text, TouchableOpacity, View, Pressable, Image} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

//Device activation button
import DeviceActivationButton from "./DeviceActivationButton";

//styles
import styles from "../../styles/deviceInfoModalStyles";
import selectHubStyles from "../../styles/selectHubStyles";
import globalStyles from "../../styles/globalStyles";

//logos
import cameraLogo from "../../../assets/camera.png";
import doorLogo from "../../../assets/door.png";
import smokeLogo from "../../../assets/smoke.png";
import knockLogo from "../../../assets/hand.png";

function DeviceInfoModal(props){
  console.log(props.item)
  function formatDate(timestamp){
    let date = new Date(timestamp * 1000);
    return date.toLocaleString();
  }

  function getLogo(type) {
    switch (type) {
      case "camera":
        return <Image source={cameraLogo} style={styles.logo} />;
      case "door":
        return <Image source={doorLogo} style={styles.logo} />;
      case "smoke":
        return <Image source={smokeLogo} style={styles.logo} />;
      case "knock":
        return <Image source={knockLogo} style={styles.logo} />;
    }
  }

  function displayInfo(item){
    return(
      <Text style = {styles.text}>
        <Text style = {styles.bold}>Status:</Text> {formatText(props.item.status)+ "\n"} 
        <Text style = {styles.bold}>Triggered:</Text> {formatText(props.item.triggered)+ "\n"}
        {item.type === "camera"? 
        <><Text style = {styles.bold}>Last Snapshot:</Text> {formatDate(props.item.recent_snapshot.timestamp)} </>
        : 
        <><Text style = {styles.bold}>Last Active:</Text> {formatDate(props.item.last_active)}</>
        }
        
      </Text>
    );
  }

  function formatText(string){
    if (typeof string === 'boolean') {
      string = string.toString();
    }
    if(typeof string !== 'string'){
      return "Not a String";
    }
    const formattedText = string.charAt(0).toUpperCase() + string.substring(1, string.length);
    return formattedText;
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.isModalVisible}
      onRequestClose={() => {
        props.closeModal;
      }}>
      
      <View style = {selectHubStyles.centeredView}>
        <View style = {selectHubStyles.modalView}>

          <View style = {styles.deviceContainer}>
            {getLogo(props.item.type)}
            <Text style = {styles.title}>
              Device: {props.item.type === "camera"? props.item.type : props.item.type + " sensor"}
            </Text>
          </View>

          {displayInfo(props.item)}
          
          <DeviceActivationButton item = {props.item}/>

        </View>

        <Pressable
          style={selectHubStyles.selectHubCloseButton}
          onPress={props.closeModal}
        >
          <Ionicons
            name="close-outline"
            size={36}
            color={globalStyles.darkColor.color}
          />
        </Pressable>
        
      </View>
      
    </Modal>
  );
}

export default DeviceInfoModal;