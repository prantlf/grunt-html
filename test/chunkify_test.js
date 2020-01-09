'use strict';

var chunkify = require( '../lib/chunkify' );

exports.chunkify = {
  'default': function( test ) {
    var file1 = 'test/invalid-encoding.html';
    var file2 = 'test/invalid.html';
    var file3 = 'test/valid.html';
    var files = [ file1, file2, file3 ];
    var chunked = [ '"' + file1 + '" "' + file2 + '" ', '"' + file3 + '" ' ];
    var all = [ '"' + file1 + '" "' + file2 + '" "' + file3 + '" ' ];
    test.deepEqual( chunkify( files, 60, 2000 ), chunked, 'Should split the file list with two long names' );
    test.deepEqual( chunkify( files, 80, 800 ), chunked, 'Should split the file list with two big files' );
    test.deepEqual( chunkify( files, 80, 2000 ), all, 'Should return one list of short names and small files' );
    test.done();
  }
};
