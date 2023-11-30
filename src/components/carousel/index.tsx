import { Animated, Dimensions, Text, View, ViewToken } from "react-native"
import { HStack, VStack } from "../../components/primitives/Stack"
import React, { ComponentType, PropsWithChildren, useCallback, useEffect, useRef, useState } from "react"
import { FlatList } from "react-native-gesture-handler"
import { TaskAvailaleProps } from "../../screens/subtask-generation/TaskBreakDownResult/views/TaskEdit/TaskEditView"
import { useList } from 'react-native-use-list';

const {width, height} = Dimensions.get("screen")

export type CarouselPropsItemProps<T> = {

}

export type CarouselProps = {
    data : any
    RenderItem : ComponentType<TaskAvailaleProps>;
}

const Indicator = ({scrollX, data, activeIndex} : {scrollX : Animated.Value, data : any, activeIndex : number}) =>{

    

    return(
        <HStack justifyContent="space-between"  p={16} >
            <HStack gap={10} flexMain={false}>
                {
                    data.map((item : any, index : number) =>{
                        const inputRange = [(index - 1) * width, index * width, (index + 1) * width]

                        const scale = scrollX.interpolate({
                            inputRange,
                            outputRange: [0.8, 1.4, 0.8],
                            extrapolate: 'clamp'
                        })

                        const opacity = scrollX.interpolate({
                            inputRange,
                            outputRange: [0.6, 0.9, 0.6],
                            extrapolate: 'clamp'
                        })

                        return <Animated.View 
                            key={`indicator-${index}`} 
                            style={{
                                height: 10, 
                                width: 10, 
                                backgroundColor: "#777777", 
                                borderRadius: 5,
                                opacity,
                                transform:[
                                    {
                                        scale
                                    }
                                ]
                            }} />
                    })
                }
            </HStack>
            <Text>{activeIndex + 1}/{data.length}</Text>   
        </HStack>
    )
}

export const Carousel = ({data, RenderItem}: CarouselProps) => {
   
    const scrollX = useRef(new Animated.Value(0)).current;

    const ref = useRef(null);
    const { pageIndex, nextPage, prevPage, indexController } = useList({ ref });

    return(
        <VStack>
            <Animated.FlatList 
                ref={ref}
                data={data} 
                keyExtractor={item => item.id}
                horizontal
                pagingEnabled
                scrollEventThrottle={32}
                onScroll={Animated.event(
                    [{nativeEvent : {contentOffset : {x : scrollX}}}],
                    {useNativeDriver: false}
                )}
                showsHorizontalScrollIndicator={false} 
                renderItem={({item}) => {
                    return <RenderItem task={item} width={width} />
                }}
                {...indexController}
            />
            <Indicator scrollX={scrollX} data={data} activeIndex={pageIndex}  />
        </VStack>
    )
}