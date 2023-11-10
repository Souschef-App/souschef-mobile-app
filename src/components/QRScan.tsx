import { BarCodeEvent } from "expo-barcode-scanner";
import { Camera, CameraType } from "expo-camera";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { TextStyle, Theme } from "../styles";
import { ThemeContext } from "../contexts/AppContext";
import IconButton from "./IconButton";
import { HStack, VStack } from "./primitives/Stack";

export type QRScanProps = {
  scanned: boolean;
  onScanned: (e: BarCodeEvent) => void;
  onCancel: () => void;
};

const QRScan = (props: QRScanProps) => {
  // Theme
  const theme = React.useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);

  const [hasPermission, setHasPermission] = React.useState<boolean | null>(
    null
  );

  React.useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <>
      <StatusBar hidden={true} />
      <Camera
        onBarCodeScanned={props.scanned ? undefined : props.onScanned}
        type={CameraType.back}
        ratio="16:9"
        style={[StyleSheet.absoluteFillObject]}
      >
        <VStack justifyContent="flex-end">
          <VStack p={theme.spacing.l} justifyContent="flex-start">
            <VStack
              p={theme.spacing.m}
              flexMain={false}
              flexCross={false}
              style={styles.card}
            >
              <Text style={styles.cardText}>Scan a Sous Chef QR code</Text>
            </VStack>
          </VStack>
          <HStack p={theme.spacing.l} flexMain={false}>
            <IconButton
              icon="cancel"
              color="#fff"
              onPress={props.onCancel}
              style={styles.floatingBtn}
            />
          </HStack>
        </VStack>
      </Camera>
    </>
  );
};

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    card: {
      backgroundColor: "#0009",
      borderRadius: 8,
    },
    cardText: {
      ...TextStyle.body,
      color: "#fff",
    },
    floatingBtn: {
      width: 64,
      height: 64,
      backgroundColor: "#0006",
      borderRadius: 64,
    },
  });

export default QRScan;
