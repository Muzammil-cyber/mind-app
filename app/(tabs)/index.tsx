import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
} from "react-native";
import { Text, View } from "@/components/Themed";
import TaskItem from "@/components/TaskItem";
import { TaskType } from "@/types/task";
import { Heading2 } from "@/components/StyledText";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Colors from "@/constants/Colors";
import { useTaskListCompleted, useTaskListUncompleted } from "@/api/tasks";
import Center from "@/components/Center";
import { useColorScheme } from "@/components/useColorScheme";

const FOOTER_KEY = [
  {
    id: 1,
    title: "HIGH",
    color: Colors.light.danger,
  },
  {
    id: 2,
    title: "MEDIUM",
    color: Colors.light.warning,
  },
  {
    id: 3,
    title: "LOW",
    color: Colors.light.success,
  },
];

export default function TabOneScreen() {
  const { isLoading, data: Tasks = [], error } = useTaskListUncompleted();
  const filteredTask: TaskType[] | null = Tasks.filter(
    (task) => !task.completed
  );
  const theme = useColorScheme() ?? "light";
  if (isLoading) {
    return (
      <Center>
        <Heading2>
          <ActivityIndicator size={"small"} style={{ marginRight: 20 }} />
          Loading...
        </Heading2>
      </Center>
    );
  }
  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      {filteredTask && filteredTask.length > 0 ? (
        <FlatList
          data={filteredTask}
          renderItem={({ item }: { item: TaskType }) => (
            <TaskItem task={item} />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ gap: 10 }}
          ListFooterComponent={() => (
            <View style={styles.footer}>
              {FOOTER_KEY.map((key) => (
                <Text key={key.id} style={{ color: key.color }}>
                  {key.title}
                </Text>
              ))}
            </View>
          )}
        />
      ) : (
        <Center>
          <MaterialCommunityIcons
            name="progress-alert"
            size={50}
            color={Colors[theme].tabIconSelected}
          />
          <Heading2 style={styles.emptyTitle}>No Task in Progress</Heading2>
        </Center>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  footer: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    height: "100%",
    paddingBottom: 10,
  },
  emptyTitle: {
    alignSelf: "center",
    marginTop: 20,
  },
});
