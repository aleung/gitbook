const { Record, OrderedMap } = require('immutable');

const File = require('./file');
const GlossaryEntry = require('./glossaryEntry');

const DEFAULTS = {
    file:    new File(),
    entries: OrderedMap()
};

class Glossary extends Record(DEFAULTS) {
    getFile() {
        return this.get('file');
    }

    getEntries() {
        return this.get('entries');
    }

    /**
     * Set file linked to the glossary.
     * @param  {File} file
     * @return {Readme}
     */
    setFile(file) {
        return this.merge({ file });
    }

    /**
     * Return an entry by its name.
     * @param {String} name
     * @return {GlossaryEntry}
     */
    getEntry(name) {
        const { entries } = this;
        const id = GlossaryEntry.nameToID(name);

        return entries.get(id);
    }

    /**
     * Add/Replace an entry to a glossary.
     * @param {GlossaryEntry} entry
     * @return {Glossary}
     */
    addEntry(entry) {
        const id = entry.getID();
        let { entries } = this;

        entries = entries.set(id, entry);
        return this.set('entries', entries);
    }

    /**
     * Add/Replace an entry to a glossary by name/description.
     * @param {GlossaryEntry} entry
     * @return {Glossary}
     */
    addEntryByName(name, description) {
        const entry = new GlossaryEntry({
            name,
            description
        });

        return this.addEntry(entry);
    }

    /**
     * Create a glossary from a list of entries.
     *
     * @param {Array|List} entries
     * @return {Glossary}
     */
    static createFromEntries(entries) {
        entries = entries.map((entry) => {
            if (!(entry instanceof GlossaryEntry)) {
                entry = new GlossaryEntry(entry);
            }

            return [entry.id, entry];
        });

        return new Glossary({
            entries: OrderedMap(entries)
        });
    }
}

module.exports = Glossary;


// var Immutable = require('immutable');

// var error = require('../utils/error');
// var File = require('./file');
// var GlossaryEntry = require('./glossaryEntry');
// var parsers = require('../parsers');

// var Glossary = Immutable.Record({
//     file:       File(),
//     entries:    Immutable.OrderedMap()
// });

// Glossary.prototype.getFile = function() {
//     return this.get('file');
// };

// Glossary.prototype.getEntries = function() {
//     return this.get('entries');
// };

// /**
//     Return an entry by its name

//     @param {String} name
//     @return {GlossaryEntry}
// */
// Glossary.prototype.getEntry = function(name) {
//     var entries = this.getEntries();
//     var id = GlossaryEntry.nameToID(name);

//     return entries.get(id);
// };

// /**
//     Render glossary as text

//     @return {Promise<String>}
// */
// Glossary.prototype.toText = function(parser) {
//     var file = this.getFile();
//     var entries = this.getEntries();

//     parser = parser? parsers.getByExt(parser) : file.getParser();

//     if (!parser) {
//         throw error.FileNotParsableError({
//             filename: file.getPath()
//         });
//     }

//     return parser.renderGlossary(entries.toJS());
// };


// /**
//     Add/Replace an entry to a glossary

//     @param {Glossary} glossary
//     @param {GlossaryEntry} entry
//     @return {Glossary}
// */
// Glossary.addEntry = function addEntry(glossary, entry) {
//     var id = entry.getID();
//     var entries = glossary.getEntries();

//     entries = entries.set(id, entry);
//     return glossary.set('entries', entries);
// };

// /**
//     Add/Replace an entry to a glossary by name/description

//     @param {Glossary} glossary
//     @param {GlossaryEntry} entry
//     @return {Glossary}
// */
// Glossary.addEntryByName = function addEntryByName(glossary, name, description) {
//     var entry = new GlossaryEntry({
//         name: name,
//         description: description
//     });

//     return Glossary.addEntry(glossary, entry);
// };

// /**
//     Create a glossary from a list of entries

//     @param {String} filename
//     @param {Array|List} entries
//     @return {Glossary}
// */
// Glossary.createFromEntries = function createFromEntries(file, entries) {
//     entries = entries.map(function(entry) {
//         if (!(entry instanceof GlossaryEntry)) {
//             entry = new GlossaryEntry(entry);
//         }

//         return [entry.getID(), entry];
//     });

//     return new Glossary({
//         file: file,
//         entries: Immutable.OrderedMap(entries)
//     });
// };


// module.exports = Glossary;
