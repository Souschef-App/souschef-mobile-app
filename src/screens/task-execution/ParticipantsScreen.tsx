import React from "react";
import { StyleSheet, Text } from "react-native";
import { SafeArea, VStack } from "../../components";
import { ThemeContext } from "../../contexts/AppContext";
import { ParticipantsScreenNavigationProp } from "../../navigation/types";
import { Theme } from "../../styles";

const ParticipantsScreen = ({
  navigation,
}: {
  navigation: ParticipantsScreenNavigationProp;
}) => {
  // Theme
  const theme = React.useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);

  return (
    <SafeArea>
      <VStack>
        <Text>Participants Screen</Text>
      </VStack>
    </SafeArea>
  );
};

const makeStyles = (theme: Theme) => StyleSheet.create({});

export default ParticipantsScreen;
