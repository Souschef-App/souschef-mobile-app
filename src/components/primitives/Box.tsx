import React, { type PropsWithChildren } from "react";
import { View, type FlexAlignType, ViewStyle } from "react-native";

export type SpacingAll = {
  b?: number;
  t?: number;
  l?: number;
  r?: number;
};

export type SpacingVH = {
  v?: number;
  h?: number;
};

export interface IBoxProps {
  style?: ViewStyle;
  align?: FlexAlignType;
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | undefined;
  m?: number;
  p?: number;
  mVH?: SpacingVH;
  pVH?: SpacingVH;
  mAll?: SpacingAll;
  pAll?: SpacingAll;
  flexDirection?:
    | "row"
    | "column"
    | "row-reverse"
    | "column-reverse"
    | undefined;
  rowGap?: number;
  colGap?: number;
  gap?: number;
  flexMain?: boolean;
  flexCross?: boolean;
}

const boxDefaultProps: IBoxProps = {
  align: "center",
  justifyContent: "center",
  m: 0,
  p: 0,
  flexMain: true,
  flexCross: true,
};

export const Box = (propsIn: PropsWithChildren<IBoxProps>) => {
  const props = {
    ...boxDefaultProps,
    ...(propsIn as PropsWithChildren<IBoxProps>),
  };

  const flexGrow = props.flexMain ? 1 : 0;
  const alignSelf = props.flexCross ? "stretch" : "auto";

  return (
    <View
      style={{
        alignItems: props.align,
        justifyContent: props.justifyContent,
        margin: props.m,
        padding: props.p,
        marginBottom: props.mAll?.b || props.mVH?.v,
        marginTop: props.mAll?.t || props.mVH?.v,
        marginLeft: props.mAll?.l || props.mVH?.h,
        marginRight: props.mAll?.r || props.mVH?.h,
        paddingBottom: props.pAll?.b || props.pVH?.v,
        paddingTop: props.pAll?.t || props.pVH?.v,
        paddingLeft: props.pAll?.l || props.pVH?.h,
        paddingRight: props.pAll?.r || props.pVH?.h,
        flexDirection: props.flexDirection,
        flexGrow: flexGrow,
        alignSelf: alignSelf,
        gap: props.gap,
        rowGap: props.rowGap,
        columnGap: props.colGap,
        ...props.style,
      }}
    >
      {props.children}
    </View>
  );
};
