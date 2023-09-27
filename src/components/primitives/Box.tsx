import React, {type PropsWithChildren} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import { Color } from '../../styles/theme';

export interface IBoxProps{
  flex?: number,
  w? :number,
  h? : number,
  bgColor? : Color,
  borderRadius? :number,
  elevation?: number,
  style?: object,
  children? : React.ReactNode,
}

export type BoxProps = IBoxProps;

const boxDefaultProps: IBoxProps = {
  flex: 1,
  borderRadius: 0,
  elevation: 0,
  bgColor: "#ffffff00"
};

const Box: React.FC<PropsWithChildren<BoxProps>> = (propsIn: IBoxProps) => {
  const props = { ...boxDefaultProps, ...propsIn }

  return( 
    <View  
        style={[{
            flex: props.flex,
            width: props.w,
            height: props.h,
            backgroundColor: props.bgColor,
            borderRadius: props.borderRadius,
            elevation: props.elevation,
        }, propsIn.style]}>
        {props.children}
    </View>
  )
};


export default Box;
