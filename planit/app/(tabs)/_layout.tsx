import React from "react";
import { Tabs } from "expo-router";
import { Entypo, Ionicons, MaterialIcons, Octicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";

const _layout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={16} color={Colors.principal} />
          ),
        }}
      />
      <Tabs.Screen
        name="Calendário"
        options={{
          title: "Calendário",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Entypo name="calendar" size={16} color={Colors.iconNavDefault} />
          ),
        }}
      />
      <Tabs.Screen
        name="Clientes"
        options={{
          title: "Clientes",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Octicons name="people" size={16} color={Colors.iconNavDefault} />
          ),
        }}
      />
      <Tabs.Screen
        name="Serviços"
        options={{
          title: "Serviços",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="home-repair-service"
              size={16}
              color={Colors.iconNavDefault}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Perfil"
        options={{
          title: "Perfil",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="person-outline"
              size={16}
              color={Colors.iconNavDefault}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
