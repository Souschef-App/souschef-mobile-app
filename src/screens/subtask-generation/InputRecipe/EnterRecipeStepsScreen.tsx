import React, { useContext, useState } from "react";
import { HStack, IconButton, Input, SafeArea, TextButton, VStack } from "../../../components";
import { Pressable, StyleSheet, Text } from "react-native";
import { ButtonStyle, InputStyle, TextStyle, Theme } from "../../../styles";
import { ThemeContext } from "../../../contexts/AppContext";
import { EnterRecipeStepsScreenNavigationProp } from "../../../navigation/types";
import { ScrollView } from "react-native-gesture-handler";
import useStore from "../../../data/store";
import { Modal } from "../../../components/Modal";
import { makeStyles } from "./style";
import { RowItem } from "./components";


export const EnterRecipeStepsScreen = ({
  navigation,
}: {
  navigation: EnterRecipeStepsScreenNavigationProp;
}) => {
  const theme = useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);
  const [taskList, setTaskList] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [text, setText] = useState("");

  const setEnteredRecipe = useStore((state) => state.setEnteredRecipe);
  const submitForBreakDown = useStore((state) => state.submitForBreakDown);

  const getSuggestions = () => {
    console.log("pressed")
    if(taskList.length <= 0)
    {
      console.log("Add tasks first")
    }
    else{
      setEnteredRecipe(taskList)
      submitForBreakDown();
      navigation.navigate("TaskBreakDownResultScreen");
    }
  };

  const addTaskToList = () => {
    console.log("adding task to list")
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
                  <RowItem index={index} text={task} styles={styles} />
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
         isVisible={modalVisible}
         onRequestClose={() => {
           setModalVisible(!modalVisible);
         }}>
          <VStack style={styles.container} gap={20} p={50} flexMain={false}>
            <Text style={styles.title}>Enter a Task</Text>
            <Input textStyle={styles.input} multiline={true} onChange={setText} value={text} placeholder="Enter Recipe Task" />
            <Pressable
              style={styles.button}
              onPress={addTaskToList}>
                <Text style={styles.buttonText}>Add Task To Recipe</Text>
            </Pressable>
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

