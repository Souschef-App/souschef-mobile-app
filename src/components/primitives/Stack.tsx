import React, { PropsWithChildren } from "react";
import { Box, type IBoxProps } from "./Box";

type StackProps = Omit<IBoxProps, "flexDirection">;

export const defaultStackProps: StackProps = {};

export const VStack = (propsIn: PropsWithChildren<StackProps>) => {
  const props = { ...defaultStackProps, ...propsIn };
  return <Box {...props} flexDirection="column" />;
};

export const HStack = (propsIn: PropsWithChildren<StackProps>) => {
  const props = { ...defaultStackProps, ...propsIn };
  return <Box {...props} flexDirection="row" />;
};
