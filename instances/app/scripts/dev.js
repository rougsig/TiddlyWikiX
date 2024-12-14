#!/usr/bin/env node

const browserSync = require('browser-sync');
const nodemon = require('nodemon');

nodemon({
  script: 'node_modules/tiddlywiki/tiddlywiki.js',
  args: ['mywiki', '--listen', 'host=localhost', 'port=4801'],
  ext: 'js,info,tid',
  delay: 4,
  ignore: ['mywiki/tiddlers']
});

const bs = browserSync.create();
nodemon
  .on('start', () => {
    console.log('Nodemon started');
    browserSync.init({
      proxy: 'http://localhost:4801',
      port: 4800,
      open: false,
    });
  })
  .on('restart', () => {
    console.log('Nodemon restarting due to changes...');
    bs.reload();
  })
  .on('crash', () => {
    console.error('Nodemon crashed for some reason');
  })
  .on('quit', () => {
    console.log('Nodemon has quit');
    bs.exit();
    process.exit();
  });
