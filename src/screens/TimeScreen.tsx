import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Button, Icon} from '../components'; 
import { primary,account } from '../styles/ButtonStyle';
import { TextStyle } from '../styles';
import { OccasionScreenNavigationProp } from '../navigation/types';

interface TimeScreenState { //add navigation
  selectedTime: string | null;
}

const TimeScreen: React.FC <{ navigation: OccasionScreenNavigationProp }> = ({ navigation }) => {
  const goToOccasionScreen = () => {
    navigation.navigate('OccasionScreen');}
  const [state, setState] = useState<TimeScreenState>({
    selectedTime: null,
  });

  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);
  const [dateTime, setDateTime] = useState(new Date());

  const handleTimeSelect = () => {
    setIsDateTimePickerVisible(true);
  };

  const handleDateTimeChange = (event: any, date?: Date | undefined) => {
    setIsDateTimePickerVisible(false);

    if (date) {
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const formattedTime = `${hours}:${minutes}`;
      setState((prevState) => ({
        ...prevState,
        selectedTime: formattedTime,
      }));
    }
  };

  const handleConfirmSession = () => {
    if (state.selectedTime) {
      Alert.alert('Session confirmed');
    } else {
      Alert.alert('Please select a time before confirming');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.middleContent}>
        <Icon name="timer" size={100}/> 
        <Text style={[TextStyle.h2,styles.title]}>Select a Time</Text>
        <TouchableOpacity onPress={handleTimeSelect} style={[primary,styles.selectTimeButton]}>
          <Text style={[TextStyle.h3,styles.buttonText]}>
            {state.selectedTime ? `Selected Time: ${state.selectedTime}` : 'Select Time'}
          </Text>
        </TouchableOpacity>
      </View>

      {isDateTimePickerVisible && (
        <DateTimePicker
          value={dateTime}
          mode="time"
          is24Hour={true}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateTimeChange}
        />
      )}

      <Button onPress={goToOccasionScreen} style={[account,styles.confirmSessionButton]}>
        <Text style={[TextStyle.h3,styles.buttonText]}>Confirm Time</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleContent: {
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    marginTop: 20,
  },
  selectTimeButton: {
    backgroundColor: '#2E9DFB',
    padding: 12,
    marginTop: 20,
  },
  confirmSessionButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    marginTop: 30,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default TimeScreen;
