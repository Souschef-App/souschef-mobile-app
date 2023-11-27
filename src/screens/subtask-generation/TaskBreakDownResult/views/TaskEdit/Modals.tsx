import { HStack, Icon, ModalButton, ModalIconButton, VStack } from "../../../../../components"
import React, { useEffect, useState } from "react"
import { StyleSheet, TextInput, Text } from "react-native"

import { Modal } from "../../../../../components/Modal"
import { TimerPickerModal } from "react-native-timer-picker"
import { LinearGradient } from "react-native-svg"

import { ThemeContext } from "../../../../../contexts/AppContext"
import { TextStyle, ButtonStyle, Theme, InputStyle } from "../../../../../styles"

import { 
  formatDifficultyToHex,
  formatDifficultyToString,
} from "../../../../../utils/format";

import { Slider } from '@react-native-assets/slider'
import useStore from "../../../../../data/store"
import { COOKING_UNIT, Fraction, Ingredient, Task } from "../../../../../data/types"
import { Picker } from "@react-native-picker/picker"
import { unitToString } from "../../../../../utils/conversion"

export type EditModalProps = {
    isVisible : boolean,
    task : Task
    handleModal : (state : boolean) => void,
    // saveFunc : () => void,
}

export interface EditTitleModalProps extends EditModalProps {
    inputValue? : string,
}

export const EditTitleModal = (props : EditModalProps) =>{

    const theme = React.useContext(ThemeContext);
    const styles = React.useMemo(() => makeStyles(theme), [theme]);

    const [title, setTitle] = useState(props.task.title)
    const updateTitle = useStore((state) => state.updateTitle);

    const saveChange = () => {
      if(title)
        updateTitle(title)
        props.handleModal(false)
    }

    return(
      <Modal isVisible={props.isVisible}>
        <Modal.Container>
          <Modal.Header title="Edit Title" />
          <Modal.Body>
            <TextInput value={title} onChangeText={setTitle}  />
          </Modal.Body>
          <Modal.Footer>
            <HStack gap={15}>
              <ModalButton title="Cancel" textStyle={styles.btnText} style={styles.cancelBTN} onPress={() => props.handleModal(false)} />
              <ModalButton title="Save"  textStyle={styles.btnText} style={styles.saveBTN} onPress={saveChange} />
            </HStack>
          </Modal.Footer>
        </Modal.Container>
      </Modal>
    )
}

export const EditRatingModal = (props : EditModalProps) =>{

    const theme = React.useContext(ThemeContext);
    const styles = React.useMemo(() => makeStyles(theme), [theme]);

    const [difficulty, setDifficulty] = useState(props.task.difficulty)

    const updateDifficulty = useStore((state) => state.updateDifficulty);


    const saveChange = () => {
      if(difficulty)
        updateDifficulty(difficulty)
      props.handleModal(false)
    }

    return(
        <Modal isVisible={props.isVisible}>
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
                    <ModalButton style={styles.cancelBTN} textStyle={styles.btnText} title="Cancel" onPress={() => props.handleModal(false)} />
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
      // console.log("currentTask ", currentTask?.description)
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

export const EditTimerModal = (props : EditModalProps) =>{

  const updateDuration = useStore((state) => state.updateDuration);

    const saveChange = (mins : number) => {
      updateDuration(mins)
      props.handleModal(false)
    }

    return(
        <TimerPickerModal
            visible={props.isVisible}
            setIsVisible={props.handleModal}
            onConfirm={(pickedDuration) => saveChange(pickedDuration.minutes)}
            modalTitle="Set Duration"
            initialMinutes={props.task.duration}
            onCancel={() => props.handleModal(false)}
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

export const EditIngredientModal = () =>{

    const theme = React.useContext(ThemeContext);
    const styles = React.useMemo(() => makeStyles(theme), [theme]);

    const currentIndex = useStore((state) => state.activeIndex);
    const currentTask  = useStore((state) => state.currentTask);

    const currentIngredientIndex = useStore((state) => state.currentIngredientIndex);

    
    const visible = useStore((state) => state.isEditIngredientsVisible);
    const updateIngredient = useStore((state) => state.updateIngredient);
    const setIsEditIngredientsVisible = useStore((state) => state.setIsEditIngredientsVisible);

    const [name, setName] = useState("")
    const [whole, setWhole] = useState("0")
    const [numerator, setNumerator] = useState("0")
    const [denominator, setDenominator] = useState("0")
    const [unit, setUnit] = useState(COOKING_UNIT.None)

    console.log("name", currentTask?.ingredients[currentIngredientIndex].name)
    console.log("name", name)

    const saveChange = () => {
      if(currentTask)
      {
        const updatedIngredient : Ingredient = {
          id : currentTask.ingredients[currentIngredientIndex].id,
          name :  name, 
          quantity : {whole : parseInt(whole), numerator: parseInt(numerator), denominator: parseInt(denominator)}, 
          unit : unit
        };

        updateIngredient(updatedIngredient, currentIngredientIndex)
      }
    }

    useEffect(()=>{
      {
        if(currentTask != null)
        {
          setName(currentTask.ingredients[currentIngredientIndex].name)
          setWhole(currentTask.ingredients[currentIngredientIndex].quantity.whole.toString())
          setDenominator(currentTask.ingredients[currentIngredientIndex].quantity.numerator.toString())
          setNumerator(currentTask.ingredients[currentIngredientIndex].quantity.denominator.toString())
          setUnit(currentTask.ingredients[currentIngredientIndex].unit)
        }
      }

    },[visible])

    return(
        <Modal isVisible={visible}>
        <Modal.Container>
          <Modal.Header title="Edit Ingredient" />
          <Modal.Body>
            <VStack p={10}>
              <Text style={styles.addIngridientTitle}>Add Ingredients</Text>
              <TextInput value={name} onChangeText={setName} style={styles.custInput} />
              <HStack>
                <Text>Quantity:</Text>
                <TextInput value={whole} onChangeText={setWhole} style={styles.custInput} />
                <Text>&</Text>
                <TextInput value={numerator} onChangeText={setNumerator} style={styles.custInput} />
                <Text>/</Text>
                <TextInput value={denominator} onChangeText={setDenominator} style={styles.custInput} />
              </HStack>

              <HStack justifyContent="space-between" >
                <Text>Unit:</Text>
                <Picker style={{backgroundColor: "#fff", width: 200, height: 60}} selectedValue={unit} onValueChange={(itemValue, itemIndex) => setUnit(itemValue)}>
                  {
                     Object.entries(unitToString).map((entry, count) =>{
                      return <Picker.Item key={count} label={entry[1]} value={entry[0]} />
                     })
                  }
                </Picker>
              </HStack>
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            <HStack gap={15}>
              <ModalButton style={styles.cancelBTN} textStyle={styles.btnText} title="Cancel" onPress={() => setIsEditIngredientsVisible(false, currentIngredientIndex)} />
              <ModalButton style={styles.saveBTN}  textStyle={styles.btnText}  title="Save" onPress={saveChange} />
            </HStack>
          </Modal.Footer>
        </Modal.Container>
      </Modal>
    )
}

// const AddIngredient = (props : any) => {

//   const [name, setName] = useState("")
//   const [quantity, setQuantity] = useState("")
//   const [unit, setUnit] = useState("")

//   const addIngredient = () =>{
//     const ingredient : Ingredient = {
//       id: uuid.v4().toString(),
//       name: name,
//       quantity: {whole: 0, numerator: 0, denominator: 0},
//       unit: 0
//     }

//     const taskIngredientsClone = props.taskIngredients

//     taskIngredientsClone.push(ingredient)

//     // console.log(taskIngredientsClone)

//     props.setTaskIngredients([...taskIngredientsClone])
//   }

//   return(

//   )
// }

export interface EditKitchenwareModalProps extends EditModalProps {

}

export const EditKitchenwareModal = ({index} : {index : number}) =>{

    const theme = React.useContext(ThemeContext);
    const styles = React.useMemo(() => makeStyles(theme), [theme]);

    
    const currentIndex = useStore((state) => state.activeIndex);
    const currentTask  = useStore((state) => state.currentTask);
    const [description, setDescription] = useState(currentTask?.description || "")
    
    const visible = useStore((state) => state.isEditIngredientsVisible);
    const updateDescription = useStore((state) => state.updateDescription);
    const setIsEditKitchenwareVisible = useStore((state) => state.setIsEditKitchenwareVisible);

    const saveChange = () => {
      if(description)
        updateDescription(description)
    }

    useEffect(()=>{
      setDescription(currentTask?.description || "")
    },[visible])

    return(
        <Modal isVisible={visible}>
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
              <ModalButton style={styles.cancelBTN} textStyle={styles.btnText} title="Cancel" onPress={() => setIsEditKitchenwareVisible(false, index)} />
              <ModalButton style={styles.saveBTN}  textStyle={styles.btnText}  title="Save" onPress={saveChange} />
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
    },
    custInput:{
      ...InputStyle.underline,
      backgroundColor: theme.colors.background,
      flexGrow: 1,
      borderRadius: theme.spacing.s
    },
    custInput2:{
      ...InputStyle.underline,
      backgroundColor: theme.colors.background,
      width: 60,
      borderRadius: theme.spacing.s
    },
    addIngridientTitle:{
      ...TextStyle.h2,
      color: theme.colors.background
    }
  });