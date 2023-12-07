import { TabItem } from "components/Tabs";
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  Divider,
  HStack,
  Icon,
  IconButton,
  SafeArea,
  Tabs,
  TextButton,
  VStack,
} from "../../components";
import { ThemeContext } from "../../contexts/AppContext";
import { fakeRecipe } from "../../data/__mocks__";
import { Recipe } from "../../data/types";
import { MealPlanNavigationProp } from "../../navigation/types";
import { TextStyle, Theme } from "../../styles/";
import { formatDifficultyToString } from "../../utils/format";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
});

const tabs: TabItem[] = [
  { label: "Favorited", icon: "heart" },
  { label: "Custom", icon: "chef-hat" },
];

const publicRecipes: Recipe[] = [fakeRecipe];

const RecipeItem = ({ recipe }: { recipe: Recipe }) => {
  // Theme
  const theme = React.useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);

  return (
    <HStack
      flexMain={false}
      justifyContent="flex-start"
      gap={16}
      p={16}
      style={styles.recipeContainer}
    >
      <Image
        source={require("../../assets/images/recipe.png")}
        style={styles.recipeImg}
      />
      <VStack align="flex-start" style={{ flex: 1 }}>
        <Text numberOfLines={1} style={styles.recipeName}>
          {recipe.name}
        </Text>
        <HStack flexMain={false} justifyContent="flex-start" gap={8}>
          <Text style={TextStyle.body}>{`~${recipe.duration} min`}</Text>
          <Divider thickness={1} />
          <Text style={[TextStyle.body, { textTransform: "capitalize" }]}>
            {formatDifficultyToString(recipe.difficulty)}
          </Text>
        </HStack>
        <HStack justifyContent="flex-start" align="flex-end" gap={32}>
          <HStack flexMain={false} flexCross={false} gap={8}>
            <Icon name="ingredient" size={18} color={theme.colors.primary} />
            <Text>{recipe.ingredients.length}</Text>
          </HStack>
          <HStack flexMain={false} flexCross={false} gap={8}>
            <Icon name="kitchenware" size={18} color={theme.colors.text} />
            <Text>{recipe.serves}</Text>
          </HStack>
        </HStack>
      </VStack>
    </HStack>
  );
};

const PublicRecipes = () => {
  return (
    <>
      {publicRecipes.map((recipe, index) => (
        <RecipeItem key={index} recipe={recipe} />
      ))}
    </>
  );
};

const CustomRecipes = () => {
  // Theme
  const theme = React.useContext(ThemeContext);

  return (
    <VStack style={{ height: 48 }}>
      <Text style={[TextStyle.body, { color: theme.colors.textDisabled }]}>
        You have 0 custom recipes.
      </Text>
    </VStack>
  );
};

const MealPlanScreen = ({
  navigation,
}: {
  navigation: MealPlanNavigationProp;
}) => {
  // Theme
  const theme = React.useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);

  const [activeTab, setActiveTab] = React.useState(0);

  const date = dateFormatter.format(new Date());
  const mealplanMsg = "You have no upcoming mealplans.\nTry making one!";

  const handleTabPress = (index: number) => {
    setActiveTab(index);
  };

  return (
    <SafeArea>
      <VStack justifyContent="flex-start" pVH={{ v: 16 }}>
        <VStack flexMain={false} pVH={{ h: 16 }} gap={16}>
          <VStack
            flexMain={false}
            align="flex-start"
            p={16}
            gap={8}
            style={styles.card}
          >
            <HStack justifyContent="space-between">
              <Text style={styles.date}>{date}</Text>
              <IconButton
                icon="plus"
                iconSize={18}
                color="#fff"
                onPress={() => {}}
                style={styles.newMealPlanBtn}
              />
            </HStack>
            <Text style={styles.mealplanInfo}>{mealplanMsg}</Text>
          </VStack>
          <Tabs tabs={tabs} activeTab={activeTab} onTabPress={handleTabPress} />
          {activeTab === 1 ? (
            <TextButton
              title="Add Custom Recipe"
              onPress={() => navigation.navigate("NameRecipeScreen")}
              textStyle={styles.newRecipeText}
              style={styles.newRecipeBtn}
            />
          ) : null}
        </VStack>
        <ScrollView style={styles.scroll}>
          {activeTab === 0 ? <PublicRecipes /> : <CustomRecipes />}
        </ScrollView>
      </VStack>
    </SafeArea>
  );
};

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.colors.secondary,
      borderRadius: 8,
    },
    date: {
      ...TextStyle.h3,
      ...TextStyle.weight.bold,
      color: "#fff",
    },
    mealplanInfo: {
      ...TextStyle.body,
      color: "#fff",
    },
    newMealPlanBtn: {
      backgroundColor: theme.colors.text,
      borderRadius: 8,
      width: 36,
      height: 36,
    },
    newRecipeText: {
      ...TextStyle.body,
      color: "#fff",
    },
    newRecipeBtn: {
      alignSelf: "stretch",
      justifyContent: "center",
      alignItems: "center",
      padding: 8,
      backgroundColor: theme.colors.text,
      height: 36 + 8,
      borderRadius: 4,
    },
    scroll: {
      alignSelf: "stretch",
    },
    recipeContainer: {
      borderBottomWidth: 1,
      borderColor: "#B3BAC0",
    },
    recipeImg: {
      width: 96,
      height: 96,
      backgroundColor: "red",
      borderRadius: 8,
    },
    recipeName: {
      ...TextStyle.h4,
      ...TextStyle.weight.bold,
    },
  });

export default MealPlanScreen;
