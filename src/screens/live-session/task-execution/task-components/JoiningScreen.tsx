import React from "react";
import { StyleSheet } from "react-native";
import { SafeArea } from "../../../../components";
import { ThemeContext } from "../../../../contexts/AppContext";
import useStore from "../../../../data/store";
import { TaskScreenNavigationProp } from "../../../../navigation/types";
import { Theme } from "../../../../styles";

const JoiningScreen = ({
  navigation,
}: {
  navigation: TaskScreenNavigationProp;
}) => {
  // Theme
  const theme = React.useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);

  // Store
  const completed = useStore((state) => state.sessionCompleted);
  const leaveSession = useStore((state) => state.leaveSession);

  return <SafeArea></SafeArea>;
};

const makeStyles = (theme: Theme) => StyleSheet.create({});

export default JoiningScreen;
