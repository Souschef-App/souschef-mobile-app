import React from "react";
import { StyleSheet, Text } from "react-native";
import { SafeArea, VStack } from "../../components";
import { ThemeContext } from "../../contexts/AppContext";
import { QRCodeScreenNavigationProp } from "../../navigation/types";
import { TextStyle, Theme } from "../../styles";

const QRCodeScreen = ({
  navigation,
}: {
  navigation: QRCodeScreenNavigationProp;
}) => {
  // Theme
  const theme = React.useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);

  return (
    <SafeArea>
      <VStack>
        <Text style={TextStyle.h3}>🚧 UNDER CONSTRUCTION 🚧</Text>
      </VStack>
    </SafeArea>
  );
};

const makeStyles = (theme: Theme) => StyleSheet.create({});

export default QRCodeScreen;
