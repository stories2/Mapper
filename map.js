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
                lat: xy[0],
                lot: xy[1]
            }
        })
    }
})
result.forEach(i => {
    i.center.lat = i.coordinates.map(t => t.lat).reduce((acc, current) => acc + current) / i.coordinates.length
    i.center.lot = i.coordinates.map(t => t.lot).reduce((acc, current) => acc + current) / i.coordinates.length
})
console.log('0 point', result[0])

const fs = require('fs');
fs.writeFileSync('map.json', JSON.stringify(result));

const sql = `insert into `