import React, { useCallback, useContext, useMemo, useRef } from "react";
import { GestureResponderEvent, StyleSheet, Text, View } from "react-native";
import { Button, HStack, Icon, SafeArea, TextButton, VStack } from "../../components";
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
  // {
  //   "title" : "Step3",
  //   "kitchenware" : ["spoons"],
  //   "ingredients" : ["eggs"],
  //   "description" : "Scramble the egg with the spoon"
  // },
  // {
  //   "title" : "Step4",
  //   "kitchenware" : ["spoons"],
  //   "ingredients" : ["eggs"],
  //   "description" : "Scramble the egg with the spoon"
  // }
];

const StepComponent = ({ style: styles, theme, data, handlePresentModalPress }: any) => {
  return (
    <VStack
      align={"flex-start"}
      style={styles.stepComponentWrapper}
      m={5}
    >
      <HStack justifyContent="space-between">
        <Text style={styles.tasktitle}>{data.title}</Text>
        <Button style={styles.editbtn} onPress={() => handlePresentModalPress()}>
          <Icon color={theme.colors.highlight} name={"pencil"} />
        </Button>
      </HStack>
      <VStack p={10}>
        <HStack justifyContent="flex-start">
          <Text style={styles.itemHeader} >Kitchenware:</Text>
          {
              data.kitchenware.map((item : string, index : number)  => {
                  return <Text key={index}>{item}</Text>
              })
          }
        </HStack>
        <HStack justifyContent="flex-start">
          <Text style={styles.itemHeader} >Ingredients:</Text>
          {
              data.ingredients.map((item : string, index : number)  => {
                  return <Text key={index}>{item}</Text>
              })
          }
        </HStack>
        <HStack justifyContent="flex-start">
          <Text style={styles.itemHeader}>Description:</Text>
          <Text>{data.description}</Text>
        </HStack>
      </VStack>
    </VStack> 
  );
};

export const TaskBreakDownResultScreen = () => {
  const theme = useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ['50%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const onAccept = () =>{

  }

  const onCancel = () =>{
    
  }

  return (
    <BottomSheetModalProvider>
      <SafeArea>
        <VStack align="flex-start" justifyContent="flex-start" style={styles.container} pVH={{v: 20, h : 20}} gap={20}>
          <Text style={styles.title}>Original Task</Text>
          <VStack style={styles.orgtask}>
            <Text>Original Info here</Text>
          </VStack>
          <Text style={styles.title}>Steps</Text>
          <VStack flexMain={false}  gap={10} style={styles.listWrapper}>
            {DummyReturnedList.map((item: any, index: number) => {
              return <StepComponent key={index} style={styles} data={item} handlePresentModalPress={handlePresentModalPress} theme={theme} />;
            })}
          </VStack>
          <VStack gap={10}>
            <TextButton style={styles.acceptBtn} onPress={onAccept} title="Accept"/>
            <TextButton style={styles.cancelBtn} onPress={onCancel} title="Cancel" /> 
          </VStack>
        </VStack>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
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
      backgroundColor: theme.colors.background,
    },
    title: {
      ...TextStyle.h1,
      color: theme.colors.text,


    },
    tasktitle: {
      ...TextStyle.h2,
      padding: 10,
    },
    stepComponentWrapper: {
      backgroundColor: theme.colors.background2,
      flexGrow: 0,
      elevation: 5,
      borderRadius: 8
    },
    orgtask: {
      backgroundColor: theme.colors.background2,
      flexGrow: 0,
      elevation: 5,
      borderRadius: 8,
      height: 50
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
    },
    editbtn:{
       backgroundColor : theme.colors.background,
       padding: 10,
       borderRadius: 8,
    },
    acceptBtn:{
      ...ButtonStyle.primary,
      backgroundColor: theme.colors.primary

    },
    cancelBtn:{
      ...ButtonStyle.primary,
      backgroundColor: theme.colors.danger
    }
  });
