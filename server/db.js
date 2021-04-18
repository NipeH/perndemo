const Pool = require('pg').Pool;

const pool = new Pool({
    user: "niiloh",
    password: "salasana",
    host: "localhost",
    port: 5432,
    database: "perntodo"

})

module.exports = pool;