import { BarCodeEvent, BarCodeScanner } from "expo-barcode-scanner";
import { Camera, CameraType, PermissionResponse } from "expo-camera";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { TextStyle, Theme } from "../styles";
import { ThemeContext } from "../contexts/AppContext";
import IconButton from "./IconButton";
import { HStack, VStack } from "./primitives/Stack";
import Button from "./primitives/Button";
import TextButton from "./TextButton";
import Icon from "./primitives/Icon";

export type QRScanProps = {
  permission: PermissionResponse | null;
  onScanned: (e: BarCodeEvent) => void;
  onCancel: () => void;
};

const QRScan = (props: QRScanProps) => {
  // Theme
  const theme = React.useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);

  // State
  const [scanned, setScanned] = React.useState(false);

  if (!props.permission || !props.permission.granted) {
    return null;
  }

  const handleQRScanned = (e: BarCodeEvent) => {
    setScanned(true);
    props.onScanned(e);
  };

  return (
    <>
      <StatusBar hidden={true} />
      <Camera
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
        }}
        onBarCodeScanned={scanned ? undefined : handleQRScanned}
        type={CameraType.back}
        ratio="16:9"
        style={[StyleSheet.absoluteFillObject]}
      >
        <VStack p={theme.spacing.m} justifyContent="space-between">
          <VStack
            p={theme.spacing.m}
            flexMain={false}
            flexCross={false}
            style={styles.card}
          >
            <Text style={styles.text}>Scan a Sous Chef QR code</Text>
          </VStack>
          {scanned ? (
            <TextButton
              title="Try Again?"
              onPress={() => setScanned(false)}
              textStyle={styles.text}
              style={styles.btn}
            />
          ) : (
            <Icon name="frame-thin" color="#fff" size={"100%"} />
          )}
          <IconButton
            icon="cancel"
            color="#fff"
            onPress={props.onCancel}
            style={styles.floatingBtn}
          />
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
    text: {
      ...TextStyle.body,
      color: "#fff",
    },
    btn: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      backgroundColor: "#2e9dfb",
      borderRadius: 8,
    },
    floatingBtn: {
      width: 64,
      height: 64,
      backgroundColor: "#0006",
      borderRadius: 64,
    },
  });

export default QRScan;
