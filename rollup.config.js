const resolve = require('@rollup/plugin-node-resolve')
// import babel from '@rollup/plugin-babel';
const vuePlugin = require('rollup-plugin-vue')
const commonjs = require('@rollup/plugin-commonjs')
const typescript = require('rollup-plugin-typescript2')

const pkg = require('./package.json')

// 以下内容会添加到打包结果中
const footer = `
if(typeof window !== 'undefined') {
  window._DemoRollup_VERSION_ = '${pkg.version}'
}`

module.exports = [
    {
        input: './src/index.ts', // 打包入口
        output: [
            // {
            //   // 打包出口
            //   file: "dist/index.js",
            //   format: "umd", // umd是兼容amd/cjs/iife的通用打包格式，适合浏览器
            //   name: "demo_rollup", // cdn方式引入时挂载在window上面用的就是这个名字
            //   sourcemap: true,
            // },
            {
                file: pkg.main,
                format: 'cjs',
                footer,
            },
            {
                file: pkg.module,
                format: 'esm',
                footer,
            },
            {
                file: pkg.browser,
                format: 'umd',
                name: 'demo_rollup',
                footer,
            },
        ],
        plugins: [
            // 打包插件
            vuePlugin(),
            typescript(), // 解析TypeScript
            commonjs(), // 将 CommonJS 转换成 ES2015 模块供 Rollup 处理
            resolve(), // 查找和打包node_modules中的第三方模块
            // babel({ babelHelpers: "bundled" }), // babel配置,编译es6
        ],
    },
    // {
    //   input: `src/index.ts`,
    //   plugins: [dts()],
    //   output: {
    //     file: `dist/index.d.ts`,
    //     format: 'es',
    //   },
    // }
]
