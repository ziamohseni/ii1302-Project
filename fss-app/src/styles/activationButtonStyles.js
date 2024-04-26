import { StyleSheet } from "react-native";

const activationButtonStyles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: "black",
        borderRadius: 100,
    },
    buttonOn:{
        backgroundColor: "green",
        borderRadius: 50,
    },
    buttonOff: {
        backgroundColor: "red",
        borderRadius: 50,
    },
    alarmStatusText: {
        fontSize: 30, 
        fontWeight: "bold",
    },
});

export default activationButtonStyles;