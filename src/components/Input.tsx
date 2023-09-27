import React, {useContext} from 'react';
import {Text, TextInput, View} from 'react-native';

import {ThemeContext} from '../../App';

export type Props = {
  placeholder: string;
  onChangeText?: ((text: string) => void) | undefined;
  value?: string | undefined;
  errormsg?: string | undefined;
};

const Input: React.FC<Props> = ({
  placeholder,
  onChangeText,
  value,
  errormsg,
}) => {
  const themeFromContext = useContext(ThemeContext);

  return (
    <View>
      <Text
        style={{
          color: themeFromContext.colors.danger,
        }}>
        {errormsg}
      </Text>
      <TextInput
        style={{
          height: 40,
          margin: 12,
          borderWidth: 1,
          padding: 10,
          backgroundColor: themeFromContext.colors.background,
        }}
        placeholder={placeholder}
        placeholderTextColor={themeFromContext.colors.lightText}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
};

export default Input;
