//import liraries

import { StyleSheet, ViewProps } from "react-native";
import { View } from "./Themed";
import { PropsWithChildren } from "react";

interface CenterPropType {
  children: React.ReactNode;
  style?: ViewProps["style"];
}

// create a component
const Center = ({ children, style }: CenterPropType) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});

//make this component available to the app
export default Center;
