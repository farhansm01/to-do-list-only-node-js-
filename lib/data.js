//dependencies
const fs = require('fs');
const path = require('path');

const lib = {};

lib.basedir = path.join(__dirname, '/../.data/');

lib.create = (dir, file, data, callback) => {
    fs.open(lib.basedir+dir+'/'+file+'.json', 'wx', (err, fileDescriptor) => {
        if(!err && fileDescriptor){
            const stringData = JSON.stringify(data);

            fs.writeFile(fileDescriptor, stringData, (err2) => {
                if(!err2){
                    fs.close(fileDescriptor, (err3) => {
                        if(!err3){
                            callback(false);
                        }else{
                            callback('error closing the new file');
                        }
                    });
                }else{
                    callback('error writing to new file!');
                }
            })
        }else{
            callback('Coud not create new file, it may already exists!');
        }
    })
}

lib.read = (dir, file, callback) => {
    fs.readFile(lib.basedir+dir+'/'+file+'.json', 'utf8', (err, data) => {
        if(!err && data) {
            const parsedData = JSON.parse(data);
            callback(false, parsedData);
        } else {
            callback('Could not read file');
        }
    });
}

lib.update = (dir, file, data, callback) => {
    fs.open(lib.basedir+dir+'/'+file+'.json', 'r+', (err, fileDescriptor) => {
        if(!err && fileDescriptor){
            const stringData = JSON.stringify(data);
            fs.ftruncate(fileDescriptor, (err2) => {
                if(!err2){
                    fs.writeFile(fileDescriptor, stringData, (err3) => {
                        if(!err3){
                            fs.close(fileDescriptor, (err4) => {
                                if(!err4){
                                    callback(false);
                                }else{
                                    callback('error closing file');
                                }
                            })
                        }else{
                            callback('error writing file');
                        }
                    })

                }else{
                    callback('error truncationg file');
                }
            })
        }else{
            callback('error opening file. file may not exist')
        }
    })
}

lib.delete = (dir, file, callback) => {
    fs.unlink(lib.basedir+dir+'/'+file+'.json', (err) => {
        if(!err){
            callback(false);
        }else{
            callback('error deleting file');
        }
    });
}
module.exports = lib;