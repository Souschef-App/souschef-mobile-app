import React, { useState } from "react";
import { StyleSheet, Text, TextInput } from "react-native";
import {
  Button,
  Divider,
  HStack,
  Icon,
  TextButton,
  VStack,
  ModalIconButton
} from "../../../../../components";

import { Ingredient, Kitchenware, Task } from "../../../../../data/types";
import { ButtonStyle, InputStyle, TextStyle, Theme } from "../../../../../styles";
import { ThemeContext } from "../../../../../contexts/AppContext";

import { EditItemList, EditRowItem } from "./EditItemList";
import useStore from "../../../../../data/store";
import { 
  formatDifficultyToHex,
  formatDifficultyToString,
  formatIngredientQuantity 
} from "../../../../../utils/format";
import uuid from 'react-native-uuid';
import { Picker } from "@react-native-picker/picker";
import Dependency from "data/types/dependency";
import { unitToString } from "../../../../../utils/conversion";

export type TaskAvailaleProps = {
  task: Task;
};

const TaskEditView = ({task}: TaskAvailaleProps) => {
  // Theme
  const theme = React.useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);

  // const [isEditTItleVisible, setIsEditTitleVisible] = useState(false) 
  // const [isEditDescriptionVisible, setIsEditDescriptionVisible] = useState(false) 
  // const [isEditRatingVisible, setIsEditDifficultyVisible] = useState(false) 
  // const [isEditDurationVisible, setIsEditDurationVisible] = useState(false) 
  // const [isEditIngredientsVisible, setIsEditIngredientsVisible] = useState(false) 
  // const [isEditKitchenwareVisible, setIsEditIKitchenwareVisible] = useState(false) 

  const isEditTItleVisible = useStore((state) => state.isEditTItleVisible);
  const isEditDescriptionVisible = useStore((state) => state.isEditDescriptionVisible);
  const isEditRatingVisible = useStore((state) => state.isEditRatingVisible);
  const isEditDurationVisible = useStore((state) => state.isEditDurationVisible);
  const isEditIngredientsVisible = useStore((state) => state.isEditIngredientsVisible);
  const isEditKitchenwareVisible = useStore((state) => state.isEditKitchenwareVisible);
  const isEditDependenciesVisible = useStore((state) => state.isEditDependenciesVisible);

  const setIsEditTitleVisible = useStore((state) => state.setIsEditTItleVisible);
  const setIsEditDescriptionVisible = useStore((state) => state.setIsEditDescriptionVisible);
  const setIsEditDifficultyVisible = useStore((state) => state.setIsEditRatingVisible);
  const setIsEditDurationVisible = useStore((state) => state.setIsEditDurationVisible);
  const setIsEditIngredientsVisible = useStore((state) => state.setIsEditIngredientsVisible);
  const setIsEditKitchenwareVisible = useStore((state) => state.setIsEditKitchenwareVisible);
  const setIsEditDependencyVisible = useStore((state) => state.setIsEditDependencyVisible);

  const [taskTitle, setTaskTitle]              = useState(task.title)
  const [taskDescription, setTaskDescription]  = useState(task.description)
  const [taskDifficulty, setTaskDifficulty]    = useState(task.difficulty)
  const [taskIngredients, setTaskIngredients]  = useState(task.ingredients)
  const [taskKitchenware, setTaskKitchenware]  = useState(task.kitchenware)

  const updateRecipe = useStore((state) => state.updateRecipeTask);

  return (
    <VStack p={theme.spacing.m}>
      <VStack gap={theme.spacing.xl}>
        <VStack flexMain={false} gap={theme.spacing.s}>
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
            <Button style={styles.highlightEdit} onPress={() => setIsEditDurationVisible(true)}>
              <HStack flexMain={false} gap={theme.spacing.s}>
                <Icon name="timer" color={theme.colors.text} size={24} />
                <Text style={styles.timerText}>{`~${task.duration} min`}</Text>
              </HStack>
            </Button>
            <Divider thickness={3} color={theme.colors.background2} />

            <Button style={styles.highlightEdit} onPress={()=>setIsEditDifficultyVisible(true)}>
              <Icon
                  name={formatDifficultyToString(task.difficulty)}
                  color={formatDifficultyToHex(task.difficulty)}
                  size={24}
                />
            </Button>
          </HStack>
        </VStack>
        <Button style={styles.highlightEdit} onPress={() => setIsEditDescriptionVisible(true)}>
          <Text style={TextStyle.h3}>{task.description}</Text>
        </Button>
        <VStack
          flexMain={false}
          pVH={{ h: theme.spacing.m }}
          gap={theme.spacing.l}
        >
          <EditItemList title="Ingredients" icon="ingredient">
              {
                task.ingredients.map((ingredient : Ingredient, index : number) => (
                  <EditRowItem key={index} onEdit={()=>setIsEditIngredientsVisible(true)} onDelete={()=>console.log("delete")}>
                    <HStack justifyContent="flex-start" gap={5}>
                      <Text>{ingredient.name}</Text>
                      <Text>{ingredient.quantity}</Text>
                      {/* <Text>{unitToString[ingredient.unit]}</Text> */}
                    </HStack>
                  </EditRowItem>
                ))
              }
          </EditItemList>

          <EditItemList title="Kitchenware" icon="kitchenware">
              {
                task.kitchenware.map((kitchenitem : Kitchenware, index : number) => (
                  <EditRowItem key={index} onEdit={()=>setIsEditKitchenwareVisible(true)} onDelete={()=>console.log("delete")}>
                    <HStack justifyContent="flex-start" gap={5}>
                      <Text>{kitchenitem.name}</Text>
                      <Text>{kitchenitem.quantity}</Text>
                    </HStack>
                  </EditRowItem>
                ))
              }
          </EditItemList>

          <EditItemList title="Dependencies" icon="clipboard">
              {
                task.dependencies.map((dependency : Dependency, index : number) => (
                  <EditRowItem key={index} onEdit={()=>setIsEditDependencyVisible(true)} onDelete={()=>console.log("delete")}>
                    <HStack justifyContent="flex-start" gap={5}>
                      <Text>{dependency.title}</Text>
                    </HStack>
                  </EditRowItem>
                ))
              }
          </EditItemList>
        </VStack>
      </VStack>  

      

    </VStack>
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
      textAlign: "center"
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
      alignSelf: "stretch",
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
