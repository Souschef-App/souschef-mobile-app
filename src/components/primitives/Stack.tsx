import React from 'react';
import {  type FlexAlignType } from 'react-native';
import { Box, type BoxProps, type SpacingAll } from './box';

interface StackProps extends BoxProps {
  style : any,
  "align" : FlexAlignType ,
  "justifyContent" : 'flex-start'
                      | 'flex-end'
                      | 'center'
                      | 'space-between'
                      | 'space-around'
                      | 'space-evenly'
                      | undefined;
  "m" : number,
  "p"  : number,
  "mall" : SpacingAll,
  "pall" : SpacingAll,
  "flexDirection" : "row" | "column" | "row-reverse" | "column-reverse" | undefined
}

export const VStack= (props : Omit<StackProps, "flexDirection">)  => {
  return <Box {...props} flexDirection='column'  />
};


export const HStack= (props : Omit<StackProps, "flexDirection">) => {
  return <Box {...props} flexDirection='row'  />
};

