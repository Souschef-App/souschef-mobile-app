import React, { PropsWithChildren } from "react";
import { type FlexAlignType } from "react-native";
import { Box, type BoxProps, type SpacingAll } from "./Box";

interface StackProps extends BoxProps {
  style: any;
  align: FlexAlignType;
  justifyContent:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | undefined;
  m: number;
  p: number;
  mall: SpacingAll;
  pall: SpacingAll;
  flexDirection:
    | "row"
    | "column"
    | "row-reverse"
    | "column-reverse"
    | undefined;
}

type VStackProps = Omit<StackProps, "flexDirection">;

export const VStack = (props: PropsWithChildren<VStackProps>) => {
  return <Box {...props} flexDirection="column" />;
};

type HStackProps = Omit<StackProps, "flexDirection">;

export const HStack = (props: PropsWithChildren<HStackProps>) => {
  return <Box {...props} flexDirection="row" />;
};
