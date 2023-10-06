import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  TextInput,
  Alert,
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

const CalendarScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [mealNameInput, setMealNameInput] = useState<string>('');
  const [confirmedBookings, setConfirmedBookings] = useState<Booking[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isTimePickerVisible, setTimePickerVisible] = useState<boolean>(false);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time: Date) => {
    const formattedTime = `${time.getHours()}:${time.getMinutes()}`;
    setSelectedTime(formattedTime);
    setTimePickerVisible(false);
  };

  const handleMealNameChange = (text: string) => {
    setMealNameInput(text);
  };

  const handleBookingConfirmation = () => {
    if (selectedDate && selectedTime && mealNameInput) {
      setConfirmedBookings([
        ...confirmedBookings,
        {
          id: Date.now(),
          date: selectedDate,
          time: selectedTime,
          mealPlanName: mealNameInput,
        },
      ]);
      setSelectedDate(null);
      setSelectedTime(null);
      setMealNameInput('');
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

  const handleSessionPress = (booking: Booking) => {
    setSelectedBooking(booking);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={day => handleDateSelect(day.dateString)}
        markedDates={{
          [selectedDate || '']: {selected: true, selectedColor: '#4CAF50'},
        }}
      />
      {selectedDate && (
        <View style={styles.confirmationContainer}>
          <Text style={styles.confirmationText}>Selected Date:</Text>
          <Text style={styles.selectedDate}>{selectedDate}</Text>
          <TouchableOpacity
            onPress={() => setTimePickerVisible(true)}
            style={styles.confirmationButton}>
            <Text style={styles.buttonText}>
              {selectedTime ? `Selected Time: ${selectedTime}` : 'Select Time'}
            </Text>
          </TouchableOpacity>
          <TextInput
            placeholder="Enter Meal Name"
            style={styles.mealNameInput}
            value={mealNameInput}
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
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeSelect}
        onCancel={() => setTimePickerVisible(false)}
      />

      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Booked Cooking Sessions</Text>
        <FlatList
          data={confirmedBookings}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => handleSessionPress(item)}>
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
            </TouchableOpacity>
          )}
        />
      </View>
      {selectedBooking && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Date: {selectedBooking.date}</Text>
            <Text style={styles.modalText}>
              Meal Plan:{' '}
              <Text style={styles.colorfulText}>
                {selectedBooking.mealPlanName}
              </Text>
            </Text>
            <View style={styles.daysLeftContainer}>
              <Icon
                name="clock-o"
                size={16}
                color="#4CAF50"
                style={styles.clockIcon}
              />
              <Text style={styles.modalText}>
                {getDaysLeft(selectedBooking.date)} days left
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalText: {
    fontSize: 20,
    marginBottom: 10,
    color: 'white',
  },
  closeButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 5,
    marginTop: 20,
  },
});

export default CalendarScreen;
