/* eslint no-console: 0 */
const colors = require('colors');

module.exports = (app) => {
  app.listen(app.get('port'), () => {
    console.log(`
              [#]
           [#][#]
        [#][#][#][#]
      ╭━━━━━━━━━━━━╮┏━╮╭━┓
      ┃┈┈┈┈┈┈┈┈┈┈┈┈┃╰╮╰╯╭╯
      ┃╰╯┈┈┈┈┈┈┈┈┈┈╰╮╰╮╭╯┈
      ┣━━━╯┈┈┈┈┈┈┈┈┈╰━╯┃┈┈
      ╰━━━━━━━━━━━━━━━━╯┈MaKu
  `.cyan);
    console.log(`Iniciando servidor en el puerto ${app.get('port')}`.green);
    console.info(`API ejecutandose en: http://localhost:${app.get('port')}`.green);
  });
};
