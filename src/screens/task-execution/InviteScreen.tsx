import React from "react";
import { StyleSheet, Text } from "react-native";
import { SafeArea, VStack } from "../../components";
import { ThemeContext } from "../../contexts/AppContext";
import { InviteScreenNavigationProp } from "../../navigation/types";
import { TextStyle, Theme } from "../../styles";
import useStore from "../../data/store";

const InviteScreen = ({
  navigation,
}: {
  navigation: InviteScreenNavigationProp;
}) => {
  // Theme
  const theme = React.useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);

  const session = useStore((state) => state.session);

  return (
    <SafeArea>
      <VStack>
        <Text style={TextStyle.h1}>{session?.code}</Text>
      </VStack>
    </SafeArea>
  );
};

const makeStyles = (theme: Theme) => StyleSheet.create({});

export default InviteScreen;
