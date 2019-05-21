var path = require('path');

var Promise = require('../utils/promise');
const { FILE_EXTENSIONS } = require('../parsers');

/**
    Find a file parsable (Markdown or AsciiDoc) in a book

    @param {Book} book
    @param {String} filename
    @return {Promise<File | Undefined>}
*/
function findParsableFile(book, filename) {
    var fs = book.getContentFS();
    var ext = path.extname(filename);
    var basename = path.basename(filename, ext);
    var basedir = path.dirname(filename);

    return Promise.some(FILE_EXTENSIONS, function(ext) {
        var filepath = basename + ext;

        return fs.findFile(basedir, filepath)
        .then(function(found) {
            if (!found || book.isContentFileIgnored(found)) {
                return undefined;
            }

            return fs.statFile(found);
        });
    });
}

module.exports = findParsableFile;
