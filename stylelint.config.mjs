/** @type {import('stylelint').Config} */
export default {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-html",
    "stylelint-config-astro",
  ],
  rules: {
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["global", "deep", "light-dark"],
      },
    ],
    "custom-property-pattern": [
      "^(_?[a-z][a-z0-9]*)(-[a-z0-9]+)*$",
      {
        resolveNestedSelectors: true,
        message: function expected(customPropertyValue) {
          return `Expected custom property "${customPropertyValue}" to be kebab-case or private kebab-case (start with --).`;
        },
      },
    ],
    "selector-class-pattern": [
      "^[a-z]([-]?[a-z0-9]+)*(__[a-z0-9]([-]?[a-z0-9]+)*)?(--[a-z0-9]([-]?[a-z0-9]+)*)?$",
      {
        /** This option will resolve nested selectors with & interpolation. - https://stylelint.io/user-guide/rules/selector-class-pattern/#resolvenestedselectors-true--false-default-false */
        resolveNestedSelectors: true,
        /** Custom message */
        message: function expected(selectorValue) {
          return `Expected class selector "${selectorValue}" to match BEM CSS pattern https://en.bem.info/methodology/css. Selector validation tool: https://regexr.com/3apms`;
        },
      },
    ],
    "declaration-property-value-no-unknown": [
      true,
      {
        ignoreProperties: {
          "background-color": ["light-dark"],
        },
      },
    ],
  },
};
