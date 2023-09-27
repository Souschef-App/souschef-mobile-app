import React, {type PropsWithChildren} from 'react';
import Stack, {IStackProps} from './Stack';

export interface IColumnProps
  extends Omit<IStackProps, 'flexDirection' | 'parentDirection'> {}
type ColumnProps = IColumnProps;

const Column: React.FC<PropsWithChildren<ColumnProps>> = (
  props: IColumnProps,
) => {
  return (
    <Stack {...props} flexDirection="column">
      {props.children}
    </Stack>
  );
};

export default Column;
