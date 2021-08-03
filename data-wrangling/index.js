const fs = require('fs').promises;
const xlsxFile = require('read-excel-file/node');

const getExcelData = async (file, year) => {
  const rows = await xlsxFile(file);
  let filteredRows = [];

  filteredRows = rows.filter(r => {
    const station = r[0]
    if (!r[0] || r[0].length < 2 || typeof r[0] !== 'string') {
      return false;
    }

    stationArray = station.split(' ');
    const isNum = Number(stationArray[0]);

    if (isNaN(isNum)) {
      return false;
    }
    return true;
  });

  console.table(filteredRows[99]);

  switch (year) {
    case 2018:
      filteredRows = filteredRows.map(r => [r[0], r[12], r[15], r[19], r[28]]);
      break;
    case 2016:
      filteredRows = filteredRows.map(r => [r[0], r[13], r[16], r[20], r[29]]);
      break;
    default:
      break;
  }
  return filteredRows;
};

const convertLatitude = (lat) => {
  const latArr = lat.split("");
  const direction = latArr.pop();
  const deg = Number(latArr.slice(0, 2).join(''));
  const min = Number(latArr.slice(2).join('')) / 60;
  const result = direction === "N" ? deg + min : -1 * (deg + min);
  return result;
};

const convertLongitude = (long) => {
  const longArr = long.split("");
  const direction = longArr.pop();
  const deg = Number(longArr.slice(0, 3).join(''));
  const min = Number(longArr.slice(3).join('')) / 60;
  const result = direction === "E" ? deg + min : -1 * (deg + min);
  return result;
};

const convertToKelvin = (temp) => {
  return temp + 50;
};

const printJsonToFile = async () => {
  console.log(process.argv);
  const file = process.argv[2];
  const year = Number(process.argv[3]);
  const dataArray = await getExcelData(`./excel-files/${file}`, year);

  dataArray.map(d => {
    d[1] = convertLatitude(d[1]);
    d[2] = convertLongitude(d[2]);
    d[4] = convertToKelvin(d[4]);
    return d;
  });

  const asJson = JSON.stringify(dataArray);

  // const files = await fs.readdir('./json-files');

  await fs.writeFile(`./json-files/json-data${year}.json`, asJson);
};

printJsonToFile(2016);


// [["01001  JAN MAYEN","7056N","00840W",10,-1.6]
