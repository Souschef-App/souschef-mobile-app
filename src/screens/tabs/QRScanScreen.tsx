import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeArea} from '../../components';
import {ThemeContext} from '../../contexts/AppContext';
import {HomeScreenNavigationProp} from '../../navigation/types';
import {Theme} from '../../styles/type';

const QRScanScreen = ({navigation}: {navigation: HomeScreenNavigationProp}) => {
  // Theme
  const theme = useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);

  return (
    <SafeArea>
      <View style={styles.container}>
        <Text>QR Scan Screen</Text>
      </View>
    </SafeArea>
  );
};

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      display: 'flex',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default QRScanScreen;
