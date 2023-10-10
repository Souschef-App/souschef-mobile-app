import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeArea } from "../../components";
import { ThemeContext } from "../../contexts/AppContext";
import { HomeScreenNavigationProp } from "../../navigation/types";
import { Theme } from "../../styles/types";

const CalendarScreen = ({
  navigation,
}: {
  navigation: HomeScreenNavigationProp;
}) => {
  // Theme
  const theme = React.useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);

  return (
    <SafeArea>
      <View style={styles.container}>
        <Text>Calendar Screen</Text>
      </View>
    </SafeArea>
  );
};

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      display: "flex",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });

export default CalendarScreen;
