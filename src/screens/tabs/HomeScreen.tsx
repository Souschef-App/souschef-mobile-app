import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import {
  Divider,
  HStack,
  Icon,
  IconButton,
  SafeArea,
  VStack,
} from "../../components";
import { ThemeContext } from "../../contexts/AppContext";
import { HomeScreenNavigationProp } from "../../navigation/types";
import { TextStyle, Theme } from "../../styles";
import { TextInput } from "react-native-gesture-handler";

const HomeScreen = ({
  navigation,
}: {
  navigation: HomeScreenNavigationProp;
}) => {
  // Theme
  const theme = React.useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);

  const greetings = "Hey, John";
  const messageOfTheDay = "What's cooking?";
  const recipeTitle = "Chorizo & Mozzarella Gnocchi Bake";
  const recipeTime = 30;
  const recipeDifficulty = "Easy";

  return (
    <SafeArea>
      <VStack p={16} gap={32}>
        <HStack justifyContent="space-between" flexMain={false}>
          <VStack align="flex-start" flexMain={false}>
            <Text style={styles.greeting}>{greetings}</Text>
            <Text style={styles.msgOfTheDay}>{messageOfTheDay}</Text>
          </VStack>
          <IconButton
            icon="person"
            iconSize={24}
            color="#fff"
            onPress={() => {}}
            style={styles.profile}
          />
        </HStack>
        <HStack flexMain={false} gap={8}>
          <IconButton
            icon="explore"
            iconSize={24}
            color="#fff"
            onPress={() => {}}
            style={styles.explore}
          />
          <HStack
            justifyContent="space-between"
            gap={8}
            style={styles.searchbar}
          >
            <TextInput
              placeholder="Search Recipes..."
              placeholderTextColor="#A2A6AD"
              style={styles.search}
            />
            <Icon name="search" size={18} color="#A2A6AD" />
          </HStack>
        </HStack>
        <VStack align="flex-start" gap={16}>
          <Text style={styles.featuredRecipe}>Today's Featured Recipe</Text>
          <View style={styles.imageContainer}>
            <Image source={require("../../assets/images/recipe.png")} />
            <VStack align="flex-start" style={styles.recipeCard} gap={8}>
              <Text style={styles.recipeTitle}>{recipeTitle}</Text>
              <HStack justifyContent="flex-start" gap={8}>
                <Text style={styles.recipeInfo}>{`~${recipeTime} min`}</Text>
                <Divider vertical={true} color="#fff" thickness={0.75} />
                <Text style={styles.recipeInfo}>{recipeDifficulty}</Text>
              </HStack>
            </VStack>
          </View>
        </VStack>
      </VStack>
    </SafeArea>
  );
};

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    greeting: {
      ...TextStyle.h2,
    },
    msgOfTheDay: {
      ...TextStyle.h4,
    },
    profile: {
      backgroundColor: "#95b8d1",
      width: 48,
      height: 48,
      borderRadius: 100,
      padding: 8,
    },
    explore: {
      backgroundColor: theme.colors.secondary,
      borderRadius: 8,
      width: 48,
      height: 48,
    },
    searchbar: {
      flex: 1,
      backgroundColor: "#efefef",
      borderRadius: 8,
      paddingHorizontal: 16,
      height: 48,
    },
    search: {
      ...TextStyle.body,
      flex: 1,
      alignSelf: "stretch",
    },
    featuredRecipe: {
      ...TextStyle.h3,
      ...TextStyle.weight.bold,
    },
    imageContainer: {
      flex: 1,
      alignSelf: "stretch",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 8,
      overflow: "hidden",
    },
    recipeCard: {
      left: 16,
      right: 16,
      bottom: 16,
      position: "absolute",
      backgroundColor: "#00000075",
      borderRadius: 8,
      padding: 16,
    },
    recipeTitle: {
      ...TextStyle.h2,
      color: "#fff",
    },
    recipeInfo: {
      ...TextStyle.body,
      color: "#fff",
    },
  });

export default HomeScreen;
