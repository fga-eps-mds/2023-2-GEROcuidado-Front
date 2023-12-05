import React, { useEffect, useRef } from "react";
import { Stack } from "expo-router";
import * as Notifications from "expo-notifications";
import { View } from "react-native";
import Toast from "react-native-toast-message";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function AppLayout() {
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current as Notifications.Subscription,
      );
      Notifications.removeNotificationSubscription(
        responseListener.current as Notifications.Subscription,
      );
    };
  }, []);

  return (
    <>
      <View style={{ zIndex: 9999 }}>
        <Toast />
      </View>
      <Stack
        screenOptions={{
          header: () => <View style={{ height: 40 }} />,
        }}
      />
    </>
  );
}
