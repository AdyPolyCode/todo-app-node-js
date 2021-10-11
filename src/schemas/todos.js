const {
    getTodos,
    getTodo,
    createTodo,
    updateTodo,
    swapTodos,
    deleteTodo,
} = require("../controllers/todos");
const { hasData } = require("../middlewares/hooks");

// validation object
const propertyValidationObj = {
    taskCaption: { type: "string" },
    taskContent: {
        type: "object",
        properties: {
            withWho: { type: "string" },
            forWhat: { type: "string" },
        },
    },
    executionDate: { type: "string" },
    address: { type: "string" },
};

// get todos validator schema
const getAll = {
    schema: {
        response: {
            200: {
                type: "object",
                properties: {
                    data: { type: "array" },
                    message: { type: "string" },
                    count: { type: "number" },
                },
            },
        },
    },
    handler: getTodos,
};

// get todo by id validator schema
const getOne = {
    schema: {
        response: {
            200: {
                type: "object",
                properties: {
                    data: {
                        type: "object",
                        properties: {
                            ...propertyValidationObj,
                            location: {
                                type: "object",
                                properties: {
                                    coordinates: { type: "array" },
                                    city: { type: "string" },
                                    country: { type: "string" },
                                },
                            },
                            taskPosition: { type: "number" },
                            isCompleted: { type: "boolean" },
                            createdAt: { type: "string" },
                            updatedAt: { type: "string" },
                        },
                    },
                    message: { type: "string" },
                },
            },
        },
    },
    handler: getTodo,
};

// post todo validator schema
const createOne = {
    schema: {
        body: {
            type: "object",
            properties: { ...propertyValidationObj },
            required: ["taskCaption", "taskContent", "executionDate"],
        },
        response: {
            201: {
                type: "object",
                properties: {
                    data: {
                        type: "object",
                        properties: {
                            _id: { type: "string" },
                            taskCaption: { type: "string" },
                        },
                    },
                    message: { type: "string" },
                },
            },
        },
    },
    handler: createTodo,
};

// put todo by id validator schema
const updateOne = {
    schema: {
        body: {
            type: "object",
            properties: {},
        },
        response: {
            200: {
                type: "object",
                properties: {
                    data: {
                        type: "object",
                        properties: propertyValidationObj,
                    },
                    message: { type: "string" },
                },
            },
        },
    },
    preValidation: hasData,
    handler: updateTodo,
};

// put todos by swap
const updateMany = {
    schema: {
        body: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    _id: { type: "string" },
                    taskPosition: { type: "number" },
                },
                required: ["_id", "taskPosition"],
            },
        },
        response: {
            200: {
                type: "object",
                properties: {
                    message: { type: "string" },
                },
            },
        },
    },
    handler: swapTodos,
};

// delete todo by id validator schema
const deleteOne = {
    schema: {
        response: {
            200: {
                type: "object",
                properties: {
                    data: {
                        type: "object",
                        properties: propertyValidationObj,
                    },
                    message: { type: "string" },
                },
            },
        },
    },
    handler: deleteTodo,
};

module.exports = {
    getAll,
    getOne,
    createOne,
    updateOne,
    updateMany,
    deleteOne,
};
