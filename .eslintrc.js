module.exports = {
  overrides: [
    {
      files: ['*.mdx'],
      extends: ['plugin:mdx/recommended'],
    },
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      extends: ['eslint-config-domdomegg'],
    },
  ],
};
