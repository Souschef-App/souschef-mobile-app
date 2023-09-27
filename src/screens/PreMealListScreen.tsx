import React, {Component} from 'react';
import ReactSearchBox from 'react-search-box';
import {PreMealListScreenNavigationProp} from '../navigation/types';

const PreMealListScreen = ({
  navigation,
  route,
}: PreMealListScreenNavigationProp) => {
  SearchPrevMeals;
};

export default class SearchPrevMeals extends Component {
  data = [
    {key: '1', value: 'Cheese cake'},
    {key: '2', value: 'Potato Skins'},
    {key: '3', value: 'Steak and Cheese Quesadilla'},
    {key: '4', value: 'Burgers'},
    {key: '5', value: 'Jalapeno Poppers'},
    {key: '6', value: 'Popcorn Shrimp'},
    {key: '7', value: 'Fried Chicken'},
    {key: '8', value: 'Sheet Pan Nachos'},
  ];

  render() {
    return (
      <ReactSearchBox
        placeholder="Search Meals"
        data={this.data}
        onSelect={function (record: {
          item: {
            key: string;
            // const PreMealListScreen = ({navigation, route}: PreMealListScreenNavigationProp) =>{
            // };
            value: string;
          };
        }): void {
          throw new Error('Function not implemented.');
        }}
        onChange={function (value: string): void {
          throw new Error('Function not implemented.');
        }}
      />
    );
  }
}
