import React, { PropsWithChildren } from "react";
import { type FlexAlignType } from "react-native";
import { Box, type IBoxProps, type SpacingAll } from "./Box";


type StackProps = Omit<IBoxProps, "flexDirection">;

export const defaultStackProps : StackProps  = {
  align:"center",
  justifyContent:"center",
  m: 0,
  p: 0
}

export const VStack = (propsIn: PropsWithChildren<StackProps>) => {
  const props = {...defaultStackProps, ...propsIn}
  return <Box {...props} flexDirection="column" />;
};


export const HStack = (propsIn: PropsWithChildren<StackProps>) => {
  const props = {...defaultStackProps, ...propsIn}
  return <Box {...props} flexDirection="row" />;
};

