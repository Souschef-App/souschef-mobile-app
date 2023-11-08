import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { HStack, Icon, IconButton, SafeArea, VStack } from "../../components";
import { ThemeContext } from "../../contexts/AppContext";
import { InviteScreenNavigationProp } from "../../navigation/types";
import { TextStyle, Theme } from "../../styles";
import useStore from "../../data/store";
import QRCode from "react-native-qrcode-svg";

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
    <SafeArea backgroundColor={theme.colors.primary}>
      <HStack
        flexMain={false}
        justifyContent="flex-start"
        style={styles.appBar}
      >
        <IconButton
          icon="back-arrow"
          color={theme.colors.text}
          iconSize={24}
          onPress={() => navigation.goBack()}
          style={styles.appBarBtn}
        />
      </HStack>
      <VStack
        justifyContent="flex-start"
        gap={theme.spacing.l}
        p={theme.spacing.m}
      >
        <View style={{ position: "relative" }}>
          <Icon
            name="logo-shadow"
            size={"50%"}
            color={"#0004"}
            style={{ position: "absolute", top: 2 }}
          />
          <Icon name="logo" size={"50%"} />
        </View>
        <VStack flexMain={false}>
          <Text style={styles.title}>Invite Your Friends!</Text>
          <Text style={styles.instruction}>
            Download Sous Chef app available on both the App Store and Google
            Play
          </Text>
        </VStack>
        <VStack justifyContent="space-evenly">
          <VStack
            flexMain={false}
            flexCross={false}
            pVH={{ h: 16, v: 8 }}
            style={styles.codeContainer}
          >
            <Text style={styles.code}>{session?.code}</Text>
          </VStack>
          <Text style={TextStyle.body}>OR</Text>
          <View style={styles.qrContainer}>
            <QRCode value={`${session?.code}`} size={200} />
          </View>
        </VStack>
      </VStack>
    </SafeArea>
  );
};

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    appBar: {
      height: theme.spacing.xxxl,
    },
    appBarBtn: {
      paddingLeft: theme.spacing.m,
      paddingRight: theme.spacing.m,
      alignSelf: "stretch",
    },
    title: {
      ...TextStyle.h1,
      fontSize: 32,
    },
    instruction: {
      ...TextStyle.body,
      textAlign: "center",
    },
    codeContainer: {
      backgroundColor: theme.colors.secondary,
      borderRadius: 8,
    },
    code: {
      ...TextStyle.h1,
      color: "#fff",
      letterSpacing: 8,
    },
    qrContainer: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff",
      borderRadius: 8,
      padding: 16,
    },
  });

export default InviteScreen;
