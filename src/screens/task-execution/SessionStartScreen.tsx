import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, SafeAreaView, ScrollView, TextInput, TouchableOpacity, TextInputChangeEventData, NativeSyntheticEvent } from "react-native";
import { TextStyle } from "../../styles";
import { Button, Icon } from "../../components";
import { primary } from "../../styles/ButtonStyle";
import { TaskScreenNavigationProp, SessionStartScreenRouteProp } from "../../navigation/types";
import { useSessionApi } from "../../hooks/useSessionApi";
import useStore from "../../data/store";
import { theme } from "../../styles/theme";

const SessionStartScreen: React.FC<{
  route: SessionStartScreenRouteProp;
  navigation: TaskScreenNavigationProp;
}> = ({ route, navigation }) => {
  const { session } = route.params;
  
  const joinSession = useStore((state) => state.joinSession);
  const socket = useStore((state) => state.socket);
  const error = useStore((state) => state.sessionError);

  React.useEffect(() => {
    if (socket) {
      navigation.push("Task");
    }
  }, [socket]);

  const onJoinSession = () => {
    joinSession(session.serverIp)
  }
  
  return (    
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.mealContainer}>
            <Text style={[TextStyle.h1]}>Join Session{' '}</Text> 
            <View>
            <Icon name="kitchenware" size={30} color="black" />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text
              style={[TextStyle.body,styles.inputSelfContainer]}>{session.plan.name}</Text>

            <View style={styles.titleContainer}>
              <View style={styles.bellConcierge}>
                <Text style={[TextStyle.h2,styles.title]}>Appetizer{' '}</Text>
                <Icon
                  name="brochette"                  
                />
              </View>
            </View>
            
            <View style={styles.sectionContainer}>
              {session.plan.recipes ? session.plan.recipes.filter((recipe: any) => recipe.mealType == 'Appetizer').map((recipe: any) => <View key={recipe.id}>
                  <TouchableOpacity style={styles.touchableContainer}>
                    <View style={styles.item}>
                      <Text style={[TextStyle.h3,styles.itemText]}>
                        {recipe.recipe.name + " "}
                      </Text>
                      <Icon
                        name="pencil"
                      />
                    </View>
                  </TouchableOpacity>
                  <View style={{ height: 5 }} />
                </View>) : ""
              }
            </View>
            <View style={styles.whiteSpace}></View> 
            <Text style={[TextStyle.h2,styles.title]}>Code: {session.sessionCode}</Text>
            <View style={styles.whiteSpace}></View> 

            {error && <Text style={styles.errorText}>{error}</Text>}
            
            <View style={styles.confirmButtonContainer}>
              <Button onPress={onJoinSession} style={[primary,styles.touchableContainerBlue]}>
                <View style={styles.itemCenter}>
                  <Text style={[TextStyle.body,styles.itemTextWhite]}>Join Session</Text>
                </View>
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    backgroundColor: "white",
    width: '100%',
    position: 'relative',
  },
  headerTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  inputContainer: {
    width: '100%',
    backgroundColor: '#B8E0D2',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  inputSelfContainer: {
    width: '100%',
    height: 50,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    fontSize: 17,
    elevation: 40,
    shadowColor: 'black',
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 5,
  },
  sectionContainer: {
    width: "100%",
    marginTop: 10,
    paddingVertical: 10,
  },
  title: {
    textAlign: "left",
    fontWeight: "bold",
  },
  itemText: {
    marginLeft: 20,
    fontSize: 15,
    fontWeight: "bold",
    color: "#555d6b",
  },
  itemTextWhite: {
    marginLeft: 20,
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  touchableContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 15,
    paddingRight: 20,
    width: "100%",
    marginVertical: 5,
    shadowColor: "#2f394a",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 7,
  },
  touchableContainerBlue: {
    backgroundColor: "#2e9dfb",
    borderRadius: 200,
    paddingVertical: 15,
    marginVertical: 5,
    shadowColor: "#2f394a",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 7,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemCenter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  disableText: {
    color: "black",
    paddingHorizontal: 10,
    paddingVertical: 20,
    fontSize: 25,
    fontWeight: "600",
  },
  commonIconStyles: {
    fontSize: 20,
    color: "#2f394a",
  },
  mealContainer: {
    width: '100%',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    flexDirection: 'row',
    backgroundColor: '#F0D5BA',
    elevation: 50,
    shadowColor: 'black',
    borderBottomEndRadius: 50,
    position: 'relative',
    right: 50,
  },
  bellConcierge: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  confirmButtonContainer: {
    alignSelf: 'center',
    width: '70%',
  },
  whiteSpace: {
    height: 20, 
  },
  plusIconContainer: {
    flexDirection:"row",
    marginLeft:200,
    alignContent:'flex-end',
    alignItems: 'center',
  },
  errorText: {
    ...TextStyle.body,
    textAlign: "center",
    color: theme.colors.danger,
  },
});

export default SessionStartScreen;
