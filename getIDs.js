const axios = require('axios');
const fs = require('fs');
const zlib = require('zlib');

let dataAtual = new Date();
let dia = dataAtual.getDate();
if (dia < 10) {
  dia = '0' + dia
}
let mes = dataAtual.getMonth() + 1;
if (mes < 10) {
  mes = '0' + mes
}
let ano = dataAtual.getFullYear();

const fileUrl = `http://files.tmdb.org/p/exports/movie_ids_${mes}_${dia}_${ano}.json.gz`;

const downloadAndConvert = async (url) => {
  try {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream'
    });
    const readStream = response.data.pipe(zlib.createGunzip());
    const writeStream = fs.createWriteStream('output.json');

    await new Promise((resolve, reject) => {
      readStream.pipe(writeStream)
        .on('finish', resolve)
        .on('error', reject);
    });

    console.log('Download e conversão concluídos!');
  } catch (error) {
    console.error('Ocorreu um erro:', error.message);
  }
};

downloadAndConvert(fileUrl);
