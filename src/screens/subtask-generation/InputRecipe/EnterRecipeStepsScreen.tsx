import React, { useContext, useState } from "react";
import { HStack, IconButton, Input, SafeArea, TextButton, VStack } from "../../../components";
import { Pressable, Text } from "react-native";
import { ThemeContext } from "../../../contexts/AppContext";
import { EnterRecipeStepsScreenNavigationProp } from "../../../navigation/types";
import { ScrollView } from "react-native-gesture-handler";
import useStore from "../../../data/store";
import { Modal } from "../../../components/Modal";
import { makeStyles } from "./style";
import { ErrorModal, RowItem } from "./components";


export const EnterRecipeStepsScreen = ({
  navigation,
}: {
  navigation: EnterRecipeStepsScreenNavigationProp;
}) => {
  const theme = useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);
  const [taskList, setTaskList] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  const [text, setText] = useState("");

  const setEnteredRecipe = useStore((state) => state.setEnteredRecipe);
  const submitForBreakDown = useStore((state) => state.submitForBreakDown);

  const getSuggestions = () => {
    // console.log("pressed")
    if(taskList.length <= 0)
    {
      setErrorModalVisible(true)
    }
    else{
      setEnteredRecipe(taskList)
      submitForBreakDown();
      navigation.navigate("TaskBreakDownResultScreen");
    }
  };

  const addTaskToList = () => {
    // console.log("adding task to list")
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
              taskList.map((task : string, index : number) => {
                return (
                  <RowItem key={index} index={index} text={task} styles={styles} />
                )
              })
            }
            </ScrollView>
          )
        }
        </VStack>

        <TextButton
          style={styles.button}
          textStyle={styles.buttonText}
          onPress={getSuggestions}
          title="FINISHED"
        />

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

      <ErrorModal isVisible={errorModalVisible} title="Task Error" message="Please add at least one Task" okFunc={()=>setErrorModalVisible(false)}  />
    </SafeArea>
  );
};

