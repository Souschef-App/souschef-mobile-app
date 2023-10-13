import React, {useContext, type PropsWithChildren} from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ColorValue } from 'react-native';
import { ThemeContext } from '../contexts/AppContext';

export interface ISafeAreaProps {
  backgroundColor?: ColorValue,
  statusStyle?: "dark" | "light"
  children?: React.ReactNode;
}

export type SafeAreaProps = ISafeAreaProps;

const SafeArea: React.FC<PropsWithChildren<SafeAreaProps>> = (
  props: ISafeAreaProps,
) => {

  const theme = useContext(ThemeContext);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: props.backgroundColor || theme.colors.background,
      }}>
      <StatusBar  style={props.statusStyle || "dark"} />
      {props.children}
    </SafeAreaView>
  );
};

export default SafeArea;

