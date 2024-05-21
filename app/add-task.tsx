import { StatusBar } from "expo-status-bar";
import { Platform, Dimensions, StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import { Heading2, Label, TextInput } from "@/components/StyledText";
import DateTimePicker from "@react-native-community/datetimepicker";
import Colors from "@/constants/Colors";
import { useState } from "react";
import { Button } from "@/components/StyledButton";
import { useTaskCreate } from "@/api/tasks";
import { Timestamp } from "firebase/firestore";
import { auth } from "@/utils/firebase.config";
import { TaskType } from "@/types/task";
import { Picker } from "@react-native-picker/picker";
import Texts from "@/constants/Texts";
import Toast from "react-native-toast-message";
import { useNavigation } from "expo-router";

export default function ModalScreen() {
  const { mutate: createTask, isPending } = useTaskCreate();
  const navigate = useNavigation();
  const { height } = Dimensions.get("window");

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskType["priority"]>("LOW");
  const [showDatePicker, setShowDatePicker] = useState<boolean>();
  const [showTimePicker, setShowTimePicker] = useState<boolean>();

  const validate = () => {
    let isValid = true;
    if (title === "") {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Title is required",
      });
      isValid = false;
    }
    if (description === "") {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Description is required",
      });
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = () => {
    if (!validate()) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please fill all fields",
      });
      return;
    }
    createTask(
      {
        title,
        description,
        dueAt: Timestamp.fromDate(
          new Date(date.setHours(time.getHours(), time.getMinutes(),0))
        ),
        madeBy: auth.currentUser?.uid ?? "",
        completed: false,
        priority,
      },
      {
        onSuccess: () => {
          Toast.show({
            type: "success",
            text1: "Task Created",
            text2: "Task has been created successfully",
          });
          navigate.goBack();
        },
        onError: (error) =>
          Toast.show({
            type: "error",
            text1: "Error",
            text2: error.message,
          }),
      }
    );
  };

  return (
    <View style={[styles.container, { height }]}>
      <Heading2 style={{ alignSelf: "center" }}>Add your Task here</Heading2>
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
      <>
        <Label style={styles.pickerTitle}>Priority</Label>
        <View style={styles.picker}>
          <Picker
            selectedValue={priority}
            onValueChange={(itemValue, itemIndex) => setPriority(itemValue)}
          >
            <Picker.Item label="High" value="HIGH" />
            <Picker.Item label="Medium" value="MEDIUM" />
            <Picker.Item label="Low" value="LOW" />
          </Picker>
        </View>
      </>

      <TextInput
        label="Due Date"
        value={date.toDateString()}
        onPress={() => setShowDatePicker(true)}
        caretHidden
        disableFullscreenUI
      />
      {showDatePicker && (
        <DateTimePicker
          mode="date"
          value={date}
          onChange={(_, date) => {
            setDate(date ?? new Date());
            setShowDatePicker(false);
            return;
          }}
        />
      )}
      <TextInput
        label="Due Time"
        value={time.toTimeString()}
        onPress={() => setShowTimePicker(true)}
        disableFullscreenUI
        caretHidden
      />
      {showTimePicker && (
        <DateTimePicker
          mode="time"
          value={time}
          onChange={(_, time) => {
            setTime(new Date(time ?? new Date()));
            setShowTimePicker(false);
            return;
          }}
        />
      )}

      <Button
        style={styles.submitBtn}
        onPress={handleSubmit}
        disabled={isPending}
      >
        {isPending ? "Please Wait..." : "Add Task"}
      </Button>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: "80%",
    alignSelf: "center",
  },
  pickerTitle: {
    fontSize: 16,
    fontFamily: Texts.font.medium,
    alignSelf: "flex-start",
    marginBottom: 5,
  },
  picker: {
    width: "100%",
    borderWidth: 1,
    borderColor: "gray",
    backgroundColor: "white",
    borderRadius: 5,
    marginBottom: 10,
    fontFamily: Texts.font.regular,
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
