import {data} from './data.js';
import {classfication} from './classfication.js';
import fs from 'fs';
let newData = []
// for(let k of Object.keys(classfication)){
//     const set = new Set(classfication[k])
//     for(let obj of data){
//         if(set.has(obj.exerciseKey)){
//             if(obj.tag){
//                 obj.tag += `,${k}`
//             }else{
//                 obj.tag = k
//             }
//         }
//     }
// } 
// fs.writeFileSync('./data.json', JSON.stringify(data, null, 4), 'utf8')
// console.log(data);
console.log(Object.entries(classfication))