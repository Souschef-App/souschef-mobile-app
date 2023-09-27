import React, {type PropsWithChildren} from 'react';
import {StyleSheet, View} from 'react-native';
import Box, { BoxProps, IBoxProps, } from './Box';

export interface IStackProps extends IBoxProps{
  direction?: 'column' | 'row' | 'column-reverse' | 'row-reverse',
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly',
  alignItems?: 'center' | 'stretch'| 'flex-start' | 'flex-end' | 'baseline'
}

export type StackProps = IStackProps;

const stackDefaultProps: IStackProps = {
    direction:"column",
    justifyContent:'center',
    alignItems:'center'
  };

const Stack: React.FC<PropsWithChildren<StackProps>> = (propsIn : StackProps) => {
  const props = { ...stackDefaultProps, ...propsIn }
  return <Box {...props as BoxProps} style={{justifyContent: props.justifyContent, alignItems: props.alignItems, flexDirection: props.direction}} >{props.children}</Box>;
};

export default Stack;