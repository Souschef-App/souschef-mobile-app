import React, { useContext, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { SafeArea, VStack } from "../../components";
import { ThemeContext } from "../../contexts/AppContext";

import { ButtonStyle, TextStyle } from "../../styles";
import { Theme } from "../../styles";

const DummyReturnedList: any = ["Hello", "Hey", "Hi"];

const StepComponent = ({ style: styles }: any) => {
  return (
    <VStack
      justifyContent={"flex-start"}
      style={styles.stepComponentWrapper}
    >
      <Text style={styles.title}>Step Title</Text>
      <Text>Step Title</Text>
      <Text>Step Title</Text>
      <Text>Step Title</Text>
    </VStack>
  );
};

export const TaskBreakDownResultScreen = () => {
  const theme = useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);

  return (
    <SafeArea>
      <VStack>
        <Text style={styles.title}>Original Task</Text>
        <Text>Original Info here</Text>
        <Text style={styles.title}>Steps</Text>
        {DummyReturnedList.map((item: any, index: number) => {
          return <StepComponent key={index} style={styles} />;
        })}
      </VStack>
    </SafeArea>
  );
};

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    button: {
      ...ButtonStyle.primary,
      backgroundColor: theme.colors.primary,
      color: theme.colors.background,
    },
    container: {
      backgroundColor: theme.colors.background,
    },
    title: {
      ...TextStyle.header,
    },
    stepComponentWrapper: {
      backgroundColor: theme.colors.danger,
    },
  });
