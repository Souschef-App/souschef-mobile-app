import React, { useContext, useState } from "react";
import { HStack, IconButton, Input, SafeArea, TextButton, VStack } from "../../components";
import { Modal, StyleSheet, Text } from "react-native";
import { ButtonStyle, InputStyle, TextStyle, Theme } from "../../styles";
import { ThemeContext } from "../../contexts/AppContext";
import { EnterDescriptionScreenNavigationProp } from "../../navigation/types";
import { ScrollView } from "react-native-gesture-handler";
import useStore from "../../data/store";


export const EnterRecipeScreen = ({
  navigation,
}: {
  navigation: EnterDescriptionScreenNavigationProp;
}) => {
  const theme = useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);
  const [taskList, setTaskList] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [text, setText] = useState("");

  const setEnteredRecipe = useStore((state) => state.setEnteredRecipe);
  const submitForBreakDown = useStore((state) => state.submitForBreakDown);


  const getSuggestions = () => {
    setEnteredRecipe(taskList)
    submitForBreakDown();
    navigation.navigate("TaskBreakDownResultScreen");
  };

  const addTaskToList = () => {
    taskList.push(text)
    setText("")
    setModalVisible(!modalVisible)
  } 

  return (
    <SafeArea>
      <VStack m={20}>
        <HStack p={20} justifyContent="space-between" flexMain={false}>
          <Text style={styles.title}>Enter Recipe Steps</Text> 
          <IconButton icon="plus" onPress={() => setModalVisible(true)} />
        </HStack>
        <VStack>
        {
          taskList.length == 0 ? (
          <VStack>
                <VStack flexMain={false} >
                  <Text>Enter Each Step</Text>
                  <Text>Of Your Recipe</Text>
                </VStack>
          </VStack>
          ):
          (
            <ScrollView style={{ flex: 1, alignSelf: "stretch", padding: 20}}>
            {
              taskList.map((task , index) =>{
                return (
                  <VStack key={index} p={20} style={styles.card} align="flex-start" justifyContent="center">
                      <Text style={styles.listText}>{index + 1}. {task}</Text>
                  </VStack>
                )
              })
            }
            </ScrollView>
          )
        }
        </VStack>

        <Modal
         animationType="slide"
         transparent={true}
         visible={modalVisible}
         onRequestClose={() => {
           setModalVisible(!modalVisible);
         }}>
          <VStack style={styles.container} gap={20} p={50}>
            <Text style={styles.title}>Enter a Task</Text>
            <Input textStyle={styles.input} multiline={true} onChange={setText} value={text} placeholder="Enter Recipe Task" />
            <TextButton
              style={styles.button}
              textStyle={styles.buttonText}
              onPress={addTaskToList}
              title="Add Task To Recipe"
            />
          </VStack>

        </Modal>
     
        <TextButton
          style={styles.button}
          textStyle={styles.buttonText}
          onPress={getSuggestions}
          title="FINISHED"
        />

      </VStack>
    </SafeArea>
  );
};

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    button: {
      ...ButtonStyle.primary,
      backgroundColor: theme.colors.primary,
      margin: 5
    },
    buttonText:{
      ...TextStyle.h3,
      color: theme.colors.background,
    },
    input: {
      ...InputStyle.multiline,
      // maxWidth: 300,
      textAlignVertical: "top",
      minHeight: 120,

    },
    container: {
      backgroundColor: theme.colors.background,
    },
    title: {
      ...TextStyle.h3,
    },
    card:{
      backgroundColor: theme.colors.background2,
      padding: theme.spacing.m
    },
    listText:{
      ...TextStyle.body,
      flex: 1
    },
    red:{
      backgroundColor: "red"
    }
  });
