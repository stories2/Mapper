const starbucks = require('./starbucks.json');

console.log('len', starbucks.list.length);

const storeList = starbucks.list.map(store => {
    const dong = store.addr.match(/([가-힣|\w|\d]*[읍|면|동|가][\d|\-]*)\ /g);
    return {
        s_code: store.s_code,
        s_name: `\"${store.s_name}\"`,
        tel: `\"${store.tel}\"`,
        fax: `\"${store.fax}\"`,
        sido_name: `\"${store.sido_name}\"`,
        sido_code: `\"${store.sido_code}\"`,
        gugun_name: `\"${store.gugun_name}\"`,
        gugun_code: `\"${store.gugun_code}\"`,
        dong_name: `\"${dong ? dong[0].replace(' ', '') : ''}\"`,
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