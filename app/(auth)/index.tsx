import { Button } from "@/components/StyledButton";
import { Heading1 } from "@/components/StyledText";
import { View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import Texts from "@/constants/Texts";
import { Link } from "expo-router";
import { ImageBackground, StyleSheet } from "react-native";

export default function Index() {
  return (
    <ImageBackground
      source={require("@/assets/images/background/AuthBack.webp")}
      // resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.container}>
        <Heading1 style={styles.title}>Let's Get Started</Heading1>
        <Link href={"/(auth)/register"} asChild>
          <Button textSize="l" style={styles.button}>
            Join Now
          </Button>
        </Link>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 64,
    paddingBottom: 20,
    backgroundColor: "transparent",
  },
  image: {
    flex: 1,
  },
  title: {
    fontSize: Texts.size["8xl"],
    color: Colors.light.text,
  },
  button: {
    width: "100%",
  },
});
