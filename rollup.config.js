// import vue from 'rollup-plugin-vue'
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const path = require('path')
// import commonjs from '@rollup/plugin-commonjs'
const { terser } = require('rollup-plugin-terser')
const typescript = require('@rollup/plugin-typescript')
const pkg = require('./package.json')
const postCss = require('rollup-plugin-postcss')
const vue = require('rollup-plugin-vue')

const overrides = {
    compilerOptions: { declaration: true }, // 是否创建 typescript 声明文件
    exclude: [
        // 排除项
        'node_modules',
        'examples',
    ],
}

export default [
    {
        input: path.resolve(__dirname, './src/index.ts'),
        output: [
            {
                format: 'es',
                file: pkg.module,
            },
        ],
        plugins: [
            terser(),
            nodeResolve(),
            // commonjs(),
            vue({
                target: 'browser',
                css: true,
                exposeFilename: false,
            }),
            postCss(),
            typescript(overrides),
        ],
        external: ['vue'],
        // external(id) {
        //     return /^vue/.test(id) || deps.some(k => new RegExp('^' + k).test(id))
        // },
    },
]
