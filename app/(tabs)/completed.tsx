import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";

import TaskItem from "@/components/TaskItem";

import { Heading2 } from "@/components/StyledText";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

import { useTaskListCompleted } from "@/api/tasks";
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

export default function TabTwoScreen() {
  const { data: filteredTask, isLoading, error } = useTaskListCompleted();
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
        <Center>
          <MaterialIcons
            name="incomplete-circle"
            size={50}
            color={Colors[theme].tabIconSelected}
          />
          <Heading2 style={styles.emptyTitle}>No Task Completed</Heading2>
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
