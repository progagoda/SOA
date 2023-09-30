import axios from "axios";
import {TSpaceMarine} from "./types";
import { create } from 'xmlbuilder2';
// import { json2xml } from 'xml-js';

const URL = process.env.REACT_APP_URL
export async function createSpaceMarine(query: any):Promise<any> {
    const spaceMarine = (query.queryKey[1].spaceMarine)
    // const xml = json2xml(spaceMarine, { compact: true, spaces: 4 });
    console.log(spaceMarine)
    const xmlObject = create()
        .ele('SpaceMarine')
        .ele('name').txt(spaceMarine.name).up()
        .ele('coordinates')
        .ele('x').txt(spaceMarine.coordinatesX).up()
        .ele('y').txt(spaceMarine.coordinatesY).up()
        .ele('coordinates')
        .ele('health').txt(spaceMarine.health).up()
        .ele('height').txt(spaceMarine?.height).up()
        .ele('meleeWeapon').txt(spaceMarine?.meleeWeapon).up()
        .ele('Chapter')
        .ele('name').txt(spaceMarine?.chapterName).up()
        .ele('parentLegion').txt(spaceMarine?.chapterParentLegion).up()
        .ele('world').txt(spaceMarine?.chapterWorld).up()
        .end({ prettyPrint: true });
    const {data} = await  axios.post(`${URL}/space-marines`, xmlObject, {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
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