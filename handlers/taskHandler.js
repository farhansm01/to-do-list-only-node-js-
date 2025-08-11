//dependencies
const { createId, parseJSON } = require('../helpers/utilities');
const data = require('../lib/data');

const handler = {};

handler._tasks = {};

handler._tasks.post = (requestProperties, callback) => {
    const title = typeof requestProperties.body.title === 'string' && requestProperties.body.title.trim().length > 0 ? requestProperties.body.title.trim() : false;

    const description = typeof requestProperties.body.description === 'string' && requestProperties.body.description.trim().length > 0 ? requestProperties.body.description.trim() : false;

    if (title) {
        const taskId = createId(10);

        const taskObject = {
            id: taskId,
            title: title,
            description: description || '',
            status: 'pending',
            createdAt: Date.now()
        };

        data.create('tasks', taskId, taskObject, (err) => {
            if (!err) {
                callback(201, {
                    message: 'Task created successfully!'
                })
            } else {
                callback(500, {
                    error: 'Could not create task!'
                })
            }
        })
    } else {
        callback(400, {
            error: 'You have a problem in your request'
        })
    }
}
handler._tasks.get = (requestProperties, callback) => {
    const taskId = typeof requestProperties.queryStringObject.taskId == 'string' && requestProperties.queryStringObject.taskId.trim().length > 0 ? requestProperties.queryStringObject.taskId.trim() : false;

    if (taskId) {
        data.read('tasks', taskId, (err, taskData) => {
            if (!err && taskData) {
                callback(200, taskData);
            } else {
                callback(404, {
                    error: 'Task not found!'
                })
            }
        })
    } else {
        callback(400, {
            error: 'Requested task was not found!'
        })
    }
}
handler._tasks.put = (requestProperties, callback) => {
    const taskId = typeof requestProperties.queryStringObject.taskId == 'string' && requestProperties.queryStringObject.taskId.trim().length > 0 ? requestProperties.queryStringObject.taskId.trim() : false;

    const title = typeof requestProperties.body.title === 'string' && requestProperties.body.title.trim().length > 0 ? requestProperties.body.title.trim() : false;

    const description = typeof requestProperties.body.description === 'string' && requestProperties.body.description.trim().length > 0 ? requestProperties.body.description.trim() : false;

    const status = typeof requestProperties.body.status === 'string' && ['pending', 'completed', 'in-progress'].indexOf(requestProperties.body.status.trim().toLowerCase()) > -1 ? requestProperties.body.status.trim().toLowerCase() : false;

    if (taskId) {
        if (title || description || status) {
            data.read('tasks', taskId, (err, tData) => {
                const taskData = { ...tData };
                if (!err && taskData) {
                    if (title) {
                        taskData.title = title;
                    }
                    if (description) {
                        taskData.description = description;
                    }
                    if (status) {
                        taskData.status = status;
                    }

                    data.update('tasks', taskId, taskData, (err2) => {
                        if (!err2) {
                            callback(200, {
                                message: "Task was updated Successfully!",
                            });
                        } else {
                            callback(500, {
                                error: "There was a problem in server side!",
                            });
                        }
                    })
                } else {
                    callback(404, { error: "Task not found!" });
                }
            })
        } else {
            callback(400, { error: "Nothing to update!" });
        }
    } else {
        callback(400, {
            error: "Invalid taskId. Please try again!",
        });
    }

}
handler._tasks.delete = (requestProperties, callback) => {
    const taskId = typeof requestProperties.queryStringObject.taskId == 'string' && requestProperties.queryStringObject.taskId.trim().length > 0 ? requestProperties.queryStringObject.taskId.trim() : false;

    if (taskId) {
        data.read('tasks', taskId, (err, taskData) => {
            if (!err && taskData) {
                data.delete('tasks', taskId, (err2) => {
                    if (!err2) {
                        callback(200, {
                            message: "Task was deleted successfully!",
                        });
                    } else {
                        callback(500, {
                            error: "There was a server side error!",
                        });
                    }
                })
            } else {
                callback(404, {
                    error: "Task not found!",
                });
            }
        })
    } else {
        callback(400, {
            error: "Missing taskId!",
        });
    }
}

handler.taskHandler = (requestProperties, callback) => {
    const acceptedMethods = ['get', 'post', 'put', 'delete'];

    if (acceptedMethods.indexOf(requestProperties.method) > -1) {
        handler._tasks[requestProperties.method](requestProperties, callback);
    } else {
        callback(405);
    }
}

module.exports = handler;