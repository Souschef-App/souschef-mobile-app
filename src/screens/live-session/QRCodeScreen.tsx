import { BarCodeEvent } from "expo-barcode-scanner";
import { Camera, PermissionResponse } from "expo-camera";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { Icon, QRScan, SafeArea, TextButton, VStack } from "../../components";
import { AppContext, ThemeContext } from "../../contexts/AppContext";
import useStore from "../../data/store";
import {
  QRCodeScreenNavigationProp,
  defaultLiveSessionNavigatorParamList,
} from "../../navigation/types";
import { ButtonStyle, TextStyle, Theme } from "../../styles";
import * as Linking from "expo-linking";

const fiveDigitRegex = /^\d{5}$/;

const QRCodeScreen = ({
  navigation,
}: {
  navigation: QRCodeScreenNavigationProp;
}) => {
  const appConfig = React.useContext(AppContext);

  // Theme
  const theme = React.useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);

  // State
  const [permission, setPermission] = React.useState<PermissionResponse | null>(
    null
  );

  // Store
  const user = useStore((state) => state.user);
  const joinSession = useStore((state) => state.joinSession);
  const joinFakeSession = useStore((state) => state.joinFakeSession);

  const handleQRScanned = (e: BarCodeEvent) => {
    if (appConfig.useFakeData) {
      joinFakeSession();
      navigation.replace("LiveSession", defaultLiveSessionNavigatorParamList);
    } else if (typeof e.data === "string" && fiveDigitRegex.test(e.data)) {
      joinSession(e.data, user);
      navigation.replace("LiveSession", defaultLiveSessionNavigatorParamList);
    }
  };

  React.useEffect(() => {
    const requestPermission = async () => {
      const response = await Camera.requestCameraPermissionsAsync();
      setPermission(response);
    };

    requestPermission();
  }, []);

  React.useEffect(() => {
    if (permission && !permission.granted && permission.canAskAgain) {
      navigation.goBack();
    }
  }, [permission]);

  if (permission && permission.granted) {
    return (
      <QRScan
        permission={permission}
        onScanned={handleQRScanned}
        onCancel={navigation.goBack}
      />
    );
  }

  if (permission && !permission.granted && !permission.canAskAgain) {
    return (
      <SafeArea backgroundColor={theme.colors.secondary}>
        <VStack>
          <VStack flexMain={false} pVH={{ v: theme.spacing.xl }}>
            <Icon name="camera" size={"40%"} color={theme.colors.text} />
          </VStack>
          <VStack justifyContent="space-between" p={theme.spacing.m}>
            <VStack flexMain={false} gap={8}>
              <Text style={styles.title}>No Camera Access</Text>
              <Text style={styles.desc}>
                To scan QR codes, allow Sous Chef to access your camera.
              </Text>
            </VStack>
            <VStack flexMain={false} gap={theme.spacing.m}>
              <TextButton
                title="ALLOW"
                onPress={Linking.openSettings}
                textStyle={styles.btnText}
                style={styles.allowBtn}
              />
              <TextButton
                title="DISMISS"
                onPress={navigation.goBack}
                textStyle={[styles.btnText]}
                style={styles.denyBtn}
              />
            </VStack>
          </VStack>
        </VStack>
      </SafeArea>
    );
  }

  return <SafeArea backgroundColor={theme.colors.primary} />;
};

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    title: { ...TextStyle.h1, color: "#fff", textAlign: "center" },
    desc: { ...TextStyle.h3, color: "#fff", textAlign: "center" },
    allowBtn: {
      ...ButtonStyle.account,
      alignSelf: "stretch",
      backgroundColor: theme.colors.text,
    },
    denyBtn: {
      ...ButtonStyle.account,
      alignSelf: "stretch",
      borderColor: "#fff",
      borderWidth: 2,
    },
    btnText: {
      ...TextStyle.body,
      color: "#fff",
    },
  });

export default QRCodeScreen;
