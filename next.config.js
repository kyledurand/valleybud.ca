module.exports = {
  webpack(config, options) {
    config.module.rules.push({
      test: /\.graphql$/,
      exclude: /node_modules/,
      use: [options.defaultLoaders.babel, {loader: "graphql-let/loader"}],
    });

    config.module.rules.push({
      test: /\.ya?ml$/,
      type: "json",
      use: "yaml-loader",
    });

    return config;
  },
  images: {
    domains: [
      "cdn.sanity.io",
      "images.dutchie.com",
      "s3-us-west-2.amazonaws.com",
    ],
  },
};
