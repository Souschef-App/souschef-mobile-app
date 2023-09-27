import React, {useContext, useRef, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  COOKING_UNIT,
  COOKING_UNIT_TO_STR,
  DIFFICULTY,
  Recipe,
} from '../api/responses';
import {
  BottomSheet,
  CircularButton,
  Column,
  Row,
  SafeArea,
} from '../components';
import {BottomSheetRefProps, BottomSheetState} from '../components/BottomSheet';
import {SpringPressable} from '../components/pressable';
import {ThemeContext} from '../contexts/AppContext';
import {
  RecipeScreenNavigationProp,
  RecipeScreenRouteProp,
} from '../navigation/types';
import {Theme} from '../styles/type';

// Render Sub-Components
const floatingButtonComponent = (
  theme: Theme,
  styles: any,
  {
    favorite,
    setFavorite,
  }: {
    favorite: boolean;
    setFavorite: React.Dispatch<React.SetStateAction<boolean>>;
  },
): React.ReactNode => {
  return (
    <Row
      horizontalResizing="fill"
      justifyContent="flex-end"
      paddingHorizontal={theme.spacing.m}
      paddingVertical={theme.spacing.m}
      style={styles.floatingTop}>
      <SpringPressable onPress={() => setFavorite(!favorite)}>
        <CircularButton
          bgColor={theme.colors.danger}
          color="#fff"
          iconName={favorite ? 'heart' : 'heart-outline'}></CircularButton>
      </SpringPressable>
    </Row>
  );
};

const bottomSheetBodyComponent = (
  theme: Theme,
  styles: any,
  recipe: Recipe,
  maximized: boolean,
) => {
  return (
    <Column
      justifyContent="flex-start"
      horizontalResizing="fill"
      verticalResizing="fill"
      paddingHorizontal={theme.spacing.m}
      paddingVertical={theme.spacing.m}
      spacing={theme.spacing.m}>
      <Text numberOfLines={2} style={styles.h1}>
        {recipe.name}
      </Text>
      {recipeHighlightComponent(theme, styles, recipe)}
      {recipeIngredientsComponent(theme, styles, recipe, maximized ? -1 : 3)}
      {recipeKitchenwareComponent(theme, styles, recipe, maximized ? -1 : 3)}
      {recipeStepsComponent(theme, styles, recipe)}
    </Column>
  );
};

const recipeHighlightComponent = (
  theme: Theme,
  styles: any,
  recipe: Recipe,
) => {
  return (
    <Row horizontalResizing="fill" spacing={theme.spacing.m}>
      <Row spacing={theme.spacing.s}>
        <MaterialIcons name="timer" style={styles.icon} />
        <Text style={styles.timerText}>
          {Math.round(recipe.duration / 60)} min
        </Text>
      </Row>
      <View style={styles.divider} />
      <Row>
        <MaterialIcons name="star" style={styles.starIcon} />
        <MaterialIcons
          name="star"
          style={[
            styles.starIcon,
            recipe.difficulty < DIFFICULTY.Medium ? styles.starEmptyIcon : {},
          ]}
        />
        <MaterialIcons
          name="star"
          style={[
            styles.starIcon,
            recipe.difficulty < DIFFICULTY.Hard ? styles.starEmptyIcon : {},
          ]}
        />
      </Row>
      <View style={styles.divider} />
      <Row spacing={theme.spacing.s}>
        <MaterialIcons name="person" style={styles.icon} />
        <Text style={styles.timerText}>{recipe.serves} Serving</Text>
      </Row>
    </Row>
  );
};

const recipeIngredientsComponent = (
  theme: Theme,
  styles: any,
  recipe: Recipe,
  amount: number = -1,
) => {
  const isEmpty = recipe.ingredients.length == 0;
  const ingredients =
    amount > 0 ? recipe.ingredients.slice(0, amount) : recipe.ingredients;

  const formatUnit = (_quantity: number, _unit: COOKING_UNIT): string => {
    let measurement = _quantity.toString();
    let unit;
    if (_unit == COOKING_UNIT.None) unit = 'x';
    else {
      unit = ' ' + COOKING_UNIT_TO_STR[_unit];
      if (_quantity > 1) unit += 's';
    }
    return measurement + unit;
  };
  return (
    <Column
      alignItems="flex-start"
      horizontalResizing="fill"
      spacing={theme.spacing.s}>
      <Text style={styles.h2}>Ingredients</Text>
      {ingredients.slice(0, amount).map((ingredient, i) => (
        <Row
          key={i}
          justifyContent="flex-start"
          horizontalResizing="fill"
          paddingHorizontal={theme.spacing.s}
          spacing={theme.spacing.s}>
          <View style={styles.listBullet} />
          <Text style={styles.listItem}>{ingredient.name}</Text>
          <Text style={[styles.listItem, {fontWeight: 'bold'}]}>
            {formatUnit(ingredient.quantity, ingredient.unit)}
          </Text>
        </Row>
      ))}
      {isEmpty ||
        (amount > 0 && amount < recipe.ingredients.length && (
          <Row
            justifyContent="flex-start"
            horizontalResizing="fill"
            paddingHorizontal={theme.spacing.s}
            spacing={theme.spacing.s}>
            <View style={styles.listBullet} />
            <Text style={styles.listItem}>
              {recipe.ingredients.length == 0 ? 'none' : 'and more...'}
            </Text>
          </Row>
        ))}
    </Column>
  );
};

const recipeKitchenwareComponent = (
  theme: Theme,
  styles: any,
  recipe: Recipe,
  amount: number = -1,
) => {
  const isEmpty = recipe.kitchenware.length == 0;
  const kitchenware =
    amount > 0 ? recipe.kitchenware.slice(0, amount) : recipe.kitchenware;
  return (
    <Column
      alignItems="flex-start"
      horizontalResizing="fill"
      spacing={theme.spacing.s}>
      <Text style={styles.h2}>Kitchenware</Text>
      {kitchenware.map((kw, i) => (
        <Row
          key={i}
          justifyContent="flex-start"
          horizontalResizing="fill"
          paddingHorizontal={theme.spacing.s}
          spacing={theme.spacing.s}>
          <View style={styles.listBullet} />
          <Text style={styles.listItem}>{kw.name}</Text>
          <Text style={[styles.listItem, {fontWeight: 'bold'}]}>
            {`${kw.quantity > 0 ? kw.quantity + 'x' : ''}`}
          </Text>
        </Row>
      ))}
      {isEmpty ||
        (amount > 0 && amount < recipe.kitchenware.length && (
          <Row
            justifyContent="flex-start"
            horizontalResizing="fill"
            paddingHorizontal={theme.spacing.s}
            spacing={theme.spacing.s}>
            <View style={styles.listBullet} />
            <Text style={styles.listItem}>
              {isEmpty ? 'none' : 'and more...'}
            </Text>
          </Row>
        ))}
    </Column>
  );
};

const recipeStepsComponent = (theme: Theme, styles: any, recipe: Recipe) => {
  return (
    <Column
      alignItems="flex-start"
      horizontalResizing="fill"
      spacing={theme.spacing.m}>
      <Text style={styles.h2}>Steps</Text>
      {recipe.tasks.map((task, i) => {
        let backgroundColor = '#FBB148';
        if (i % 3 == 1) backgroundColor = '#5ab885';
        else if (i % 3 == 2) backgroundColor = '#80b2e0';
        return (
          <Row
            key={i}
            justifyContent="flex-start"
            horizontalResizing="fill"
            paddingHorizontal={theme.spacing.s}
            spacing={theme.spacing.m}>
            <Text style={[styles.listNumber, {backgroundColor}]}>{i + 1}</Text>
            <Text key={i} style={styles.listItem}>
              {task.description}
            </Text>
          </Row>
        );
      })}
    </Column>
  );
};

const RecipeScreen = ({
  navigation,
  route,
}: {
  navigation: RecipeScreenNavigationProp;
  route: RecipeScreenRouteProp;
}) => {
  // Route
  const {recipe} = route.params;

  // Theme
  const theme = useContext(ThemeContext);
  const stylesWithTheme = styles(theme);

  // Ref
  const ref = useRef<BottomSheetRefProps>(null);

  // Use State
  const [favorite, setFavorite] = useState(false);
  const [maximized, setMaximized] = useState(false);

  const onChange = (state: BottomSheetState) => {
    setMaximized(state == BottomSheetState.Max);
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeArea>
        <Column
          justifyContent="flex-start"
          horizontalResizing="fill"
          verticalResizing="fill">
          {floatingButtonComponent(theme, stylesWithTheme, {
            favorite,
            setFavorite,
          })}
          <Image
            source={require('../res/default-recipes/default-recipe.jpg')}
            style={stylesWithTheme.bannerImage}
          />
          <BottomSheet ref={ref} onStateChange={onChange} zIndex={2}>
            {maximized ? (
              <ScrollView
                contentContainerStyle={{paddingBottom: theme.spacing.l}}>
                {bottomSheetBodyComponent(theme, stylesWithTheme, recipe, true)}
              </ScrollView>
            ) : (
              bottomSheetBodyComponent(theme, stylesWithTheme, recipe, false)
            )}
          </BottomSheet>
        </Column>
      </SafeArea>
    </GestureHandlerRootView>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    bannerImage: {
      width: '100%',
      height: '36%',
    },
    floatingTop: {
      position: 'absolute',
      top: 0,
      width: '100%',
      zIndex: 1,
    },
    h1: {
      color: theme.colors.text,
      fontSize: 36,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    h2: {
      color: theme.colors.text,
      fontSize: 24,
      fontWeight: 'bold',
    },
    icon: {
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
    divider: {
      width: 2,
      height: 36,
      backgroundColor: '#D9D9D9',
      alignSelf: 'center',
      borderRadius: 8,
    },
    listItem: {
      color: theme.colors.text,
      fontSize: 16,
    },
    listBullet: {
      backgroundColor: '#FBB148',
      width: 8,
      height: 8,
      borderRadius: 32,
    },
    listNumber: {
      backgroundColor: '#FBB148',
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      textAlignVertical: 'center',
      width: 28,
      height: 28,
      borderRadius: 32,
    },
  });

export default RecipeScreen;
