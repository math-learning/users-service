module.exports = function config() {
  if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'development';
  }

  // eslint-disable-next-line
  return require(`../configs/${process.env.NODE_ENV}`);
};
