import React, {useContext} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ThemeContext} from '../contexts/AppContext';
import {Color, Theme} from '../styles/type';
import {IFrameProps} from './primitives/Frame';
import Row from './primitives/Row';

interface IIconButtonProps extends IFrameProps {
  text: string;
  iconName: string;
  color?: Color;
  size?: number;
  loading?: boolean;
  textStyle?: object;
  iconStyle?: object;
}

type IconButtonProps = IIconButtonProps;

const IconButton: React.FC<IconButtonProps> = (propsIn: IIconButtonProps) => {
  // Theme
  const theme = useContext(ThemeContext);
  const stylesWithTheme = styles(theme);

  // Props
  const iconButtonDefaultProps: IIconButtonProps = {
    text: 'Placeholder',
    iconName: 'check',
    color: '#fff',
    bgColor: '#3ddc84',
    paddingVertical: theme.spacing.s,
    paddingHorizontal: theme.spacing.m,
    size: 18,
    borderRadius: 128,
    elevation: 4,
    loading: false,
  };
  const props = {...iconButtonDefaultProps, ...propsIn};

  return (
    <Row {...props}>
      {props.loading ? (
        <ActivityIndicator
          size={'large'}
          style={{height: 12}}
          color={'#eeea'}
        />
      ) : (
        <Row spacing={8}>
          <MaterialCommunityIcon
            name={props.iconName}
            color={props.color}
            style={{
              fontSize: (props.size ?? 12) * 1.5,
              ...props.iconStyle,
            }}
          />
          <Text
            style={{
              color: props.color,
              fontSize: props.size,
              ...stylesWithTheme.buttonText,
            }}>
            {props.text}
          </Text>
        </Row>
      )}
    </Row>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    buttonText: {textAlign: 'center', fontWeight: 'bold', marginLeft: 8},
  });

export default IconButton;
