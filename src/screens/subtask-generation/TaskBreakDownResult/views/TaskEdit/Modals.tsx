import { HStack, ModalButton, ModalIconButton } from "../../../../../components"
import React from "react"
import { StyleSheet, TextInput } from "react-native"

import { Modal } from "../../../../../components/Modal"
import { TimerPickerModal } from "react-native-timer-picker"
import { DIFFICULTY } from "../../../../../data/types"
import { LinearGradient } from "react-native-svg"

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

}

export const EditKitchenwareModal = ({isVisible, cancelFunc, saveFunc} : EditKitchenwareModalProps) =>{

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
    }
  });