const { dbSyncAndSeed } = require("./db");

dbSyncAndSeed().catch(e => console.error(e.message));