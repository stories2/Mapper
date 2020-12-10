const map = require('./EMD_202005 KR0.0005.json');

console.log('len', map.features.length)
console.log('0 point', map.features[0])

const result = map.features.map(i => {
    return {
        EMD_CD: i.properties.EMD_CD,
        EMD_ENG_NM: i.properties.EMD_ENG_NM,
        EMD_KOR_NM: i.properties.EMD_KOR_NM,
        type: i.geometry.type,
        center: {
            lat: 0,
            lot: 0
        },
        coordinates: i.geometry.coordinates[0].map(xy => {
            return {
                lat: xy[1],
                lot: xy[0]
            }
        })
    }
})
result.forEach(i => {
    const maxLat = Math.max(...i.coordinates.map(t => t.lat));
    const minLat = Math.min(...i.coordinates.map(t => t.lat));
    const maxLot = Math.max(...i.coordinates.map(t => t.lot));
    const minLot = Math.min(...i.coordinates.map(t => t.lot));
    i.center.lat = (minLat + maxLat) / 2
    i.center.lot = (minLot + maxLot) / 2
})
console.log('0 point', result[0])

const fs = require('fs');
fs.writeFileSync('map.json', JSON.stringify(result));

let sql = `insert into Map_Polygon(EMD_CD, EMD_ENG_NM, EMD_KOR_NM, \`type\`, center_lat, center_lot, coordinates) VALUES \
(${result[0].EMD_CD}, \'${result[0].EMD_ENG_NM}\', \'${result[0].EMD_KOR_NM}\', \'${result[0].type}\', \'${result[0].center.lat}\', \'${result[0].center.lot}\', \
\'${JSON.stringify(result[0].coordinates)}\')`

const values = result.map(i => {
    return `insert into Map_Polygon(EMD_CD, EMD_ENG_NM, EMD_KOR_NM, \`type\`, center_lat, center_lot, coordinates) VALUES (${i.EMD_CD}, \'${i.EMD_ENG_NM}\', \'${i.EMD_KOR_NM}\', \'${i.type}\', ${i.center.lat}, ${i.center.lot}, \'${JSON.stringify(i.coordinates)}\')`
})

sql = values.join(';\n');

fs.writeFileSync('map.sql', sql);

console.log('len', values.length, values[values.length - 1]);