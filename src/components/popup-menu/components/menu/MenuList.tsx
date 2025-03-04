import React, { PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';

import Animated, {
  runOnJS,
  useAnimatedProps,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import {
  calculateMenuHeight,
  menuAnimationAnchor,
} from '../../utils/calculations';
import { BlurTint, BlurView } from 'expo-blur';

import MenuItems from './MenuItems';

import {
  SPRING_CONFIGURATION_MENU,
  HOLD_ITEM_TRANSFORM_DURATION,
  IS_IOS,
  CONTEXT_MENU_STATE,
} from '../../Constants';

import styles from './styles';
import { MenuItemProps } from './types';
import { useInternal } from '../../hooks';
import { deepEqual } from '../../utils/validations';
import { leftOrRight } from './calculations';

const AnimatedView = Animated.createAnimatedComponent(BlurView);

interface MenuListComponentProps {
  // itemProps : MenuItemProps[]
}

const MenuListComponent = (props : PropsWithChildren<MenuListComponentProps>) => {
  const { state, menuProps } = useInternal();

  const [itemList, setItemList] = React.useState<MenuItemProps[]>([]);


  const menuHeight = useDerivedValue(() => {
    const itemsWithSeparator = menuProps.value.items.filter(
      item => item.withSeparator
    );
    return calculateMenuHeight(
      menuProps.value.items.length,
      itemsWithSeparator.length
    );
  }, [menuProps]);
  const prevList = useSharedValue<MenuItemProps[]>([]);

  const messageStyles = useAnimatedStyle(() => {
    const itemsWithSeparator = menuProps.value.items.filter(
      item => item.withSeparator
    );

    const translate = menuAnimationAnchor(
      menuProps.value.anchorPosition,
      menuProps.value.itemWidth,
      menuProps.value.items.length,
      itemsWithSeparator.length
    );

    const _leftPosition = leftOrRight(menuProps);

    const menuScaleAnimation = () =>
      state.value === CONTEXT_MENU_STATE.ACTIVE
        ? withSpring(1, SPRING_CONFIGURATION_MENU)
        : withTiming(0, {
            duration: HOLD_ITEM_TRANSFORM_DURATION,
          });

    const opacityAnimation = () =>
      withTiming(state.value === CONTEXT_MENU_STATE.ACTIVE ? 1 : 0, {
        duration: HOLD_ITEM_TRANSFORM_DURATION,
      });

    return {
      left: _leftPosition,
      height: menuHeight.value,
      opacity: opacityAnimation(),
      transform: [
        { translateX: translate.beginningTransformations.translateX },
        { translateY: translate.beginningTransformations.translateY },
        {
          scale: menuScaleAnimation(),
        },
        { translateX: translate.endingTransformations.translateX },
        { translateY: translate.endingTransformations.translateY },
      ],
    };
  });

  const animatedInnerContainerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor:
        "light" === 'light'
          ? IS_IOS
            ? 'rgba(255, 255, 255, .75)'
            : 'rgba(255, 255, 255, .95)'
          : IS_IOS
          ? 'rgba(0,0,0,0.5)'
          : 'rgba(39, 39, 39, .8)',
    };
  }, []);

  const animatedProps = useAnimatedProps(() => {
    return { tint: "dark" as BlurTint };
  }, []);

  const setter = (items: MenuItemProps[]) => {
    setItemList(items);
    prevList.value = items;
    console.log("itemList HERE" + JSON.stringify(itemList[0].onPress))
    console.log("itemList " + JSON.stringify(itemList))
  };

  useAnimatedReaction(
    () => menuProps.value.items,
    _items => {
      if (!deepEqual(_items, prevList.value)) {
        runOnJS(setter)(_items);
      }
    },
    [menuProps]
  );


  return (
    <Animated.View style={[styles.menuContainer, messageStyles]}>
      <AnimatedView
        intensity={100}
        animatedProps={animatedProps}
        style={{
          ...StyleSheet.absoluteFillObject,
        }}
      >
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            styles.menuInnerContainer,
            animatedInnerContainerStyle,
          ]}
        >
          {props.children}
          {/* <MenuItems items={itemList} /> */}
        </Animated.View>
      </AnimatedView>
    </Animated.View>
  );
};

const MenuList = React.memo(MenuListComponent);

export default MenuList;