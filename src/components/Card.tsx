import React, {useContext, type PropsWithChildren} from 'react';
import {ThemeContext} from '../contexts/AppContext';
import Stack, {IStackProps} from './primitives/Stack';

export type CardProps = IStackProps;

const Card: React.FC<PropsWithChildren<CardProps>> = (propsIn: IStackProps) => {
  // Theme
  const theme = useContext(ThemeContext);

  // Props
  const cardDefaultProps: IStackProps = {
    bgColor: '#fff',
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.m,
    horizontalResizing: 'fill',
    verticalResizing: 'hug',
    borderRadius: theme.spacing.s,
    elevation: 4,
  };
  const props = {...cardDefaultProps, ...propsIn};

  return <Stack {...props}>{props.children}</Stack>;
};

export default Card;
