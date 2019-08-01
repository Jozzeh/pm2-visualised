module.exports = {
    apps: [{
        name: "pm2-visualised",
        script: "server.js",
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: "128M"
    }]
};
