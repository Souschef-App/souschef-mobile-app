import React from "react";
import { StyleSheet, Text } from "react-native";
import {
  Button,
  HStack,
  Icon,
  SafeArea,
  SvgLocal,
  VStack,
} from "../../components";
import { ThemeContext } from "../../contexts/AppContext";
import { JoinScreenNavigationProp } from "../../navigation/types";
import { TextStyle, Theme } from "../../styles";

const JoinScreen = ({
  navigation,
}: {
  navigation: JoinScreenNavigationProp;
}) => {
  // Theme
  const theme = React.useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);

  const handleQRCode = () => {
    navigation.navigate("QRCode");
  };

  const handleSessionCode = () => {
    navigation.navigate("SessionCode");
  };

  return (
    <SafeArea backgroundColor={theme.colors.primary}>
      <VStack justifyContent="flex-end">
        <VStack justifyContent="flex-end">
          <Text style={styles.header}>JOIN</Text>
          <Text style={styles.header}>SESSION</Text>
          <SvgLocal
            name="curve"
            color="white"
            aspectRatio={2 / 1}
            style={{ transform: [{ rotateX: "180deg" }] }}
          />
        </VStack>
        <VStack
          justifyContent="flex-start"
          gap={theme.spacing.m}
          pVH={{ h: theme.spacing.xxxl, v: theme.spacing.l }}
          style={{ backgroundColor: theme.colors.background }}
        >
          <VStack flexMain={false} align="flex-start">
            <Text style={[TextStyle.h3, TextStyle.weight.bold]}>Choose</Text>
            <Text style={TextStyle.h4}>your join option</Text>
          </VStack>
          <HStack
            flexMain={false}
            justifyContent="space-between"
            gap={theme.spacing.l}
          >
            <Button onPress={handleQRCode}>
              <VStack
                flexMain={false}
                flexCross={false}
                gap={theme.spacing.s}
                style={{ ...styles.card, ...styles.qrCard }}
              >
                <Icon name="qr" size={48} color="#fff" />
                <Text
                  style={{
                    ...TextStyle.h4,
                    ...TextStyle.weight.bold,
                    color: "#fff",
                  }}
                >
                  QR-Code
                </Text>
              </VStack>
            </Button>
            <Button onPress={handleSessionCode}>
              <VStack
                flexMain={false}
                flexCross={false}
                style={{ ...styles.card, ...styles.codeCard }}
              >
                <Icon name="digit" size={48} color={theme.colors.background} />
                <Text
                  style={{
                    ...TextStyle.h4,
                    ...TextStyle.weight.bold,
                    color: theme.colors.background,
                    textAlign: "center",
                  }}
                >
                  {"Session\nCode"}
                </Text>
              </VStack>
            </Button>
          </HStack>
        </VStack>
      </VStack>
    </SafeArea>
  );
};

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    header: {
      ...TextStyle.h1,
      color: "#fff",
    },
    card: {
      width: 128,
      height: 128,
      borderRadius: 8,
      elevation: 4,
      shadowOffset: {
        width: 0,
        height: 4,
      },
    },
    qrCard: {
      backgroundColor: theme.colors.secondary,
    },
    codeCard: {
      backgroundColor: theme.colors.text,
    },
  });

export default JoinScreen;
