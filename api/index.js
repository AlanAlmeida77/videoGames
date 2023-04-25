//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const getGenres = require('./src/controllers/getGenres.js');
const { conn } = require('./src/db.js');
const cors = require('cors');

// Syncing all the models at once.
conn.sync({ alter: true }).then(() => {
  console.log('DB Connected')
  getGenres()
  server.use(cors()); // Agregamos CORS al servidor
  server.listen(3001, () => {
    console.log('Listening on Port: 3001'); // eslint-disable-line no-console
  });
});