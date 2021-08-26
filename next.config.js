const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");
// PHASE_EXPORT = next export
// PHASE_PRODUCTION_BUILD = next build
// PHASE_PRODUCTION_SERVER = next server side code

// = export default
// 加入env
module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: "albert",
        mongodb_password: "a123456",
        mongodb_clustername: "cluster0",
        mongodb_database: "next-course-usage",
      },
    };
  }

  // npm run build
  return {
    env: {
      mongodb_username: "maximilian",
      mongodb_password: "2YkcXq43KyPk0vqp",
      mongodb_clustername: "cluster0",
      mongodb_database: "my-site",
    },
  };
};
