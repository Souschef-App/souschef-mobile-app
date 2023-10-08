import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

interface Booking {
  id: number;
  date: string;
  time: string;
  mealPlanName: string;
}

interface CalendarScreenProps {}

interface CalendarScreenState {
  selectedDate: string | null;
  selectedTime: string | null;
  mealNameInput: string;
  confirmedBookings: Booking[];
  isTimePickerVisible: boolean;
}

const CalendarScreen: React.FC<CalendarScreenProps> = () => {
  const [state, setState] = useState<CalendarScreenState>({
    selectedDate: null,
    selectedTime: null,
    mealNameInput: '',
    confirmedBookings: [],
    isTimePickerVisible: false,
  });

  const handleDateSelect = (date: string) => {
    setState(prevState => ({
      ...prevState,
      selectedDate: date,
    }));
  };

  const handleTimeSelect = (time: Date) => {
    const formattedTime = `${time.getHours()}:${time.getMinutes()}`;
    setState(prevState => ({
      ...prevState,
      selectedTime: formattedTime,
      isTimePickerVisible: false,
    }));
  };

  const handleMealNameChange = (text: string) => {
    setState(prevState => ({
      ...prevState,
      mealNameInput: text,
    }));
  };

  const handleBookingConfirmation = () => {
    const {selectedDate, selectedTime, mealNameInput, confirmedBookings} =
      state;

    if (selectedDate && selectedTime && mealNameInput) {
      const newBooking: Booking = {
        id: Date.now(),
        date: selectedDate,
        time: selectedTime,
        mealPlanName: mealNameInput,
      };

      setState(prevState => ({
        ...prevState,
        confirmedBookings: [...confirmedBookings, newBooking],
        selectedDate: null,
        selectedTime: null,
        mealNameInput: '',
      }));
    } else {
      Alert.alert('Please enter a meal plan name and select a time');
    }
  };

  const getDaysLeft = (bookingDate: string) => {
    const currentDate = new Date();
    const bookingDateObj = new Date(bookingDate);
    const timeDiff = bookingDateObj.getTime() - currentDate.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return daysLeft;
  };

  return (
    <ScrollView style={styles.container}>
      <Calendar
        onDayPress={day => handleDateSelect(day.dateString)}
        markedDates={{
          [state.selectedDate || '']: {
            selected: true,
            selectedColor: '#4CAF50',
          },
        }}
      />
      {state.selectedDate && (
        <View style={styles.confirmationContainer}>
          <Text style={styles.confirmationText}>Selected Date:</Text>
          <Text style={styles.selectedDate}>{state.selectedDate}</Text>
          <TouchableOpacity
            onPress={() =>
              setState(prevState => ({
                ...prevState,
                isTimePickerVisible: true,
              }))
            }
            style={[styles.confirmationButton, styles.selectTimeButtonBlue]}>
            {/* Add a new style for blue button */}
            <Text style={[styles.buttonText, styles.selectTimeButtonTextBlue]}>
              {/* Add a new style for blue button text */}
              {state.selectedTime
                ? `Selected Time: ${state.selectedTime}`
                : 'Select Time'}
            </Text>
          </TouchableOpacity>
          <TextInput
            placeholder="Enter Meal Name"
            style={styles.mealNameInput}
            value={state.mealNameInput}
            onChangeText={handleMealNameChange}
          />
          <TouchableOpacity
            onPress={handleBookingConfirmation}
            style={styles.confirmationButton}>
            <Text style={styles.buttonText}>Confirm Booking</Text>
          </TouchableOpacity>
        </View>
      )}

      <DateTimePickerModal
        isVisible={state.isTimePickerVisible}
        mode="time"
        onConfirm={time => handleTimeSelect(time)}
        onCancel={() =>
          setState(prevState => ({
            ...prevState,
            isTimePickerVisible: false,
          }))
        }
      />

      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Booked Cooking Sessions</Text>
        <FlatList
          data={state.confirmedBookings}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={styles.sessionItem}>
              <Icon
                name="check"
                size={24}
                color="#4CAF50"
                style={styles.checkIcon}
              />
              <View style={styles.sessionInfo}>
                <Text style={styles.bookingDate}>Date: {item.date}</Text>
                <Text style={styles.mealPlan}>
                  Meal Plan:{' '}
                  <Text style={styles.colorfulText}>{item.mealPlanName}</Text>
                </Text>
                <Text style={styles.bookingTime}>Time: {item.time}</Text>
                <View style={styles.daysLeftContainer}>
                  <Icon
                    name="clock-o"
                    size={16}
                    color="#4CAF50"
                    style={styles.clockIcon}
                  />
                  <Text style={styles.daysLeft}>
                    {getDaysLeft(item.date)} days left
                  </Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  confirmationContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  confirmationText: {
    fontSize: 18,
    color: '#4CAF50',
  },
  selectedDate: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  mealNameInput: {
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    fontSize: 16,
  },
  confirmationButton: {
    marginTop: 10,
    padding: 12,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
  },
  listTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 16,
  },
  sessionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  checkIcon: {
    marginRight: 10,
  },
  sessionInfo: {
    flex: 1,
  },
  bookingDate: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  mealPlan: {
    fontSize: 16,
  },
  colorfulText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  daysLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clockIcon: {
    marginRight: 4,
  },
  daysLeft: {
    fontSize: 14,
    color: '#4CAF50',
  },
  bookingTime: {
    fontSize: 16,
  },

  selectTimeButtonBlue: {
    backgroundColor: '#2E9DFB',
  },
  selectTimeButtonTextBlue: {
    color: 'white',
  },
});

export default CalendarScreen;
