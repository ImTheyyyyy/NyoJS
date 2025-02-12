function compose(middleware) {
    return function (context) {
        return dispatch(0);
        function dispatch(i) {
            const fn = middleware[i];
            if (!fn) return Promise.resolve();
            return Promise.resolve(fn(context, function next() {
                return dispatch(i + 1);
            }));
        }
    };
}

export default compose;