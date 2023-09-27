import React, {useContext, type PropsWithChildren} from 'react';
import {SafeAreaView, View} from 'react-native';
import {ThemeContext} from '../contexts/AppContext';
import {Color} from '../styles/type';

export interface ISafeAreaProps {
  direction?: 'column' | 'row' | 'column-reverse' | 'row-reverse';
  bgColor?: Color;
  children?: React.ReactNode;
}

export type SafeAreaProps = ISafeAreaProps;

const SafeArea: React.FC<PropsWithChildren<SafeAreaProps>> = (
  propsIn: ISafeAreaProps,
) => {
  // Theme
  const theme = useContext(ThemeContext);

  // Props
  const safeAreaDefaultProps: ISafeAreaProps = {
    direction: 'column',
    bgColor: theme.colors.background,
  };
  const props = {...safeAreaDefaultProps, ...propsIn};
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: props.bgColor,
      }}>
      {props.children}
    </SafeAreaView>
  );
};

export default SafeArea;
