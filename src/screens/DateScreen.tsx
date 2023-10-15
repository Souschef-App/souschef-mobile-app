import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import Toast from 'react-native-toast-message';
import { primary } from '../styles/ButtonStyle';
import { TextStyle } from '../styles'
import { TimeScreenNavigationProp } from '../navigation/types';
import { Button } from '../components';


interface DateScreenState {
  selectedDate: string | null;
}

const DateScreen: React.FC <{ navigation: TimeScreenNavigationProp }> = ({ navigation }) => {
  const goToTimeScreen = () => {
    navigation.navigate('TimeScreen');}
  const [state, setState] = useState<DateScreenState>({
    selectedDate: null,
  });

  const handleDateSelect = (date: string) => {
    setState((prevState) => ({
      ...prevState,
      selectedDate: date,
    }));
  };

  const handleBookingConfirmation = () => {
    const { selectedDate } = state;

    if (selectedDate) {
      // Show a toast notification
      Toast.show({
        type: 'success',
        text1: 'Booking Confirmed',
        text2: `Booking confirmed for ${selectedDate}`,
      });
    } else {
      // Show a toast notification for selecting a date
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please select a date.',
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={[TextStyle.h1, styles.selectDateTitle]}>Select Date</Text>
      </View>
      <View style={styles.calendarContainer}>
        <Calendar
          style={[styles.calendar, { elevation: 3 }]}
          onDayPress={(day) => {
            if (isFutureDate(day.dateString)) {
              handleDateSelect(day.dateString);
            } else {
              // Show a toast notification for selecting a past date
              Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Please select a future date.',
              });
            }
          }}
          markedDates={{
            [state.selectedDate || '']: {
              selected: true,
              selectedColor: '#4CAF50',
            },
          }}
        />
      </View>
      {state.selectedDate && (
        <Button
          onPress={goToTimeScreen}
          style={[primary, styles.confirmationButton]}
        >
          <Text style={[TextStyle.h3, styles.buttonText]}>Confirm Date</Text>
        </Button>
      )}
    </ScrollView>
  );
};

const isFutureDate = (date: string) => {
  const selectedDate = new Date(date);
  const currentDate = new Date();
  return selectedDate >= currentDate;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 100,
  },
  selectDateTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  calendarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  calendar: {
    width: 350,
    height: 350,
    borderRadius: 8,
    borderColor: '#4CAF50',
    borderWidth: 1,
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  confirmationButton: {
    marginTop: 50, // Adjusted the margin to make it shorter
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    width: 320,
    marginLeft: 30
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DateScreen;
