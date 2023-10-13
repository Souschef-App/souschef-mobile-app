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
import {primary} from '../styles/ButtonStyle'
import { TextStyle } from '../styles';

interface CalendarScreenState {
  selectedDate: string | null;
}

const CalendarScreen: React.FC = () => {
  const [state, setState] = useState<CalendarScreenState>({
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
        <Text style={styles.selectDateTitle}>Select Date</Text>
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
      <View style={styles.confirmationContainer}>
        {state.selectedDate && (
          <TouchableOpacity
            onPress={handleBookingConfirmation}
            style={[primary,styles.confirmationButton]}
          >
            <Text style={[TextStyle.h3,styles.buttonText]}>Confirm Date</Text>
          </TouchableOpacity>
        )}
      </View>
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
  confirmationContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginTop: 40,
  },
  confirmationButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CalendarScreen;
