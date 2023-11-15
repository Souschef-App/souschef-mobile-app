import React from "react";

import { TextStyle, ButtonStyle, Theme, InputStyle } from "../../../styles";
import { HStack, TextButton, VStack } from "../../../components"
import {Text, StyleSheet, TextInput} from "react-native"
import { ThemeContext } from "../../../contexts/AppContext";


export const SaveRecipeView = () => {

    const theme = React.useContext(ThemeContext);
    const styles = React.useMemo(() => makeStyles(theme), [theme]);
    
    return(
        <VStack style={styles.card} align="flex-start" pVH={{v: 5, h : 40}}>
            <HStack>
                <Text style={styles.taskTitle}>Save Recipe</Text>

            </HStack>
            <Text>Name</Text>
            <TextInput style={InputStyle.underline} />
            <VStack justifyContent="flex-end">
                <TextButton title="Save" style={styles.saveBTN} onPress={()=>{}}/>
            </VStack>
        </VStack>
    )
}


const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    taskTitle: {
      ...TextStyle.h1,
      fontSize: 40,
    },
    Icon: {
      position: "absolute",
      left: theme.spacing.m,
    },
    btnText: {
      ...TextStyle.h2,
      fontWeight: "normal",
      color: "#fff",
    },
    card: {
      elevation: 6,
      borderColor: 'red',
    },
    saveBTN:{
      ...ButtonStyle.primary,
      minWidth: 100,
      backgroundColor: theme.colors.primary,
      alignSelf: "stretch"
    },
    red:{
      backgroundColor: "red"
    }
  });