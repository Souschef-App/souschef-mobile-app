import React, {type PropsWithChildren} from 'react';
import Stack, {IStackProps} from './Stack';

export interface IRowProps
  extends Omit<IStackProps, 'direction' | 'parentDirection'> {}
type RowProps = IRowProps;

const Row: React.FC<PropsWithChildren<RowProps>> = (props: IRowProps) => {
  return (
    <Stack {...props} direction="row">
      {props.children}
    </Stack>
  );
};

export default Row;
