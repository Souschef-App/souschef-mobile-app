import React, {type PropsWithChildren} from 'react';
import {StyleSheet, View} from 'react-native';

export type CardProps = {
  style?: object;
};

const Card: React.FC<PropsWithChildren<CardProps>> = ({style, children}) => {
  return <View style={[styles.cardContainer, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    elevation: 4,
  },
});

export default Card;
