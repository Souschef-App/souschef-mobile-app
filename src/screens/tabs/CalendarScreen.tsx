import React from "react";
import { Button, Platform, StyleSheet, Text, View } from "react-native";
import { SafeArea } from "../../components";
import { ThemeContext } from "../../contexts/AppContext";
import { CalendarScreenRouteProp } from "../../navigation/types";
import { Theme } from "../../styles/";

const CalendarScreen = ({
  navigation,
}: {
  navigation: CalendarScreenRouteProp;
}) => {
  // Theme
  const theme = React.useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);

  return (
    <SafeArea>
      <View style={styles.container}>
        <Text>Calendar</Text>
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
