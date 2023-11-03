import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, SafeAreaView, ScrollView, TextInput, TouchableOpacity, TextInputChangeEventData, NativeSyntheticEvent } from "react-native";
import { TextStyle } from "../styles";
import { Button, Icon } from "../components";
import { primary } from "../styles/ButtonStyle";
import { MealNameScreenRouteProp,  RecipeSelectorScreenNavigationProp } from "../navigation/types";
import { useSessionApi } from "../hooks/useSessionApi";

const MealPlanScreen: React.FC<{
  route: MealNameScreenRouteProp;
  navigation: RecipeSelectorScreenNavigationProp;
}> = ({ route, navigation }) => {
  const { date, time, occasion, mealName, recipes } = route.params;
  const [mealPlanName, setMealPlanName] = useState<string>(mealName);
  const { createMealPlan, addRecipeToMealPlan } = useSessionApi();
  
  const goToRecipeSelectorScreen = (mealType: string) => {
    navigation.navigate("RecipeSelectorScreen", { date, time, mealName: mealPlanName, occasion, recipes, mealType });

  }; 

  const goToCalendarScreen = () => {
    console.log(date, time)
    createMealPlan({
      Name: mealPlanName,
      Date: date + "T" + time
    }).then(async res => {
      const planId = res.data.id;
      for (let recipe of recipes) {
        await addRecipeToMealPlan(planId, recipe.type, recipe.id);
      }
      navigation.navigate("CalendarScreen", { date, time, mealName: mealPlanName });
    });
  };
  
  useEffect(() => {
    // Add any logic you need when the component mounts
  }, []);

  return (    
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
        <View style={styles.mealContainer}>
          <Text style={[TextStyle.h1]}>Meal Name{' '}</Text> 
        <View>
            <Icon name="kitchenware" size={30} color="black" />
             </View>
            </View>
          <View style={styles.headerTitle}>
            <Text style={[TextStyle.h2,styles.disableText]}>What's your Meal Plan today?</Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={[TextStyle.body,styles.inputSelfContainer]}
              value={mealPlanName}
              onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>)=>setMealPlanName(e.nativeEvent.text)} 
              placeholder="Meal Plan Name"
            />

            <View style={styles.titleContainer}>
              <View style={styles.bellConcierge}>
                <Text style={[TextStyle.h2,styles.title]}>Appetizer{' '}</Text>
                <Icon
                  name="brochette"                  
                />
                <Button onPress={() => goToRecipeSelectorScreen('Appetizer')}>
                  <View style={styles.plusIconContainer}>
                    <Icon
                      name="plus"
                    />
                  </View>
                </Button>
              </View>
            </View>
            <View style={styles.sectionContainer}>
              {recipes ? recipes.filter(recipe => recipe.type == 'Appetizer').map(recipe => <View>
                  <TouchableOpacity style={styles.touchableContainer}>
                    <View style={styles.item}>
                      <Text style={[TextStyle.h3,styles.itemText]}>
                        {recipe.name + " "}
                      </Text>
                      <Icon
                        name="pencil"
                      />
                    </View>
                  </TouchableOpacity>
                  <View style={{ height: 5 }} />
                </View>) : ""
              }
            </View>

            <View style={styles.titleContainer}>
              <View style={styles.bellConcierge}>
                <Text style={[TextStyle.h2,styles.title]}>Entree{' '}</Text>
                <Icon
                  name="meal"
                />
                <Button onPress={() => goToRecipeSelectorScreen('Entree')}>
                  <View style={styles.plusIconContainer}>
                    <Icon
                      name="plus"
                    />
                  </View>
                </Button>
              </View>
            </View>
            <View style={styles.sectionContainer}>
              {recipes ? recipes.filter(recipe => recipe.type == 'Entree').map(recipe => <View>
                  <TouchableOpacity style={styles.touchableContainer}>
                    <View style={styles.item}>
                      <Text style={[TextStyle.h3,styles.itemText]}>
                        {recipe.name + " "}
                      </Text>
                      <Icon
                        name="pencil"
                      />
                    </View>
                  </TouchableOpacity>
                  <View style={{ height: 5 }} />
                </View>) : ""
              }
            </View>

            <View style={styles.titleContainer}>  
              <View style={styles.bellConcierge}>
                <Text style={[TextStyle.h2,styles.title]}>Dessert{' '}</Text>
                <Icon name= "cake" />
                <Button onPress={() => goToRecipeSelectorScreen('Dessert')}>
                  <View style={styles.plusIconContainer}>
                    <Icon
                      name="plus"
                    />
                  </View>
                </Button>
              </View>
            </View>

            <View style={styles.sectionContainer}>
              {recipes ? recipes.filter(recipe => recipe.type == 'Dessert').map(recipe => <View>
                  <TouchableOpacity style={styles.touchableContainer}>
                    <View style={styles.item}>
                      <Text style={[TextStyle.h3,styles.itemText]}>
                        {`${recipe.name} `}
                      </Text>
                      <Icon
                        name="pencil"
                      />
                    </View>
                  </TouchableOpacity>
                  <View style={{ height: 5 }} />
                </View>) : ""
              }
            </View>

            <View style={styles.whiteSpace}></View> 
            
            <View style={styles.confirmButtonContainer}>
              <Button onPress={goToCalendarScreen} style={[primary,styles.touchableContainerBlue]}>
                <View style={styles.itemCenter}>
                  <Text style={[TextStyle.body,styles.itemTextWhite]}>Confirm Session</Text>
                </View>
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    backgroundColor: "white",
    width: '100%',
    position: 'relative',
  },
  headerTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  inputContainer: {
    width: '100%',
    backgroundColor: '#B8E0D2',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  inputSelfContainer: {
    width: '100%',
    height: 50,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    fontSize: 17,
    elevation: 40,
    shadowColor: 'black',
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 5,
  },
  sectionContainer: {
    width: "100%",
    marginTop: 10,
    paddingVertical: 10,
  },
  title: {
    textAlign: "left",
    fontWeight: "bold",
  },
  itemText: {
    marginLeft: 20,
    fontSize: 15,
    fontWeight: "bold",
    color: "#555d6b",
  },
  itemTextWhite: {
    marginLeft: 20,
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  touchableContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 15,
    paddingRight: 20,
    width: "100%",
    marginVertical: 5,
    shadowColor: "#2f394a",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 7,
  },
  touchableContainerBlue: {
    backgroundColor: "#2e9dfb",
    borderRadius: 200,
    paddingVertical: 15,
    marginVertical: 5,
    shadowColor: "#2f394a",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 7,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemCenter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  disableText: {
    color: "black",
    paddingHorizontal: 10,
    paddingVertical: 20,
    fontSize: 25,
    fontWeight: "600",
  },
  commonIconStyles: {
    fontSize: 20,
    color: "#2f394a",
  },
  mealContainer: {
    width: '100%',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    flexDirection: 'row',
    backgroundColor: '#F0D5BA',
    elevation: 50,
    shadowColor: 'black',
    borderBottomEndRadius: 50,
    position: 'relative',
    right: 50,
  },
  bellConcierge: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  confirmButtonContainer: {
    alignSelf: 'center',
    width: '70%',
  },
  whiteSpace: {
    height: 20, 
  },
  plusIconContainer: {
    flexDirection:"row",
    marginLeft:200,
    alignContent:'flex-end',
    alignItems: 'center',
  },
});

export default MealPlanScreen;
