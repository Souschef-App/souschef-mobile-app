import { HStack, Input, VStack } from "../../../../../components"
import React from "react"
import { StyleSheet, TextInput } from "react-native"

import { ModalButton } from "../../components/ModalButton"
import { Modal } from "../../../../../components/Modal"
import { TimerPickerModal } from "react-native-timer-picker"
import { DIFFICULTY } from "../../../../../data/types"
import { LinearGradient } from "react-native-svg"

import ModalIconButton from "../../components/ModalIconButton"

import { ThemeContext } from "../../../../../contexts/AppContext"
import { TextStyle, ButtonStyle, Theme } from "../../../../../styles"

export type EditModalProps = {
    isVisible : boolean,
    cancelFunc : (state : boolean) => void,
    saveFunc : () => void,
}

export interface EditTitleModalProps extends EditModalProps {
    inputValue : string,
    onChangeText?: ((text: string) => void) | undefined
}

export const EditTitleModal = ({isVisible, inputValue, onChangeText, cancelFunc, saveFunc} : EditTitleModalProps) =>{

    const theme = React.useContext(ThemeContext);
    const styles = React.useMemo(() => makeStyles(theme), [theme]);

    return(
        <Modal isVisible={isVisible}>
        <Modal.Container>
          <Modal.Header title="Edit Title" />
          <Modal.Body>
            <TextInput value={inputValue} onChangeText={onChangeText}  />
          </Modal.Body>
          <Modal.Footer>
            <HStack gap={15}>
              <ModalButton title="Cancel" textStyle={styles.btnText} style={styles.cancelBTN} onPress={() => cancelFunc(false)} />
              <ModalButton title="Save"  textStyle={styles.btnText} style={styles.saveBTN} onPress={() => saveFunc()} />
            </HStack>
          </Modal.Footer>
        </Modal.Container>
      </Modal>
    )
}

export interface EditRatingModalProps extends EditModalProps {
    taskDifficulty : number,
    setTaskDifficulty: (lvl : number) => void
}

export const EditRatingModal = ({isVisible, taskDifficulty, setTaskDifficulty, cancelFunc, saveFunc} : EditRatingModalProps) =>{

    const theme = React.useContext(ThemeContext);
    const styles = React.useMemo(() => makeStyles(theme), [theme]);

    return(
        <Modal isVisible={isVisible}>
            <Modal.Container>
                <Modal.Header title="Edit Rating" />
                <Modal.Body>
                    <HStack>
                    <ModalIconButton 
                        icon={
                        taskDifficulty >= DIFFICULTY.Easy ? "star" : "star-outline"
                        }
                        color={theme.colors.highlight2}
                        onPress={()=>setTaskDifficulty(0)}
                        iconSize={50}
                        />
                    <ModalIconButton 
                        icon={
                        taskDifficulty > DIFFICULTY.Easy ? "star" : "star-outline"
                        }
                        color={theme.colors.highlight2}
                        onPress={()=>setTaskDifficulty(1)}
                        iconSize={50}
                        />
                    <ModalIconButton 
                        icon={
                        taskDifficulty > DIFFICULTY.Medium ? "star" : "star-outline"
                        }
                        color={theme.colors.highlight2}
                        onPress={()=>setTaskDifficulty(2)}
                        iconSize={50}
                        />
                    </HStack>
                </Modal.Body>
                <Modal.Footer>
                    <HStack gap={15}>
                    <ModalButton style={styles.cancelBTN} textStyle={styles.btnText} title="Cancel" onPress={() => cancelFunc(false)} />
                    <ModalButton style={styles.saveBTN}   textStyle={styles.btnText} title="Save" onPress={saveFunc} />
                    </HStack>
                </Modal.Footer>
            </Modal.Container>
      </Modal>
    )
}

export interface EditDescriptionModalProps extends EditModalProps {
    taskDescription : string,
    setTaskDescription: ((text: string) => void) | undefined
}

export const EditDescriptionModal = ({isVisible, taskDescription, setTaskDescription, cancelFunc, saveFunc} : EditDescriptionModalProps) =>{

    const theme = React.useContext(ThemeContext);
    const styles = React.useMemo(() => makeStyles(theme), [theme]);

    return(
        <Modal isVisible={isVisible}>
        <Modal.Container>
          <Modal.Header title="Edit Description" />
          <Modal.Body>
            <TextInput value={taskDescription} onChangeText={setTaskDescription}  />
          </Modal.Body>
          <Modal.Footer>
            <HStack gap={15}>
              <ModalButton style={styles.cancelBTN} textStyle={styles.btnText} title="Cancel" onPress={() => cancelFunc(false)} />
              <ModalButton style={styles.saveBTN}   textStyle={styles.btnText}  title="Save" onPress={saveFunc} />
            </HStack>
          </Modal.Footer>
        </Modal.Container>
      </Modal>
    )
}

export interface EditTimerModalProps extends EditModalProps {
    setIsEditDurationVisible : (state: boolean) => void,
    updateDuration: (mins : number) => void
}

export const EditTimerModal = ({isVisible, setIsEditDurationVisible, updateDuration, cancelFunc, saveFunc} : EditTimerModalProps) =>{

    return(
        <TimerPickerModal
            visible={isVisible}
            setIsVisible={setIsEditDurationVisible}
            onConfirm={(pickedDuration) => {
                updateDuration(pickedDuration.minutes);
            }}
            modalTitle="Set Duration"
            onCancel={() => cancelFunc(false)}
            closeOnOverlayPress
            LinearGradient={LinearGradient}
            styles={{ 
                theme: "light",
            }}
            hideHours={true}
            hideSeconds={true}
      />
    )
}

export interface EditIngredientModalProps extends EditModalProps {
    // taskDescription : string,
    // setTaskDescription?: ((text: string) => void) | undefined
}

export const EditIngredientModal = ({isVisible, cancelFunc, saveFunc} : EditIngredientModalProps) =>{

    const theme = React.useContext(ThemeContext);
    const styles = React.useMemo(() => makeStyles(theme), [theme]);

    return(
        <Modal isVisible={isVisible}>
        <Modal.Container>
          <Modal.Header title="Edit Ingredients" />
          <Modal.Body>
            {/* <VStack p={10}>
                <ScrollView style={{backgroundColor: theme.colors.background2, height: 300, alignSelf: "stretch"}}>
                  {
                    taskIngredients.map((ingredient)=>{
                      return <EditItem item={ingredient} itemList={taskIngredients} setItemList={setTaskIngredients}  styles={styles} theme={theme} />
                    })

                  }
                </ScrollView>
                <VStack>
                  <AddIngredient taskIngredients={taskIngredients} setTaskIngredients={setTaskIngredients} styles={styles} theme={theme} />
                </VStack>
            </VStack> */}

          </Modal.Body>
          <Modal.Footer>
            <HStack gap={15}>
              <ModalButton style={styles.cancelBTN} textStyle={styles.btnText} title="Cancel" onPress={() => cancelFunc(false)} />
              <ModalButton style={styles.saveBTN}  textStyle={styles.btnText}  title="Save" onPress={saveFunc} />
            </HStack>
          </Modal.Footer>
        </Modal.Container>
      </Modal>
    )
}

export interface EditKitchenwareModalProps extends EditModalProps {
    taskDescription : string,
    setTaskDescription?: ((text: string) => void) | undefined
}

export const EditKitchenware = ({isVisible, taskDescription, setTaskDescription, cancelFunc, saveFunc} : EditKitchenwareModalProps) =>{

    const theme = React.useContext(ThemeContext);
    const styles = React.useMemo(() => makeStyles(theme), [theme]);

    return(
        <Modal isVisible={isVisible}>
        <Modal.Container>
          <Modal.Header title="Edit Kitchenware" />
          <Modal.Body>
            {/* <VStack p={10}>
                <ScrollView style={{backgroundColor: theme.colors.background2, height: 300, alignSelf: "stretch"}}>
                  {
                    taskKitchenware.map((kitchenware)=>{
                      return <EditItem item={kitchenware} itemList={taskKitchenware} setItemList={setTaskKitchenware}  styles={styles} theme={theme} />
                    })

                  }
                </ScrollView>
                <VStack>
                  <AddKitchenware taskKitchenware={taskKitchenware} setTaskKitchenware={setTaskKitchenware} styles={styles} theme={theme} />
                </VStack>
            </VStack> */}

          </Modal.Body>
          <Modal.Footer>
            <HStack gap={15}>
              <ModalButton style={styles.cancelBTN} textStyle={styles.btnText} title="Cancel" onPress={() => cancelFunc(false)} />
              <ModalButton style={styles.saveBTN}  textStyle={styles.btnText}  title="Save" onPress={saveFunc} />
            </HStack>
          </Modal.Footer>
        </Modal.Container>
      </Modal>
    )
}

const makeStyles = (theme: Theme) =>  
  StyleSheet.create({ 
    cancelBTN:{
    ...ButtonStyle.primary,
    minWidth: 100,
    backgroundColor: theme.colors.danger
    },
    saveBTN:{
        ...ButtonStyle.primary,
        minWidth: 100,
        backgroundColor: theme.colors.primary
    },
    btnText: {
        ...TextStyle.h2,
        fontWeight: "normal",
        color: "#fff",
    },
    // taskTitle: {
    //     ...TextStyle.h1,
    //     fontSize: 40,
    // },
    // dropdownTitle: {
    //   ...TextStyle.h3,
    //   fontWeight: "bold",
    // },
    // completeBtn: {
    //   ...ButtonStyle.primary,
    //   alignSelf: "stretch",
    //   backgroundColor: theme.colors.primary,
    // },
    // rerollBtn: {
    //   ...ButtonStyle.primary,
    //   alignSelf: "stretch",
    //   backgroundColor: theme.colors.highlight,
    // },
    // btnIcon: {
    //   position: "absolute",
    //   left: theme.spacing.m,
    // },
    // timerText: {
    //   ...TextStyle.body,
    //   fontWeight: "bold",
    // },
    // retry: {
    //   backgroundColor: theme.colors.danger,
    //   borderRadius: 1000,
    //   padding: 12
    // },
    // highlightEdit:{
    //   ...ButtonStyle.editable,
    //   alignSelf: "stretch",
    //   backgroundColor: "#2F394A33",
    // },
    // red:{
    //   backgroundColor: "red"
    // },
    // editRowStyle:{
    //   backgroundColor: theme.colors.background
    // },
    // editRowFooterStyle:{
    //   backgroundColor: theme.colors.highlight,
    // },
    // custInput:{
    //   ...InputStyle.underline,
    //   backgroundColor: theme.colors.background,
    //   flexGrow: 1,
    //   borderRadius: theme.spacing.s
    // },
    // custInput2:{
    //   ...InputStyle.underline,
    //   backgroundColor: theme.colors.background,
    //   width: 60,
    //   borderRadius: theme.spacing.s
    // },
    // ok:{
    //   backgroundColor: theme.colors.background,
    //   padding: 10,
    //   borderRadius: theme.spacing.xxl, 
    //   marginLeft: 10
    // },
    // addIngridientTitle:{
    //   ...TextStyle.h2,
    //   color: theme.colors.background
    // }
  });