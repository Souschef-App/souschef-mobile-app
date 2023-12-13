import React, { useEffect, useState } from "react";
import { TextStyle, ButtonStyle, Theme } from "../../../../styles";
import { TextButton, VStack, ModalButton } from "../../../../components"
import {Text, StyleSheet} from "react-native"
import { ThemeContext } from "../../../../contexts/AppContext";
import { Modal } from "../../../../components/Modal";
import { TaskBreakDownResultScreenProp } from "navigation/types";
import useStore from "../../../../data/store";

type SaveRecipeViewProps = {
  navigation : TaskBreakDownResultScreenProp,
  width : number
}

export const SaveRecipeView = ({navigation, width} : SaveRecipeViewProps) => {

    const theme = React.useContext(ThemeContext);
    const styles = React.useMemo(() => makeStyles(theme), [theme]);

    const saveRecipe = useStore((state) => state.saveRecipe);
    const saveRecipeSuccess = useStore((state) => state.saveRecipeSuccess);
    const saveRecipeError = useStore((state) => state.saveRecipeError);

    const clearSaveRecipeSuccess = useStore((state) => state.clearSaveRecipeSuccess);
    const clearSaveRecipeError = useStore((state) => state.clearSaveRecipeError);

    const recipeTitle = useStore((state) => state.recipeTitle);

    const [successModalOpen, setSuccessModalOpen] = useState(false)
    const [errorModalOpen, setErrorModalOpen] = useState(false)

    useEffect(()=>{
      if(saveRecipeSuccess == "Success")
        setSuccessModalOpen(true)
        clearSaveRecipeSuccess()
    },[saveRecipeSuccess])

    useEffect(()=>{
      if(saveRecipeError != null)
        setErrorModalOpen(true)
        clearSaveRecipeError()
    },[saveRecipeSuccess])


    const recipeAddedOk = () =>{
      setSuccessModalOpen(false)
      navigation.navigate("MealPlan")
    }
    
    return(
      <VStack align="flex-start" style={{width: width}} p={30}>
        <VStack justifyContent="center" gap={30}>
            <Text style={styles.taskTitle}>{recipeTitle}</Text>
            <TextButton title="Save Recipe" style={styles.saveBTN} textStyle={styles.btnText} onPress={() => saveRecipe(recipeTitle)}/>
        </VStack>

        <Modal isVisible={successModalOpen}>
          <Modal.Container>
            <Modal.Header title="Recipe Added!" />
            <Modal.Body>

            </Modal.Body>
            <Modal.Footer>
              <ModalButton title="Close" onPress={()=> recipeAddedOk()} />
            </Modal.Footer>
          </Modal.Container>
        </Modal>
        <Modal isVisible={errorModalOpen}>
          <Modal.Container>
            <Modal.Header title="Recipe Save Error" />
            <Modal.Footer>
              <ModalButton title="Ok" onPress={()=> setErrorModalOpen(false)} />
            </Modal.Footer>
          </Modal.Container>
        </Modal>
      </VStack>
    )
}

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    taskTitle: {
      ...TextStyle.h1,
      fontSize: 30,
    },
    Icon: {
      position: "absolute",
      left: theme.spacing.m,
    },
    btnText: {
      ...TextStyle.h2,
      fontWeight: "normal",
      color: "#fff",
    },
    saveBTN:{
      ...ButtonStyle.primary,
      minWidth: 100,
      backgroundColor: theme.colors.primary,
      alignSelf: "stretch"
    },
    red:{
      backgroundColor: "red"
    }
  });