import { Modal, Text, TouchableOpacity, View, Pressable, Image} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

//Device activation button
import DeviceActivationButton from "./DeviceActivationButton";

//styles
import styles from "../../styles/deviceInfoModalStyles";
import selectHubStyles from "../../styles/selectHubStyles";
import globalStyles from "../../styles/globalStyles";
//logos
import cameraLogo from "../../../assets/photo-camera.png";
import doorLogo from "../../../assets/door.png";
import smokeLogo from "../../../assets/smoke.png";
import knockLogo from "../../../assets/hand.png";
import floodLogo from "../../../assets/flood.png";

function DeviceInfoModal(props){

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
      case "flooding":
        return <Image source={floodLogo} style={styles.logo} />;
    }
  }

  function displayInfo(item){
    return(
      <Text style = {styles.text}>
        <Text style = {styles.bold}>ID: </Text> {item.id + "\n"}
        <Text style = {styles.bold}>Status:</Text> {props.formatText(item.status)+ "\n"} 
        <Text style = {styles.bold}>Triggered:</Text> {props.formatText(item.triggered)+ "\n"}
        <Text style = {styles.bold}>Last Triggered:</Text> {item.triggered?"Triggered now! \n":props.formatDate(item.last_triggered)+ "\n"}
        {item.type === "camera"? 
        <><Text style = {styles.bold}>Last Snapshot:</Text> {props.formatDate(item.recent_snapshot.timestamp) +"\n"} </>
        : 
        <><Text style = {styles.bold}>Last Active:</Text> {item.status === "active" ? "Active now" :  props.formatDate(item.last_active)}</>
        }
        
      </Text>
    );
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
            {getLogo(props.item.type.toLowerCase())}
            <Text style = {styles.title}>
              Device: {props.formatText(props.item.type)} {props.item.type === "camera"? "": "sensor"}
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