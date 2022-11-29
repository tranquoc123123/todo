import react from "react";
import { Dimensions, Text, Touchable, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Svg, Path } from "react-native-svg";
import color from "../StyleSheet/color";

const { width, height } = Dimensions.get('window');
// console.log('with:', width)
// console.log('height:', height)


const Circle = (props) => {

  return (
    <View style={{
      // backgroundColor: 'green',
      height: 100,
      width: 100,
      // borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 20

    }}>
      <View>
        <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#000', marginBottom: 10 }}>{props.month}</Text>
      </View>


      <Svg viewBox="-3 0 42 42" >

        <Path
          d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="#eeeeee"
          strokeWidth="4"
          strokeDasharray="100, 100"
        />
        <Path
          d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke={color.Primary}
          strokeWidth="4"
          strokeDasharray={props.rate}
        />
        <Text style={{
          position: 'absolute',
          marginTop: 32,
          marginLeft: 39,
        }}>
          {props.rateIn}
        </Text>




      </Svg>



    </View>

  );
}

export default Circle;

