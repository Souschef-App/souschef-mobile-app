import React, { useContext, useEffect, useState } from "react";
import { HStack, ModalIconButton, SafeArea, TextButton, VStack } from "../../../components";
import { Text, TextInput } from "react-native";
import { ThemeContext } from "../../../contexts/AppContext";
import {  NameRecipeScreenNavigationProp } from "../../../navigation/types";
import { makeStyles } from "./style";
import { ErrorModal } from "./components";
import { InputStyle } from "../../../styles";
import useStore from "../../../data/store";

import Voice from '@react-native-voice/voice';

export const NameRecipeScreen = ({
  navigation,
}: {
  navigation: NameRecipeScreenNavigationProp;
}) => {
  const theme = useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  const [title, setTitle] = useState("");

  const setRecipeTitle = useStore((state) => state.setRecipeTitle);


  const saveRecipeName = () => {
    if(title == "")
    {
      setErrorModalVisible(true)
    }
    else{
        setRecipeTitle(title)
      navigation.navigate("EnterRecipeIngredientsScreen");
    }
  };

  let [started, setStarted] = useState(false);
  let [results, setResults] = useState([]);

  useEffect(() => {
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    }
  }, []);

  const startSpeechToText = async () => {
    await Voice.start("en-US");
    setStarted(true);
    console.log("Starting" + started)
  };

  const stopSpeechToText = async () => {
    setStarted(false);
    await Voice.stop();

    let newText = ""
    results.map(result => {
      newText += `${result} `
    })
  
    setTitle(newText)
  };

  const onSpeechResults = (result : any) => {
    setResults(result.value);
  };

  const onSpeechError = (error : any) => {
    console.log(error);
  };

  return (
    <SafeArea>
      <VStack m={20}>
        <HStack p={20} justifyContent="flex-start" flexMain={false}>
          <Text style={styles.title}>Name Recipe</Text> 
        </HStack>

        <VStack>
          <HStack justifyContent="flex-start" flexMain={false} p={5}>
              {
                started ? (
                  <ModalIconButton icon="mic" onPress={()=>stopSpeechToText()} iconSize={20} />
                ) : (
                  <ModalIconButton icon="mic-off" onPress={()=>startSpeechToText()} iconSize={20} />
                )
              }
            </HStack>
            <TextInput value={title} style={InputStyle.outline} onChangeText={setTitle} placeholder="Recipe Name" />
        </VStack>

        <TextButton
          style={styles.button}
          textStyle={styles.buttonText}
          onPress={saveRecipeName}
          title="FINISHED"
        />

      </VStack>

      <ErrorModal isVisible={errorModalVisible} title="Recipe Error" message="Please name recipe" okFunc={()=>setErrorModalVisible(false)}  />
    </SafeArea>
  );
};




