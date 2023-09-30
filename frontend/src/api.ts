import axios from "axios";
import { useQueryClient } from 'react-query';

const URL = process.env.REACT_APP_URL
async function createSpaceMarine() {
    const {data} = await  axios.post(`${URL}/space-marines`);
    return data;
}
export async function getSpaceMarines(sorter?:any ) {
    const {data} = await  axios.get(`${URL}/space-marines`,{params:{
        sort: sorter.field,
        order: sorter.order
        }});
    return data;
}
    export async function deleteSpaceMarine(id:string) {
        const {data} = await  axios.delete(`${URL}/space-marines/${id}`);
        return data;
    }