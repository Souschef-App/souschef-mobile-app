import React from 'react';
import {Color} from '../../styles/type';

type Resizing = 'fill' | 'hug' | 'fixed';

export interface IFrameProps {
  bgColor?: Color;
  width?: number | string;
  height?: number | string;
  parentDirection?:
    | 'column'
    | 'row'
    | 'column-reverse'
    | 'row-reverse'
    | undefined;
  horizontalResizing?: Resizing;
  verticalResizing?: Resizing;
  paddingHorizontal?: number;
  paddingVertical?: number;
  borderRadius?: number;
  elevation?: number;
  style?: object;
  children?: React.ReactNode;
}

export type FrameProps = IFrameProps;

const frameDefaultProps: IFrameProps = {
  parentDirection: undefined,
  horizontalResizing: 'hug',
  verticalResizing: 'hug',
  borderRadius: 0,
  elevation: 0,
};

const calculateResizing = (
  horizontalResizing?: Resizing,
  verticalResizing?: Resizing,
): {alignSelf: string; flexGrow: number} => {
  return {
    alignSelf: horizontalResizing === 'fill' ? 'stretch' : 'center',
    flexGrow: verticalResizing === 'fill' ? 1 : 0,
  };
};

export const makeFrameComponent = (Comp: React.ElementType) => {
  return (propsIn: any) => {
    const props = {...frameDefaultProps, ...(propsIn as IFrameProps)};
    const {alignSelf, flexGrow} = calculateResizing(
      props.horizontalResizing,
      props.verticalResizing,
    );

    if (props.horizontalResizing !== 'fixed') props.width = 'auto';
    if (props.verticalResizing !== 'fixed') props.height = 'auto';

    return (
      <Comp
        {...propsIn}
        style={[
          {
            width: props.width,
            height: props.height,
            paddingHorizontal: props.paddingHorizontal,
            paddingVertical: props.paddingVertical,
            backgroundColor: props.bgColor,
            borderRadius: props.borderRadius,
            elevation: props.elevation,
            alignSelf: alignSelf,
            flexGrow: flexGrow,
          },
          props.style,
        ]}>
        {props.children}
      </Comp>
    );
  };
};
