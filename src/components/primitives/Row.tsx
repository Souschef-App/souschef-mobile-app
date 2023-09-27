import React, {type PropsWithChildren} from 'react';
import Stack, { StackProps } from './Stack';

const Row: React.FC<PropsWithChildren<StackProps>> = ( propsIn  : StackProps) => {
  return <Stack {...propsIn} direction="row">{propsIn.children}</Stack>;
};

export default Row;
