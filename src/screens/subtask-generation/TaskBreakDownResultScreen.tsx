import React, { useCallback, useContext, useMemo, useRef, useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, HStack, Icon, Input, SafeArea, TextButton, VStack } from "../../components";
import { ThemeContext } from "../../contexts/AppContext";

import { ButtonStyle, InputStyle, TextStyle } from "../../styles";
import { Theme } from "../../styles";
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { ScrollView } from "react-native-gesture-handler";
import useStore from "../../data/store";
import { RecipeStep } from "../../data/types/recipeStep";
import { useFocusEffect } from "@react-navigation/native";

interface StepComponentProp {
  styles : any,
  theme : any,
  data : RecipeStep,
  handlePresentModalPress: (id : number) => void
}

const StepComponent = ({ styles, theme, data, handlePresentModalPress }: StepComponentProp) => {

  useEffect(()=>{
    console.log("DATA " + JSON.stringify(data))
  },[])

  return (
    <VStack
      align={"flex-start"}
      style={styles.stepComponentWrapper}
      m={5}
    >
      <HStack justifyContent="space-between">
        <Text style={styles.tasktitle}>{data.Title}</Text>
        <Button style={styles.editbtn} onPress={() => handlePresentModalPress(data.ID)}>
          <Icon color={theme.colors.highlight} name={"pencil"} />
        </Button>
      </HStack>
      <Text>Description: {data.Description}</Text>
      <VStack pVH={{v: 0, h : 10}}>
        <HStack justifyContent="flex-start">
          <Text style={styles.itemHeader} >Kitchenware:</Text>
          {
              data.Kitchenware?.map((item : string, index : number)  => {
                  return <Text key={index}>{item}, </Text>
              })
          }
        </HStack>
        <HStack justifyContent="flex-start">
          <Text style={styles.itemHeader}>Ingredients:</Text>
          {
              data.Ingredients?.map((item : string, index : number)  => {
                  return <Text key={index}>{item}, </Text>
              })
          }
        </HStack>
      </VStack>
    </VStack> 
  );
};

export const TaskBreakDownResultScreen = () => {
  const theme = useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);

  const brokenDownRecipe = useStore((state) => state.brokenDownRecipe);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ['50%'], []);

  const [ingredients, setIngredients] = useState<string>("")
  const [kitchenware, setKitchenware] = useState<string>("")
  const [description, setDescription] = useState<string>("")

  // callbacks
  const handlePresentModalPress = useCallback((ID : number) => {
    bottomSheetModalRef.current?.present();

    if(brokenDownRecipe == null)
      return

    const step = brokenDownRecipe![ID]

    const getString = (array : string[]) =>{
      let string = ""
      array?.map(item =>{
        string += `${item},`
      })
      return string
    }

    setIngredients(getString(step.Ingredients));
    setKitchenware(getString(step.Kitchenware));
    setDescription(step.Description);
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
        <VStack 
          align="flex-start" 
          justifyContent="flex-start" 
          style={styles.container} 
          pVH={{v: 20, h : 20}} 
          gap={0}>

          <Text style={styles.title}>Steps</Text>
          <ScrollView style={styles.listWrapper}>
            {brokenDownRecipe?.map((item: any, index: number) => {
              return <StepComponent key={index} styles={styles} data={item} handlePresentModalPress={handlePresentModalPress} theme={theme} />;
            })}
          </ScrollView>
          <VStack gap={10} >
            <TextButton style={styles.acceptBtn} textStyle={styles.textButton} onPress={onAccept} title="Save"/>
            <TextButton style={styles.cancelBtn} textStyle={styles.textButton} onPress={onCancel} title="Cancel" /> 
          </VStack>
        </VStack>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >

            <VStack gap={20} style={styles.contentContainer}>
              <Input style={styles.input} value={ingredients} onChange={setIngredients} />
              <Input style={styles.input} value={kitchenware} onChange={setKitchenware} />
              <Input style={styles.input} value={description} onChange={setDescription} />
              <TextButton style={styles.acceptBtn} textStyle={styles.textButton} onPress={onCancel} title="Update" /> 
          </VStack>
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
      ...TextStyle.h3,
      padding: 10,
      maxWidth: 300
    },
    stepComponentWrapper: {
      backgroundColor: theme.colors.background,
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
      padding: 50
    },
    listWrapper: {
      backgroundColor: theme.colors.background2,
      // flexGrow: 0,
      // flex: 1,
      flexGrow: 10,
      alignSelf: "stretch",
      maxHeight: 500
    },
    editbtn:{
       backgroundColor : theme.colors.background,
       padding: 10,
       borderRadius: 8,
    },
    acceptBtn:{
      ...ButtonStyle.primary,
      backgroundColor: theme.colors.primary,
     alignSelf: "stretch"

    },
    cancelBtn:{
      ...ButtonStyle.primary,
      backgroundColor: theme.colors.danger,
      alignSelf: "stretch"
    },
    textButton:{
      ...TextStyle.h3,
      color: theme.colors.text,
    },
    input: {
      ...InputStyle.underline
    }
  });
  