import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  inputBorder: {
    borderBottomWidth: 2,
    borderBottomColor: 'gray',
    width: '82%',
    marginRight: 15,
    color: 'white',
    fontSize: 18,
    

  },
  addBtn: {
    width: 53,
    height: 53,
    backgroundColor: '#7097a4',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    borderWidth: 0,
    borderRadius: 15,
    backgroundColor: '#fff',
    width: '85%',
    flexDirection: 'row',
    justifyContent: "space-between",
    // alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 15,
    paddingLeft: 15,
    marginTop: 10,

  },
  itemTitle: {
    fontSize: 22,
    width: '90%',
    height: '100%',
    color: '#000',
    padding: 10
  },
})

export default styles;