import { StyleSheet } from "react-native";
import color from "./color";

export default styles = StyleSheet.create({
  body: {
    paddingRight: 10,
    paddingLeft: 10
  },
  timeTitle: {
    flexDirection: "row",
    justifyContent: "space-between",

  },
  title: {
    color: color.Primary,
    fontSize: 30,
    fontWeight: "700"
  },
  timeInHour: {
    flexDirection: "row",
    justifyContent: "center",

  },
  timeBlock: {
    height: 90,
    width: 90,
    backgroundColor: color.Primary,
    borderRadius: 20,
    margin: 8,
    justifyContent: "center",
    alignItems: "center"

  },
  textBlock: {
    fontSize: 40,
    color: "white",
    fontWeight: "700"
  },
  finishBtn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color.Primary,
    marginTop: 20,
    height: 40,
    borderRadius: 8,
  },
  textBtn: {
    justifyContent: "center",
    color: 'white'

  }
})