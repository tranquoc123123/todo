import { StyleSheet } from "react-native";
import color from "./color";

export default styles = StyleSheet.create({
  body: {
    paddingRight: 10,
    paddingLeft: 10,
    flex: 1,
    justifyContent:"center",
    alignItems:"center"
  },
  timeTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    color: color.Primary,
    fontSize: 32,
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
    marginTop: 5,
    height: 40,
    borderRadius: 8,
    marginBottom: 60
  },
  textBtn: {
    justifyContent: "center",
    color: 'white'

  },
  progressComponent: {
    marginTop: 20,
    marginBottom: 20
  },
  progressBar: {
    backgroundColor: color.Primary,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',

  },
  todoItem: {
    height: 35,
    borderWidth: 0.8,
    borderColor: color.Primary,
    borderRadius: 5,
    marginBottom: 6,
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
  textItem: {
    fontSize: 15,
    color: color.Primary,

  },
  indexText:{
    fontSize: 14,
    color: "#4A4646",
    marginTop: 10
  },
  progressBar: {
    transform: [{ scaleX: 1.0 }, { scaleY: 2.5 }],
    height: 10,
    marginTop: 10,
    borderRadius: 5
  }
})