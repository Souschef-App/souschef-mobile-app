import { HStack, Icon, ModalButton, ModalIconButton, VStack } from "../../../../../components"
import React, { useEffect, useState } from "react"
import { StyleSheet, TextInput } from "react-native"

import { Modal } from "../../../../../components/Modal"
import { TimerPickerModal } from "react-native-timer-picker"
import { LinearGradient } from "react-native-svg"

import { ThemeContext } from "../../../../../contexts/AppContext"
import { TextStyle, ButtonStyle, Theme } from "../../../../../styles"

import { 
  formatDifficultyToHex,
  formatDifficultyToString,
} from "../../../../../utils/format";

import { Slider } from '@react-native-assets/slider'
import useStore from "../../../../../data/store"

export type EditModalProps = {
    isVisible : boolean,
    cancelFunc : (state : boolean) => void,
    saveFunc : () => void,
}

export interface EditTitleModalProps extends EditModalProps {
    inputValue? : string,
}

export const EditTitleModal = () =>{

    const theme = React.useContext(ThemeContext);
    const styles = React.useMemo(() => makeStyles(theme), [theme]);

    const currentTask = useStore((state) => state.currentTask);
  
    const [title, setTitle] = useState(currentTask?.title)
    const visible = useStore((state) => state.isEditTItleVisible);
    const setIsEditTitleVisible = useStore((state) => state.setIsEditTItleVisible);
    const updateTitle = useStore((state) => state.updateTitle);

    const saveChange = () => {
      if(title)
        updateTitle(title)
      setIsEditTitleVisible(false)
    }

    useEffect(()=>{
      setTitle(currentTask?.title)
    },[visible])

    return(
      <Modal isVisible={visible}>
        <Modal.Container>
          <Modal.Header title="Edit Title" />
          <Modal.Body>
            <TextInput value={title} onChangeText={setTitle}  />
          </Modal.Body>
          <Modal.Footer>
            <HStack gap={15}>
              <ModalButton title="Cancel" textStyle={styles.btnText} style={styles.cancelBTN} onPress={() => setIsEditTitleVisible(false)} />
              <ModalButton title="Save"  textStyle={styles.btnText} style={styles.saveBTN} onPress={saveChange} />
            </HStack>
          </Modal.Footer>
        </Modal.Container>
      </Modal>
    )
}

export const EditRatingModal = () =>{

    const theme = React.useContext(ThemeContext);
    const styles = React.useMemo(() => makeStyles(theme), [theme]);

    const currentTask = useStore((state) => state.currentTask);
    const [difficulty, setDifficulty] = useState(currentTask?.difficulty || 0)
    
    const visible = useStore((state) => state.isEditRatingVisible);
    const updateDifficulty = useStore((state) => state.updateDifficulty);
    const setIsEditRatingVisible = useStore((state) => state.setIsEditRatingVisible);

    const saveChange = () => {
      if(difficulty)
        updateDifficulty(difficulty)
    }

    return(
        <Modal isVisible={visible}>
            <Modal.Container>
                <Modal.Header title="Edit Rating" />
                <Modal.Body>
                    <VStack>
                      <Icon
                        name={formatDifficultyToString(difficulty)}
                        color={formatDifficultyToHex(difficulty)}
                        size={60}
                      />
                      <Slider
                        style={styles.slider}
                        step={1}
                        value={0}
                        minimumValue={0}
                        maximumValue={2}
                        minimumTrackTintColor={theme.colors.danger}
                        maximumTrackTintColor={theme.colors.primary}
                        trackStyle={styles.track}
                        thumbSize={30}
                        thumbTintColor={theme.colors.text}
                        onValueChange={setDifficulty}
                      />
                    </VStack>
                </Modal.Body> 
                <Modal.Footer>
                    <HStack gap={15}>
                    <ModalButton style={styles.cancelBTN} textStyle={styles.btnText} title="Cancel" onPress={() => setIsEditRatingVisible(false)} />
                    <ModalButton style={styles.saveBTN}   textStyle={styles.btnText} title="Save" onPress={saveChange} />
                    </HStack>
                </Modal.Footer>
            </Modal.Container>
      </Modal>
    )
}

export const EditDescriptionModal = () =>{

    const theme = React.useContext(ThemeContext);
    const styles = React.useMemo(() => makeStyles(theme), [theme]);

    const currentIndex = useStore((state) => state.activeIndex);
    const currentTask = useStore((state) => state.currentTask);
    const [description, setDescription] = useState(currentTask?.description || "")
    
    const visible = useStore((state) => state.isEditDescriptionVisible);
    const updateDescription = useStore((state) => state.updateDescription);
    const setIsEditDescriptionVisible = useStore((state) => state.setIsEditDescriptionVisible);

    const saveChange = () => {
      if(description)
        updateDescription(description)
    }

    
    useEffect(()=>{
      console.log("currentTask ", currentTask?.description)
      setDescription(currentTask?.description || "")
    },[visible])

    return(
        <Modal isVisible={visible}>
        <Modal.Container>
          <Modal.Header title="Edit Description" />
          <Modal.Body>
            <TextInput value={description} onChangeText={setDescription}  />
          </Modal.Body>
          <Modal.Footer>
            <HStack gap={15}>
              <ModalButton style={styles.cancelBTN} textStyle={styles.btnText} title="Cancel" onPress={() => setIsEditDescriptionVisible(false)} />
              <ModalButton style={styles.saveBTN}   textStyle={styles.btnText}  title="Save" onPress={saveChange} />
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
    },
    slider:{
      width: 200, 
      height: 80,

    },
    track:{
      height: 20,
    }
  });