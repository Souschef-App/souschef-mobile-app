import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Color} from '../styles/theme';

export type ChatBubbleProps = {
  text: string;
  left?: boolean;
  color?: Color;
  bgColor?: Color;
  style?: object;
};

const ChatBubble: React.FC<ChatBubbleProps> = ({
  text,
  left = true,
  color = '#FFFFFF',
  bgColor = '#2e9dfb',
  style,
}) => {
  return (
    <View
      style={[
        styles.chatBubble,
        left ? {borderBottomLeftRadius: 0} : {borderBottomRightRadius: 0},
        {backgroundColor: bgColor},
        style,
      ]}>
      <Text style={[styles.chatBubbleText, {color: color}]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chatBubble: {
    backgroundColor: '#2e9dfb',
    padding: 8,
    borderRadius: 16,
  },
  chatBubbleText: {
    color: '#ffffff',
    fontSize: 24,
  },
});

export default ChatBubble;
