import { Tabs } from "expo-router";
import { Platform, StyleSheet, Text, View } from "react-native";
import Toast from 'react-native-toast-message';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const IOSTabBarLabelStyle = { marginBottom: -15 }
const ANDROIDTabBarLabelStyle = {}
const selectedTabBarLabelStyle = Platform.OS == 'ios' ? IOSTabBarLabelStyle : ANDROIDTabBarLabelStyle

export default function TabsLayout() {
  return (
    <>
      <View style={{ zIndex: 9999 }}>
        <Toast />
      </View>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: 'lightgrey',
          tabBarStyle: {
            backgroundColor: '#2CCDB5',
            height: 70,
          },
          tabBarLabelStyle: { 
            ...selectedTabBarLabelStyle,
            fontWeight: '600',
            color: '#fff',
            fontSize: 14
          },
        }}
      >
        <Tabs.Screen
          name="rotinas"
          options={{
            title: "Rotinas",
            headerShown: false,
            tabBarIcon: ({ size, focused }) => (
              <View style={styles.item}>
                <Icon name={focused ? "calendar" : "calendar-outline"} style={styles.itemIcon} size={size} />
                {/* <Text style={styles.itemText}>Rotinas</Text> */}
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="registros"
          options={{
            title: "Registros",
            headerShown: false,
            tabBarIcon: ({ size, focused }) => (
              <View style={styles.item}>
                <Icon name={focused ? "heart" : "heart-outline"} style={styles.itemIcon} size={size} />
                {/* <Text style={styles.itemText}>Registros</Text> */}
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="forum"
          options={{
            title: "Forum",
            headerShown: false,
            tabBarIcon: ({ size, focused }) => (
              <View style={styles.item}>
                <Icon name={focused ? "message" : "message-outline"} style={styles.itemIcon} size={size} />
                {/* <Text style={styles.itemText}>Forum</Text> */}
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="perfil"
          options={{
            title: "Perfil",
            headerShown: false,
            tabBarIcon: ({ size, focused }) => (
              <View style={styles.item}>
                <Icon name={focused ? "account" : "account-outline"} style={styles.itemIcon} size={size} />
                {/* <Text style={styles.itemText}>Perfil</Text> */}
              </View>
            ),
          }}
        />
      </Tabs>
    </>
  )
}

const styles = StyleSheet.create({
  item: { flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
  itemText: { marginTop: 3, fontWeight: '600', color: '#fff' },
  itemIcon: { color: "#fff", marginTop: 10, zIndex: 1 }
})
