import React, { useContext, useState } from "react";
import {  Pressable, StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { EnterRecipeIngredientsScreenNavigationProp } from "../../../navigation/types";
import { HStack, IconButton, Input, ModalButton, SafeArea, TextButton, VStack } from "../../../components";
import { Modal } from "../../../components/Modal";
import { ButtonStyle, InputStyle, TextStyle, Theme } from "../../../styles";
import useStore from "../../../data/store";
import { ThemeContext } from "../../../contexts/AppContext";
import { makeStyles } from "./style";
import { ErrorModal, RowItem } from "./components";

export const EnterRecipeIngredientsScreen = ({
  navigation,
}: {
  navigation: EnterRecipeIngredientsScreenNavigationProp;
}) => {
  const theme = useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);
  const [recipeIngredientsList, setTaskList] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  const [text, setText] = useState("");

  const setEnteredRecipe = useStore((state) => state.setEnteredRecipe);

  const getSuggestions = () => {
    if(recipeIngredientsList.length <= 0)
    {
      setErrorModalVisible(true)
    }
    else{
      // setEnteredRecipe(recipeIngredientsList) //TODO:Change!!
      setEnteredRecipe(recipeIngredientsList);
      navigation.navigate("EnterRecipeStepsScreen");
    }
  };

  const addIngredientsToList = () => {
    // console.log("adding task to list")
    // recipeIngredientsList.push(text)

    setTaskList([...recipeIngredientsList, text])

    setText("")
    setModalVisible(!modalVisible)
  } 

  return (
    <SafeArea>
      <VStack  mVH={{h: 20, v: 20}}>
        <HStack align="flex-start" justifyContent="space-between" flexMain={false} >
          <Text  style={styles.title}>Enter Recipe Ingredients</Text> 
          <IconButton icon="plus" color={theme.colors.text}onPress={() => setModalVisible(true)} />
        </HStack>
        <VStack>
        {
          recipeIngredientsList.length == 0 ? (
          <VStack>
                <VStack flexMain={false} >
                  <Text style={styles.empyMsg}>You have 0 ingredients</Text>
                  <Text style={styles.empyMsg}>Try adding some</Text>
                </VStack>
          </VStack>
          ):
          (
            <ScrollView style={{ flex: 1, alignSelf: "stretch", paddingTop: 20,}}>
            {
              recipeIngredientsList.map((task, index) =>{
                return (
                  <RowItem key={index} text={task} index={index} styles={styles} />
                )
              })
            }
            </ScrollView>
          )
        }
        <TextButton
              style={styles.button}
              textStyle={styles.buttonText}
              onPress={getSuggestions}
              title="Finished"
            />
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
            
            <VStack justifyContent="flex-end">

              <HStack  gap={12}>
                <ModalButton 
                  title="Cancel" 
                  onPress={()=>setModalVisible(false)} 
                  style={{...ButtonStyle.modal, backgroundColor: "red"}}
                  textStyle={TextStyle.modalButtonText(theme).text}
                   />
                <ModalButton 
                  title="Add" 
                  onPress={addIngredientsToList} 
                  style={{...ButtonStyle.modal, backgroundColor: theme.colors.primary}} 
                  textStyle={TextStyle.modalButtonText(theme).text}
                  />
              </HStack>
            </VStack>
          </VStack>

        </Modal>

        <ErrorModal isVisible={errorModalVisible} title="Ingredient Error" message="Please add at least one Ingredient" okFunc={()=>setErrorModalVisible(false)} />
    

      </VStack>
    </SafeArea>
  );
};