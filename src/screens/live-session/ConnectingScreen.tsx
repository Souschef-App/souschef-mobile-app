import React from "react";
import useStore from "../../data/store";
import {
  ConnectingScreenNavigationProp,
  defaultTaskDrawerNavigatorParamList,
} from "../../navigation/types";
import { Error, Loading } from "./connecting-components";

const TIME_OUT = 1_000;

const ConnectingScreen = ({
  navigation,
}: {
  navigation: ConnectingScreenNavigationProp;
}) => {
  const [isError, setIsError] = React.useState<boolean>(false);

  // Store
  const user = useStore((state) => state.user);
  const loading = useStore((state) => state.sessionLoading);
  const connected = useStore((state) => state.clientConnected);

  React.useEffect(() => {
    if (!loading && !connected) {
      setTimeout(() => setIsError(true), TIME_OUT);
    } else if (!loading && connected) {
      if (user !== null) {
        navigation.replace("Running", defaultTaskDrawerNavigatorParamList);
      } else {
        navigation.replace("Connected");
      }
    }
  }, [loading, connected]);

  if (isError) {
    return <Error navigation={navigation} />;
  }

  return <Loading />;
};

export default ConnectingScreen;
