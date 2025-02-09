module.exports = {
    apps: [
      {
        name: "api-solid",
        script: "build/server.js",
        instances: "1",
        exec_mode: "cluster",
        watch: true,
        autorestart: true,
        max_memory_restart: "300M",
        env: {
          NODE_ENV: "development",
        },
        env_production: {
          NODE_ENV: "production",
        },
      },
    ],
  };
  