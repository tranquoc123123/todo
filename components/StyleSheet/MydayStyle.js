import { Dimensions, StyleSheet } from "react-native"
import color from "./color"

export default styles = StyleSheet.create({
  btnTab: {
    height: 40,
    width: Dimensions.get('window').width / 2.2,
    // backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textTab: {
    fontSize: 18,
    color: color.BlackText,
    fontWeight: '600',
    fontWeight:"bold"
  },
  // btnActive: {
  //   backgroundColor: color.Primary
  // },
  textActive: {
    color: color.Primary,
    textDecorationLine: "underline",
    fontWeight:"bold"
  }
  // },
  ,
  description: {
    color: "#4A4646",
    fontSize: 10
  },
  title: {
    color: color.Primary,
    fontSize: 14,
    fontWeight:"bold"
  },
  card: {
    width: "90%",
    marginVertical: 5,
    marginHorizontal: "5%",
    maxHeight: 164,
    minHeight: 50,
    borderWidth: 0.2,
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent:"center",
    borderColor: "#ABCEF5",
    borderRadius: 5

  },
  time: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    flexDirection: "row",
  },
  timetext: {
    color: color.Primary,
    fontSize: 10
  },
  headercard: {
    flexDirection: "row",
  },
  subcard: {
    position:"absolute",
    width: "100%",
    height: "100%",
    alignItems:"center",
    justifyContent:"center"
    // marginVertical: 20
  },
  line: {
    width: "100%",
    height: "40%",
    alignItems:"center",
    justifyContent:"center",
    borderLeftWidth: 3,
    borderLeftColor: color.Primary,
    // marginVertical: 20
  },

})