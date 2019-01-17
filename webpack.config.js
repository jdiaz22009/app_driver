const path = require('path');
const useDefaultConfig = require('@ionic/app-scripts/config/webpack.config.js');

const env = process.env.IONIC_ENV;

useDefaultConfig[env].resolve.alias = {
    "@app": path.resolve('./src/app/'),
    "@pages": path.resolve('./src/pages/'),
    "@providers": path.resolve('./src/providers/'),
    "@models": path.resolve('./src/models/'),

};

module.exports = function () {
    return useDefaultConfig;
};