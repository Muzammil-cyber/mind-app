//import liraries
import { TaskType } from "@/types/task";
import React, { useCallback } from "react";
import { Alert, StyleSheet } from "react-native";
import { Heading3 } from "./StyledText";
import { View, Text } from "./Themed";
import Colors from "@/constants/Colors";
import useTheme from "@/utils/useTheme";
import Texts from "@/constants/Texts";
import { Button } from "./StyledButton";
import { MaterialIcons } from "@expo/vector-icons";

// create a component
const TaskItem = ({ task }: { task: TaskType }) => {
  const DueAt = useCallback(() => {
    // When it is Due if -ve return overdue by in seconds/hours/days/months/year?
    const dueAt = new Date(task.dueAt.toDate());
    const now = new Date();
    let diff = dueAt.getTime() - now.getTime();
    const overdue = diff < 0 ? "overdue" : "remaining";
    diff = Math.abs(diff);
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);
    if (years > 0) {
      return `${years} year${years > 1 ? "s" : ""} ${overdue}`;
    }
    if (months > 0) {
      return `${months} month${months > 1 ? "s" : ""} ${overdue}`;
    }
    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ${overdue}`;
    }
    if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ${overdue}`;
    }
    if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ${overdue}`;
    }
    return `${seconds} second${seconds > 1 ? "s" : ""} ${overdue}`;
  }, [task.dueAt]);

  const priorityColor =
    task.priority === "HIGH"
      ? Colors.light.danger
      : task.priority === "MEDIUM"
      ? Colors.light.warning
      : Colors.light.success;

  const deleteTask = () => {
    Alert.alert("Deleting Task", "Are you sure you want to delete?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          // Delete Task
        },
      },
    ]);
  };
  const completeTask = () => {};

  const theme = useTheme();
  return (
    <View
      style={[
        styles.container,
        { borderColor: Colors[theme].text, borderStartColor: priorityColor },
      ]}
    >
      <View style={styles.contentContainer}>
        <Heading3>{task.title}</Heading3>
        <Text style={{ fontFamily: Texts.font.medium }}>
          {task.description}
        </Text>
        {!task.completed && (
          <Text style={{ fontFamily: Texts.font.regularItalic }}>
            {DueAt()}
          </Text>
        )}
      </View>
      <View style={styles.btnContainer}>
        {task.completed ? (
          <Button variant="danger" outlined onPress={deleteTask}>
            <MaterialIcons
              name="delete-forever"
              size={24}
              color={Colors.light.danger}
            />
          </Button>
        ) : (
          <Button variant="success" outlined onPress={completeTask}>
            <MaterialIcons
              name="check"
              size={24}
              color={Colors.light.success}
            />
          </Button>
        )}
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    // alignSelf: "stretch",
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderStartWidth: 10,
  },
  contentContainer: {
    flex: 1,
  },
  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});


export default TaskItem;
