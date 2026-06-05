module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['react-native-worklets-core/plugin'], // MUST be listed before any camera plugins
  ],
};