import { StyleSheet } from "react-native";
import { ButtonStyle, InputStyle, TextStyle, Theme } from "../../../styles";

export const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    button: {
      ...ButtonStyle.primary,
      backgroundColor: theme.colors.primary,
      margin: 5,
      alignSelf: "stretch",
      // width: 100
    },
    buttonText:{
      ...TextStyle.h3,
      color: theme.colors.background,
    },
    input: {
      ...InputStyle.multiline,
      // maxWidth: 300,
      textAlignVertical: "top",
      minHeight: 120,

    },
    container: {
      backgroundColor: theme.colors.background,
      borderRadius: 16
    },
    title: {
      ...TextStyle.h3,
    },
    card:{
      backgroundColor: theme.colors.background2,
      // backgroundColor: "red",
      marginTsop: 5
    },
    listText:{
      ...TextStyle.body,

    },
    red:{
      backgroundColor: "red"
    }, 
    empyMsg:{
        ...TextStyle.h4,
        color: theme.colors.textDisabled
    }, 
    rowBadge:{
        backgroundColor: theme.colors.text, 
        width: 48,
        height: 48
    },
    badgeText:{
        ...TextStyle.h4,
        color: theme.colors.background
    }
  });
