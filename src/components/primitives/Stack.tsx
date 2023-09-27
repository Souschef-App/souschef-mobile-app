import React, {type PropsWithChildren} from 'react';
import {View} from 'react-native';
import {IFrameProps, makeFrameComponent} from './Frame';

export interface IStackProps extends IFrameProps {
  flexDirection?: 'column' | 'row' | 'column-reverse' | 'row-reverse';
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  alignItems?: 'center' | 'stretch' | 'flex-start' | 'flex-end' | 'baseline';
  spacing?: number;
}

export type StackProps = IStackProps;

const stackDefaultProps: IStackProps = {
  flexDirection: 'column',
  horizontalResizing: 'hug',
  verticalResizing: 'hug',
  justifyContent: 'center',
  alignItems: 'center',
  spacing: 0,
};

const Frame = makeFrameComponent(View);

export const makeStackComponent = (Comp: React.ElementType) => {
  return (propsIn: any) => {
    const props = {...stackDefaultProps, ...(propsIn as IFrameProps)};
    const children = React.Children.map(props.children, child => {
      if (React.isValidElement<IStackProps>(child)) {
        return React.cloneElement<IStackProps>(child, {
          parentDirection: props.flexDirection,
        });
      } else return child;
    });

    const isReversed =
      props.parentDirection &&
      (props.parentDirection === 'row' ||
        props.parentDirection === 'row-reverse');
    const horizontalResizing = isReversed
      ? props.verticalResizing
      : props.horizontalResizing;
    const verticalResizing = isReversed
      ? props.horizontalResizing
      : props.verticalResizing;

    const Frame = makeFrameComponent(Comp);

    return (
      <Frame
        {...propsIn}
        horizontalResizing={horizontalResizing}
        verticalResizing={verticalResizing}
        style={[
          {
            flexDirection: props.flexDirection,
            justifyContent: props.justifyContent,
            alignItems: props.alignItems,
          },
          props.style,
        ]}>
        {children}
      </Frame>
    );
  };
};

const Stack: React.FC<PropsWithChildren<StackProps>> = (
  propsIn: IStackProps,
) => {
  const props = {...stackDefaultProps, ...propsIn};
  const children = React.Children.map(props.children, (child, i) => {
    const parentDirStyle = {parentDirection: props.flexDirection};
    const verticalSpacing =
      props.flexDirection == 'column' ||
      props.flexDirection == 'column-reverse';
    const spacingStyle = {
      marginTop: verticalSpacing ? props.spacing : 0,
      marginLeft: verticalSpacing ? 0 : props.spacing,
    };
    let finalStyle = {};

    // Set parent direction to Stack children
    if (React.isValidElement<IStackProps>(child))
      finalStyle = {...parentDirStyle};
    // Apply spacing (excluding 1st child)
    if (i > 0) finalStyle = {...spacingStyle};

    // If valid child, return clone
    if (React.isValidElement(child))
      return React.cloneElement(child as React.ReactElement<any>, {
        style: [child.props.style, finalStyle],
      });
  });

  const isReversed =
    props.parentDirection &&
    (props.parentDirection === 'row' ||
      props.parentDirection === 'row-reverse');
  const horizontalResizing = isReversed
    ? props.verticalResizing
    : props.horizontalResizing;
  const verticalResizing = isReversed
    ? props.horizontalResizing
    : props.verticalResizing;

  return (
    <Frame
      {...props}
      horizontalResizing={horizontalResizing}
      verticalResizing={verticalResizing}
      style={[
        {
          flexDirection: props.flexDirection,
          justifyContent: props.justifyContent,
          alignItems: props.alignItems,
        },
        props.style,
      ]}>
      {children}
    </Frame>
  );
};

export default Stack;
