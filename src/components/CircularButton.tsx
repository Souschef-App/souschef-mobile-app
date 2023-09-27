import React from 'react';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Color} from '../styles/type';
import {IFrameProps} from './primitives/Frame';
import Column from './primitives/Column';

interface ICircularButtonProps extends IFrameProps {
  iconName: string;
  color?: Color;
  size?: number;
  textStyle?: object;
  iconStyle?: object;
}

type CircularButtonProps = ICircularButtonProps;

const circularButtonDefaultProps: ICircularButtonProps = {
  iconName: 'check',
  color: '#2f394a',
  bgColor: '#f0e2e2',
  size: 24,
  borderRadius: 128,
  elevation: 4,
};

const CircularButton: React.FC<CircularButtonProps> = (
  propsIn: ICircularButtonProps,
) => {
  const props = {...circularButtonDefaultProps, ...propsIn};
  return (
    <Column
      {...props}
      paddingHorizontal={(props.size ?? 12) * 0.5}
      paddingVertical={(props.size ?? 12) * 0.5}>
      <MaterialCommunityIcon
        name={props.iconName}
        color={props.color}
        size={props.size}
        style={props.iconStyle}
      />
    </Column>
  );
};

export default CircularButton;
