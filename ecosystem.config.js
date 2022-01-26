module.exports = {
  name: "api",
  cwd: "./",
  script: "./dist/index.js",
  instances: 2,
  exec_mode: "cluster",
  autorestart: true,
  env: {
    NODE_ENV: "production" // 개발환경시 적용될 설정 지정
  },

  output: "~/logs/pm2/console.log",
  error: "~/logs/pm2/consoleError.log"
};
