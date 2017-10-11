var path = require('path');
var rootDirectory = path.resolve(__dirname, '../../');

module.exports = {
    getAbsolutePath: path.join.bind(path, rootDirectory),
    isWebpackDevServer: function() {
        return process.argv[1] && !! (/webpack-dev-server/.exec(process.argv[1]));
    },
    getEnvironment() {
        return process.env.NODE_ENV || "development";
    },
    replaceAll: function (str, find, replace) {
        return str.replace(new RegExp(find, 'g'), replace);
    }
};
