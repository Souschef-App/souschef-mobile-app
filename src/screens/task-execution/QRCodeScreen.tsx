import { BarCodeEvent, BarCodeScanner } from "expo-barcode-scanner";
import React from "react";
import { Button, StyleSheet, Text, Dimensions } from "react-native";
import { SafeArea, VStack } from "../../components";
import { AppContext, ThemeContext } from "../../contexts/AppContext";
import useStore from "../../data/store";
import {
  QRCodeScreenNavigationProp,
  defaultTaskDrawerNavigatorParamList,
} from "../../navigation/types";
import { Theme } from "../../styles";

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

  const [hasPermission, setHasPermission] = React.useState<boolean | null>(
    null
  );
  const [scanned, setScanned] = React.useState(false);

  // Store
  const socketConnected = useStore((state) => state.clientConnected);
  const loading = useStore((state) => state.sessionLoading);
  const joinSession = useStore((state) => state.joinSession);
  const joinFakeSession = useStore((state) => state.joinFakeSession);
  const cleanup = useStore((state) => state.resetSessionSlice);

  React.useEffect(() => {
    if (socketConnected) {
      navigation.push("TaskDrawer", defaultTaskDrawerNavigatorParamList);
    }
  }, [socketConnected]);

  React.useEffect(() => {
    return () => cleanup();
  }, []);

  React.useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = (e: BarCodeEvent) => {
    setScanned(true);

    if (appConfig.useFakeData) {
      joinFakeSession();
    } else if (typeof e.data === "number" && fiveDigitRegex.test(e.data)) {
      joinSession(e.data);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeArea>
      <VStack>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        {scanned && (
          <Button
            title={"Tap to Scan Again"}
            onPress={() => setScanned(false)}
          />
        )}
      </VStack>
    </SafeArea>
  );
};

const makeStyles = (theme: Theme) => StyleSheet.create({});

export default QRCodeScreen;
