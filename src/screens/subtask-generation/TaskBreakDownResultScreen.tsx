import React, { useCallback, useContext, useMemo, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, HStack, Icon, SafeArea, VStack } from "../../components";
import { ThemeContext } from "../../contexts/AppContext";

import { ButtonStyle, TextStyle } from "../../styles";
import { Theme } from "../../styles";
import BottomSheet, { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";

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

const StepComponent = ({ style: styles, data, handlePresentModalPress }: any) => {
  return (
    <VStack
      align={"flex-start"}
      style={styles.stepComponentWrapper}
      p={5}
      m={5}
    >
      <HStack justifyContent="flex-start">
        <Text style={styles.tasktitle}>{data.title}</Text>
        <Button onPress={() => handlePresentModalPress()}>
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

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ['25%', '50%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);


  return (
    <BottomSheetModalProvider>
      <SafeArea>
        <VStack style={styles.container} pVH={{v: 0, h : 20}}>
          <Text style={styles.title}>Original Task</Text>
          <Text>Original Info here</Text>
          <Text style={styles.title}>Steps</Text>
          <VStack  gap={10} style={styles.listWrapper}>
            {DummyReturnedList.map((item: any, index: number) => {
              return <StepComponent key={index} style={styles} data={item} handlePresentModalPress={handlePresentModalPress} />;
            })}
          </VStack>
        </VStack>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <View style={styles.contentContainer}>
            <Text>Awesome 🎉</Text>
          </View>
        </BottomSheetModal>
      </SafeArea>
    </BottomSheetModalProvider>
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
      backgroundColor: theme.colors.highlight,
    },
    title: {
      ...TextStyle.h1,
      color: theme.colors.background,
      width: 330
    },
    tasktitle: {
      ...TextStyle.h2,
      width: 330
    },
    stepComponentWrapper: {
      backgroundColor: theme.colors.background2,
      height: 130,
      flexGrow: 0,
      elevation: 5,
      borderRadius: 8
    },
    itemHeader: {
      margin: 0,
      padding: 0,
      flexGrow: 0,
      ...TextStyle.body,
      fontWeight: "bold"
    },
    contentContainer: {
      flex: 1,
      alignItems: 'center',
    },
    listWrapper: {
      // backgroundColor: theme.colors.background,
      flexGrow: 0,
    }
  });
