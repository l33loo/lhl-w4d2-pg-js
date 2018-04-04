let userInput = process.argv.slice(2);

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
  .insert({first_name: userInput[0], last_name: userInput[1], birthdate: userInput[2]})
  .asCallback(function(err, rows) {
    if (err) {
      return console.error(err);
    }
    console.log(`Added '${userInput[0]} ${userInput[1]}', born on ${userInput[2]}, to the database.`);
    process.exit();
  })


