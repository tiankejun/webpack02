module.exports = function (content, map, meta) {
    const callback = this.async()
    setTimeout(() => {
        callback(null, content.replace('hello', '你好'))
    }, 2000)
}