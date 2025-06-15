const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

// Biar Metro mau baca file .cjs (CommonJS)
config.resolver.sourceExts.push('cjs');

// Matikan strict mode untuk package exports
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
