import { Tabs } from "expo-router";
import { Platform, StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function TabsLayout() {
  return (
    <>
      <View style={{ zIndex: 9999 }}>
        <Toast />
      </View>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "lightgrey",
          tabBarStyle: {
            backgroundColor: "#2CCDB5",
            height: 70,
          },
          tabBarLabelStyle: {
            marginBottom: Platform.OS === "ios" ? -15 : 10,
            fontWeight: "600",
            color: "#fff",
            fontSize: 14,
          },
        }}
      >
        <Tabs.Screen
          name="rotinas"
          options={{
            title: "Rotinas",
            headerShown: false,
            tabBarIcon: ({ size, focused }) => (
              <Icon
                name={focused ? "calendar" : "calendar-outline"}
                style={styles.itemIcon}
                size={size}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="registros"
          options={{
            title: "Registros",
            headerShown: false,
            tabBarIcon: ({ size, focused }) => (
              <Icon
                name={focused ? "heart" : "heart-outline"}
                style={styles.itemIcon}
                size={size}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="forum"
          options={{
            title: "Forum",
            headerShown: false,
            tabBarIcon: ({ size, focused }) => (
              <Icon
                name={focused ? "message" : "message-outline"}
                style={styles.itemIcon}
                size={size}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="perfil"
          options={{
            title: "Perfil",
            headerShown: false,
            tabBarIcon: ({ size, focused }) => (
              <Icon
                name={focused ? "account" : "account-outline"}
                style={styles.itemIcon}
                size={size}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  itemIcon: {
    color: "#fff",
    marginTop: Platform.OS === "ios" ? 10 : 0,
    marginBottom: Platform.OS === "ios" ? 0 : -10,
  },
});
