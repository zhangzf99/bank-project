module.exports = {
  assetsDir: "./static",
  pages,
  filenameHashing: false,
  publicPath: "./",
  productionSourceMap: false,
  lintOnSave: false,
  devServer: {
    // https: true,
    port: 8095,
    // disableHostCheck: true,
    proxy: {
      "/api/": {
        // target: "http://82.156.75.193:8080/human/xingyetwocard/",
        target: "http://hr.nmgzyrl.com/human/xingyetwocard/",
        secure: true,
        changeOrigin: true,
        pathRewrite: { "^/api/": "" }
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule("images")
      .use("url-loader")
      .loader("url-loader")
      .tap(options =>
        Object.assign(options, {
          limit: 10240
        })
      );

    chunks.forEach(chunk => {
      config.plugins.delete(`prefetch-${chunk}`);
    });

    config.resolve.alias.set("@", join("./src"));

    if (process.env.IS_ANALYZ) {
      config.plugin("webpack-plugin").use(BundleAnalyzerPlugin, [
        {
          analyzerMode: "static"
        }
      ]);
    }
  },
  configureWebpack: {
    externals: {
      vue: "Vue",
      echarts: "echarts"
    },
    plugins: [
      new LodashModuleReplacementPlugin(),
      new webpack.ProvidePlugin({
        $: "webpack-zepto",
        Zepto: "webpack-zepto",
        jQuery: "jquery"
      })
    ]
  }
};
