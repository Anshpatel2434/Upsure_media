/** @type {import('@commitlint/types').UserConfig} */
const config = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-enum": [
      1,
      "always",
      [
        "repo",
        "ui",
        "cms",
        "layout",
        "home",
        "services",
        "work",
        "about",
        "blog",
        "contact",
        "admin",
        "perf",
        "a11y",
        "seo",
        "docs",
        "ci",
        "deps",
      ],
    ],
    "subject-case": [2, "never", ["start-case", "pascal-case", "upper-case"]],
    "body-max-line-length": [0],
    "footer-max-line-length": [0],
  },
};

export default config;
