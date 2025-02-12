const context = {
    get url() {
        return this.request.url;
    },
    get method() {
        return this.request.method;
    }
};

export default context;