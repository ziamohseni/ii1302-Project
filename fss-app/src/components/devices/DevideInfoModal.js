import { Modal, Text, TouchableOpacity, View } from "react-native";


function DeviceInfoModal(props){
    console.log(props.item)
    function formatDate(timestamp){
        let date = new Date(timestamp * 1000);
        return date.toLocaleString();
    }

    return (
        <Modal
        animationType="fade"
        transparent={false}
        visible={props.isModalVisible}>
    
        
        <View style = {{alignItems: "center"}}>

          <Text>
            Device: {props.item.type}
          </Text>
          <Text>
            Status: {props.item.status}
          </Text>
          <Text>
            last_active: {formatDate(props.item.last_active)}
          </Text>

            <TouchableOpacity onPress = {props.closeModal}>
                <Text>back</Text>
            </TouchableOpacity>

        </View>
        
      </Modal>
    );
}

export default DeviceInfoModal;