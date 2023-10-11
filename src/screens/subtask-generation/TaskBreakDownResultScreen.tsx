import React, { useContext, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { HStack, SafeArea, VStack } from "../../components";
import { ThemeContext } from "../../contexts/AppContext";

import { ButtonStyle, TextStyle } from "../../styles";
import { Theme } from "../../styles";

const DummyReturnedList: any = [
  {
    "kitchenware" : ["spoons"],
    "ingredients" : ["eggs"],
    "description" : "Scramble the egg with the spoon"
  },   
  {
    "kitchenware" : ["spoons"],
    "ingredients" : ["eggs"],
    "description" : "Scramble the egg with the spoon"
  },
  {
    "kitchenware" : ["spoons"],
    "ingredients" : ["eggs"],
    "description" : "Scramble the egg with the spoon"
  },
  {
    "kitchenware" : ["spoons"],
    "ingredients" : ["eggs"],
    "description" : "Scramble the egg with the spoon"
  }];

const StepComponent = ({ style: styles, data }: any) => {
  return (
    <VStack
      align={"flex-start"}
      style={styles.stepComponentWrapper}
      p={5}
    >
      <Text style={styles.title}>Step Title</Text>
      <Text style={styles.item} >Kitchenware: {data.kitchenware}</Text>
      <Text>Ingredients: {data.ingredients}</Text>
      <Text>Description: {data.description}</Text>
    </VStack>
  );
};

export const TaskBreakDownResultScreen = () => {
  const theme = useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);

  return (
    <SafeArea>
      <VStack gap={15}>
        <Text style={styles.title}>Original Task</Text>
        <Text>Original Info here</Text>
        <Text style={styles.title}>Steps</Text>
        {DummyReturnedList.map((item: any, index: number) => {
          return <StepComponent key={index} style={styles} data={item} />;
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
      ...TextStyle.h1,
    },
    stepComponentWrapper: {
      backgroundColor: theme.colors.danger,
      height: 120,
      flexGrow: 0
    },
    item: {
      margin: 0,
      padding: 0,
      backgroundColor: "#ff0000",
      flexGrow: 0
    }
  });
