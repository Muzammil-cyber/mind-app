//import liraries
import { TaskType } from "@/types/task";
import React, { Component, useCallback } from "react";
import { StyleSheet } from "react-native";
import { Heading3 } from "./StyledText";
import { View, Text } from "./Themed";
import Colors from "@/constants/Colors";
import useTheme from "@/utils/useTheme";
import Texts from "@/constants/Texts";

// create a component
const TaskItem = ({ task }: { task: TaskType }) => {
  const DueAt = useCallback(() => {
    // When it is Due if -ve return overdue by?
    const dueAt = new Date(task.dueAt);
    const now = new Date();
    const diff = dueAt.getTime() - now.getTime();
    const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
    if (diffDays < 0) {
      return `Overdue by ${Math.abs(diffDays)} days`;
    }
    if (diffDays === 0) {
      return "Due Today";
    }
    return `Due in ${diffDays} days`;
  }, [task.dueAt]);

  const priorityColor =
    task.priority === "HIGH"
      ? Colors.light.danger
      : task.priority === "MEDIUM"
      ? Colors.light.warning
      : Colors.light.success;

  const theme = useTheme();
  return (
    <View
      style={[
        styles.container,
        { borderColor: Colors[theme].text, borderStartColor: priorityColor },
      ]}
    >
      <Heading3>{task.title}</Heading3>
      <Text style={{ fontFamily: Texts.font.medium }}>{task.description}</Text>
      <Text style={{ fontFamily: Texts.font.regularItalic }}>{DueAt()}</Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignSelf: "stretch",
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderStartWidth: 10,
  },
});

//make this component available to the app
export default TaskItem;
