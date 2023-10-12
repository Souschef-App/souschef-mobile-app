import React, { useContext } from "react";
import { StyleSheet, Text } from "react-native";
import { Button, HStack, Icon, SafeArea, VStack } from "../../components";
import { ThemeContext } from "../../contexts/AppContext";

import { ButtonStyle, TextStyle } from "../../styles";
import { Theme } from "../../styles";

const DummyReturnedList: any = [
  {
    "title" : "Step1",
    "kitchenware" : ["spoons"],
    "ingredients" : ["eggs"],
    "description" : "Scramble the egg with the spoon"
  },   
  {
    "title" : "Step2",
    "kitchenware" : ["spoons"],
    "ingredients" : ["eggs"],
    "description" : "Scramble the egg with the spoon"
  },
  {
    "title" : "Step3",
    "kitchenware" : ["spoons"],
    "ingredients" : ["eggs"],
    "description" : "Scramble the egg with the spoon"
  },
  {
    "title" : "Step4",
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
      <HStack justifyContent="flex-start">
        <Text style={styles.title}>{data.title}</Text>
        <Button onPress={() => {}}>
         <Icon name={"pencil"} />

        </Button>
      </HStack>
      <HStack justifyContent="flex-start">
         <Text style={styles.itemHeader} >Kitchenware:</Text>
        {
            data.kitchenware.map((item : string)  => {
                return <Text>{item}</Text>
            })
        }
      </HStack>
      <HStack justifyContent="flex-start">
         <Text style={styles.itemHeader} >Ingredients:</Text>
        {
            data.ingredients.map((item : string)  => {
                return <Text>{item}</Text>
            })
        }
      </HStack>
      <HStack justifyContent="flex-start">
        <Text style={styles.itemHeader}>Description:</Text>
        <Text>{data.description}</Text>
      </HStack>
    </VStack> 
  );
};

export const TaskBreakDownResultScreen = () => {
  const theme = useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);

  return (
    <SafeArea>
      <VStack gap={10} pVH={{v: 0, h : 20}}>
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
      ...TextStyle.h2,
      width: 330
    },
    stepComponentWrapper: {
      backgroundColor: theme.colors.background2,
      height: 120,
      flexGrow: 0
    },
    itemHeader: {
      margin: 0,
      padding: 0,
      flexGrow: 0,
      ...TextStyle.body,
      fontWeight: "bold"
    },
  });
