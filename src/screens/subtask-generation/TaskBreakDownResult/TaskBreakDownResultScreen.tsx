import React, { useContext, useEffect, useMemo } from "react";
import { StyleSheet, Text , Image} from "react-native";
import {  HStack, Icon, SafeArea, VStack } from "../../../components";
import { ThemeContext } from "../../../contexts/AppContext";

import { ButtonStyle, InputStyle, TextStyle } from "../../../styles";
import { Theme } from "../../../styles";

import useStore from "../../../data/store";
import TaskEditScreen from "./views/TaskEdit/TaskEditView";

import { TaskBreakDownResultScreenProp } from "navigation/types";
import { useSafeAreaInsets } from "react-native-safe-area-context";  
import { Menu, MenuTrigger, MenuOptions, MenuOption } from "react-native-popup-menu";

import { BeforeOrAfter } from "../../../data/slices/recipeBuilderSlice";
import { Carousel } from "../../../components/carousel";
import { DIFFICULTY } from "../../../data/types";


export const TaskBreakDownResultScreen = ({
  navigation,
}: {
  navigation: TaskBreakDownResultScreenProp;
}) =>{
  const theme = useContext(ThemeContext);
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const safeAreaInsets = useSafeAreaInsets();

  const brokenDownRecipe = useStore((state) => state.brokenDownRecipe);

  // const brokenDownRecipeArray = brokenDownRecipe?.map((data, index) => <TaskEditScreen key={index} task={data} />)
  // const renderArray = brokenDownRecipeArray?.concat(<SaveRecipeView key={brokenDownRecipe?.length} navigation={navigation} />)

  const setActiveIndex = useStore((state) => state.setActiveIndex);
  
  useEffect(()=>{
    setActiveIndex(0)
  },[])

  const submitForRetryTask = useStore((state) => state.submitForRetryTask);
  const addBlankCard = useStore((state) => state.addBlankCard);

  return (
    <SafeArea>
      {
        brokenDownRecipe == null || brokenDownRecipe?.length <= 0 ? 
        (
          <VStack style={{backgroundColor: theme.colors.primary}}>
            <Icon name="logo" size={120} />
            <Text style={[TextStyle.h2, {color: theme.colors.background, textAlign: "center"}]}>No Tasks yet! Waiting for Response...</Text>
          </VStack>
        )
        :
        (
          <VStack 
            align="flex-start" 
            justifyContent="flex-start" 
            style={styles.container} 
            pVH={{v: 20, h : 0}} 
            gap={0}>
            <VStack>
            {
              (brokenDownRecipe != null && brokenDownRecipe.length > 0) ? (
                <VStack>
                  <HStack flexMain={false} justifyContent="flex-end">
                    <Menu >
                      <MenuTrigger  >
                        <Icon name="threedots" />
                      </MenuTrigger>
                      <MenuOptions optionsContainerStyle={{width: 160}}>
                        <MenuOption onSelect={() => addBlankCard(BeforeOrAfter.Before)} >
                          <HStack pVH={{v: 2, h: 5}} justifyContent="flex-start" gap={5}>
                            <Icon color={theme.colors.primary} name="plus"  size={20}/>
                            <Text >Add Task Before</Text>
                          </HStack>
                        </MenuOption>
                        <MenuOption  onSelect={() => addBlankCard(BeforeOrAfter.After)} >
                          <HStack pVH={{v: 2, h: 5}} justifyContent="flex-start" gap={5}>
                            <Icon color={theme.colors.primary} name="plus"  size={20}/>
                            <Text >Add Task After</Text>
                          </HStack>
                        </MenuOption>
                        <MenuOption onSelect={() => submitForRetryTask()} >
                          <HStack pVH={{v: 2, h: 5}} justifyContent="flex-start" gap={5}>
                            <Icon color={theme.colors.danger} name="retry"  size={20}/>
                            <Text >Regenerate Task</Text>
                          </HStack>
                        </MenuOption>
                        <MenuOption onSelect={() => alert(`Delete`)} >
                            <HStack pVH={{v: 2, h: 5}} justifyContent="flex-start" gap={5}>
                              <Icon color={theme.colors.danger} name="retry" size={20} />
                              <Text >Regenerate All</Text>
                            </HStack>
                          </MenuOption>
                      </MenuOptions>
                    </Menu>
                  </HStack>
                  <Carousel 
                    data={brokenDownRecipe} 
                    RenderItem={TaskEditScreen} 
                    getActiveIndexCallback={setActiveIndex} 
                    navigation={navigation}
                    />
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
  