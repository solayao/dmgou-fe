const {
    override,
    addDecoratorsLegacy,
    fixBabelImports,
    disableEsLint,
    addBundleVisualizer,
    addWebpackAlias,
    addPostcssPlugins,
    addLessLoader 
  } = require("customize-cra");
  const path = require("path");
  const orAntdStyle = require("./src/overrides/orAntd");
  
  module.exports = override(
    addDecoratorsLegacy(),
    disableEsLint(),

    // process.env.BUNDLE_VISUALIZE == 1 && addBundleVisualizer(),

    addWebpackAlias({
        '@': path.resolve(__dirname, 'src/'),
        '@antd': path.resolve(__dirname, 'src/components/AntdComponents'),
        '@dizzy': path.resolve(__dirname, 'src/components/DizzyComponents'),
        '@gql': path.resolve(__dirname, 'src/components/GraphqlComponents'),
        '@mui': path.resolve(__dirname, 'src/components/MaterialComponents'),
        '@phone': path.resolve(__dirname, 'src/components/PhoneComponents'),
        '@proje': path.resolve(__dirname, 'src/components/ProjectComponents')
    }),

    fixBabelImports('antd', { libraryName: 'antd', libraryDirectory: 'es', style: true }),
    addLessLoader({
        modifyVars: orAntdStyle,
        javascriptEnabled: true,
    }),

    addPostcssPlugins([
        require('postcss-px-to-viewport')({
            viewportWidth: 1304, // (Number) The width of the viewport. 
            viewportHeight: 702, // (Number) The height of the viewport. 
            unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to. 
            viewportUnit: 'vw', // (String) Expected units. 
            selectorBlackList: ['.ignore', /\.ant\-*/, /\.Mui*/], // (Array) The selectors to ignore and leave as px. 
            minPixelValue: 1, // (Number) Set the minimum pixel value to replace. 
            mediaQuery: false // (Boolean) Allow px to be converted in media queries. 
        }),
    ]),
  );