import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#362323",
        },
        tabBarActiveTintColor: "#a39b9b",
        tabBarInactiveTintColor: "#6f6868",
        headerShown: true,
        headerStyle: {
          backgroundColor: "#362323",
          borderBottomColor: "#a39b9b",
          borderBottomWidth: 1,
        },
        headerTintColor: "#a39b9b",
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: "MetalMania",
          fontSize: 24,
        },
      }}
    >
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-circle-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="find-musicians"
        options={{
          title: "Musicians",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-group-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="ads"
        options={{
          title: "Ads",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="bullhorn-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
