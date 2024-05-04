import { Button } from "@/components/StyledButton";
import { Heading1, Heading2, Heading3, Label } from "@/components/StyledText";
import { Text, View } from "@/components/Themed";
import { StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text>Index</Text>
      <Label>Label</Label>
      <Heading1>H1</Heading1>
      <Heading2>H2</Heading2>
      <Heading3>H3</Heading3>
      <Button variant="danger" onPress={() => console.log("Clicked")}>
        Hello
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
