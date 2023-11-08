import React, { useContext, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { Button, HStack, Icon, IconButton, SafeArea, VStack } from "../../../components";
import { ThemeContext } from "../../../contexts/AppContext";

import { ButtonStyle, InputStyle, TextStyle } from "../../../styles";
import { Theme } from "../../../styles";

import useStore from "../../../data/store";
import TaskEditScreen from "./TaskEditView";

export const TaskBreakDownResultScreen = () => {
  const theme = useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);

  const brokenDownRecipe = useStore((state) => state.brokenDownRecipe);
  const updateRecipe = useStore((state) => state.updateRecipe);

  const [activeIndex, setActiveIndex] = useState<number>(0)

  const [editID, setEditID] = useState<number>()
  // const [ingredients, setIngredients] = useState<string>("")
  // const [kitchenware, setKitchenware] = useState<string>("")
  // const [description, setDescription] = useState<string>("")



  const onAccept = () =>{

  }

  const onCancel = () =>{
    
  }

  const nextTask = () =>{
    if(brokenDownRecipe != undefined && activeIndex < brokenDownRecipe?.length - 1)
    {
      setActiveIndex(activeIndex + 1)
    }
  }

  const prevTask = () =>{
    if(activeIndex - 1 > -1)
    {
      setActiveIndex(activeIndex - 1)
    }
  }

  // const onUpdateRecipe = (ID : number) =>{
  //   const step : RecipeStep = {
  //     ID: ID,
  //     Description : description,
  //     Kitchenware : kitchenware.split(","),
  //     Ingredients : ingredients.split(","),
  //     Duration: brokenDownRecipe![ID].Duration,
  //     Title: brokenDownRecipe![ID].Title,
  //     Dependencies: brokenDownRecipe![ID].Dependencies,
  //     Difficulty: brokenDownRecipe![ID].Difficulty,
  //   }
  //   updateRecipe(ID, step)
  //   bottomSheetModalRef.current?.close();
  // }

  return (
      <SafeArea>
        <VStack 
          align="flex-start" 
          justifyContent="flex-start" 
          style={styles.container} 
          pVH={{v: 20, h : 20}} 
          gap={0}>
          <HStack justifyContent="space-between" >
            <Text style={styles.title}>Steps</Text>

            <Button style={styles.reGenerateBTN} onPress={()=>{}}>
              <HStack gap={10}>
                <Text style={styles.reGenerateBTNText}>Regenerate All</Text>
                <Icon name="retry" style={styles.retry} color={theme.colors.background} />
              </HStack>
            </Button>
          </HStack>

          <VStack>
          {
            (brokenDownRecipe != null && brokenDownRecipe.length > 0) ? (
              <TaskEditScreen task={brokenDownRecipe[activeIndex]} />
            ) : (
              <VStack>
                <Text>No Tasks To Edit</Text>
              </VStack>
            )
          }
          </VStack>
          <HStack>
            <IconButton 
              style={styles.arrowBTN}  
              icon="arrow-left" 
              iconStyle={styles.arrowIcon} 
              onPress={()=>prevTask()}
              iconColor="#fff" 
              />
            <IconButton 
            style={styles.arrowBTN2} 
            icon="arrow-right" 
            onPress={()=>nextTask()}
            iconColor="#fff" 
            />
          </HStack>
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
    arrowBTN:{
      height: 56,
      flexGrow: 1,
      padding: 10,
      justifyContent:"flex-start",
      backgroundColor: theme.colors.primary,
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 20,
      borderRightColor: "#fff",
      borderRightWidth: 1,
    },
    arrowBTN2:{
      height: 56,
      flexGrow: 1,
      padding: 10,
      justifyContent:"flex-end",
      backgroundColor: theme.colors.primary,
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,

      borderLeftColor: "#fff",
      borderLeftWidth: 1,
    },
    arrowIcon:{
      // backgroundColor: "#fff"
    },
    red:{
      backgroundColor: "red"
    },
    reGenerateBTN:{
      backgroundColor: theme.colors.danger,
      // borderRadius: 1000,
      padding: 10,
      height: 56,
      borderRadius: 1000,
    },
    reGenerateBTNText:{
      ...TextStyle.h3,
      color: "#fff"
    }
  });
  