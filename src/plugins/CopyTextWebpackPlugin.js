const pluginName = 'CopyTextWebpackPlugin'
class CopyTextWebpackPlugin {
    constructor(options) {
        // console.log(options);
        this.options = options
        // console.log(this.options);
    }
    apply(compiler) {
        // plugin 的所有钩子， 不同的钩子函数，获取的数据不同
        // console.log(Object.keys(compiler.hooks)); 
        // 同步钩子
        // compiler.hooks.compile.tap('MyPlugin', params => {
        //     console.log('以同步方式触及 compile 钩子。')
        // })
        // 异步钩子 方式1
        // compiler.hooks.run.tapPromise('MyPlugin', compiler => {
        //     return new Promise(resolve => setTimeout(resolve, 1000)).then(() => {
        //       console.log('以具有延迟的异步方式触及 run 钩子')
        //     })
        // })
        // 异步钩子 方式2
        compiler.hooks.emit.tapAsync(pluginName, (compilation, callback) => {
            // console.log('以异步方式触及 run 钩子。')
            // console.log(Object.keys(compilation.assets));
            // console.log(compilation);
            // 应该异步读取目录下的txt文件以流的方式写入，测试方便，则直接添加一个txt的资源
            compilation.assets['test.txt'] = {
                source: () => {
                    return 'hello txt'
                },
                size: () => {
                    return 1024 // 可以手动修改文件大小，一般取真是文件的大小
                }
            }
            callback()
        })
    }
}
module.exports = CopyTextWebpackPlugin