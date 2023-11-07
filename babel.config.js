module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo","@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
    plugins: [
      ["@babel/plugin-transform-class-properties", { "loose": false }],
      ["@babel/plugin-transform-private-methods", { "loose": false }],
    ],
  };
};
