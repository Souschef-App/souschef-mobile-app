import React, { useContext, useState } from "react";
import { HStack, IconButton, Input, SafeArea, TextButton, VStack } from "../../components";
import {  Pressable, StyleSheet, Text } from "react-native";
import { ButtonStyle, InputStyle, TextStyle, Theme } from "../../styles";
import { ThemeContext } from "../../contexts/AppContext";
import { EnterRecipeIngredientsScreenNavigationProp } from "../../navigation/types";
import { ScrollView } from "react-native-gesture-handler";
import useStore from "../../data/store";
import { Modal } from "../../components/Modal";


export const EnterRecipeIngredientsScreen = ({
  navigation,
}: {
  navigation: EnterRecipeIngredientsScreenNavigationProp;
}) => {
  const theme = useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);
  const [recipeIngredientsList, setTaskList] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [text, setText] = useState("");

  const setEnteredRecipe = useStore((state) => state.setEnteredRecipe);
  const submitForBreakDown = useStore((state) => state.submitForBreakDown);


  const getSuggestions = () => {
    console.log("pressed")
    if(recipeIngredientsList.length <= 0)
    {
      console.log("Add tasks first")
    }
    else{
      // setEnteredRecipe(recipeIngredientsList) //TODO:Change!!
      submitForBreakDown();
      navigation.navigate("EnterRecipeStepsScreen");
    }
  };

  const addIngredientsToList = () => {
    console.log("adding task to list")
    recipeIngredientsList.push(text)
    setText("")
    setModalVisible(!modalVisible)
  } 

  return (
    <SafeArea>
      <VStack m={20}>
        <HStack p={20} justifyContent="space-between" flexMain={false}>
          <Text style={styles.title}>Enter Recipe Ingredients</Text> 
          <IconButton icon="plus" onPress={() => setModalVisible(true)} />
        </HStack>
        <VStack>
        {
          recipeIngredientsList.length == 0 ? (
          <VStack>
                <VStack flexMain={false} >
                  <Text>Enter Each Ingredient with quantity</Text>
                  <Text>For Your Recipe</Text>
                </VStack>
          </VStack>
          ):
          (
            <ScrollView style={{ flex: 1, alignSelf: "stretch", padding: 20}}>
            {
              recipeIngredientsList.map((task , index) =>{
                return (
                  <VStack key={index} p={20} style={styles.card} align="flex-start" justifyContent="center">
                      <Text style={styles.listText}>{index + 1}. {task}</Text>
                  </VStack>
                )
              })
            }
            </ScrollView>
          )
        }
        </VStack>

        <Modal
         animationType="slide"
         transparent={true}
         isVisible={modalVisible}
         onRequestClose={() => {
           setModalVisible(!modalVisible);
         }}>
          <VStack style={styles.container} gap={20} p={50} flexMain={false}>
            <Text style={styles.title}>Enter a Ingredient</Text>
            <Input textStyle={styles.input} multiline={true} onChange={setText} value={text} placeholder="Enter Recipe Task" />
            <Pressable
              style={styles.button}
              onPress={addIngredientsToList}>
                <Text style={styles.buttonText}>Add Ingredient</Text>
            </Pressable>
          </VStack>

        </Modal>
     
        <TextButton
          style={styles.button}
          textStyle={styles.buttonText}
          onPress={getSuggestions}
          title="Next"
        />

      </VStack>
    </SafeArea>
  );
};

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    button: {
      ...ButtonStyle.primary,
      backgroundColor: theme.colors.primary,
      margin: 5
    },
    buttonText:{
      ...TextStyle.h3,
      color: theme.colors.background,
    },
    input: {
      ...InputStyle.multiline,
      // maxWidth: 300,
      textAlignVertical: "top",
      minHeight: 120,

    },
    container: {
      backgroundColor: theme.colors.background,
    },
    title: {
      ...TextStyle.h3,
    },
    card:{
      backgroundColor: theme.colors.background2,
      padding: theme.spacing.m
    },
    listText:{
      ...TextStyle.body,
      flex: 1
    },
    red:{
      backgroundColor: "red"
    }
  });
