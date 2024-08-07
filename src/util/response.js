export const successResponse = (data = {},code=200) => {
    return {
        status: "succcess",
        data,
        code
    };
};

export const errorResponse = (message = 'Error', code = 500) => {
    return {
        status: 'error',
        message,
        code
    };
};
