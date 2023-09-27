import React, {useContext, useEffect, useRef, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import Animated, {
  BounceIn,
  BounceInDown,
  FadeIn,
  FadeInDown,
  SlideInDown,
  SlideInLeft,
  SlideInUp,
  SlideOutDown,
} from 'react-native-reanimated';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ApiUrls} from '../api/constants/ApiConstants';
import {
  COOKING_UNIT,
  COOKING_UNIT_TO_STR,
  defaultTask,
  DIFFICULTY,
  Task,
} from '../api/responses';
import {
  BottomSheet,
  Card,
  Column,
  IconButton,
  Row,
  SafeArea,
  Timer,
} from '../components';
import {BottomSheetState} from '../components/BottomSheet';
import CircularButton from '../components/CircularButton';
import {OpacityPressable, SpringPressable} from '../components/pressable';
import {AuthContext, ThemeContext} from '../contexts/AppContext';
import {useGet, usePost} from '../hooks';
import {
  TaskScreenNavigationProp,
  TaskScreenRouteProp,
} from '../navigation/types';
import DefaultMeal from '../res/default-recipe.svg';
import {Theme} from '../styles/type';

const taskHighlightComponent = (theme: Theme, styles: any, task: Task) => {
  let timeInMinutes = task.duration / 60;
  return (
    <Row horizontalResizing="fill" spacing={theme.spacing.m}>
      <Row spacing={theme.spacing.s}>
        <MaterialIcons name="timer" style={styles.icon} />
        <Text style={styles.timerText}>
          {timeInMinutes < 1 ? timeInMinutes.toFixed(2) : timeInMinutes} min
        </Text>
      </Row>
      <View style={styles.divider} />
      <Row>
        <MaterialIcons name="star" style={styles.starIcon} />
        <MaterialIcons
          name="star"
          style={[
            styles.starIcon,
            task.difficulty < DIFFICULTY.Medium ? styles.starEmptyIcon : {},
          ]}
        />
        <MaterialIcons
          name="star"
          style={[
            styles.starIcon,
            task.difficulty < DIFFICULTY.Hard ? styles.starEmptyIcon : {},
          ]}
        />
      </Row>
    </Row>
  );
};

const taskInstructionComponent = (
  theme: Theme,
  styles: any,
  description: string,
) => {
  return (
    <Column
      alignItems="flex-start"
      horizontalResizing="fill"
      spacing={theme.spacing.s}>
      <Text style={styles.h2}>Instruction</Text>
      <Row
        justifyContent="flex-start"
        horizontalResizing="fill"
        paddingHorizontal={theme.spacing.s}
        spacing={theme.spacing.s}>
        <View style={styles.listBullet} />
        <Text style={styles.listItem}>{description}</Text>
      </Row>
    </Column>
  );
};

const taskIngredientsComponent = (theme: Theme, styles: any, task: Task) => {
  const isEmpty = task.ingredients.length == 0;
  const formatUnit = (_quantity: number, _unit: COOKING_UNIT): string => {
    if (_quantity == -1) return '';
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
      {task.ingredients.map((ingredient, i) => (
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
      {isEmpty && (
        <Row
          justifyContent="flex-start"
          horizontalResizing="fill"
          paddingHorizontal={theme.spacing.s}
          spacing={theme.spacing.s}>
          <View style={styles.listBullet} />
          <Text style={styles.listItem}>None</Text>
        </Row>
      )}
    </Column>
  );
};

const taskKitchenwareComponent = (theme: Theme, styles: any, task: Task) => {
  const isEmpty = task.kitchenware.length == 0;
  return (
    <Column
      alignItems="flex-start"
      horizontalResizing="fill"
      spacing={theme.spacing.s}>
      <Text style={styles.h2}>Kitchenware</Text>
      {task.kitchenware.map((kw, i) => (
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
      {isEmpty && (
        <Row
          justifyContent="flex-start"
          horizontalResizing="fill"
          paddingHorizontal={theme.spacing.s}
          spacing={theme.spacing.s}>
          <View style={styles.listBullet} />
          <Text style={styles.listItem}>None</Text>
        </Row>
      )}
    </Column>
  );
};

const estimatedMealComponent = (theme: Theme, styles: any) => {
  const estimatedMealTimeInSeconds = 0 * 3600 + 30 * 60 + 0; // hr + min + sec
  return (
    <Card>
      <Row horizontalResizing="fill" justifyContent="space-between">
        <Row spacing={theme.spacing.s}>
          <MaterialIcons name="access-time" style={styles.timeIcon} />
          <Text style={[{fontWeight: 'bold'}, styles.timeText]}>
            Est. Meal Time:
          </Text>
          <Text style={styles.timeText}>
            {estimatedMealTimeInSeconds / 60} min
          </Text>
        </Row>
        <OpacityPressable>
          <Text style={styles.viewMore}>View more</Text>
        </OpacityPressable>
      </Row>
    </Card>
  );
};

const recipeButtonsComponent = (
  theme: Theme,
  onCompletePressed: () => void,
  onNewTaskPressed: () => void,
  loading: boolean,
) => {
  return (
    <Row
      horizontalResizing="fill"
      spacing={theme.spacing.m}
      paddingHorizontal={theme.spacing.m}>
      <SpringPressable
        horizontalResizing="fill"
        verticalResizing="fill"
        onPress={onCompletePressed}>
        <IconButton
          loading={loading}
          iconName="check"
          text="Complete Task"
          horizontalResizing="fill"
          verticalResizing="fill"
        />
      </SpringPressable>
      <SpringPressable onPress={onNewTaskPressed}>
        <CircularButton bgColor="#fb7558" color="#fff" iconName="refresh" />
      </SpringPressable>
    </Row>
  );
};

const TaskScreen = ({
  navigation,
  route,
}: {
  navigation: TaskScreenNavigationProp;
  route: TaskScreenRouteProp;
}) => {
  // Route
  // const {sessionId} = route.params;
  const sessionId = "060aee6b-eab0-47f1-b2ab-801d00343948"

  // User
  const {user} = useContext(AuthContext);
  const isMounted = useRef(false);

  // Theme
  const theme = useContext(ThemeContext);
  const stylesWithTheme = styles(theme);

  // Fields
  const [task, setTask] = useState<Task>();
  const [outOfTask, setOutOfTask] = useState(false);
  const [maximized, setMaximized] = useState(false);

  // API Calls
  const {
    get: getTask,
    data: taskData,
    loading: taskLoading,
    success: taskSuccess,
    error: taskError,
  } = useGet<Task>(ApiUrls.getTask, defaultTask);

  const {
    post: completeTask,
    loading: completeTaskLoading,
    success: completeTaskSuccess,
    error: completeTaskError,
  } = usePost(ApiUrls.completeTask);

  const {
    get: rerollTask,
    data: rerollTaskData,
    loading: rerollTaskLoading,
    success: rerollSuccess,
    error: rerollTaskError,
  } = useGet<Task>(ApiUrls.rerollTask, defaultTask);

  useEffect(() => {
    // First time mount
    if (!isMounted.current) {
      isMounted.current = true;
      getTask({sessionId: sessionId, userId: user?.id});
    }
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      if (completeTaskError == 'Invalid session ID') {
        navigation.goBack();
      } else if (taskError == 'No more tasks available') {
        setOutOfTask(true);
      }
    }
  }, [completeTaskError, taskError]);

  useEffect(() => {
    if (isMounted.current && taskSuccess) setTask(taskData);
  }, [taskSuccess]);

  useEffect(() => {
    if (isMounted.current && rerollSuccess) setTask(rerollTaskData);
  }, [rerollSuccess]);

  // Methods
  const completeTaskPressed = () => {
    console.log('Complete Task Pressed');
    completeTask({
      query: {
        sessionId: sessionId,
        taskId: task?.id,
        userId: user?.id,
      },
    }).then(success => {
      console.log('Complete Task Returned: ' + success);
      if (success) {
        getTask({sessionId: sessionId, userId: user?.id});
      }
    });
  };

  const newTaskPressed = () => {
    console.log('Reroll Task Pressed');
    rerollTask({sessionId: sessionId, userId: user?.id, taskId: task?.id});
  };

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
          <View style={[stylesWithTheme.bannerImage]}>
            <DefaultMeal style={stylesWithTheme.bannerIcon} />
          </View>
          <BottomSheet onStateChange={onChange} zIndex={2}>
            {outOfTask ? (
              <Column
                horizontalResizing="fill"
                verticalResizing="fill"
                paddingHorizontal={theme.spacing.m}>
                <Text style={stylesWithTheme.h1}>
                  All task completed. Good job!
                </Text>
              </Column>
            ) : (
              task &&
              (maximized ? (
                <ScrollView>
                  <Column
                    justifyContent="flex-start"
                    horizontalResizing="fill"
                    verticalResizing="fill"
                    paddingHorizontal={theme.spacing.m}
                    spacing={theme.spacing.m}
                    style={{paddingBottom: theme.spacing.l}}>
                    <Animated.View entering={FadeIn}>
                      <Timer seconds={60} />
                    </Animated.View>
                    <Text numberOfLines={2} style={stylesWithTheme.h1}>
                      {task.title}
                    </Text>
                    {taskHighlightComponent(theme, stylesWithTheme, task)}
                    <Animated.View
                      style={{alignSelf: 'stretch'}}
                      entering={SlideInLeft.duration(300)}>
                      {taskInstructionComponent(
                        theme,
                        stylesWithTheme,
                        task.description,
                      )}
                    </Animated.View>
                    <Animated.View
                      style={{alignSelf: 'stretch'}}
                      entering={SlideInLeft.duration(300).delay(100)}>
                      {taskIngredientsComponent(theme, stylesWithTheme, task)}
                    </Animated.View>
                    <Animated.View
                      style={{alignSelf: 'stretch'}}
                      entering={SlideInLeft.duration(300).delay(100)}>
                      {taskKitchenwareComponent(theme, stylesWithTheme, task)}
                    </Animated.View>
                    <Animated.View
                      style={{alignSelf: 'stretch'}}
                      entering={FadeInDown}>
                      <Column
                        justifyContent="flex-end"
                        horizontalResizing="fill"
                        paddingVertical={theme.spacing.l}
                        spacing={theme.spacing.l}>
                        {recipeButtonsComponent(
                          theme,
                          completeTaskPressed,
                          newTaskPressed,
                          completeTaskLoading,
                        )}
                        {estimatedMealComponent(theme, stylesWithTheme)}
                      </Column>
                    </Animated.View>
                  </Column>
                </ScrollView>
              ) : (
                <Column
                  justifyContent="flex-start"
                  horizontalResizing="fill"
                  verticalResizing="fill"
                  paddingHorizontal={theme.spacing.m}
                  spacing={theme.spacing.m}
                  style={{paddingBottom: theme.spacing.l}}>
                  <Text numberOfLines={2} style={stylesWithTheme.h1}>
                    {task.title}
                  </Text>
                  {taskHighlightComponent(theme, stylesWithTheme, task)}
                  <Column
                    horizontalResizing="fill"
                    verticalResizing="fill"
                    justifyContent="space-between">
                    <Animated.View
                      style={{alignSelf: 'stretch'}}
                      entering={SlideInLeft.duration(300)}>
                      {taskInstructionComponent(
                        theme,
                        stylesWithTheme,
                        task.description,
                      )}
                    </Animated.View>
                    <Animated.View
                      style={{alignSelf: 'stretch'}}
                      entering={FadeInDown}>
                      <Column
                        justifyContent="flex-end"
                        horizontalResizing="fill"
                        paddingVertical={theme.spacing.l}
                        spacing={theme.spacing.l}>
                        {recipeButtonsComponent(
                          theme,
                          completeTaskPressed,
                          newTaskPressed,
                          completeTaskLoading,
                        )}
                        {estimatedMealComponent(theme, stylesWithTheme)}
                      </Column>
                    </Animated.View>
                  </Column>
                </Column>
              ))
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
      backgroundColor: '#809bce',
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '36%',
      aspectRatio: 1,
    },
    bannerIcon: {
      width: 100,
      height: 100,
    },
    floatingBottom: {
      position: 'absolute',
      bottom: theme.spacing.m,
      left: theme.spacing.s,
      right: theme.spacing.s,
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
    cardDescription: {
      fontSize: 18,
      alignSelf: 'stretch',
      textAlign: 'left',
      color: theme.colors.text,
    },
    timerIcon: {
      color: theme.colors.text,
      textAlign: 'center',
      fontSize: 24,
    },
    timeIcon: {
      color: theme.colors.text,
      textAlign: 'center',
      fontSize: 28,
    },
    timeText: {
      fontSize: 16,
      color: theme.colors.text,
    },
    viewMore: {
      fontSize: 14,
      fontWeight: 'bold',
      color: theme.colors.primary,
    },
  });

export default TaskScreen;
