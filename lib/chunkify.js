'use strict';

module.exports = function( files, maxChars, maxBuffer ) {
  var fs = require( 'fs' );
  var filesChunk = [];
  var chunk = '';
  var chunkLen = 0;
  var stats;

  for ( var f = 0, len = files.length; f < len; f++ ) {
    stats = undefined;

    if ( fs.existsSync( files[ f ] ) ) {
      stats = fs.statSync( files[ f ] );
    }

    if ( chunk.length + ( files[ f ].length + 1 ) > maxChars || ( stats && ( chunkLen + stats.size + 1 > maxBuffer ) ) ) {
      filesChunk.push( chunk );
      chunk = '';
      chunkLen = 0;
    }

    if ( stats ) {
      chunkLen += stats.size;
    }

    chunk += '"' + files[ f ] + '" ';
  }
  filesChunk.push( chunk );
  return filesChunk;
};
