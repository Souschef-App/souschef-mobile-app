import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput } from "react-native";
import {
  Button,
  Divider,
  Dropdown,
  HStack,
  Icon,
  IconButton,
  Input,
  TextButton,
  VStack,
} from "../../../components";
import { DIFFICULTY, Task } from "../../../data/types";
import { ButtonStyle, TextStyle, Theme } from "../../../styles";
import { ThemeContext } from "../../../contexts/AppContext";
import { Modal } from "../../../components/Modal";

import { EditDropdownList } from "./EditDropDownList";
import useStore from "../../../data/store";
import ModalIconButton from "./ModalIconButton";
import { TimerPickerModal } from "react-native-timer-picker";
import { LinearGradient } from "expo-linear-gradient"; 

export type TaskAvailaleProps = {
  task: Task;
};

const ModalButton = (props : any) =>{
  
  return(
    <Pressable style={props.style} onPress={() => props.onPress()} >
      <Text>{props.title}</Text>
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

  const [canEdit, setCanEdit] = useState(false)

  const [isEditTItleVisible, setIsEditTitleVisible] = useState(false) 
  const [isEditDescriptionVisible, setIsEditDescriptionVisible] = useState(false) 
  const [isEditRatingVisible, setIsEditDifficultyVisible] = useState(false) 
  const [isEditDurationVisible, setIsEditDurationVisible] = useState(false) 

  const [taskTitle, setTaskTitle] = useState(task.title)
  const [taskDescription, setTaskDescription] = useState(task.description)
  const [taskDifficulty, setTaskDifficulty]   = useState(task.difficulty)


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
  

  return (
    <VStack style={styles.card} p={theme.spacing.m}>
      <VStack gap={theme.spacing.xl}>
        <VStack flexMain={false} gap={theme.spacing.s}>
          <HStack justifyContent="space-between">
            <IconButton icon="pencil" onPress={()=> setCanEdit(!canEdit)} />
            <IconButton style={styles.retry} icon="retry" onPress={() => { }} color="#fff" iconSize={30} />
          </HStack>
          {/* <Text style={styles.taskTitle}>{task.title}</Text> */}
          <TextButton 
            style={canEdit ? styles.highlightEdit : null} 
            textStyle={styles.taskTitle} 
            title={task.title} 
            onPress={canEdit ? ()=> setIsEditTitleVisible(true) : () => {}} />

          <HStack
            flexMain={false}
            gap={theme.spacing.m}
            style={{ height: theme.spacing.l }}
          >
            <HStack flexMain={false} gap={theme.spacing.s}>
              <Icon name="timer" color={theme.colors.text} size={24} />
              <Button style={canEdit ? styles.highlightEdit : null} onPress={canEdit ? ()=> setIsEditDurationVisible(true) : () => {}}>
                <Text style={styles.timerText}>{`~${task.duration} min`}</Text>
              </Button>
            </HStack>
            <Divider thickness={3} color={theme.colors.background2} />

            <Button style={canEdit ? styles.highlightEdit : null} onPress={()=>setIsEditDifficultyVisible(true)}>
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
        <Button style={canEdit ? styles.highlightEdit : null} onPress={canEdit ? () => setIsEditDescriptionVisible(true) : () => {}}>
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
            isEditMode={canEdit}/>

          <EditDropdownList 
            title="Kitchenware"
            icon="kitchenware"
            theme={theme} 
            isOpen={isKitchenwareOpen}
            setIsOpen={() => setIsKitchenwareOpen(!isKitchenwareOpen)} 
            items={task.kitchenware}
            styles={styles}
            isEditMode={canEdit}/>

          <EditDropdownList 
            title="Dependencies"
            icon="clipboard"
            theme={theme} 
            isOpen={isDependenciesOpen} 
            setIsOpen={() => setIsDependenciesOpen(!isDependenciesOpen)} 
            items={task.dependencies}
            styles={styles}
            isEditMode={canEdit}/>
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
              <ModalButton title="Cancel" style={styles.cancelBTN} onPress={() => setIsEditTitleVisible(false)} />
              <ModalButton title="Save" style={styles.saveBTN} onPress={() => updateTitle()} />
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
              <ModalButton style={styles.cancelBTN} title="Cancel" onPress={() => setIsEditDifficultyVisible(false)} />
              <ModalButton style={styles.saveBTN}   title="Save" onPress={updateDifficulty} />
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
              <ModalButton style={styles.cancelBTN} title="Cancel" onPress={() => setIsEditDescriptionVisible(false)} />
              <ModalButton style={styles.saveBTN}   title="Save" onPress={updateDescription} />
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
    </VStack >
  );
};

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
    card: {
      elevation: 6,
      borderColor: 'red'
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
    }
  });

export default TaskEditView;
