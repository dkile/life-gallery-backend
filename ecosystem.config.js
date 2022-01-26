module.exports = {
  name: "api",
  cwd: "./",
  script: "./dist/index.js",
  instances: 2,
  exec_mode: "cluster",
  autorestart: true,

  output: "~/logs/pm2/console.log",
  error: "~/logs/pm2/consoleError.log"
};
