import { SvgProps } from "react-native-svg";

const Icons: Record<string, React.FC<SvgProps>> = {
  calendar: require("./calendar.svg").default,
  "check-round": require("./check-round.svg").default,
  check: require("./check.svg").default,
  clipboard: require("./clipboard.svg").default,
  dice: require("./dice.svg").default,
  explore: require("./explore.svg").default,
  group: require("./group.svg").default,
  hide: require("./hide.svg").default,
  home: require("./home.svg").default,
  ingredient: require("./ingredient.svg").default,
  kitchenware: require("./kitchenware.svg").default,
  live: require("./live.svg").default,
  lock: require("./lock.svg").default,
  mail: require("./mail.svg").default,
  "meal-done": require("./meal-done.svg").default,
  meal: require("./meal.svg").default,
  person: require("./person.svg").default,
  qr: require("./qr.svg").default,
  search: require("./search.svg").default,
  show: require("./show.svg").default,
  star: require("./star.svg").default,
  "star-outline": require("./star-outline.svg").default,
  timer: require("./timer.svg").default,
  logo: require("./logo.svg").default,
  pencil: require("./pencil.svg").default,
  x: require("./x.svg").default,
  "arrow-up": require("./arrow-up.svg").default,
  "arrow-down": require("./arrow-down.svg").default,
  "arrow-left": require("./arrow-left.svg").default,
  "arrow-right": require("./arrow-right.svg").default,
  // Add more mappings for other SVGs
};

export default Icons;
