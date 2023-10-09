import React, {type PropsWithChildren} from 'react';
import {SafeAreaView} from 'react-native';

export interface ISafeAreaProps {
  children?: React.ReactNode;
}

export type SafeAreaProps = ISafeAreaProps;

const SafeArea: React.FC<PropsWithChildren<SafeAreaProps>> = (
  props: ISafeAreaProps,
) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      {props.children}
    </SafeAreaView>
  );
};

export default SafeArea;
