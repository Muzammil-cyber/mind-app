import { Text, TextInput, View } from "@/components/Themed";
import { ImageBackground, StyleSheet } from "react-native";

export default function Register() {
  return (
    <ImageBackground
      source={require("@/assets/images/background/ffflurry.webp")}
      style={styles.container}
    >
      <TextInput />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
