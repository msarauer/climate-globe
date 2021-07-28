const fs = require('fs').promises;
const xlsxFile = require('read-excel-file/node');

const getExcelData = async (file) => {
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

  filteredRows = filteredRows.map(r => [r[0], r[12], r[15], r[19], r[28]]);

  return filteredRows;
};

const printJsonToFile = async () => {
  const dataArray = await getExcelData('./excel-files/data-12-2018.xlsx');
  const asJson = JSON.stringify(dataArray);

  const files = await fs.readdir('./json-files');

  await fs.writeFile(`./json-files/json-data${files.length + 1}.json`, asJson);
};

printJsonToFile()
