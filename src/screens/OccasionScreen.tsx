import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import {Icon} from '../components';
import { theme } from "../styles/theme";
import { primary } from '../styles/ButtonStyle';
import { TextStyle } from '../styles';


function OccasionScreen() { //add logic and navigation
  return (
    <View style={style.container}>
      <Text style={[TextStyle.h2,style.title]}>What's The Occasion?</Text>
      <View style={style.item_container}>
        <TouchableOpacity style={style.touchable_container}>
          <View style={style.item}>
            <View style={style.sub_item}>
              <Icon name="home"/>
              <Text style={[TextStyle.h3,style.item_text]}>Home</Text>
            </View>
            <Icon name="chevronright" />
          </View>
        </TouchableOpacity>
        <View style={{ height: 5 }}></View>
        <TouchableOpacity style={style.touchable_container}>
          <View style={style.item}>
            <View style={style.sub_item}>
              <Icon name="briefcase"/>
              <Text style={[TextStyle.h3,style.item_text]}>Professional</Text>
            </View>
            <Icon name="chevronright"/>
          </View>
        </TouchableOpacity>
        <View style={{ height: 5 }}></View>
        <TouchableOpacity style={style.touchable_container}>
          <View style={style.item}>
            <View style={style.sub_item}>
              <Icon name="graduationcap"/>
              <Text style={[TextStyle.h3,style.item_text]}>Educational</Text>
            </View>
            <Icon name="chevronright"/>
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
    marginTop:50
  },
  item_container: {
    width: "100%",
    marginTop: 20,
    padding: 10
  },
  title: {
    textAlign: "center",
    fontWeight: 'bold',
    marginTop: 10,
  },
  item_text: {
    marginLeft: 20,
    fontWeight: 'bold',
  },
  sub_item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  touchable_container: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 25,
    width: '100%',
    marginVertical: 5,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 7,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});

export default OccasionScreen;
