const { dbSyncAndSeed } = require("./db");
const app = require("./app");

const PORT = process.env.port || 3000;

dbSyncAndSeed()
  .then(() =>
    app.listen(PORT, () => {
      console.log(`I'm Listening... on port ${PORT}`);
    })
  )
  .catch(e => console.error(e.message));
