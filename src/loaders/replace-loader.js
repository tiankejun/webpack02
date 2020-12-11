module.exports = function (content) {
    // this.query ===> options  
    // webpack5  const options = loaderUtils.getOptions(this);
    return content.replace('你好', `你好 ${this.query.name}`)
}