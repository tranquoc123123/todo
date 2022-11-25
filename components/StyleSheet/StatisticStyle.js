import { StyleSheet, Dimensions } from "react-native";
import color from "./color";
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export default styles = StyleSheet.create({
  headerBackground: {
    width: width,
    height: height * 1.4,
    backgroundColor: color.Primary,
    // justifyContent: 'center',
    // position: 'absolute'
  },
  headerContainer: {
    height: 150,
    width: width,
    // backgroundColor: 'green',
    flexDirection: "row",
    alignItems: "center"

  },
  title: {
    justifyContent: 'center',
    color: '#fff',
    width: width,
    position: 'absolute',
    alignItems: "center",
    // backgroundColor: 'gray',
    zIndex: 1,
    marginLeft: 0
  },
  buttonBack: {
    marginLeft: 10,
    // marginTop: 10,
    height: 40,
    width: 50,
    borderRadius: 15,
    backgroundColor: "#ffffff",
    //   color: color.Primary,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2


  },
  body: {
    backgroundColor: '#fff',
    zIndex: 2,
    flex: 1,
    height: height * 1.5,
    width: width,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // borderWidth: 1,
    position: 'absolute',
    marginTop: height / 5

  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: width / 7,
    marginVertical: height / 70,

  },
  month: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: width / 4.4,
    marginLeft: width / 5.5,

  },
  monthText: {
    color: '#000',
    fontWeight: '500'
  },
  yearPicker: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    paddingHorizontal: 130,
    paddingVertical: 10

  },
  center: {
    justifyContent: "center",
    alignItems: "center"
  },
  totalContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: "row",
    paddingHorizontal: width/12,
    marginBottom: 30,
    width: width,
    height: height/7,
    // backgroundColor: 'green'
  },
  block: {
    height: 100,
    width: 150,
    // backgroundColor: 'gray',
    borderRadius: 20,
    borderWidth: 1
  },
  numberBlock: {
    fontSize: 50,
    color: "#000"
  },
  textBlock: {
    color: color.Primary,
    fontWeight: 'bold'
  }



});