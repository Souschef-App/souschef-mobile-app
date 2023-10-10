import React, { PropsWithChildren } from "react";
import { Box, type IBoxProps } from "./Box";


type StackProps = Omit<IBoxProps, "flexDirection">;

export const defaultStackProps : StackProps  = {
  align:"center",
  justifyContent:"center",
  m: 0,
  p: 0,
  mAll: {b : 0, t : 0, l : 0, r : 0},
  pAll:{b : 0, t : 0, l : 0, r : 0},
}

export const VStack = (propsIn: PropsWithChildren<StackProps>) => {
  const props = {...defaultStackProps, ...propsIn}
  return <Box {...props} flexDirection="column" />;
};


export const HStack = (propsIn: PropsWithChildren<StackProps>) => {
  const props = {...defaultStackProps, ...propsIn}
  return <Box {...props} flexDirection="row" />;
};

