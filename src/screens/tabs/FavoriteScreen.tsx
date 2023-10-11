import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Recipe {
  id: number;
  name: string;
  duration: number; // Add duration property
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

const FavoriteRecipesScreen: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [filteredFavoriteRecipes, setFilteredFavoriteRecipes] =
    useState<Recipe[]>(allRecipes);
  const [filteredYourRecipes, setFilteredYourRecipes] =
    useState<Recipe[]>(yourRecipes);
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

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for recipes"
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>

      {/* Favorite Recipes Section */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Favorite Recipes</Text>
        <TouchableOpacity
          style={styles.seeAllButton}
          onPress={() => setShowAllFavoriteRecipes(!showAllFavoriteRecipes)}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={displayedFavoriteRecipes}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.recipeItem}>
            <Image source={{uri: item.imageUrl}} style={styles.recipeImage} />
            <View style={styles.recipeInfo}>
              <Text style={styles.recipeName}>{item.name}</Text>
              <View style={styles.additionalInfo}>
                <Text style={styles.duration}>
                  <Icon name="clock-o" size={16} color="#888" /> {item.duration}{' '}
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

      {/* Your Recipes Section */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Your Recipes</Text>
        <TouchableOpacity
          style={styles.seeAllButton}
          onPress={() => setShowAllYourRecipes(!showAllYourRecipes)}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={displayedYourRecipes}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.recipeItem}>
            <Image source={{uri: item.imageUrl}} style={styles.recipeImage} />
            <View style={styles.recipeInfo}>
              <Text style={styles.recipeName}>{item.name}</Text>
              <View style={styles.additionalInfo}>
                <Text style={styles.duration}>
                  <Icon name="clock-o" size={16} color="#888" /> {item.duration}{' '}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllButton: {
    borderBottomWidth: 1,
    borderBottomColor: '#4CAF50',
  },
  seeAllText: {
    fontSize: 16,
    color: '#D0BEBE',
    textDecorationLine: 'underline',
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
    shadowOffset: {width: 0, height: 2},
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
  recipeName: {
    fontSize: 20,
    color: '#333',
  },
  additionalInfo: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  duration: {
    fontSize: 14,
    color: '#888',
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
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    backgroundColor: 'white',
  },
  searchIcon: {
    paddingLeft: 16,
    paddingRight: 8,
    color: '#888',
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
});

export default FavoriteRecipesScreen;
