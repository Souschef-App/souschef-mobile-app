import React from 'react';
import {SafeAreaView, View, StyleSheet, Text} from 'react-native';
import {IconButton, Timer, ChatBubble, Card, Section, Row} from '../components';
import {TaskScreenNavigationProp} from '../navigation/types';
import {theme} from '../styles/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Logo} from '../res';

const TaskScreen = ({navigation, route}: TaskScreenNavigationProp) => {
  const {name: taskName} = route.params;
  const timerInSeconds = 0 * 3600 + 5 * 60 + 0; // hr + min + sec

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.timerContainer}>
        <Timer seconds={timerInSeconds} />
      </View>
      <View style={styles.cardContainer}>
        <Row
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            paddingVertical: 8,
          }}>
          <Row>
            <MaterialIcons name="timer" style={styles.timerIcon} />
            <Text style={styles.timerText}>{timerInSeconds / 60} min</Text>
          </Row>
          <Row>
            <MaterialIcons name="star" style={[styles.star]} />
            <MaterialIcons
              name="star"
              style={[styles.star, styles.starEmpty]}
            />
            <MaterialIcons
              name="star"
              style={[styles.star, styles.starEmpty]}
            />
          </Row>
        </Row>
        <Card>
          <Row style={[{justifyContent: 'flex-end'}]}>
            <IconButton
              iconName="information-outline"
              text="More details"
              size={16}
              bgColor="#0000"
              color="#2e9dfb"
              style={{}}
            />
          </Row>
          <Text style={[styles.cardText]}>
            Chop the carrots into thin slices.
          </Text>
          <Row style={styles.cardItem}>
            <IconButton
              iconName="check"
              bgColor="#3ddc84"
              text="MARK COMPLETED"
              size={24}
              style={{borderRadius: 128, elevation: 4, marginRight: 8}}
            />
            <IconButton iconName="refresh" bgColor="#A89C9C" size={24} />
          </Row>
        </Card>
        <View style={styles.chatBotContainer}>
          <Row>
            <View
              style={{
                marginBottom: 32,
                marginRight: 8,
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
              }}>
              <ChatBubble
                text="I am your virtual cooking assistant?"
                left={false}
              />
              <ChatBubble
                text="How can I help?"
                left={false}
                style={{
                  marginTop: 8,
                }}
              />
            </View>
            <View style={[styles.chatBot, {marginTop: 96}]}>
              <Logo />
            </View>
          </Row>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  timerContainer: {
    marginVertical: 16,
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardItem: {
    marginTop: 16,
  },
  cardText: {
    fontSize: 32,
    textAlign: 'center',
    color: theme.colors.lightText,
  },
  timerIcon: {color: theme.colors.lightText, textAlign: 'center', fontSize: 28},
  timerText: {
    color: theme.colors.lightText,
    textAlign: 'center',
    marginLeft: 8,
    fontSize: 18,
  },
  star: {
    color: '#ffcd3c',
    fontSize: 32,
    elevation: 4,
    shadowRadius: 8,
    shadowColor: '#000',
  },
  starEmpty: {
    color: '#fae199',
  },
  chatBotContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 16,
  },
  chatBot: {
    backgroundColor: '#ffcd3c',
    borderRadius: 128,
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TaskScreen;
