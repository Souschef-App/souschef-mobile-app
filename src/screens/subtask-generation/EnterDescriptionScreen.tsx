import React, { useContext, useState } from "react"
import { SafeArea, VStack } from "../../components"
import { StyleSheet, Text, TextInput } from "react-native"
import { SpacingAll } from "../../components/primitives/Box"
import { Button } from "../../components/primitives/Button"
import { ButtonStyle } from "../../styles"
import { Theme } from "../../styles/type"
import { ThemeContext } from "../../contexts/AppContext"
import { EnterDescriptionScreenNavigationProp } from "../../navigation/types"

export const EnterDescriptionScreen = ({
    navigation,
  }: {
    navigation: EnterDescriptionScreenNavigationProp;
  }) => {
    const theme = useContext(ThemeContext);
    const styles = React.useMemo(() => makeStyles(theme), [theme]);

    const [text, setText] = useState("")
    
    const getSuggestions = () => {
        navigation.navigate("TaskBreakDownResultScreen")
    }

    return(
        <SafeArea>
            <VStack style={styles.container} p={0} align={"center"} justifyContent={"center"} m={0} mall={new SpacingAll(0,0,0,0)} pall={new SpacingAll(0,0,0,0)}>
                <Text style={styles.title}>EnterDescriptionScreen</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setText}
                    value={text}
                />
                <Button style={styles.button} onPress={getSuggestions} >
                    <Text>Get Suggestions</Text>
                </Button>
            </VStack>
        </SafeArea>
    )
}

const makeStyles = (theme: Theme) => 
  StyleSheet.create({
    button:{
        ...ButtonStyle.primary,
        backgroundColor: theme.colors.primary,
        color: theme.colors.background,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: 300,
        backgroundColor: "#77777755"
    },
    container:{
        backgroundColor: theme.colors.background,
    },
    title:{
        ...theme.textVariants.header
    }
  });