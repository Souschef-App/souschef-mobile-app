import React, {type PropsWithChildren} from 'react';
import {TouchableOpacity} from 'react-native';
import {makeFrameComponent} from '../primitives/Frame';
import {IPressable} from './type';

type OpacityPressableProps = IPressable;

const TouchableOpacityFrame = makeFrameComponent(TouchableOpacity);

const OpacityPressable: React.FC<PropsWithChildren<OpacityPressableProps>> = (
  props: IPressable,
) => {
  return (
    <TouchableOpacityFrame
      {...props}
      onPress={props.onPress}
      activeOpacity={0.55}>
      {props.children}
    </TouchableOpacityFrame>
  );
};

export default OpacityPressable;
