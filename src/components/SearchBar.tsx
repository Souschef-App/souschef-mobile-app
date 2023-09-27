import React, {useContext} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {ThemeContext} from '../contexts/AppContext';
import {Theme} from '../styles/type';

import {IFrameProps} from './primitives/Frame';
import Row from './primitives/Row';

interface ISearchBarProps extends IFrameProps {
  placeholder: string;
  value?: string | undefined;
  onChangeText?: ((text: string) => void) | undefined;
  textStyle?: object;
}

type SearchBarProps = ISearchBarProps;

const SearchBar: React.FC<SearchBarProps> = (propsIn: ISearchBarProps) => {
  // Theme
  const theme = useContext(ThemeContext);
  const stylesWithTheme = styles(theme);

  const searchDefaultProps: ISearchBarProps = {
    placeholder: 'Placeholder',
    bgColor: '#fff',
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
    borderRadius: 8,
  };
  const props = {...searchDefaultProps, ...propsIn};
  return (
    <Row {...props} spacing={theme.spacing.s}>
      <FeatherIcon name="search" style={stylesWithTheme.icon} />
      <TextInput
        autoComplete={'off'}
        importantForAutofill={'no'}
        placeholderTextColor="#cbcdd1"
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={props.onChangeText}
        style={[stylesWithTheme.inputText, props.textStyle]}
      />
    </Row>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    inputText: {
      fontSize: 18,
      color: theme.colors.text,
      flexGrow: 1,
    },
    icon: {
      fontSize: 24,
      color: theme.colors.text,
    },
  });

export default SearchBar;
