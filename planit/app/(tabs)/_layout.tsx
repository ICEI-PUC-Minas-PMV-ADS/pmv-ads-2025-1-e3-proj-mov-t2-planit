import React from "react";
import { Tabs } from "expo-router";
import { Entypo, Ionicons, MaterialIcons, Octicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.principal,
        tabBarInactiveTintColor: Colors.iconNavDefault,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Calendario"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Entypo name="calendar" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Clientes"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Octicons name="people" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Serviços"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="home-repair-service"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Perfil"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
