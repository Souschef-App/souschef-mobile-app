import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView
} from 'react-native';
import { Button, Icon } from '../../components';
import {primary} from '../../styles/ButtonStyle';
import {ButtonStyle, TextStyle} from '../../styles/';
import { DateScreenNavigationProp } from "../../navigation/types";
import { theme } from 'styles/theme';
interface MealPlanRecipe {
  id: number;
  name: string;
  duration: number; // Add duration property
  rating: number;
  imageUrl: string;
}

const allRecipes: MealPlanRecipe[] = [
  //hardcoded recipes for now
  {
    id: 1,
    name: 'Spaghetti Carbonara',
    duration: 30, // Add duration in minutes
    rating: 4.5,
    imageUrl:
      'https://121399388.cdn6.editmysite.com/uploads/1/2/1/3/121399388/s179680401136495038_p25_i1_w700.jpeg?width=800&optimize=medium',
  },
  {
    id: 2,
    name: 'Chicken Alfredo',
    duration: 35, // Add duration in minutes
    rating: 4.0,
    imageUrl:
      'https://121399388.cdn6.editmysite.com/uploads/1/2/1/3/121399388/s179680401136495038_p25_i1_w700.jpeg?width=800&optimize=medium',
  },
  {
    id: 3,
    name: 'Vegetable Stir-Fry',
    duration: 25, // Add duration in minutes
    rating: 3.8,
    imageUrl:
      'https://121399388.cdn6.editmysite.com/uploads/1/2/1/3/121399388/s179680401136495038_p25_i1_w700.jpeg?width=800&optimize=medium',
  },
  {
    id: 4,
    name: 'Baked Salmon',
    duration: 40, // Add duration in minutes
    rating: 4.2,
    imageUrl:
      'https://121399388.cdn6.editmysite.com/uploads/1/2/1/3/121399388/s179680401136495038_p25_i1_w700.jpeg?width=800&optimize=medium',
  },
  {
    id: 5,
    name: 'Beef Tacos',
    duration: 30, // Add duration in minutes
    rating: 4.3,
    imageUrl:
      'https://121399388.cdn6.editmysite.com/uploads/1/2/1/3/121399388/s179680401136495038_p25_i1_w700.jpeg?width=800&optimize=medium',
  },
];

const yourRecipes: MealPlanRecipe[] = [
  //hardcoded recipes for now
  {
    id: 8,
    name: 'Homemade Lasagna',
    duration: 45,
    rating: 4.2,
    imageUrl:
      'https://121399388.cdn6.editmysite.com/uploads/1/2/1/3/121399388/s179680401136495038_p25_i1_w700.jpeg?width=800&optimize=medium',
  },
  {
    id: 9,
    name: 'Grilled Chicken Salad',
    duration: 50,
    rating: 4.4,
    imageUrl:
      'https://121399388.cdn6.editmysite.com/uploads/1/2/1/3/121399388/s179680401136495038_p25_i1_w700.jpeg?width=800&optimize=medium',
  },
  // Add more your recipes as need
  {
    id: 10,
    name: 'Homemade Pizza',
    duration: 35, // Add duration in minutes
    rating: 4.0,
    imageUrl:
      'https://121399388.cdn6.editmysite.com/uploads/1/2/1/3/121399388/s179680401136495038_p25_i1_w700.jpeg?width=800&optimize=medium',
  },
];

const MealPlanScreen: React.FC<{ navigation: DateScreenNavigationProp }> = ({ navigation }) => {
  const goToDateScreen = () => {
    navigation.navigate('DateScreen');}
  const [searchText, setSearchText] = useState<string>('');
  const [filteredFavoriteRecipes, setFilteredFavoriteRecipes] =
    useState<MealPlanRecipe[]>(allRecipes);
  const [filteredYourRecipes, setFilteredYourRecipes] =
    useState<MealPlanRecipe[]>(yourRecipes);
  const [showAllFavoriteRecipes, setShowAllFavoriteRecipes] =
    useState<boolean>(false);
  const [showAllYourRecipes, setShowAllYourRecipes] = useState<boolean>(false);

  const handleSearch = (text: string) => {
    setSearchText(text);
    const filteredFavorite = allRecipes.filter(recipe =>
      recipe.name.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredFavoriteRecipes(filteredFavorite);

    const filteredYourRecipe = yourRecipes.filter(recipe =>
      recipe.name.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredYourRecipes(filteredYourRecipe);
  };

  const displayedFavoriteRecipes = showAllFavoriteRecipes
    ? filteredFavoriteRecipes
    : filteredFavoriteRecipes.slice(0, 3);

  const displayedYourRecipes = showAllYourRecipes
    ? filteredYourRecipes
    : filteredYourRecipes.slice(0, 3);

    const getTodayDate = () => {
      const currentDate = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      return currentDate.toLocaleDateString(undefined, options);
    };

  return (
    
    <View style={styles.container}>
      <Text style={[TextStyle.h2,styles.mealPlanTitle]}>Meal Plan</Text>
      <Text style={[TextStyle.body,styles.dateText]}>{getTodayDate()}</Text>
      <View style={[primary, styles.searchContainer]}>
      <Icon name="search" size={15}/>
        <TextInput
          style={[TextStyle.body]}
          placeholder="Search Favorites"
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>

      {/* Favorite Recipes Section */}
      <View style={styles.titleContainer}>
      <Text style={TextStyle.h2}>
    Favorite Recipes
    <Icon name="heart"/> 
      </Text>
        <TouchableOpacity
            style={[primary,styles.exploreMoreButton]}
              onPress={() => setShowAllFavoriteRecipes(!showAllFavoriteRecipes)}>
            <Text style={[TextStyle.h3,styles.exploreMoreButtonText]}>Explore More</Text>
      </TouchableOpacity>

      </View>

      <FlatList
        data={displayedFavoriteRecipes}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity key={`favRecipe${item.id}`} style={[primary, styles.recipeFavItem]}>
            <Image source={{uri: item.imageUrl}} style={styles.recipeImage} />
            <View style={styles.recipeInfo}>
              <Text style={TextStyle.h3}>{item.name}</Text>
              <View style={styles.additionalInfo}>
                <Text style={TextStyle.body}>
                  <Icon name="timer" size={16} /> {item.duration}{' '}
                  min
                </Text>
                <Text style={styles.rating}>
                  {[...Array(Math.round(item.rating))].map((_, i) => (
                    <Icon key={i} name="star" size={16} color="#FFD700" />
                  ))}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
         horizontal={true}
      />

      {/* Your Recipes Section */}
      <View style={styles.titleContainer}>
      <Text style={TextStyle.h2}>
    Your Recipes {' '}
    <Icon name="clipboard"/> 
      </Text>
        <TouchableOpacity
            style={[primary,styles.exploreMoreButton]}
              onPress={() => navigation.navigate("EnterRecipeIngredientsScreen")}>
            <Text style={[TextStyle.h3,styles.exploreMoreButtonText]}>Add a Recipe</Text>
      </TouchableOpacity>
      </View>
      <FlatList
        data={displayedYourRecipes}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity style={[primary, styles.recipeItem]}>
            <Image source={{uri: item.imageUrl}} style={styles.recipeImage} />
            <View style={styles.recipeInfo}>
              <Text style={TextStyle.h3}>{item.name}</Text>
              <View style={styles.additionalInfo}>
                <Text style={TextStyle.body}>
                  <Icon name="timer" size={16} /> {item.duration}{' '}
                  min
                </Text>
                <Text style={styles.rating}>
                  {[...Array(Math.round(item.rating))].map((_, i) => (
                    <Icon key={i} name="star" size={16} color="#FFD700" />
                  ))}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      <Button
          style={[primary, styles.confirmButton]}
          onPress={goToDateScreen}
        >
          <Text style={[TextStyle.h4, {color:'white'}]}>Create a New Meal Plan</Text>
        </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
    padding: 10,
  },
  mealPlanTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 10,
  },
  dateText: {
    fontSize: 18,
    marginLeft: 10,
    marginBottom: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  recipeItem: {
    flexDirection: 'row',
    alignItems: 'flex-start', 
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    padding: 10,
    marginBottom: 16,
    backgroundColor: 'white',
    elevation: 2,
    height: 100,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2 },
  },

  recipeImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },

  recipeInfo: {
    flex: 1,
  },
  additionalInfo: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    color: '#888',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 25,
    marginTop: 30,
    borderWidth: 1,
    borderColor: '#F5F7FB',
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingRight: 200, 
    width: 390, 
  },
  recipeFavItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    padding: 10,
    marginBottom: 50,
    marginLeft: 10,
    height: 100,
    backgroundColor: 'white',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2 },
  },
  exploreMoreButton: {
    backgroundColor: '#2E9DFB', 
    alignItems: 'center',
    height:50, 
    marginTop:20
  },
  exploreMoreButtonText: {
    color: 'white', 
    fontWeight: 'bold', 
    fontSize: 16, 
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  confirmButton: {
    marginTop: 30, 
    backgroundColor: '#4CAF50', 
    alignItems: 'center',
    marginHorizontal:40
  },

});

export default MealPlanScreen;
