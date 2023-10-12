import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { SafeArea, TextButton } from "../../components";
import { ThemeContext } from "../../contexts/AppContext";
import {
  MealPlanNavigationProp,
} from "../../navigation/types";
import { ButtonStyle, Theme } from "../../styles";

const MealplanScreen = ({
  navigation,
}: {
  navigation: MealPlanNavigationProp;
}) => {
  // Theme
  const theme = React.useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);

  const goToEnterRecipe = () => {
    navigation.navigate("EnterDescriptionScreen");
  };

  return (
    <SafeArea>
      <View style={styles.container}>
        <Text>Mealplan Screen</Text>
        <TextButton title="Enter Recipe Description" onPress={goToEnterRecipe} />
      </View>
    </SafeArea>
  );
};

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      display: "flex",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    button:{
      ...ButtonStyle.primary
    }
  });

export default MealplanScreen;
