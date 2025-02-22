import schedule from 'node-schedule';

function taskScheduler() {
    return async (ctx, next) => {
        ctx.schedule = schedule;
        await next();
    };
}

export default taskScheduler;