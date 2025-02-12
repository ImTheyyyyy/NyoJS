function validate(schema) {
    return async (ctx, next) => {
        const { error } = schema.validate(ctx.request.body);
        if (error) {
            ctx.status = 400;
            ctx.body = { error: error.details[0].message };
        } else {
            await next();
        }
    };
}

export default validate;