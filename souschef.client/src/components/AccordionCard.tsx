import React, {useRef, useState, type PropsWithChildren} from 'react';
import {Animated, LayoutAnimation, StyleSheet, Text} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {theme} from '../styles/theme';
import Card, {CardProps} from './Card';
import {OpacityPressable} from './pressable';
import Row from './primitives/Row';

interface IAccordionCardProps extends CardProps {
  title: string;
}

type AccordionCardProps = IAccordionCardProps;

const AccordionCard: React.FC<PropsWithChildren<AccordionCardProps>> = (
  props: IAccordionCardProps,
) => {
  const [showContent, setShowContent] = useState(false);
  const children: Array<React.ReactNode> = React.Children.toArray(
    props.children,
  );
  const animationController = useRef(new Animated.Value(0)).current;

  const toggleAccordian = () => {
    Animated.timing(animationController, {
      toValue: showContent ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setShowContent(!showContent);
    });
  };

  const arrowTransform = animationController.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-180deg'],
  });

  return (
    <Card {...props} justifyContent="flex-start">
      <OpacityPressable horizontalResizing="fill" onPress={toggleAccordian}>
        <Row horizontalResizing="fill" justifyContent="space-between">
          <Text style={styles.cardHeader}>{props.title}</Text>
          <Animated.View style={{transform: [{rotateZ: arrowTransform}]}}>
            <MaterialIcons
              name="keyboard-arrow-down"
              style={styles.dropdownIcon}
            />
          </Animated.View>
        </Row>
      </OpacityPressable>
      {showContent ? children[1] ?? null : children[0] ?? null}
    </Card>
  );
};

const styles = StyleSheet.create({
  cardHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.lightText,
  },
  dropdownIcon: {color: '#979CA5', fontSize: 36},
});

export default AccordionCard;
