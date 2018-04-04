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

    outputSearchResult(result.rows);
    // result.rows.forEach((res) => {
    //   console.log(`-${result.rows.indexOf(res) + 1}: ${res.first_name} ${res.last_name}, born ${res.birthdate.toISOString().substr(0, 10)}`);
    // });
  });
});

function outputSearchResult(res) {
  console.log(`Found ${res.length} person(s) by the name '${input}':`);
  res.forEach((row) => {
    console.log(`-${res.indexOf(res) + 1}: ${row.first_name} ${row.last_name}, born ${row.birthdate.toISOString().substr(0, 10)}`);
  });
}