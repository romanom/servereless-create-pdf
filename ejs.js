const ejs = require('ejs');
const read = require('fs').readFileSync;

class Ejs {
  constructor() {
    this.ejs = ejs;
  }

  parse(file, body) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await this.ejs.compile(read(file, 'utf8'), { filename: file })(body);
        resolve(res);
      } catch (e) {
        reject(e);
      }
    });
  }
}

module.exports = Ejs;