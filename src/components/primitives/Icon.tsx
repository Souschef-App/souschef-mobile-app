import React, {FC} from 'react';
import {Text} from 'react-native';
import Icons from '../../res/icon';

type IconProps = {
  name: string;
  color?: string;
  size?: number;
};

const Icon: FC<IconProps> = ({name, color = 'black', size = 24}) => {
  const SvgComponent = Icons[name];

  if (!SvgComponent) {
    return <Text>Icon not found</Text>;
  }

  return <SvgComponent color={color} width={size} height={size} />;
};

export default Icon;
