import {GestureResponderEvent} from 'react-native';
import {IFrameProps} from '../primitives/Frame';

export interface IPressable extends IFrameProps {
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  loading?: boolean;
}
