import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { Button, Icon } from '../../components';
import { primary } from '../../styles/ButtonStyle';
import { TextStyle as textStyle } from '../../styles/';
import { RouteProp, NavigationProp } from '@react-navigation/native';
import { FavoriteScreenNavigationProp, FavoriteScreenRouteProp, MealNameScreenNavigationProp } from '../../navigation/types';
import { useSessionApi } from '../../hooks/useSessionApi';
import useStore from '../../data/store';

interface Recipe {
  id: number;
  name: string;
  duration: number;
  rating: number;
  imageUrl: string;
}

const allRecipes: Recipe[] = [
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

const yourRecipes: Recipe[] = [
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


const FavoriteRecipesScreen: React.FC<{ route: FavoriteScreenRouteProp, navigation: MealNameScreenNavigationProp }> = ({ route, navigation }) => {

  const { date, time, occasion, mealName, recipes, mealType } = route.params;

  const { fetchFavoriteRecipes, fetchAllRecipes } = useSessionApi()
  const user = useStore((state) => state.user);
  
  const goToMealScreen = (recipe: any) => {
    navigation.navigate('MealNameScreen', { date, time, occasion, mealName, recipes: !recipes ? [ recipe ] : [ ...recipes, { ...recipe, type: mealType } ] });
  }
  const [searchText, setSearchText] = useState<string>('');
  const [allRecipes, setAllRecipes] = useState<any[]>([]);
  const [yourRecipes, setYourRecipes] = useState<any[]>([]);
  const [filteredFavoriteRecipes, setFilteredFavoriteRecipes] =
    useState<any[]>([]);
  const [filteredYourRecipes, setFilteredYourRecipes] =
    useState<any[]>([]);
  const [showAllFavoriteRecipes, setShowAllFavoriteRecipes] =
    useState<boolean>(false);
  const [showAllYourRecipes, setShowAllYourRecipes] = useState<boolean>(false);

  const handleSearch = (text: string) => {
    setSearchText(text);
    const filteredFavorite = allRecipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredFavoriteRecipes(filteredFavorite);

    const filteredYourRecipe = yourRecipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredYourRecipes(filteredYourRecipe);
  };

  const displayedFavoriteRecipes = showAllFavoriteRecipes
    ? filteredFavoriteRecipes
    : filteredFavoriteRecipes.slice(0, 3);

  const displayedYourRecipes = showAllYourRecipes
    ? filteredYourRecipes
    : filteredYourRecipes.slice(0, 3);

  useEffect(() => {
    // console.log("Recipes", user?.id);
    fetchFavoriteRecipes(user?.id ?? "").then(res => {
      
      const recipes = res.data.map((r: any) => r.recipe)
      // console.log(res.data, recipes)
      setAllRecipes(recipes);
      setFilteredFavoriteRecipes(recipes);
    }).catch(err => {
      setAllRecipes([])
      setFilteredFavoriteRecipes([])
    })

    fetchAllRecipes().then(res => {  
      setYourRecipes(res.data);
      setFilteredYourRecipes(res.data);
    }).catch(err => {
      setYourRecipes([])
      setFilteredYourRecipes([])
    })
  }, [setAllRecipes, setFilteredFavoriteRecipes])

  return (
    <View style={styles.container}>
      <View style={[primary, styles.searchContainer]}>
        <Icon name="search" size={15} />
        <TextInput
          style={textStyle.body}
          placeholder="Search Favorites"
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>

      {/* Favorite Recipes Section */}
      <View style={styles.titleContainer}>
        <Text style={textStyle.h2}>Favorite Recipes</Text>
        <TouchableOpacity
          style={[styles.seeAllButton]}
          onPress={() => setShowAllFavoriteRecipes(!showAllFavoriteRecipes)}
        >
          <Text style={textStyle.body}>See All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={displayedFavoriteRecipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Button
            style={[primary, styles.recipeItem]}
            onPress={() => goToMealScreen(item)}
          >
            <Image source={{ uri: item.imageUrl ? item.imageUrl : 'https://121399388.cdn6.editmysite.com/uploads/1/2/1/3/121399388/s179680401136495038_p25_i1_w700.jpeg?width=800&optimize=medium' }} style={styles.recipeImage} />
            <View style={styles.recipeInfo}>
              <Text style={textStyle.h3}>{item.name}</Text>
              <View style={styles.additionalInfo}>
                <Text style={textStyle.body}>
                  <Icon name="timer" size={16} /> {item.duration} min
                </Text>
                <Text style={styles.rating}>
                  {[...Array(Math.round(4.5))].map((_, i) => (
                    <Icon key={i} name="star" size={16} color="#FFD700" />
                  ))}
                </Text>
              </View>
            </View>
          </Button>
        )}
      />

      {/* Your Recipes Section */}
      <View style={styles.titleContainer}>
        <Text style={textStyle.h2}>Your Recipes</Text>
        <TouchableOpacity
          style={[styles.seeAllButton]}
          onPress={() => setShowAllYourRecipes(!showAllYourRecipes)}
        >
          <Text style={textStyle.body}>See All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={displayedYourRecipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Button
            style={[primary, styles.recipeItem]}
            onPress={() => goToMealScreen(item)}
          >
            <Image source={{ uri: item.imageUrl ? item.imageUrl : 'https://121399388.cdn6.editmysite.com/uploads/1/2/1/3/121399388/s179680401136495038_p25_i1_w700.jpeg?width=800&optimize=medium' }} style={styles.recipeImage} />
            <View style={styles.recipeInfo}>
              <Text style={textStyle.h3}>{item.name}</Text>
              <View style={styles.additionalInfo}>
                <Text style={textStyle.body}>
                  <Icon name="timer" size={16} /> {item.duration} min
                </Text>
                <Text style={styles.rating}>
                  {[...Array(Math.round(4.5))].map((_, i) => (
                    <Icon key={i} name="star" size={16} color="#FFD700" />
                  ))}
                </Text>
              </View>
            </View>
          </Button>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
    padding: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  seeAllButton: {
    borderBottomWidth: 1,
    borderBottomColor: '#4CAF50',
  },
  recipeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    backgroundColor: 'white',
    elevation: 2,
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
});

export default FavoriteRecipesScreen;
