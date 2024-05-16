import { TaskType } from "@/types/task";
import { Text, View } from "./Themed";
import { Heading3 } from "./StyledText";
import { StyleSheet } from "react-native";
import useTheme from "@/utils/useTheme";
import Colors from "@/constants/Colors";

export default function TaskOverview({ task }: { task: TaskType }) {
  const theme = useTheme();
  const priorityColor =
    task.priority === "LOW"
      ? Colors[theme].success
      : task.priority === "MEDIUM"
      ? Colors[theme].warning
      : Colors[theme].danger;
  return (
    <View
      style={[
        {
          borderColor: Colors[theme].text,
          borderStartColor: priorityColor,
        },
        styles.container,
      ]}
    >
      <Heading3>{task.title}</Heading3>
      <Text>{task.description}</Text>
      <Text>Due: {task.dueAt.toDateString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingLeft: 10,
    // marginVertical: 5,
    borderWidth: StyleSheet.hairlineWidth,
    // borderRadius: 10,
    borderLeftWidth: 10,
  },
});
