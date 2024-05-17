import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import { Heading2, TextInput } from "@/components/StyledText";
import DateTimePicker from "react-native-ui-datepicker";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useState } from "react";
import { Button } from "@/components/StyledButton";

export default function ModalScreen() {
  const colorScheme = useColorScheme();
  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    console.log("Data", {
      title,
      description,
      date,
    });
  };

  return (
    <View style={styles.container}>
      <Heading2>Add your Task here</Heading2>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <TextInput
        label="Title"
        placeholder="Task Name"
        onChangeText={setTitle}
        value={title}
      />
      <TextInput
        label="Description"
        placeholder="Task Description"
        onChangeText={setDescription}
        value={description}
      />
      <View
        style={{
          ...styles.dateContainer,
          borderColor:
            Colors[colorScheme === "dark" ? "light" : "dark"].background,
        }}
      >
        <DateTimePicker
          mode="single"
          displayFullDays
          date={date}
          // @ts-ignore
          onChange={(p) => setDate(p?.date)}
        />
      </View>
      <Button style={styles.submitBtn} onPress={handleSubmit}>
        Add Task
      </Button>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: "80%",
  },
  dateContainer: {
    backgroundColor: Colors.light.background,

    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
  },
  submitBtn: {
    marginTop: 20,
    width: "100%",
  },
});
