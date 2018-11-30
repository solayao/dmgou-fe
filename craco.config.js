const { paths, whenDev, whenProd } = require("@craco/craco");
const path = require("path");

module.exports = {
    babel: {
        plugins: [
            ["@babel/plugin-proposal-decorators", { legacy: true }]
        ]
    },
    style: {
        postcss: {
            env: {
                stage: 3,
                features: {
                    "nesting-rules": true
                }
            },
            plugins: [
                require('postcss-px-to-viewport')({
                    viewportWidth: 1304, // (Number) The width of the viewport. 
                    viewportHeight: 702, // (Number) The height of the viewport. 
                    unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to. 
                    viewportUnit: 'vw', // (String) Expected units. 
                    selectorBlackList: ['.ignore', /\.ant\-*/, /\.Mui*/], // (Array) The selectors to ignore and leave as px. 
                    minPixelValue: 1, // (Number) Set the minimum pixel value to replace. 
                    mediaQuery: false // (Boolean) Allow px to be converted in media queries. 
                }),
            ]
        }
    },
    webpack: {
        alias: {
            '@': path.resolve(__dirname, paths.appSrc),
            '@antd': path.resolve(__dirname, `${paths.appSrc}/components/AntdComponents`),
            '@dizzy': path.resolve(__dirname, `${paths.appSrc}/components/DizzyComponents`),
            '@gql': path.resolve(__dirname, `${paths.appSrc}/components/GraphqlComponents`),
            '@mui': path.resolve(__dirname, `${paths.appSrc}/components/MaterialComponents`),
            '@phone': path.resolve(__dirname, `${paths.appSrc}/components/PhoneComponents`),
            '@proje': path.resolve(__dirname, `${paths.appSrc}/components/ProjectComponents`)
        }
    },
    plugins: [
        {
            plugin: require("craco-antd"),
            options: {
                customizeTheme: {},
                lessLoaderOptions: {
                    noIeCompat: true
                }
            }
        },
        {
            plugin: require('imagemin-webpack-plugin').default,
            options: {
                test: /\.(jpe?g|png|gif|svg)$/i,
                disable: !!whenProd(() => true),
                pngquant: {
                    quality: '90-95'
                }
            }
        }
    ]
};