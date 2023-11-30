import { Animated, Dimensions, Text, View, ViewToken } from "react-native"
import { HStack, VStack } from "../../components/primitives/Stack"
import React, { ComponentType, PropsWithChildren, useCallback, useEffect, useRef, useState } from "react"
import { FlatList } from "react-native-gesture-handler"
import { TaskAvailaleProps } from "../../screens/subtask-generation/TaskBreakDownResult/views/TaskEdit/TaskEditView"

const {width, height} = Dimensions.get("screen")

export type CarouselPropsItemProps<T> = {

}

export type CarouselProps = {
    data : any
    RenderItem : ComponentType<TaskAvailaleProps>;
}

const Indicator = ({scrollX, data} : {scrollX : Animated.Value, data : any}) =>{

    

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
            <Text>{0 + 1}/{data.length}</Text>   
        </HStack>
    )
}

export const Carousel = ({data, RenderItem}: CarouselProps) => {
   
    const scrollX = useRef(new Animated.Value(0)).current;

    const [activeIndex, setActiveIndex] = useState(0)

    const onViewCallBackPartially = React.useCallback(({ viewableItems }: any) => {
        // console.log('onViewCallBackPartially', viewableItems);
      }, []);
    
      const onViewCallBack = React.useCallback(({ viewableItems }: any) => {
        // console.log('onViewCallBack', viewableItems);
        if(viewableItems && viewableItems[0] && viewableItems[0].index != null)
        {
            console.log(viewableItems[0].index)
        }

      }, []);

    const viewabilityConfigCallbackPairs = React.useRef([{
        viewabilityConfig: {
          minimumViewTime: 500,
          itemVisiblePercentThreshold: 100,
        },
        onViewableItemsChanged: onViewCallBack
      },
      {
        viewabilityConfig: {
          minimumViewTime: 150,
          itemVisiblePercentThreshold: 10
        },
        onViewableItemsChanged: onViewCallBackPartially
      }
    ]);


    // const [visibleIndex, setVisibleIndex] = useState<number>(0)

    // const changed = ({changed, viewableItems} : {changed: ViewToken[], viewableItems: ViewToken[]}) =>{
    //     console.log("Visible items are", viewableItems);
    //     // console.log("Changed in this iteration", changed);

    //     if(viewableItems != null && viewableItems[0] != null && viewableItems[0].index != null)
    //     {
    //         const newIndex = viewableItems[0].index
    //         setVisibleIndex(newIndex)

    //     }
    // }

    return(
        <VStack>
            <Animated.FlatList 
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
                viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
                // onViewableItemsChanged={changed}
            />
            <Indicator scrollX={scrollX} data={data}  />
        </VStack>
    )
}