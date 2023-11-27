import React, { useCallback, useContext, useMemo, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { Button, HStack, Icon, IconButton, SafeArea, VStack } from "../../../components";
import { ThemeContext } from "../../../contexts/AppContext";
import HoldMenuProvider from "../../../components/popup-menu/components/provider"

import { ButtonStyle, InputStyle, TextStyle } from "../../../styles";
import { Theme } from "../../../styles";

import useStore from "../../../data/store";
import TaskEditScreen from "./views/TaskEdit/TaskEditView";
import { SaveRecipeView } from "./views/SaveRecipeView";
import { TaskBreakDownResultScreenProp } from "navigation/types";
import AnimatedSwiper from "../../../components/animated-swiper/AnimatedSwiper";

import { useSafeAreaInsets } from "react-native-safe-area-context";  
import HoldItem from "../../../components/popup-menu/components/hold-item";
import { EditTitleModal, EditRatingModal, EditDescriptionModal, EditTimerModal, EditIngredientModal, EditKitchenwareModal } from "./views/TaskEdit/Modals";

export const TaskBreakDownResultScreen = ({
  navigation,
}: {
  navigation: TaskBreakDownResultScreenProp;
}) =>{
  const theme = useContext(ThemeContext);
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const safeAreaInsets = useSafeAreaInsets();

  const brokenDownRecipe = useStore((state) => state.brokenDownRecipe);

  // console.log("TaskBreakDownResultScreen reloaded")

  const brokenDownRecipeArray = useMemo(() => { 
    // console.log("brokenDownRecipeArray changed")
    return brokenDownRecipe?.map((data, index) => <TaskEditScreen key={index} task={data} />)
  }, [brokenDownRecipe]);
  
  // const renderArray = useMemo(() => brokenDownRecipeArray?.concat(<SaveRecipeView navigation={navigation} />), 
  // [brokenDownRecipeArray]);
  
  const activeIndex = useStore((state) => state.activeIndex);
  const setActiveIndex = useStore((state) => state.setActiveIndex);

  const swiper =  useMemo(() => {

    // console.log("swiper changed ", activeIndex)
    return <AnimatedSwiper activeIndex={activeIndex} setActiveIndex={setActiveIndex} paginationStyle={{marginBottom: 5}} duration={600}>
    {
      brokenDownRecipeArray
    }
    </AnimatedSwiper>
  }
    , [brokenDownRecipe, activeIndex]);

  const isEditTItleVisible = useStore((state) => state.isEditTItleVisible);

  const isEditDescriptionVisible = useStore((state) => state.isEditDescriptionVisible);
  const isEditRatingVisible = useStore((state) => state.isEditRatingVisible);
  const isEditDurationVisible = useStore((state) => state.isEditDurationVisible);
  const isEditIngredientsVisible = useStore((state) => state.isEditIngredientsVisible);
  const isEditKitchenwareVisible = useStore((state) => state.isEditKitchenwareVisible);
  const isEditDependenciesVisible = useStore((state) => state.isEditDependenciesVisible);

  const setIsEditDescriptionVisible = useStore((state) => state.setIsEditDescriptionVisible);
  const setIsEditDifficultyVisible = useStore((state) => state.setIsEditRatingVisible);
  const setIsEditDurationVisible = useStore((state) => state.setIsEditDurationVisible);
  const setIsEditIngredientsVisible = useStore((state) => state.setIsEditIngredientsVisible);
  const setIsEditKitchenwareVisible = useStore((state) => state.setIsEditKitchenwareVisible);
  const setIsEditDependencyVisible = useStore((state) => state.setIsEditDependencyVisible);

  const currentTask = useStore((state) => state.currentTask);

  const updateTitle = useStore((state) => state.updateTitle);

  
  const onOpen = useCallback(() => {
    // console.log('App onOpen')
  }, []);

  const onClose = useCallback(() => {
    // console.log('App onClose')
  }, []);


  return (
    <SafeArea>
      <HoldMenuProvider
          safeAreaInsets={safeAreaInsets}
          onOpen={onOpen}
          onClose={onClose}
        >
      {
        brokenDownRecipe == null || brokenDownRecipe?.length <= 0 ? 
        (
          <VStack>
            <Text>No Tasks yet! Waiting for Response...</Text>
          </VStack>
        )
        :
        (
          <VStack 
            align="flex-start" 
            justifyContent="flex-start" 
            style={styles.container} 
            pVH={{v: 20, h : 20}} 
            gap={0}>
            <VStack>
            {
              (brokenDownRecipe != null && brokenDownRecipe.length > 0) ? (
                <VStack>
                  <HStack flexMain={false} justifyContent="flex-end">
                    <HoldItem activateOn="tap" items={[
                      { text: 'Regenerate All', onPress: () => console.log('@enesozt') },
                      { text: 'Regenerate Task', onPress: () => console.log('All Rooms') },
                      { text: 'Add Before', onPress: () => console.log('All Rooms') },
                      { text: 'Add After', onPress: () => console.log('All Rooms') },
                    ]}>
                      <Icon name="threedots" />
                    </HoldItem>
                  </HStack>
                  {
                    swiper
                  }
                </VStack>
              ) : (
                <VStack>
                  <Text>No Tasks To Edit</Text>
                </VStack>
              )
            }
            </VStack>
          </VStack>
        )
      }
      </HoldMenuProvider>
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
      width: 160,
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
      width: 160,
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
      width: 220
    },
    reGenerateBTNText:{
      ...TextStyle.h3,
      color: "#fff"
    }
  });
  