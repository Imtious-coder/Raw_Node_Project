// dependencies
const fs = require('fs');
const path = require('path');

const lib = {};

// base dir of the data folder
lib.basedir = path.join(__dirname, '../.data/');

// write data to file
lib.create = (dir, file, data, callback) => {
    fs.open(`${lib.basedir + dir}/${file}.json`, 'wx', (err, fileDescriptor) => {
        if (!err && fileDescriptor) {
            const stringData = JSON.stringify(data);

            // Write data
            fs.writeFile(fileDescriptor, stringData, (error) => {
                if (!error) {
                    fs.close(fileDescriptor, (errr) => {
                        if (!errr) {
                            callback(false);
                        } else {
                            callback('Closing error');
                        }
                    });
                } else {
                    callback('Error');
                }
            });
        } else {
            callback('Something is problem here!');
        }
    });
};

module.exports = lib;
