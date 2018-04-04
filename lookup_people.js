let input = (process.argv[2]).toString();

const pg = require("pg");
const settings = require("./settings");

const client = new pg.Client({
  user      : settings.user,
  password  : settings.password,
  database  : settings.database,
  host      : settings.hostname,
  port      : settings.port,
  ssl       : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection error ", err);
  }
  client.query("SELECT * FROM famous_people WHERE first_name = $1", [input], (err, result) => {
    if (err) {
      return console.error('error running query ', err);
    }
    console.log('Searching...');
    console.log(`Found ${result.rows.length} person(s) by the name '${input}':`);
    result.rows.forEach((res) => {
      console.log(`-${result.rows.indexOf(res) + 1}: ${res.first_name} ${res.last_name}, born ${res.birthdate.toISOString().substr(0, 10)}`);
    });
  });
});