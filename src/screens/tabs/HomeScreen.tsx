import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeArea } from "../../components";
import { ThemeContext } from "../../contexts/AppContext";
import { HomeScreenNavigationProp } from "../../navigation/types";
import { Theme } from "../../styles";
import useStore from "../../data/store";

const HomeScreen = ({
  navigation,
}: {
  navigation: HomeScreenNavigationProp;
}) => {
  // Theme
  const theme = React.useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);

  const user = useStore((state) => state.user);

  console.log(user);

  return (
    <SafeArea>
      <View style={styles.container}>
        <Text>Home Screen</Text>
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

export default HomeScreen;
