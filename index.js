const starbucks = require('./starbucks.json');

console.log('len', starbucks.list.length);

const storeList = starbucks.list.map(store => {
    return {
        s_code: store.s_code,
        s_name: `\"${store.s_name}\"`,
        tel: `\"${store.tel}\"`,
        fax: `\"${store.fax}\"`,
        addr: `\"${store.addr}\"`,
        doro_address: `\"${store.doro_address}\"`,
        lat: Number(store.lat),
        lot: Number(store.lot)
    }
});

const result = [
    {"type":"header","version":"5.0.1","comment":"Export to JSON plugin for PHPMyAdmin"},
    {"type":"database","name":"Map_Work"},
    {"type":"table","name":"Starbucks","database":"Map_Work","data": storeList
    }
]
console.log(Object.values(storeList[0]), Object.values(storeList[0]).toString())
csv = storeList.map(it => {
    return Object.values(it).toString()
}).join('\n')

const fs = require('fs');
fs.writeFileSync('starbucks-edited.csv', csv);