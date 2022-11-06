import axios from "axios";
import axiosIntance from "../../apis/axios";
import { server } from "../../apis/server";
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

const updateStatusTask = async( id, status ) => {
    const config = {"id": id}
    const res = await axios.create({ baseURL: server, headers: config }).put('/todo', { complete: status }, {}).catch(err => {
        console.log(err);
    });
    return res;
}

const getLocalDate = () => {
    let dt = new Date();
    let minutes = dt.getTimezoneOffset();
    dt = new Date(dt.getTime() + minutes*60000);
    return dt;
}

export { parseToIcon, parseToLevelColor, updateStatusItem, updateStatusTask };