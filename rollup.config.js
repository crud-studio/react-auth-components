import typescript from "rollup-plugin-typescript2";

import pkg from "./package.json";

export default {
  input: "src/index.tsx",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      exports: "named",
      sourcemap: true,
      strict: false,
    },
  ],
  plugins: [typescript({objectHashIgnoreUnknownHack: true})],
  external: [
    "@crud-studio/react-crud-core",
    "@crud-studio/react-crud-components",
    "@emotion/react",
    "@emotion/styled",
    "@material-ui/core",
    "@material-ui/icons",
    "@material-ui/lab",
    "lodash",
    "react",
    "react-dom",
    "react-hook-form",
    "react-intl",
    "react-router-dom",
    "react-use",
    "type-fest",
    "uuid",
  ],
};
