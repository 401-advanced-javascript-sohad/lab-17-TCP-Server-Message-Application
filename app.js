'use strict';
const net = require('net');
const client = new net.Socket();
client.connect(3001, 'localhost', () => {});

const fs = require('fs');

const alterFile = (file) => {
  fs.readFile( file, (err, data) => {
    if(err) { throw err; }

    client.write(`read file: ${file} content: ${data}`);

    let text = data.toString().toUpperCase();
    fs.writeFile( file, Buffer.from(text), (err, data) => {
      if(err) { throw err; }
      client.write(`${file} saved`)
      console.log(`${file} saved`);
    });
  });

};

let file = process.argv.slice(2).shift();
alterFile(file);
