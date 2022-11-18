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
    fontWeight: '600'
  },
  // btnActive: {
  //   backgroundColor: color.Primary
  // },
  textActive: {
    color: color.Primary,
    textDecorationLine: "underline",
    
  }
  
})