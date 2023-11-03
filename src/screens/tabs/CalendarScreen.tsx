import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
  Platform, 
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Icon } from '../../components';
import {primary} from '../../styles/ButtonStyle';
import { TextStyle } from '../../styles/';
import { CalendarScreenRouteProp } from '../../navigation/types';
import { useSessionApi } from '../../hooks/useSessionApi';

interface Booking {
  id: number;
  date: string;
  time: string;
  mealPlanName: string;
}

interface CalendarScreenProps {
  route: CalendarScreenRouteProp
}

interface CalendarScreenState {
  selectedDate: string | null;
  selectedTime: string | null;
  mealNameInput: string;
  confirmedBookings: Booking[];
  isTimePickerVisible: boolean;
}

const CalendarScreen: React.FC<CalendarScreenProps> = ({route}) => {
  const {date, time, mealName} = route.params ? route.params : {date: null, time: null, mealName: null};

  const [mealPlans, setMealPlans] = useState<any[]>([])

  const [state, setState] = useState<CalendarScreenState>({
    selectedDate: null,
    selectedTime: null,
    mealNameInput: '',
    confirmedBookings: [],
    isTimePickerVisible: false,
  });

  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);
  const [dateTime, setDateTime] = useState(new Date());
  const { createMealSession, getMealPlans, getMealSessions } = useSessionApi()

  const handleDateSelect = (date: string) => {
    setState((prevState) => ({
      ...prevState,
      selectedDate: date,
    }));
  };

  const refreshSessions = () => {
    getMealSessions().then((res: any) => {  
      console.log(res.data);
      setState((prevState) => ({
        ...prevState,
        confirmedBookings: res.data.map((session: any) => ({
          id: session.id,
          date: session.dateTime.substring(0, 10),
          time: session.dateTime.substring(11, 5),
          mealPlanName: session.plan ? session.plan.name : "Test Meal Plan"
        })),
        selectedDate: null,
        selectedTime: null, 
        mealNameInput: ''
      }));
    })
  }

  useEffect(() => {
    getMealPlans().then((res: any) => {
      console.log(res.data);
      setMealPlans(res.data);
        
      if(date!=null && time!=null && mealName!=null) {
        console.log(mealName);

        createMealSession({
          DateTime: date + "T" + time,
          PlanId: res.data.find((plan: any) => plan.name === mealName).id
        }).then((res: any) => {
          refreshSessions()
        })
      }
      else {
        refreshSessions()
      }
    })
  }, [])


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

  const handleMealNameChange = (text: string) => {
    setState((prevState) => ({
      ...prevState,
      mealNameInput: text,
    }));
  };

  const handleBookingConfirmation = () => {
    const { selectedDate, selectedTime, mealNameInput, confirmedBookings } = state;
    
    console.log ({
      DateTime: selectedDate + "T" + selectedTime,
      PlanId: mealPlans.find(plan => plan.name === mealNameInput).id
    });

    if (selectedDate && selectedTime && mealNameInput) {
      console.log ({
        DateTime: selectedDate + "T" + selectedTime,
        PlanId: mealPlans.find(plan => plan.name === mealNameInput).id
      });
      createMealSession({
        DateTime: selectedDate + "T" + selectedTime,
        PlanId: mealPlans.find(plan => plan.name === mealNameInput).id
      }).then((res: any) => {
        refreshSessions()
      })
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

const isPastDate = (date: string) => {
  const selectedDate = new Date(date);
  const currentDate = new Date();
  return selectedDate < currentDate;
};

  return (
    <ScrollView style={styles.container}>
  <Text style={TextStyle.h2}>Create a Cook Session!</Text>      
  <Calendar
  onDayPress={(day) => {
    if (!isPastDate(day.dateString)) {
      handleDateSelect(day.dateString);
    } else {
      Alert.alert('Please select a future date.');
    }
  }}
  markedDates={{
    [state.selectedDate || '']: {
      selected: true,
      selectedColor: '#4CAF50',
    },
    ...state.confirmedBookings.reduce((marked, booking) => {
      if (isPastDate(booking.date)) {
        marked[booking.date] = {
          disabled: true,
          disableTouchEvent: true,
          customStyles: { container: { backgroundColor: '#E0E0E0' } },
        };
      }
      return marked;
    }, {} as { [date: string]: object }), 
  }}
/>
      {state.selectedDate && (
        <View style={styles.confirmationContainer}>
          <Text style={TextStyle.body}>Selected Date:</Text>
          <Text style={styles.selectedDate}>{state.selectedDate}</Text>
          <TouchableOpacity onPress={handleTimeSelect} style={[primary, styles.selectTimeButtonBlue]}>
            <Text style={[styles.buttonText, styles.selectTimeButtonTextBlue]}>
              {state.selectedTime ? `Selected Time: ${state.selectedTime}` : 'Select Time'}
            </Text>
          </TouchableOpacity>
          <TextInput
            placeholder="Enter Meal Name"
            style={styles.mealNameInput}
            value={state.mealNameInput}
            onChangeText={handleMealNameChange}
          />
          <TouchableOpacity onPress={handleBookingConfirmation} style={[primary, styles.confirmationButton]}>
            <Text style={styles.buttonText}>Confirm Booking</Text>
          </TouchableOpacity>
        </View>
      )}

<View style={styles.listContainer}>
<Text style={[TextStyle.h3, { color: 'green', textAlign: 'center' }]}>Active Cooking Sessions</Text>
        <ScrollView> 
          <FlatList
            data={state.confirmedBookings}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.sessionItem}>
                <View style={styles.checkIcon}>
                  <Icon name="check" color="green" />
                </View>
                <View style={styles.sessionInfo}>
                  <Text style={styles.bookingDate}>Date: {item.date}</Text>
                  <Text style={styles.mealPlan}>
                    Meal Plan: <Text style={TextStyle.body}>{item.mealPlanName}</Text>
                    <Text style={TextStyle.body}> - {item.time}</Text> 
                  </Text>
                  <View style={styles.daysLeftContainer}>
                    <Icon name="timer" />
                    <Text style={styles.daysLeft}>{getDaysLeft(item.date)} days left</Text>
                  </View>
                </View>
              </View>
            )}
          />
        </ScrollView>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  confirmationContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
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
    marginRight: 10,
  },
  daysLeft: {
    fontSize: 14,
    color: '#4CAF50',
    margin: 10,
  },
  selectTimeButtonBlue: {
    backgroundColor: '#2E9DFB',
  },
  selectTimeButtonTextBlue: {
    color: 'white',
  },
});


export default CalendarScreen;
