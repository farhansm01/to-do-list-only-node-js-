//dependencies

const handler = {};

handler.pingHandler = (requestProperties, callback) => {
    callback(200, {
        message: 'The server is alive.'
    });
}

module.exports = handler;