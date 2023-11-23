import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput } from "react-native";
import {
  Button,
  Divider,
  HStack,
  Icon,
  IconButton,
  Input,
  TextButton,
  VStack,
} from "../../../components";

import { DIFFICULTY, Ingredient, Kitchenware, Task } from "../../../data/types";
import { ButtonStyle, InputStyle, TextStyle, Theme } from "../../../styles";
import { ThemeContext } from "../../../contexts/AppContext";
import { Modal } from "../../../components/Modal";

import { EditDropdownList } from "./EditDropDownList";
import useStore from "../../../data/store";
import ModalIconButton from "./ModalIconButton";
import { TimerPickerModal } from "react-native-timer-picker";
import { LinearGradient } from "expo-linear-gradient"; 
import { ScrollView } from "react-native-gesture-handler";
import { formatIngredientQuantity } from "../../../utils/format";
import uuid from 'react-native-uuid';
import { Picker } from "@react-native-picker/picker";

export type TaskAvailaleProps = {
  task: Task;
};

const ModalButton = (props : any) =>{
  
  return(
    <Pressable style={props.style} onPress={() => props.onPress()} >
      <Text style={props.textStyle}>{props.title}</Text>
    </Pressable>
  )
}

const TaskEditView = (props: TaskAvailaleProps) => {
  // Theme
  const theme = React.useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);

  const task = props.task;

  const [isIngredientOpen, setIsIngredientOpen] = useState<boolean>(false);
  const [isKitchenwareOpen, setIsKitchenwareOpen] = useState<boolean>(false);
  const [isDependenciesOpen, setIsDependenciesOpen] = useState<boolean>(false);

  const [isEditTItleVisible, setIsEditTitleVisible] = useState(false) 
  const [isEditDescriptionVisible, setIsEditDescriptionVisible] = useState(false) 
  const [isEditRatingVisible, setIsEditDifficultyVisible] = useState(false) 
  const [isEditDurationVisible, setIsEditDurationVisible] = useState(false) 
  const [isEditIngredientsVisible, setIsEditIngredientsVisible] = useState(false) 
  const [isEditKitchenwareVisible, setIsEditIKitchenwareVisible] = useState(false) 

  const [taskTitle, setTaskTitle]               = useState(task.title)
  const [taskDescription, setTaskDescription]   = useState(task.description)
  const [taskDifficulty, setTaskDifficulty]     = useState(task.difficulty)
  const [taskIngredients, setTaskIngredients]   = useState(task.ingredients)
  const [taskKitchenware, setTaskKitchenware]   = useState(task.kitchenware)

  const updateRecipe = useStore((state) => state.updateRecipeTask);

  const updateTitle = () =>{
    const cloneTask = props.task;
    cloneTask.title = taskTitle
    updateRecipe(cloneTask)
    setIsEditTitleVisible(false)
  }

  const updateDescription = () =>{
    const cloneTask = props.task;
    cloneTask.description = taskDescription
    updateRecipe(cloneTask)
    setIsEditDescriptionVisible(false)
  }

  const updateDifficulty = () =>{
    const cloneTask = props.task;
    cloneTask.difficulty = taskDifficulty
    updateRecipe(cloneTask)
    setIsEditDifficultyVisible(false)
  }
  
  const updateDuration = (duration : number) =>{
    const cloneTask = props.task;
    cloneTask.duration = duration
    updateRecipe(cloneTask)
    setIsEditDurationVisible(false);
  }

  const updateIngredients = () =>{
    

    const cloneTask = props.task;
    cloneTask.ingredients = taskIngredients
    updateRecipe(cloneTask)
    setIsEditIngredientsVisible(false);
  }

  const updateKitchenware = () =>{
    
    const cloneTask = props.task;
    cloneTask.kitchenware = taskKitchenware
    updateRecipe(cloneTask)
    setIsEditIKitchenwareVisible(false);
  }

  return (
    <VStack p={theme.spacing.m}>
      <VStack gap={theme.spacing.xl}>
        <VStack flexMain={false} gap={theme.spacing.s}>
          {/* <HStack justifyContent="space-between">
            <IconButton icon="pencil" onPress={()=> setCanEdit(!canEdit)} />
            <IconButton style={styles.retry} icon="retry" onPress={() => { }} color="#fff" iconSize={30} />
          </HStack> */}
          {/* <Text style={styles.taskTitle}>{task.title}</Text> */}
          <TextButton 
            style={styles.highlightEdit} 
            textStyle={styles.taskTitle} 
            title={task.title} 
            onPress={() => setIsEditTitleVisible(true)} />

          <HStack
            flexMain={false}
            gap={theme.spacing.m}
            style={{ height: theme.spacing.l }}
          >
            <HStack flexMain={false} gap={theme.spacing.s}>
              <Icon name="timer" color={theme.colors.text} size={24} />
              <Button style={styles.highlightEdit} onPress={() => setIsEditDurationVisible(true)}>
                <Text style={styles.timerText}>{`~${task.duration} min`}</Text>
              </Button>
            </HStack>
            <Divider thickness={3} color={theme.colors.background2} />

            <Button style={styles.highlightEdit} onPress={()=>setIsEditDifficultyVisible(true)}>
              <HStack flexMain={false} gap={theme.spacing.s}>
                <Icon name="star" color={theme.colors.highlight2} size={24} />
                <Icon
                  name={
                    task.difficulty > DIFFICULTY.Easy ? "star" : "star-outline"
                  }
                  color={theme.colors.highlight2}
                  size={24}
                />
                <Icon
                  name={
                    task.difficulty > DIFFICULTY.Medium
                      ? "star"
                      : "star-outline"
                  }
                  color={theme.colors.highlight2}
                  size={24}
                />
              </HStack>
            </Button>
          </HStack>
        </VStack>
        <Button style={styles.highlightEdit} onPress={() => setIsEditDescriptionVisible(true)}>
          <Text style={TextStyle.h3}>{task.description}</Text>
        </Button>
        <VStack
          flexMain={false}
          pVH={{ h: theme.spacing.m }}
          gap={isIngredientOpen ? 10 : theme.spacing.l}
        >
          <EditDropdownList 
            title="Ingredients"
            icon="ingredient"
            theme={theme} 
            isOpen={isIngredientOpen} 
            setIsOpen={() => setIsIngredientOpen(!isIngredientOpen)} 
            items={task.ingredients}
            styles={styles}
            onEdit={()=> setIsEditIngredientsVisible(true)}/>

          <EditDropdownList 
            title="Kitchenware"
            icon="kitchenware"
            theme={theme} 
            isOpen={isKitchenwareOpen}
            setIsOpen={() => setIsKitchenwareOpen(!isKitchenwareOpen)} 
            items={task.kitchenware}
            styles={styles}
            onEdit={()=> setIsEditIKitchenwareVisible(true)}/>

          <EditDropdownList 
            title="Dependencies"
            icon="clipboard"
            theme={theme} 
            isOpen={isDependenciesOpen} 
            setIsOpen={() => setIsDependenciesOpen(!isDependenciesOpen)} 
            items={task.dependencies}
            styles={styles}/>
        </VStack>
      </VStack>  

      <Modal isVisible={isEditTItleVisible}>
        <Modal.Container>
          <Modal.Header title="Edit Title" />
          <Modal.Body>
            <TextInput value={taskTitle} onChangeText={setTaskTitle}  />
          </Modal.Body>
          <Modal.Footer>
            <HStack gap={15}>
              <ModalButton title="Cancel" textStyle={styles.btnText} style={styles.cancelBTN} onPress={() => setIsEditTitleVisible(false)} />
              <ModalButton title="Save"  textStyle={styles.btnText} style={styles.saveBTN} onPress={() => updateTitle()} />
            </HStack>
          </Modal.Footer>
        </Modal.Container>
      </Modal>
      <Modal isVisible={isEditRatingVisible}>
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
              <ModalButton style={styles.cancelBTN} textStyle={styles.btnText} title="Cancel" onPress={() => setIsEditDifficultyVisible(false)} />
              <ModalButton style={styles.saveBTN}   textStyle={styles.btnText} title="Save" onPress={updateDifficulty} />
            </HStack>
          </Modal.Footer>
        </Modal.Container>
      </Modal>
      <Modal isVisible={isEditDescriptionVisible}>
        <Modal.Container>
          <Modal.Header title="Edit Description" />
          <Modal.Body>
            <Input value={taskDescription} onChange={setTaskDescription}  />
          </Modal.Body>
          <Modal.Footer>
            <HStack gap={15}>
              <ModalButton style={styles.cancelBTN} textStyle={styles.btnText} title="Cancel" onPress={() => setIsEditDescriptionVisible(false)} />
              <ModalButton style={styles.saveBTN}   textStyle={styles.btnText}  title="Save" onPress={updateDescription} />
            </HStack>
          </Modal.Footer>
        </Modal.Container>
      </Modal>
      <TimerPickerModal
        visible={isEditDurationVisible}
        setIsVisible={setIsEditDurationVisible}
        onConfirm={(pickedDuration) => {
            updateDuration(pickedDuration.minutes);
        }}
        modalTitle="Set Duration"
        onCancel={() => setIsEditDurationVisible(false)}
        closeOnOverlayPress
        LinearGradient={LinearGradient}
        styles={{ 
            theme: "light",
        }}
        hideHours={true}
        hideSeconds={true}
      />

      <Modal isVisible={isEditIngredientsVisible}>
        <Modal.Container>
          <Modal.Header title="Edit Ingredients" />
          <Modal.Body>
            <VStack p={10}>
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
            </VStack>

          </Modal.Body>
          <Modal.Footer>
            <HStack gap={15}>
              <ModalButton style={styles.cancelBTN} textStyle={styles.btnText} title="Cancel" onPress={() => setIsEditIngredientsVisible(false)} />
              <ModalButton style={styles.saveBTN}  textStyle={styles.btnText}  title="Save" onPress={updateIngredients} />
            </HStack>
          </Modal.Footer>
        </Modal.Container>
      </Modal>

      <Modal isVisible={isEditKitchenwareVisible}>
        <Modal.Container>
          <Modal.Header title="Edit Kitchenware" />
          <Modal.Body>
            <VStack p={10}>
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
            </VStack>

          </Modal.Body>
          <Modal.Footer>
            <HStack gap={15}>
              <ModalButton style={styles.cancelBTN} textStyle={styles.btnText} title="Cancel" onPress={() => setIsEditIKitchenwareVisible(false)} />
              <ModalButton style={styles.saveBTN}  textStyle={styles.btnText}  title="Save" onPress={updateKitchenware} />
            </HStack>
          </Modal.Footer>
        </Modal.Container>
      </Modal>
    </VStack >
  );
};

const EditItem = (props : any) =>{

  const deleteItem = () => {

    const itemClone = props.itemList

    const index = itemClone.indexOf(props.item);

    itemClone.splice(index, 1);

    props.setItemList([...itemClone])
  }

  return(
    <HStack justifyContent="space-between" style={props.styles.editRowStyle} p={10}>
      <VStack align="flex-start">
        <Text style={TextStyle.h2}>{props.item.name}</Text>
          <Text style={TextStyle.h4}>{formatIngredientQuantity(props.item)}</Text>
      </VStack>
      <ModalIconButton icon="x" color={props.theme.colors.danger} onPress={()=>deleteItem()} />
    </HStack>
  )
}

const AddIngredient = (props : any) => {

  const [name, setName] = useState("")
  const [quantity, setQuantity] = useState("")
  const [unit, setUnit] = useState("")

  const addIngredient = () =>{
    const ingredient : Ingredient = {
      id: uuid.v4().toString(),
      name: name,
      quantity: 0,
      unit: 0
    }

    const taskIngredientsClone = props.taskIngredients

    taskIngredientsClone.push(ingredient)

    console.log(taskIngredientsClone)

    props.setTaskIngredients([...taskIngredientsClone])
  }

  return(
    <VStack  align="flex-start" style={props.styles.editRowFooterStyle} p={10} gap={10}>
        <Text style={props.styles.addIngridientTitle}>Add Ingredients</Text>
        <TextInput value={name} onChangeText={setName} style={props.styles.custInput} placeholder="Name" />
        <HStack justifyContent="space-between">
          <TextInput value={quantity} onChangeText={setQuantity} style={props.styles.custInput2} placeholder="Quantity" />
          <Picker
              selectedValue="java"
              onValueChange={(itemValue, itemIndex) =>
                setUnit(itemValue)
              }>
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>
          <ModalIconButton style={props.styles.ok} color={props.theme.colors.primary} icon="check" onPress={()=>addIngredient()} />
        </HStack>
    </VStack>
  )
}

const AddKitchenware = (props : any) => {

  const [name, setName] = useState("")
  const [quantity, setQuantity] = useState("")

  const addKitchenware = () =>{
    const kitchenware : Kitchenware = {
      id: uuid.v4().toString(),
      name: name,
      quantity: 0,
    }

    const taskKitchenwareClone = props.taskKitchenware

    taskKitchenwareClone.push(kitchenware)

    console.log(taskKitchenwareClone)

    props.setTaskKitchenware([...taskKitchenwareClone])
  }

  return(
    <VStack  align="flex-start" style={props.styles.editRowFooterStyle} p={10} gap={10}>
        <Text style={props.styles.addIngridientTitle}>Add Kitchenware</Text>
        <TextInput value={name} onChangeText={setName} style={props.styles.custInput} placeholder="Name" />
        <HStack justifyContent="space-between">
          <TextInput value={quantity} onChangeText={setQuantity} style={props.styles.custInput2} placeholder="Quantity" />
          <ModalIconButton style={props.styles.ok} color={props.theme.colors.primary} icon="check" onPress={()=>addKitchenware()} />
        </HStack>
    </VStack>
  )
}


const makeStyles = (theme: Theme) =>  
  StyleSheet.create({ 
    taskTitle: {
      ...TextStyle.h1,
      fontSize: 40,
    },
    dropdownTitle: {
      ...TextStyle.h3,
      fontWeight: "bold",
    },
    completeBtn: {
      ...ButtonStyle.primary,
      alignSelf: "stretch",
      backgroundColor: theme.colors.primary,
    },
    rerollBtn: {
      ...ButtonStyle.primary,
      alignSelf: "stretch",
      backgroundColor: theme.colors.highlight,
    },
    btnIcon: {
      position: "absolute",
      left: theme.spacing.m,
    },
    btnText: {
      ...TextStyle.h2,
      fontWeight: "normal",
      color: "#fff",
    },
    timerText: {
      ...TextStyle.body,
      fontWeight: "bold",
    },
    retry: {
      backgroundColor: theme.colors.danger,
      borderRadius: 1000,
      padding: 12
    },
    highlightEdit:{
      ...ButtonStyle.editable,
      // alignSelf: "stretch",
      backgroundColor: "#2F394A33",
    },
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
    red:{
      backgroundColor: "red"
    },
    editRowStyle:{
      backgroundColor: theme.colors.background
    },
    editRowFooterStyle:{
      backgroundColor: theme.colors.highlight,
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
    ok:{
      backgroundColor: theme.colors.background,
      padding: 10,
      borderRadius: theme.spacing.xxl, 
      marginLeft: 10
    },
    addIngridientTitle:{
      ...TextStyle.h2,
      color: theme.colors.background
    }
  });

export default TaskEditView;
