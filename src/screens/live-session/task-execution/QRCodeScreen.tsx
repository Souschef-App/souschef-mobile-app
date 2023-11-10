import { BarCodeEvent } from "expo-barcode-scanner";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { QRScan, SafeArea } from "../../../components";
import { AppContext, ThemeContext } from "../../../contexts/AppContext";
import useStore from "../../../data/store";
import {
  QRCodeScreenNavigationProp,
  defaultLiveSessionNavigatorParamList,
} from "../../../navigation/types";
import { TextStyle, Theme } from "../../../styles";
import { guestUser } from "../../../data/__mocks__";

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
  const [scanned, setScanned] = React.useState(false);

  // Store
  const user = useStore((state) => state.user);
  const joinSession = useStore((state) => state.joinSession);
  const joinFakeSession = useStore((state) => state.joinFakeSession);

  const handleQRScanned = (e: BarCodeEvent) => {
    setScanned(true);

    if (appConfig.useFakeData) {
      joinFakeSession();
      navigation.replace("LiveSession", defaultLiveSessionNavigatorParamList);
    } else if (typeof e.data === "string" && fiveDigitRegex.test(e.data)) {
      joinSession(e.data, user ?? guestUser);
      navigation.replace("LiveSession", defaultLiveSessionNavigatorParamList);
    }
  };

  return (
    <SafeArea>
      {!scanned && (
        <QRScan
          scanned={scanned}
          onScanned={handleQRScanned}
          onCancel={navigation.goBack}
        />
      )}
    </SafeArea>
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

export default QRCodeScreen;
