import React, { useCallback, useContext, useMemo, useRef, useState, useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import { Button, HStack, Icon, IconButton, Input, SafeArea, TextButton, VStack } from "../../components";
import { ThemeContext } from "../../contexts/AppContext";

import { ButtonStyle, InputStyle, TextStyle } from "../../styles";
import { Theme } from "../../styles";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { ScrollView } from "react-native-gesture-handler";
import useStore from "../../data/store";
import { RecipeStep } from "../../data/types/recipeStep";
import { DIFFICULTY } from "../../data/types";
import CustomBackdrop from "../../components/customBackdrop";

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
      <HStack style={styles.titleWrap} justifyContent="space-between">
        <Text style={styles.tasktitle}>{data.Title}</Text>
        <Button style={styles.editbtn} onPress={() => handlePresentModalPress(data.ID)}>
          <Icon color="#fff" name={"pencil"} />
        </Button>
      </HStack>
      <VStack justifyContent="flex-start" pVH={{v: 5, h : 10} } gap={5}>
          <VStack align="flex-start">
            {/* <Text style={styles.itemHeader}>Description:</Text> */}
            <Text>{data.Description}</Text>
          </VStack>

          <HStack justifyContent="space-between">
            <HStack justifyContent="flex-start" gap={5}>
              {/* <Text style={styles.itemHeader}>Ingredients:</Text> */}
              <Icon name="ingredient" color={theme.colors.highlight} />
              {
                data.Ingredients?.map((item : string, index : number)  => {
                  return <Text key={index}>{item}, </Text>
                })
              }
            </HStack>
            <HStack justifyContent="flex-start" gap={5}>
              {/* <Text style={styles.itemHeader} >Kitchenware:</Text> */}
              <Icon name="kitchenware" color={theme.colors.highlight}/>
              {
                data.Kitchenware?.map((item : string, index : number)  => {
                  return <Text key={index}>{item}, </Text>
                })
              }
            </HStack>

          </HStack>
          <HStack justifyContent="flex-start" flexMain={false} gap={theme.spacing.s}>
            <Icon
              name="star"
              color={theme.colors.highlight2}
              size={24}
            />
            <Icon
              name={
                data.Difficulty > DIFFICULTY.Easy
                  ? "star"
                  : "star-outline"
              }
              color={theme.colors.highlight2}
              size={24}
            />
            <Icon
              name={
                data.Difficulty > DIFFICULTY.Medium
                  ? "star"
                  : "star-outline"
              }
              color={theme.colors.highlight2}
              size={24}
            />
          </HStack>

        </VStack>
    </VStack> 
  );
};

export const TaskBreakDownResultScreen = () => {
  const theme = useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);

  const brokenDownRecipe = useStore((state) => state.brokenDownRecipe);
  const updateRecipe = useStore((state) => state.updateRecipe);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ['50%'], []);

  const [editID, setEditID] = useState<number>()
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
    setEditID(step.ID)
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const onAccept = () =>{

  }

  const onCancel = () =>{
    
  }

  const onUpdateRecipe = (ID : number) =>{
    const step : RecipeStep = {
      ID: ID,
      Description : description,
      Kitchenware : kitchenware.split(","),
      Ingredients : ingredients.split(","),
      Duration: brokenDownRecipe![ID].Duration,
      Title: brokenDownRecipe![ID].Title,
      Dependencies: brokenDownRecipe![ID].Dependencies,
      Difficulty: brokenDownRecipe![ID].Difficulty,
    }
    updateRecipe(ID, step)
    bottomSheetModalRef.current?.close();
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
          <HStack justifyContent="space-between" >
            <Text style={styles.title}>Steps</Text>
            <IconButton icon="retry" iconColor={theme.colors.background} onPress={()=>{}} style={styles.retry} />
          </HStack>
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
          backdropComponent={(props) =>{
            return <CustomBackdrop animatedIndex={{
            value: 1
          }} animatedPosition={{
            value: 1
          }} />}
        } 
        >
          <VStack  gap={20} style={styles.contentContainer}>
            <VStack align="flex-start">
              <Text style={styles.itemHeader}>Ingredients</Text>
              <Input style={styles.input} value={ingredients} onChange={setIngredients} />
            </VStack>
            <VStack align="flex-start">
              <Text style={styles.itemHeader}>Kitchenware</Text>
              <Input style={styles.input} value={kitchenware} onChange={setKitchenware} />
            </VStack>
            <VStack align="flex-start">
              <Text style={styles.itemHeader}>Task</Text>
              <Input style={styles.input} value={description} onChange={setDescription} />
            </VStack>
            <HStack gap={10}>
              <TextButton style={styles.updateBtn} textStyle={styles.textButton} onPress={() => onUpdateRecipe(editID!)} title="Update" /> 
              <IconButton icon="retry" iconColor={theme.colors.background} onPress={()=>{}} style={styles.retry} />
            </HStack>
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
      maxWidth: 300,
      color: theme.colors.background,
    },
    stepComponentWrapper: {
      backgroundColor: theme.colors.background,
      flexGrow: 0,
      elevation: 5,
      borderRadius: 20
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
       //backgroundColor : theme.colors.background,
       padding: 10,
       borderRadius: 8,
    },
    acceptBtn:{
      ...ButtonStyle.primary,
      backgroundColor: theme.colors.primary,
     alignSelf: "stretch",
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
    },
    titleWrap:{
      backgroundColor: theme.colors.highlight,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    retry:{
      backgroundColor: theme.colors.danger,
      borderRadius: 1000,
      padding: 10
    },
    updateBtn:{
      ...ButtonStyle.primary,
      backgroundColor: theme.colors.primary,
     flexGrow: 1,
    },
  });
  