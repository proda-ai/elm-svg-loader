const loaderUtils = require("loader-utils");

const mkRegexp = fnName => {
  const parts = [fnName, "\\(", "([^)]+)", "\\)"];
  return new RegExp(parts.join("\\s*"), 'g');
};

const transform = objString => {
  return objString.replace(/'[^']+\.svg'/g, 'require($&)');
};

const loader = function(source, inputSourceMap) {
  if (this.cacheable) this.cacheable();

  const config = loaderUtils.getOptions(this) || {};
  if (!config.package) {
    throw new Error('Must supply the "package" option to elm-svg-loader in webpack conf');
  }

  const packageName = config.package;
  config.module = config.module || "InlineSvg";
  config.tagger = config.tagger || "inline";

  const taggerName =
    [
      packageName.replace(/\-/g, "_").replace(/\//g, "$"),
      config.module.replace(/\./g, "_"),
      config.tagger
    ].join("$");

  const escapedTaggerName = taggerName.replace(/\$/g, "\\$");

  const regexp = mkRegexp(escapedTaggerName);

  source = source.replace(
    regexp,
    (match, p1) => taggerName + "(" + transform(p1) + ")"
  );
  return source;
};

module.exports = loader;
