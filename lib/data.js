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

// read data from file
lib.read = (dir, file, callback) => {
    fs.readFile(`${lib.basedir + dir}/${file}.json`, 'utf-8', (err, data) => {
        callback(err, data);
    });
};

// update existing data
lib.update = (dir, file, data, callback) => {
    fs.open(`${lib.basedir + dir}/${file}.json`, 'r+', (err, fileDescriptor) => {
        if (!err && fileDescriptor) {
            const stringData = JSON.stringify(data);
            fs.ftruncate(fileDescriptor, (err2) => {
                if (!err2) {
                    fs.writeFile(fileDescriptor, stringData, (err3) => {
                        if (!err3) {
                            fs.close(fileDescriptor, (err4) => {
                                if (!err4) {
                                    callback(false);
                                } else {
                                    callback('Closing error file');
                                }
                            });
                        } else {
                            callback('Error writing to file');
                        }
                    });
                } else {
                    callback('Error deleting file data');
                }
            });
        } else {
            console.log('File may nor exist');
        }
    });
};

// delete existing file
lib.delete = (dir, file, callback) => {
    fs.unlink(`${lib.basedir + dir}/${file}.json`, (err) => {
        if (!err) {
            callback(false);
        } else {
            callback('Something is fissy!');
        }
    });
};

module.exports = lib;
