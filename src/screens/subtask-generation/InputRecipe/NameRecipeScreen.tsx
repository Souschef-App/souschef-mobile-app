import React, { useContext, useState } from "react";
import { HStack, SafeArea, TextButton, VStack } from "../../../components";
import { Text, TextInput } from "react-native";
import { ThemeContext } from "../../../contexts/AppContext";
import {  NameRecipeScreenNavigationProp } from "../../../navigation/types";
import { makeStyles } from "./style";
import { ErrorModal } from "./components";
import { InputStyle } from "../../../styles";
import useStore from "../../../data/store";


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

  return (
    <SafeArea>
      <VStack m={20}>
        <HStack p={20} justifyContent="flex-start" flexMain={false}>
          <Text style={styles.title}>Name Recipe</Text> 
        </HStack>

        <VStack>
            <TextInput value={title} style={InputStyle.underline} onChangeText={setTitle} />
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




