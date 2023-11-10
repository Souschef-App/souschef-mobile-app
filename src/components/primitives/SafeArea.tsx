import React, { useContext, type PropsWithChildren } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";

import { StatusBar } from "expo-status-bar";
import { ColorValue } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "../../contexts/AppContext";

export interface ISafeAreaProps {
  backgroundColor?: ColorValue;
  statusStyle?: "dark" | "light";
  children?: React.ReactNode;
}

export type SafeAreaProps = ISafeAreaProps;

const SafeArea: React.FC<PropsWithChildren<SafeAreaProps>> = (
  props: ISafeAreaProps
) => {
  const theme = useContext(ThemeContext);

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
      }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar style={props.statusStyle || "dark"} />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: props.backgroundColor || theme.colors.background,
        }}
      >
        {props.children}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SafeArea;
