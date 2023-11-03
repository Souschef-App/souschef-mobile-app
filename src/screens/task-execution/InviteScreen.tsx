import React from "react";
import { StyleSheet, Text } from "react-native";
import { SafeArea, VStack } from "../../components";
import { ThemeContext } from "../../contexts/AppContext";
import { InviteScreenNavigationProp } from "../../navigation/types";
import { Theme } from "../../styles";

const InviteScreen = ({
  navigation,
}: {
  navigation: InviteScreenNavigationProp;
}) => {
  // Theme
  const theme = React.useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);

  return (
    <SafeArea>
      <VStack>
        <Text>Invite Screen</Text>
      </VStack>
    </SafeArea>
  );
};

const makeStyles = (theme: Theme) => StyleSheet.create({});

export default InviteScreen;
