import axios from "axios";
import axiosIntance from "../../apis/axios";
const parseToIcon = (text ) => {
    let icon = "briefcase"
    switch (text) {
        case 'WORKING':
            icon = 'briefcase';
            break;

        case 'READING':
            icon = 'book';
            break;

        case 'DESIGN':
            icon = 'pencil-ruler';
            break;
        case 'CODING':
            icon = 'code';
            break;

        default:
            icon = 'briefcase';
    }
    return icon;
}
const parseToLevelColor = ( text ) => {
    let color = ""
    switch (text) {
        case 'NORMAL':
            bgc = '#006EE9';
            break;
      
          case 'URGENCY':
            bgc = '#311F65';
            break;
      
          case 'IMPORTANT':
            bgc = '#D92C2C';
            break;
      
          default:
            bgc = '#006EE9';
    }
    return color;
}
const updateStatusItem = async( id, status ) => {
    const res = await axiosIntance.put('/item/' + id, { isComplete: status }, {}).catch(err => {
        console.log(err);
    });
    return res;
}

export { parseToIcon, parseToLevelColor, updateStatusItem };