let userInput = process.argv[2].toString();

const settings = require("./settings");

const knex = require("knex")({
  client: 'pg',
  connection: {
    host: settings.hostname,
    user: settings.user,
    password: settings.password,
    database: settings.database,
    port: settings.port,
    ssl: settings.ssl
  }
});

knex('famous_people')
  .where('first_name', userInput)
  .asCallback(function(err, rows) {
    if (err) {
      return console.error(err);
    };
    console.log(`Found ${rows.length} person(s) by the name '${userInput}':`);
    rows.forEach((row) => {
      console.log(`-${rows.indexOf(row) + 1}: ${row.first_name} ${row.last_name}, born ${row.birthdate.toISOString().substr(0, 10)}`);
    });
    process.exit();
  });


