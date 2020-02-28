'use strict'
const pdf = require('html-pdf');
const path = require('path');
const join = path.join;

const Ejs = require('./ejs');
const fileTpl = join(__dirname, './rt.ejs');

module.exports.pdf = async (event, context) => {
  console.log("holaaaa");
  

  try {
    const ejs = new Ejs();
    const htmlParse = await ejs.parse(fileTpl, {data: {'holi': 'boli'}});
    const options = {
      // format: 'A3',
      width: '1100px',
      height: '1500px',
      border: '25px',
      renderDelay: 2000,
    };

    const buffer = await new Promise((resolve, reject) => {
      pdf.create(htmlParse, options).toBuffer((err, buffer) => {
        if (err) {
          reject(reject);
          return;
        }
        resolve(buffer);
      });
    });

    const response = {
      headers: {
        'Content-type': 'application/pdf',
        'content-disposition': 'attachment; filename=test.pdf',
      },
      statusCode: 200,
      body: buffer.toString('base64'),
      isBase64Encoded: true,
    };

    context.succeed(response)
  } catch (error) {
    return context.fail(error)
  }
}
