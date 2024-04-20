import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

// Styles
import globalStyles from "../../styles/globalStyles";

const ActivityIndicatorComponent = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={globalStyles.primaryColor.color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ActivityIndicatorComponent;
