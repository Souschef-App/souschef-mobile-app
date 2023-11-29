//#region Imports
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
import { COOKING_UNIT, Fraction, Ingredient, Kitchenware, Task } from "../../../../../data/types"
import { Picker } from "@react-native-picker/picker"
import { unitToString } from "../../../../../utils/conversion"
import uuid from 'react-native-uuid';
import Dependency from "data/types/dependency"

//#endregion

export type EditModalProps = {
    isVisible : boolean,
    task : Task
    handleModal : (state : boolean) => void,
}

//#region EditTitleModal
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
//#endregion

//#region EditRatingModal
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
                        value={props.task.difficulty}
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
//#endregion

//#region EditDescriptionModal
export const EditDescriptionModal = (props : EditModalProps) =>{

    const theme = React.useContext(ThemeContext);
    const styles = React.useMemo(() => makeStyles(theme), [theme]);

    const [description, setDescription] = useState(props.task.description)
    const updateDescription = useStore((state) => state.updateDescription);

    const saveChange = () => {
      if(description)
        updateDescription(description)
      props.handleModal(false)
    }

    return(
        <Modal isVisible={props.isVisible}>
        <Modal.Container>
          <Modal.Header title="Edit Description" />
          <Modal.Body>
            <TextInput value={description} onChangeText={setDescription}  />
          </Modal.Body>
          <Modal.Footer>
            <HStack gap={15}>
              <ModalButton style={styles.cancelBTN} textStyle={styles.btnText} title="Cancel" onPress={() => props.handleModal(false)} />
              <ModalButton style={styles.saveBTN}   textStyle={styles.btnText}  title="Save" onPress={saveChange} />
            </HStack>
          </Modal.Footer>
        </Modal.Container>
      </Modal>
    )
}
//#endregion

//#region EditTimerModal
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
//#endregion

//#region EditIngredientModal
export const EditIngredientModal = (props : EditModalProps) =>{

    const theme = React.useContext(ThemeContext);
    const styles = React.useMemo(() => makeStyles(theme), [theme]);

    const currentIngredientIndex = useStore((state) => state.currentIngredientIndex);
    
    // const visible = useStore((state) => state.isEditIngredientsVisible);
    const updateIngredient = useStore((state) => state.updateIngredient);

    const [name, setName] = useState("")
    const [whole, setWhole] = useState("0")
    const [numerator, setNumerator] = useState("0")
    const [denominator, setDenominator] = useState("0")
    const [unit, setUnit] = useState(COOKING_UNIT.None)

    const saveChange = () => {
      if(props.task)
      {
        const updatedIngredient : Ingredient = {
          id : props.task.ingredients[currentIngredientIndex].id,
          name :  name, 
          quantity : {whole : parseInt(whole), numerator: parseInt(numerator), denominator: parseInt(denominator)}, 
          unit : unit
        };

        updateIngredient(updatedIngredient, currentIngredientIndex)
        props.handleModal(false)
      }
    }

    useEffect(()=>{
      {
        if(props.task != null)
        {
          setName(props.task.ingredients[currentIngredientIndex].name)
          setWhole(props.task.ingredients[currentIngredientIndex].quantity.whole.toString())
          setDenominator(props.task.ingredients[currentIngredientIndex].quantity.numerator.toString())
          setNumerator(props.task.ingredients[currentIngredientIndex].quantity.denominator.toString())
          setUnit(props.task.ingredients[currentIngredientIndex].unit)
        }
      }

    },[props.isVisible])

    return(
        <Modal isVisible={props.isVisible}>
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
              <ModalButton style={styles.cancelBTN} textStyle={styles.btnText} title="Cancel" onPress={() => props.handleModal(false)} />
              <ModalButton style={styles.saveBTN}  textStyle={styles.btnText}  title="Save" onPress={saveChange} />
            </HStack>
          </Modal.Footer>
        </Modal.Container>
      </Modal>
    )
}
//#endregion

//#region EditKitchenwareModal
export const EditKitchenwareModal = (props : EditModalProps) =>{

    const theme = React.useContext(ThemeContext);
    const styles = React.useMemo(() => makeStyles(theme), [theme]);

    const currentKitchenwareIndex = useStore((state) => state.currentKitchenwareIndex);

    const [name, setName] = useState("")
    const [quantity, setQuantity] = useState("0")
    
    const updateKitchenware = useStore((state) => state.updateKitchenware);

    const saveChange = () => {

      const kitchenware : Kitchenware = {
        id : props.task.kitchenware[currentKitchenwareIndex].id, 
        name:name,
        quantity: parseInt(quantity)
      }

      if(kitchenware)
        updateKitchenware(kitchenware, currentKitchenwareIndex)

      props.handleModal(false)
    }

    useEffect(()=>{

      if(props.task.kitchenware.length > currentKitchenwareIndex)
      {
        setName(props.task.kitchenware[currentKitchenwareIndex].name)
        setQuantity(props.task.kitchenware[currentKitchenwareIndex].quantity.toString())
      }
    },[props.isVisible])

    return(
        <Modal isVisible={props.isVisible}>
        <Modal.Container>
          <Modal.Header title="Edit Kitchenware" />
          <Modal.Body>
            <VStack>
              <TextInput value={name} onChangeText={setName} style={styles.custInput} />
              <HStack>
                <Text>Quantity:</Text>
                <TextInput value={quantity} onChangeText={setQuantity} style={styles.custInput} />
              </HStack>
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            <HStack gap={15}>
              <ModalButton style={styles.cancelBTN} textStyle={styles.btnText} title="Cancel" onPress={() => props.handleModal(false)} />
              <ModalButton style={styles.saveBTN}  textStyle={styles.btnText}  title="Save" onPress={saveChange} />
            </HStack>
          </Modal.Footer>
        </Modal.Container>
      </Modal>
    )
}
//#endregion

//#region ConfimDeleteModal
interface ConfirmDeleteItemProps extends EditModalProps {
  title: string,
  deleteFunc : () => void,
}

export const ConfirmDeleteModal = (props : ConfirmDeleteItemProps) =>{

  const theme = React.useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);

  const confirmDelete = () => {
    props.deleteFunc()
    props.handleModal(false)
  }

  return(
      <Modal isVisible={props.isVisible}>
      <Modal.Container>
        <Modal.Header title={props.title} />
        <Modal.Footer>
          <HStack gap={15}>
            <ModalButton style={styles.cancelBTN} textStyle={styles.btnText} title="Cancel" onPress={() => props.handleModal(false)} />
            <ModalButton style={styles.saveBTN}   textStyle={styles.btnText}  title="Delete" onPress={confirmDelete} />
          </HStack>
        </Modal.Footer>
      </Modal.Container>
    </Modal>
  )
}

//#endregion

//#region AddIngredientModal
export const AddIngredientModal = (props : EditModalProps) =>{

  const theme = React.useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);

  const addIngredient = useStore((state) => state.addIngredient);

  const [name, setName] = useState("")
  const [whole, setWhole] = useState("0")
  const [numerator, setNumerator] = useState("0")
  const [denominator, setDenominator] = useState("0")
  const [unit, setUnit] = useState(COOKING_UNIT.None)

  const saveChange = () => {
    if(props.task)
    {
      const newIngredient : Ingredient = {
        id : uuid.v4().toString(),
        name :  name, 
        quantity : {whole : parseInt(whole), numerator: parseInt(numerator), denominator: parseInt(denominator)}, 
        unit : unit
      };

      addIngredient(props.task, newIngredient)
      props.handleModal(false)
    }
  }

  return(
      <Modal isVisible={props.isVisible}>
      <Modal.Container>
        <Modal.Header title="Add Ingredient" />
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
            <ModalButton style={styles.cancelBTN} textStyle={styles.btnText} title="Cancel" onPress={() => props.handleModal(false)} />
            <ModalButton style={styles.saveBTN}  textStyle={styles.btnText}  title="Save" onPress={saveChange} />
          </HStack>
        </Modal.Footer>
      </Modal.Container>
    </Modal>
  )
}
//#endregion

//#region AddKitchenwareModal
export const AddKitchenwareModal = (props : EditModalProps) =>{

  const theme = React.useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);

  const [name, setName] = useState("")
  const [quantity, setQuantity] = useState("0")
  
  const addKitchenware = useStore((state) => state.addKitchenware);

  const saveChange = () => {

    const kitchenware : Kitchenware = {
      id : uuid.v4().toString(),
      name:name,
      quantity: parseInt(quantity)
    }

    if(kitchenware)
      addKitchenware(props.task, kitchenware)

    props.handleModal(false)
  }

  return(
      <Modal isVisible={props.isVisible}>
      <Modal.Container>
        <Modal.Header title="Add Kitchenware" />
        <Modal.Body>
          <VStack>
            <TextInput value={name} onChangeText={setName} style={styles.custInput} />
            <HStack>
              <Text>Quantity:</Text>
              <TextInput value={quantity} onChangeText={setQuantity} style={styles.custInput} />
            </HStack>
          </VStack>
        </Modal.Body>
        <Modal.Footer>
          <HStack gap={15}>
            <ModalButton style={styles.cancelBTN} textStyle={styles.btnText} title="Cancel" onPress={() => props.handleModal(false)} />
            <ModalButton style={styles.saveBTN}  textStyle={styles.btnText}  title="Save" onPress={saveChange} />
          </HStack>
        </Modal.Footer>
      </Modal.Container>
    </Modal>
  )
}
//#endregion

//#region AddDependencyModal
export const AddDependencyModal = (props : EditModalProps) =>{

  const theme = React.useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);

  const [dep, setDep] = useState<string>()
  const addDependency = useStore((state) => state.addDependency);

  const brokenDownRecipe = useStore((state) => state.brokenDownRecipe);

  const dict : { [key: string]: string } = {}

  brokenDownRecipe?.map((item)=>{
    dict[item.id] = item.title
  })

  const saveChange = () => {
    if(dep)
      addDependency(props.task, {id: dep, title: dict[dep] })
    props.handleModal(false)
  }

  return(
      <Modal isVisible={props.isVisible}>
      <Modal.Container>
        <Modal.Header title="Add Dependency" />
        <Modal.Body>
          <Picker style={{backgroundColor: "#fff", width: 200, height: 60}} selectedValue={dep} onValueChange={(itemValue, itemIndex) => setDep(itemValue)}>
            {
              brokenDownRecipe?.map((entry, count) =>{
                return <Picker.Item key={count} label={entry.title} value={entry.id} />
              })
            }
          </Picker>
        </Modal.Body>
        <Modal.Footer>
          <HStack gap={15}>
            <ModalButton style={styles.cancelBTN} textStyle={styles.btnText} title="Cancel" onPress={() => props.handleModal(false)} />
            <ModalButton style={styles.saveBTN}   textStyle={styles.btnText}  title="Save" onPress={saveChange} />
          </HStack>
        </Modal.Footer>
      </Modal.Container>
    </Modal>
  )
}
//#endregion

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