import React from 'react';
import CircularProgress from 'react-native-circular-progress-indicator';
import {theme} from '../styles/theme';

export type TimerProps = {
  seconds: number;
  onFinished?: (() => void) | undefined;
};

const Timer: React.FC<TimerProps> = props => {
  return (
    <CircularProgress
      value={0}
      initialValue={props.seconds}
      maxValue={props.seconds}
      radius={150}
      duration={props.seconds * 1000}
      progressValueColor={theme.colors.lightText}
      progressValueStyle={{fontWeight: 'normal'}}
      progressValueFontSize={42}
      activeStrokeColor={'#FFD5A3'}
      activeStrokeSecondaryColor={'#FFA740'}
      activeStrokeWidth={16}
      inActiveStrokeColor={'#d9d9d9'}
      inActiveStrokeWidth={16}
      progressFormatter={(value: number) => {
        'worklet';
        let hours = String(Math.floor(value / 3600)).padStart(2, '0');
        value %= 3600;
        let minutes = String(Math.floor(value / 60)).padStart(2, '0');
        let seconds = String((value % 60).toFixed(0)).padStart(2, '0');
        return `${hours} : ${minutes} : ${seconds}`; // 2 decimal places
      }}
      onAnimationComplete={props.onFinished}
    />
  );
};

export default Timer;
