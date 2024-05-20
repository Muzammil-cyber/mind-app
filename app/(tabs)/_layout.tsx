import React from "react";
import { Link, Redirect, Tabs } from "expo-router";
import { Pressable, View } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useAuth } from "@/providers/AuthProvider";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome5>["name"];
  color: string;
}) {
  return <FontAwesome5 size={20} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { user, logout } = useAuth();

  if (!user) {
    return <Redirect href={"(auth)"} />;
  }

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
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 20,
                  marginRight: 10,
                }}
              >
                <Link
                  href="/add-task"
                  style={{
                    opacity: pressOpacity,
                  }}
                >
                  <FontAwesome
                    name="plus-square-o"
                    color={Colors[colorScheme ?? "light"].tint}
                    size={24}
                  />
                </Link>
                <Pressable onPress={logout} style={{ opacity: pressOpacity }}>
                  <FontAwesome
                    name="sign-out"
                    color={Colors[colorScheme ?? "light"].danger}
                    size={24}
                  />
                </Pressable>
              </View>
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
          headerRight: ({ pressOpacity }) => (
            <Link
              href={"(auth)"}
              style={{ opacity: pressOpacity, marginRight: 10 }}
            >
              <FontAwesome
                name="sign-out"
                color={Colors[colorScheme ?? "light"].danger}
                size={24}
              />
            </Link>
          ),
        }}
      />
    </Tabs>
  );
}
