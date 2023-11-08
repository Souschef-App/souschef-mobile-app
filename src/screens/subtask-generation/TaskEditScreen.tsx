import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import {
  Button,
  Divider,
  Dropdown,
  HStack,
  Icon,
  IconButton,
  TextButton,
  VStack,
} from "../../components";
import useStore from "../../data/store";
import { DIFFICULTY, Task } from "../../data/types";
import { ButtonStyle, TextStyle, Theme } from "../../styles";
import { formatIngredientQuantity } from "../../utils/format";
import { ThemeContext } from "../../contexts/AppContext";

export type TaskAvailaleProps = {
  task: Task;
};

const EditDropdownList = ({title, icon, isOpen, setIsOpen, theme, items, styles, onEdit, isEditMode} : any) =>{
  return(
    <Button style={isEditMode ? styles.highlightEdit : null} onPress={() => onEdit()}>
      <Dropdown 
        title={title}
        icon={icon}
        iconColor={theme.colors.primary}
        isOpen={isOpen}
        onPress={() => setIsOpen(!setIsOpen)}
        textStyle={styles.dropdownTitle}
      >
        <HStack
          mAll={{ l: theme.spacing.s, r: theme.spacing.xs }}
          gap={theme.spacing.b}
        >
          <Divider color={theme.colors.background2} />
          <VStack
            pVH={{ v: theme.spacing.s }}
            align="flex-start"
            gap={theme.spacing.b}
          >
            {items.map((i, index) => (
              <HStack justifyContent="space-between" key={index}>
                <Text style={TextStyle.h4}>{i.name}</Text>
                <Text style={TextStyle.h4}>
                  {formatIngredientQuantity(i)}
                </Text>
              </HStack>
            ))}
          </VStack>
        </HStack>
      </Dropdown>
    </Button>
  )
}

const TaskAvailable = (props: TaskAvailaleProps) => {
  // Theme
  const theme = React.useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);

  // Props
  const task = props.task;

  // State
  const [isIngredientOpen, setIsIngredientOpen] = useState<boolean>(false);
  const [isKitchenwareOpen, setIsKitchenwareOpen] = useState<boolean>(false);

  const [isDependenciesOpen, setIsDependenciesOpen] = useState<boolean>(false);

  // Store
  const commands = useStore((state) => state.commands);

  const handleTaskFinished = () => commands.completeTask();
  const handleTaskReroll = () => commands.rerollTask();

  const [canEdit, setCanEdit] = useState(false)

  return (
    <VStack style={styles.card} p={theme.spacing.m}>
      <VStack gap={theme.spacing.xl}>
        <VStack flexMain={false} gap={theme.spacing.s}>
          <HStack justifyContent="space-between">
            <IconButton icon="pencil" onPress={()=> setCanEdit(!canEdit)} />
            <IconButton style={styles.retry} icon="retry" onPress={() => { }} iconColor="#fff" iconSize={30} />
          </HStack>
          {/* <Text style={styles.taskTitle}>{task.title}</Text> */}
          <TextButton style={canEdit ? styles.highlightEdit : null} textStyle={styles.taskTitle} title={task.title} onPress={()=>{}} />
          <HStack
            flexMain={false}
            gap={theme.spacing.m}
            style={{ height: theme.spacing.l }}
          >
            <HStack flexMain={false} gap={theme.spacing.s}>
              <Icon name="timer" color={theme.colors.text} size={24} />
              <Button style={canEdit ? styles.highlightEdit : null} onPress={()=>{}}>
                <Text style={styles.timerText}>{`~${task.duration} min`}</Text>
              </Button>
            </HStack>
            <Divider thickness={3} color={theme.colors.background2} />

            <Button style={canEdit ? styles.highlightEdit : null} onPress={()=>{}}>
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
        <Button style={canEdit ? styles.highlightEdit : null} onPress={()=>{}}>
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
            isOpen={isIngredientOpen}
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
    }
  });

export default TaskAvailable;
