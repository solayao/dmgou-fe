const path = require('path');
const {
    override,
    disableEsLint,
    addLessLoader,
    addDecoratorsLegacy,
    fixBabelImports,
    addBundleVisualizer,
    addWebpackAlias,
} = require("customize-cra");

/**
 * 修改create-react-app 默认配置
 * @returns
 */
module.exports = override(
    process.env.NODE_ENV !== 'production' && addBundleVisualizer({}, true),
    addWebpackAlias({
        "@": path.join(__dirname, '.', 'src'),
        '@antd': path.join(__dirname, '.', 'src/components/AntdComponents'),
        '@dizzy': path.join(__dirname, '.', 'src/components/DizzyComponents'),
        '@gql': path.join(__dirname, '.', 'src/components/GraphqlComponents'),
        '@mui': path.join(__dirname, '.', 'src/components/MaterialComponents'),
        '@phone': path.join(__dirname, '.', 'src/components/PhoneComponents'),
        '@proje': path.join(__dirname, '.', 'src/components/ProjectComponents')
    }),
    addDecoratorsLegacy(),
    disableEsLint(),
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css'
    }),
    addLessLoader({javascriptEnabled: true, strictMath: true, noIeCompat: true}),
    config =>　{
        if (process.env.NODE_ENV === 'production') {
            let ImageminPlugin = require('imagemin-webpack-plugin').default;
            config.plugins.push(
                new ImageminPlugin({
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    pngquant: {
                        quality: '90-95'
                    }
                })
            );
        }
        return config;
    }
)