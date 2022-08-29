const { alias } = require("react-app-rewire-alias");

module.exports = function override(config) {
  alias({
    "@components": "src/components",
    "@store": "src/store",
    "@ability": "src/casl",
    "@assets": "src/assets",
    "@graphql": "src/graphql",
  })(config);

  return config;
};
