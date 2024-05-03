import React from "react";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome5>["name"];
  color: string;
}) {
  return <FontAwesome5 size={20} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "In Progress",
          tabBarIcon: ({ color }) => <TabBarIcon name="tasks" color={color} />,
          headerRight: ({ pressOpacity }) => {
            return (
              <Link
                href="/add-task"
                style={{
                  marginRight: 20,
                  opacity: pressOpacity,
                }}
              >
                <FontAwesome
                  name="plus-square-o"
                  color={Colors[colorScheme ?? "light"].text}
                  size={24}
                />
              </Link>
            );
          },
        }}
      />
      <Tabs.Screen
        name="completed"
        options={{
          title: "Completed",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="check-circle" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
