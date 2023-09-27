import React, {useContext, useEffect} from 'react';
import {Image, ScrollView, StyleSheet, Text} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ApiUrls} from '../../api/constants/ApiConstants';
import {DIFFICULTY, Recipe} from '../../api/responses';
import {Card, Column, Row, SafeArea, SearchBar} from '../../components';
import {SpringPressable} from '../../components/pressable';
import {ThemeContext} from '../../contexts/AppContext';
import {useGet} from '../../hooks';
import {HomeScreenNavigationProp} from '../../navigation/types';
import {Theme} from '../../styles/type';

const HomeScreen = ({navigation}: {navigation: HomeScreenNavigationProp}) => {
  // Theme
  const theme = useContext(ThemeContext);
  const stylesWithTheme = styles(theme);

  // Fields
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [newRecipes, setNewRecipes] = React.useState<Recipe[]>([]);
  const [exploreRecipes, setExploreRecipes] = React.useState<Recipe[]>([]);
  const [searchRecipes, setSearchRecipes] = React.useState<Recipe[]>([]);

  // API Calls
  const {
    get: getPublicRecipes,
    data: publicRecipes,
    loading: publicRecipesLoading,
    error: publicRecipesError,
  } = useGet<Recipe[]>(`${ApiUrls.publicRecipes}`, []);

  // OnMount
  useEffect(() => {
    navigation.addListener('focus', onMount);
    return () => {
      navigation.removeListener('focus', onMount);
    };
  }, []);

  // OnPublicRecipesData
  useEffect(() => {
    // New Recipes (<= 1 week old)
    const weekThreshold = Date.now() - 604800000; // Week in milliseconds
    setNewRecipes(
      publicRecipes?.filter((recipe, i) => {
        if (recipe.date * 1000 >= weekThreshold) return recipe;
      }) ?? [],
    );

    // Popular Recipes
    setExploreRecipes(
      publicRecipes?.sort(
        (a: Recipe, b: Recipe) => a.favorites - b.favorites,
      ) ?? [],
    );
  }, [publicRecipes]);

  // Methods
  const onMount = () => {
    getPublicRecipes(); // API Request
    setSearchValue('');
  };

  const onSearch = (query: string) => {
    setSearchValue(query);
    setSearchRecipes(
      publicRecipes?.filter(recipe =>
        recipe.name.toLowerCase().startsWith(query.toLowerCase()),
      ) ?? [],
    );
  };

  const seeAllPressed = () => {
    console.log('See All!');
  };

  const recipePressed = (_recipe: Recipe) => {
    navigation.navigate('Recipe', {recipe: _recipe});
  };

  return (
    <SafeArea>
      <Column
        justifyContent="flex-start"
        horizontalResizing="fill"
        verticalResizing="fill"
        paddingVertical={theme.spacing.xl}
        spacing={theme.spacing.m}>
        {/* Title & Search Bar*/}
        <Column paddingHorizontal={theme.spacing.m} spacing={theme.spacing.m}>
          {/* Title */}
          {searchValue.length == 0 && (
            <Text style={stylesWithTheme.h1}>Browse Recipes!</Text>
          )}
          {/* Search Bar */}
          <SearchBar
            value={searchValue}
            onChangeText={onSearch}
            bgColor={theme.colors.foreground}
            placeholder="Search recipes"></SearchBar>
        </Column>
        {/* Body */}
        {searchValue.length > 0 ? (
          /* Searched Recipes */
          <Column horizontalResizing="fill">
            <Text
              style={[
                {paddingHorizontal: theme.spacing.m},
                stylesWithTheme.h3,
              ]}>
              Recipes Found ({searchRecipes.length})
            </Text>
            {verticalRecipesComponent(
              searchRecipes,
              recipePressed,
              theme,
              stylesWithTheme,
            )}
          </Column>
        ) : (
          /* New & Explore Recipes */
          <Column horizontalResizing="fill">
            {/* New Recipes */}
            <Column horizontalResizing="fill">
              <Text
                style={[
                  {paddingHorizontal: theme.spacing.m},
                  stylesWithTheme.h2,
                ]}>
                New
              </Text>
              {newRecipes.length == 0 ? (
                <Text style={stylesWithTheme.optional}>No new recipes</Text>
              ) : (
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    paddingHorizontal: theme.spacing.m,
                    paddingVertical: theme.spacing.m,
                    flexGrow: 1,
                  }}>
                  <Row
                    justifyContent="flex-start"
                    horizontalResizing="fill"
                    spacing={theme.spacing.m}>
                    {newRecipes.map((recipe, i) => {
                      return (
                        <SpringPressable
                          key={i}
                          onPress={() => recipePressed(recipe)}>
                          <Card
                            justifyContent="flex-end"
                            paddingHorizontal={0}
                            paddingVertical={0}>
                            <Image
                              source={require('../../res/default-recipes/default-recipe.jpg')}
                              style={stylesWithTheme.mediumImage}></Image>
                            <Text style={stylesWithTheme.imageOverlay}>
                              {recipe.name}
                            </Text>
                          </Card>
                        </SpringPressable>
                      );
                    })}
                  </Row>
                </ScrollView>
              )}
            </Column>
            {/* Explore Recipes */}
            <Column horizontalResizing="fill">
              <Text
                style={[
                  {paddingHorizontal: theme.spacing.m},
                  stylesWithTheme.h2,
                ]}>
                Explore
              </Text>
              {exploreRecipes.length == 0 ? (
                <Text style={stylesWithTheme.optional}>No recipes found</Text>
              ) : (
                verticalRecipesComponent(
                  exploreRecipes,
                  recipePressed,
                  theme,
                  stylesWithTheme,
                )
              )}
            </Column>
          </Column>
        )}
      </Column>
    </SafeArea>
  );
};

const verticalRecipesComponent = (
  recipes: Recipe[],
  onPressed: (recipe: Recipe) => void,
  theme: Theme,
  styles: any,
) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: theme.spacing.m,
        paddingVertical: theme.spacing.s,
      }}
      style={{
        alignSelf: 'stretch',
        height: 275,
      }}>
      <Column
        horizontalResizing="fill"
        verticalResizing="fill"
        spacing={theme.spacing.m}>
        {recipes.map((recipe, i) => {
          return (
            <SpringPressable
              key={i}
              onPress={() => onPressed(recipe)}
              horizontalResizing="fill">
              <Card
                paddingHorizontal={0}
                paddingVertical={0}
                style={styles.card}>
                <Row justifyContent="flex-start" horizontalResizing="fill">
                  <Image
                    source={require('../../res/default-recipes/default-recipe.jpg')}
                    style={styles.smallImage}></Image>
                  <Column
                    justifyContent="space-between"
                    alignItems="flex-start"
                    horizontalResizing="fill"
                    verticalResizing="fill"
                    paddingHorizontal={theme.spacing.m}
                    paddingVertical={theme.spacing.m}
                    spacing={theme.spacing.s}>
                    <Row horizontalResizing="fill">
                      <Text numberOfLines={2} style={styles.cardText}>
                        {recipe.name}
                      </Text>
                    </Row>
                    <Row
                      justifyContent="flex-start"
                      horizontalResizing="fill"
                      spacing={theme.spacing.m}>
                      <Row spacing={theme.spacing.s}>
                        <MaterialIcons name="timer" style={styles.timerIcon} />
                        <Text style={styles.timerText}>
                          {Math.round(recipe.duration / 60)} min
                        </Text>
                      </Row>
                      <Row>
                        <MaterialIcons name="star" style={styles.starIcon} />
                        <MaterialIcons
                          name="star"
                          style={[
                            styles.starIcon,
                            recipe.difficulty < DIFFICULTY.Medium
                              ? styles.starEmptyIcon
                              : {},
                          ]}
                        />
                        <MaterialIcons
                          name="star"
                          style={[
                            styles.starIcon,
                            recipe.difficulty < DIFFICULTY.Hard
                              ? styles.starEmptyIcon
                              : {},
                          ]}
                        />
                      </Row>
                    </Row>
                  </Column>
                </Row>
              </Card>
            </SpringPressable>
          );
        })}
      </Column>
    </ScrollView>
  );
};

const mediumImage = {width: 175, height: 200};
const smallImage = {width: 110, height: 110};

const styles = (theme: Theme) =>
  StyleSheet.create({
    h1: {
      color: theme.colors.text,
      fontSize: 28,
      fontWeight: 'bold',
      alignSelf: 'stretch',
      textAlign: 'left',
      paddingTop: theme.spacing.l,
    },
    h2: {
      color: theme.colors.text,
      fontSize: 24,
      fontWeight: 'bold',
      alignSelf: 'stretch',
      textAlign: 'left',
    },
    h3: {
      color: theme.colors.text,
      fontSize: 18,
      fontWeight: 'bold',
      alignSelf: 'stretch',
      textAlign: 'left',
    },
    optional: {
      color: '#D0BEBE',
      fontSize: 18,
      paddingTop: theme.spacing.s,
    },
    mediumImage: {
      width: mediumImage.width,
      height: mediumImage.height,
      borderRadius: 8,
      shadowRadius: 8,
    },
    imageOverlay: {
      color: '#fff',
      fontSize: 16,
      textAlign: 'center',
      fontWeight: 'bold',
      backgroundColor: '#0008',
      padding: theme.spacing.s,
      borderRadius: 8,
      position: 'absolute',
      left: 0,
      right: 0,
    },
    card: {
      height: smallImage.height,
    },
    cardText: {
      color: theme.colors.text,
      fontSize: 20,
      fontWeight: 'bold',
      flex: 1,
    },
    smallImage: {
      width: smallImage.width,
      height: smallImage.height,
      borderBottomLeftRadius: 8,
      borderTopLeftRadius: 8,
    },
    timerIcon: {
      color: theme.colors.text,
      textAlign: 'center',
      fontSize: 24,
    },
    timerText: {
      color: theme.colors.text,
      textAlign: 'center',
      fontSize: 16,
      fontWeight: 'bold',
    },
    starIcon: {
      color: '#ffcd3c',
      fontSize: 28,
    },
    starEmptyIcon: {
      color: '#fff2ce',
    },
  });

export default HomeScreen;
