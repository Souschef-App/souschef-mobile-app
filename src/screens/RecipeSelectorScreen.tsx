import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Button, Icon } from '../components';
import { TextStyle } from '../styles';
import { primary } from '../styles/ButtonStyle';
import { FavoriteScreenNavigationProp } from "../navigation/types";

const RecipeSelectorScreen : React.FC<{ navigation: FavoriteScreenNavigationProp }> = ({ navigation }) => {
  const goToFavScreen = () => {
    navigation.navigate('FavoriteScreen');
  }
  return ( 
    <View style={style.container}>
      <Text style={TextStyle.h1}>Where is This Recipe?</Text>
      <View style={style.item_container}>
        <TouchableOpacity style={style.touchable_container}>
          <View style={style.item}>
            <View style={style.sub_item}>
              <Icon
                name="explore"
              />
              <Text style={[TextStyle.h3, style.item_text]}>Find a Recipe</Text>
            </View>
            <Icon
              name="arrow-right"
              size={15}
            />
          </View>
        </TouchableOpacity>
        <View style={{ height: 5 }} />
        <Button onPress={goToFavScreen} style={style.touchable_container}>
          <View style={style.item}>
            <View style={style.sub_item}>
              <Icon
                name="heart"
              />
              <Text style={[TextStyle.h3, style.item_text]}>From your Favorites</Text>
            </View>
            <Icon
              name="arrow-right"
              size={15}
            />
          </View>
        </Button>
        <View style={{ height: 5 }}></View>
        <TouchableOpacity style={style.touchable_container}>
          <View style={style.item}>
            <View style={style.sub_item}>
              <Icon
                name="plus"
              />
              <Text style={[TextStyle.h3, style.item_text]}>Create a New Recipe</Text>
            </View>
            <Icon
              name="arrow-right"
              size={15}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
    marginTop: 50
  },
  item_container: {
    width: "100%",
    marginTop: 20,
    padding: 10,
  },

  item_text: {
    marginLeft: 20,
  },
  sub_item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  touchable_container: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 25,
    width: "100%",
    marginVertical: 5,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 7,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default RecipeSelectorScreen;
