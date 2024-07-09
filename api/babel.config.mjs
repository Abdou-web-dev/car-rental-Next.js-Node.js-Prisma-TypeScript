// babel.config.mjs
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const env = require("@babel/preset-env").default;

export default function (api) {
  api.cache(true);

  const presets = [
    [
      env,
      {
        targets: {
          node: "current",
        },
      },
    ],
  ];

  const plugins = [];

  return {
    presets,
    plugins,
  };
}
