import { StyleSheet } from 'react-native';
import { MENU_WIDTH } from '../../Constants';
import { Spacing, TextStyle } from '../../../../styles';

const styles = StyleSheet.create({
  menuWrapper: {
    position: 'absolute',
    left: 0,
    zIndex: 10,
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    width: MENU_WIDTH,
    borderRadius: Spacing.s * 1.5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    overflow: 'hidden',
    zIndex: 15,
  },
  menuInnerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  menuItem: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.s * 2,
    paddingVertical: Spacing.s * 1.25,
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  menuItemText: {
    ...TextStyle.menuText,
    textAlign: 'left',
    width: '100%',
    flex: 1,
  },
  menuItemTitleText: {
    ...TextStyle.menuTitleText,
    textAlign: 'center',
    width: '100%',
    flex: 1,
  },
  textDark: {
    color: 'black',
  },
  textLight: {
    color: 'white',
  },
});

export default styles;