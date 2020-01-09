'use strict';

module.exports = function( files, maxChars, maxBuffer ) {
  var fs = require( 'fs' );
  var filesChunk = [];
  var chunk = '';
  var fileSizes = 0;
  var stats;

  for ( var f = 0, len = files.length; f < len; f++ ) {
    stats = fs.statSync( files[ f ] );

    if ( chunk.length + ( files[ f ].length + 1 ) > maxChars ||
         fileSizes + stats.size + 1 > maxBuffer ) {
      filesChunk.push( chunk );
      chunk = '';
      fileSizes = 0;
    }

    fileSizes += stats.size;
    chunk += '"' + files[ f ] + '" ';
  }
  filesChunk.push( chunk );
  return filesChunk;
};
