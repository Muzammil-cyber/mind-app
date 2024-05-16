import { FlatList, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Tasks } from "@/assets/data/task";
import TaskItem from "@/components/TaskItem";
import { TaskType } from "@/types/task";
import { Heading2 } from "@/components/StyledText";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Colors from "@/constants/Colors";
import useTheme from "@/utils/useTheme";

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
  const filteredTask: TaskType[] | null = Tasks.filter(
    (task) => !task.completed
  );
  const theme = useTheme();
  return (
    <View style={styles.container}>
      {filteredTask ? (
        <FlatList
          data={filteredTask}
          renderItem={({ item }) => <TaskItem task={item} />}
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
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons
            name="progress-alert"
            size={50}
            color={Colors[theme].tabIconSelected}
          />
          <Heading2 style={styles.emptyTitle}>No Task in Progress</Heading2>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});
