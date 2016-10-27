var proxyMiddleware = require('http-proxy-middleware');
var fallbackMiddleware = require('connect-history-api-fallback');

module.exports = {
    port: 3000,
    files: [
        "src/*.{html,htm,css,js}",
        "src/**/*.{html,htm,css,js}"
    ],
    ghostMode: false,
    server: {
        middleware: {
            1: fallbackMiddleware({
                index: '/index.html', verbose: false
            }),
            2: proxyMiddleware('/api', {
                target: 'http://localhost',
                changeOrigin: true
            })
        },
        baseDir: "src",
        routes: {
            "/node_modules": "node_modules"
        }
    }
};