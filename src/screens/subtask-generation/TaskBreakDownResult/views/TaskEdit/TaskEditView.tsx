//#region Imports
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
import { 
  formatDifficultyToHex,
  formatDifficultyToString,
  formatIngredientQuantity 
} from "../../../../../utils/format";
import uuid from 'react-native-uuid';
import Dependency from "data/types/dependency";
import { ScrollView } from "react-native-gesture-handler";
import 
{ 
  EditTitleModal,
  EditRatingModal, 
  EditDescriptionModal, 
  EditIngredientModal, 
  EditTimerModal, 
  EditKitchenwareModal, 
  ConfirmDeleteModal, 
  AddIngredientModal,
  AddKitchenwareModal,
  AddDependencyModal
} from "./Modals";
import useStore from "../../../../../data/store";
import { SaveRecipeView } from "../SaveRecipeView";
import { TaskBreakDownResultScreenProp } from "../../../../../navigation/types";

//#endregion

export type TaskAvailaleProps = {
  task: Task;
  width : number,
  index: number,
  dataLength : number,
  navigation: TaskBreakDownResultScreenProp
};

const TaskEditView = ({task, width, index, dataLength, navigation}: TaskAvailaleProps) => {
  //#region Theme
  const theme = React.useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);
  //#endregion 
  //#region Modal Visible State
  const [isEditTitleVisible,         setIsEditTitleVisible] = useState(false) 
  const [isEditDescriptionVisible,   setIsEditDescriptionVisible] = useState(false) 
  const [isEditDifficultyVisible,    setIsEditDifficultyVisible] = useState(false) 
  const [isEditDurationVisible,      setIsEditDurationVisible] = useState(false) 
  const [isEditIngredientVisible,    setIsEditIngredientVisible] = useState(false) 
  const [isEditKitchenwareVisible,   setIsEditKitchenwareVisible] = useState(false) 
  const [isDeleteIngredientVisible,  setIsDeleteIngredientVisible] = useState(false) 
  const [isDeleteKitchenwareVisible, setIsDCeleteKitchenware] = useState(false) 
  const [isDeleteDependencyVisible,  setIsDCeleteDependency] = useState(false) 
  const [isAddIngredientVisible,     setIsAddIngredientVisible] = useState(false) 
  const [isAddKitchenwareVisible,    setIsAddKitchenwareVisible] = useState(false) 
  const [isAddDependencyVisible,     setIsAddDependencyVisible] = useState(false) 
  //#endregion 

  const [editIngredientIndex, setEditIngredientIndex]   = useState<number>(0)
  const [editKitchenwareIndex, setEditKitchenwareIndex] = useState<number>(0)
  const [editDependencyIndex, setEditDependencyIndex]   = useState<number>(0)
  
  //#region Delete Methods
  const requestDeleteIngredient = (index : number) =>{
    setIsDeleteIngredientVisible(true)
    setEditIngredientIndex(index)
  }
  const removeIngredient = useStore((state) => state.removeIngredient);

  const requestDeleteKitchenware = (index : number) =>{
    setIsDCeleteKitchenware(true)
    setEditKitchenwareIndex(index)
  }
  const removeKitchenware = useStore((state) => state.removeKitchenware);
  
  const requestDeleteDependency = (index : number) =>{
    setIsDCeleteDependency(true)
    setEditDependencyIndex(index)
  }
  const removeDependency = useStore((state) => state.removeDependency);

  //#endregion

  //#region Edit Methods

  const editIngredient = (index : number) =>{
    setEditIngredientIndex(index)
    setIsEditIngredientVisible(true)
  }

  const editKitchenware = (index : number) =>{
    setEditKitchenwareIndex(index)
    setIsEditKitchenwareVisible(true)
  }

  //#endregion
  return (
    index == dataLength -1 ? (
       <SaveRecipeView navigation={navigation} width={width} />
    ):(
    <VStack p={theme.spacing.m} style={{width : width}}>
      <ScrollView>
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
 
            <EditItemList title="Ingredients" icon="ingredient" addFunc={()=>setIsAddIngredientVisible(true)}>
              {
                task.ingredients.map((ingredient : Ingredient, index : number) => (
                  <EditRowItem key={index} onEdit={()=>editIngredient(index)} onDelete={()=>requestDeleteIngredient(index)}>
                    <HStack justifyContent="flex-start" gap={5}>
                      <Text>{ingredient.name}</Text>
                      <Text>{formatIngredientQuantity(ingredient)}</Text>
                    </HStack>
                  </EditRowItem>
                ))
              }
            </EditItemList>
   
            <EditItemList title="Kitchenware" icon="kitchenware" addFunc={() => setIsAddKitchenwareVisible(true)}>
            {
              task.kitchenware.map((kitchenitem : Kitchenware, index : number) => (
                <EditRowItem key={index} onEdit={()=>editKitchenware(index)} onDelete={()=>requestDeleteKitchenware(index)}>
                  <HStack justifyContent="flex-start" gap={5}>
                    <Text>{kitchenitem.name}</Text>
                    <Text>{kitchenitem.quantity}</Text>
                  </HStack>
                </EditRowItem>
              ))
            }
            </EditItemList>
     
            <EditItemList title="Dependencies" icon="clipboard" addFunc={() => setIsAddDependencyVisible(true)}>
            {
              task.dependencies.map((dependency : Dependency, index : number) => (
                <EditRowItem key={index} onEdit={()=>{}} onDelete={() => requestDeleteDependency(index)} clickable={false}>
                  <HStack justifyContent="flex-start" gap={5}>
                    <Text>{dependency.title}</Text>
                  </HStack>
                </EditRowItem>
              ))
            }
            </EditItemList>
  
          </VStack>
        </VStack>  
      </ScrollView>
      

      <EditTitleModal isVisible={isEditTitleVisible} task={task} handleModal={setIsEditTitleVisible}  /> 
      <EditTimerModal isVisible={isEditDurationVisible} task={task} handleModal={setIsEditDurationVisible} />
      <EditRatingModal isVisible={isEditDifficultyVisible} task={task} handleModal={setIsEditDifficultyVisible} />
      <EditDescriptionModal isVisible={isEditDescriptionVisible} task={task} handleModal={setIsEditDescriptionVisible}  />
      <EditIngredientModal isVisible={isEditIngredientVisible} task={task} handleModal={setIsEditIngredientVisible} activeIndex={editKitchenwareIndex} />
      <EditKitchenwareModal isVisible={isEditKitchenwareVisible} task={task} handleModal={setIsEditKitchenwareVisible} activeIndex={editKitchenwareIndex} />
      <ConfirmDeleteModal 
        isVisible={isDeleteIngredientVisible} 
        title="Delete Ingredient" 
        task={task} 
        handleModal={setIsDeleteIngredientVisible} 
        deleteFunc={() => removeIngredient(task, editIngredientIndex)}
      />
      <ConfirmDeleteModal 
        isVisible={isDeleteKitchenwareVisible} 
        title="Delete Kitchenware" 
        task={task} 
        handleModal={setIsDCeleteKitchenware} 
        deleteFunc={() => removeKitchenware(task, editKitchenwareIndex)}
      />
      <ConfirmDeleteModal 
        isVisible={isDeleteDependencyVisible} 
        title="Delete Dependency" 
        task={task} 
        handleModal={setIsDCeleteDependency} 
        deleteFunc={() => removeDependency(task, editDependencyIndex)}
      />
      <AddIngredientModal isVisible={isAddIngredientVisible}   task={task} handleModal={setIsAddIngredientVisible} />
      <AddKitchenwareModal isVisible={isAddKitchenwareVisible} task={task} handleModal={setIsAddKitchenwareVisible} />
      <AddDependencyModal isVisible={isAddDependencyVisible}   task={task} handleModal={setIsAddDependencyVisible} />
    </VStack>

    )
  );
};

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
