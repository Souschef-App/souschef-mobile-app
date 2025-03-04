import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View, ViewStyle, Text} from 'react-native';

import useSwipe from './hooks/useSwipe';
import AnimatedPagination from './AnimatedPagination';

import AnimatedSwiperItem from './AnimatedSwiperItem';
import { HStack, VStack } from '../../components/primitives/Stack';

interface AnimatedSwiperProps {
  children: React.ReactNode;
  paginationStyle?: ViewStyle;
  duration?: number;
  dotColor?: string;
  activeDotColor?: string;
  activeIndex: number,
  setActiveIndex: (num: number) => void
}

const AnimatedSwiper: React.FC<AnimatedSwiperProps> = ({
  children,
  paginationStyle,
  duration = 300,
  dotColor = '#777777dd',
  activeDotColor = '#021f6d',
  activeIndex,
  setActiveIndex
}) => {
  const childrenArray: React.ReactNode[] = Array.isArray(children)
    ? children
    : [children];
  const childrenLength = childrenArray.length;

  useEffect(()=>{
    
    console.log("childrenArray " + childrenArray.length)
  },[childrenArray])


  const [fadingValues, setFadingValues] = useState<number[]>(
    childrenArray.map((_, index) => (index === 0 ? 1 : 0)),
  );

  const setFadingValue = useCallback(
    (isNext: boolean) => {
      const newFadingValues = [...fadingValues];
      newFadingValues[activeIndex] = 0;
      newFadingValues[activeIndex + (isNext ? 1 : -1)] = 1;
      setFadingValues(newFadingValues);
    },
    [activeIndex],
  );

  const onSwipeLeftHandler = useCallback(() => {
    // console.log("onSwipeLeftHandler") 
    if (activeIndex > 0) {
      setFadingValue(false);
      setActiveIndex(activeIndex - 1);
    }
  }, [activeIndex]);

  const onSwipeRightHandler = useCallback(() => {
    // console.log("onSwipeRightHandler") 
    if (activeIndex < childrenLength - 1) {
      setFadingValue(true);
      setActiveIndex(activeIndex + 1);
    }
  }, [activeIndex]);

  const [onTouchStart, onTouchEnd] = useSwipe(
    onSwipeLeftHandler,
    onSwipeRightHandler,
  );

  return (
    <VStack align='flex-start'>
        <View
        style={styles.container}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}>
        {childrenArray.map((child, index) => {
            console.log("RUNNING")
            return (
            <AnimatedSwiperItem
                key={index}
                fadingValue={fadingValues[index]}
                duration={duration}>
                {child}
            </AnimatedSwiperItem>
            );
        })}
        </View>
        <HStack flexMain={false} justifyContent='space-between'>
            <View style={[styles.dotContainer, paginationStyle]}>
                {childrenArray.map((_, index) => {
                return (
                    <AnimatedPagination
                    key={index}
                    isActive={index === activeIndex}
                    duration={duration}
                    dotColor={dotColor}
                    activeDotColor={activeDotColor}
                    />
                );
                })}
            </View>
            <HStack flexMain={false}>
                <Text>{activeIndex + 1}/{childrenArray.length}</Text>
            </HStack>

        </HStack>
    </VStack>
  );
};

export default AnimatedSwiper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});