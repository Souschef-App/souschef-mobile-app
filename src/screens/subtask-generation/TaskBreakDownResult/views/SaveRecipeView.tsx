import React, { useEffect, useState } from "react";
import { TextStyle, ButtonStyle, Theme } from "../../../../styles";
import { TextButton, VStack, ModalButton } from "../../../../components"
import {Text, StyleSheet} from "react-native"
import { ThemeContext } from "../../../../contexts/AppContext";
import useStore from "../../../../data/store";
import { Modal } from "../../../../components/Modal";
import { TaskBreakDownResultScreenProp } from "navigation/types";

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

    const [name, setName] = useState<string>("");

    const [successModalOpen, setSuccessModalOpen] = useState(false)
    const [errorModalOpen, setErrorModalOpen] = useState(false)

    useEffect(()=>{
      if(saveRecipeSuccess == "Success")
        setSuccessModalOpen(true)
    },[saveRecipeSuccess])

    useEffect(()=>{
      if(saveRecipeError != null)
      setErrorModalOpen(true)
    },[saveRecipeSuccess])


    const recipeAddedOk = () =>{
      setErrorModalOpen(false)
      navigation.navigate("MealPlan")
    }
    
    return(
      <VStack align="flex-start" style={{width: width}} p={30}>
        <VStack justifyContent="center" gap={30}>
            <Text style={styles.taskTitle}>Name Of Recipe Here</Text>
            <TextButton title="Save Recipe" style={styles.saveBTN} textStyle={styles.btnText} onPress={() => saveRecipe(name)}/>
        </VStack>

        <Modal isVisible={successModalOpen}>
          <Modal.Container>
            <Modal.Header title="Recipe Added!" />
            <Modal.Body>

            </Modal.Body>
            <Modal.Footer>
              <ModalButton title="Close" onPress={()=> setSuccessModalOpen(false)} />
            </Modal.Footer>
          </Modal.Container>
        </Modal>
        <Modal isVisible={errorModalOpen}>
          <Modal.Container>
            <Modal.Header title="Recipe Save Error" />
            <Modal.Footer>
              <ModalButton title="Ok" onPress={()=> recipeAddedOk()} />
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