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
    {
      files: ['next.config.js'],
      extends: ['eslint-config-domdomegg'],
      parserOptions: {
        ecmaVersion: '2023',
      },
    },
  ],
};
