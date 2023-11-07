import React from "react";
import { StyleSheet, Text } from "react-native";
import { Button, HStack, Icon, SafeArea, VStack } from "../../components";
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
      <VStack>
        <VStack>
          <Text style={TextStyle.h1}>JOIN SESSION</Text>
        </VStack>
        <VStack style={{ backgroundColor: theme.colors.background }}>
          <VStack flexCross={false} gap={16}>
            <VStack flexMain={false} align="flex-start">
              <Text style={{ ...TextStyle.h3, fontWeight: "bold" }}>
                Choose
              </Text>
              <Text style={TextStyle.h4}>your join option</Text>
            </VStack>
            <HStack flexMain={false} gap={32}>
              <Button onPress={handleQRCode}>
                <VStack
                  flexMain={false}
                  flexCross={false}
                  style={{ ...styles.card, ...styles.qrCard }}
                >
                  <Icon name="qr" size={48} color="#fff" />
                  <Text style={{ ...TextStyle.h4, color: "#fff" }}>
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
                  <Icon
                    name="digit"
                    size={48}
                    color={theme.colors.background}
                  />
                  <Text
                    style={{
                      ...TextStyle.h4,
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
      </VStack>
    </SafeArea>
  );
};

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
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
