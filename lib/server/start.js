const app = require('./index');
const {getEnvironment, getApiConfig} = require('../../config');

const environment = getEnvironment();
const {port, host} = getApiConfig();

const signature = `
__     __                _    __   _
\\ \\   / /   ___   _ __  (_)  / _| (_)   ___   _ __
 \\ \\ / /   / _ \\ | '__| | | | |_  | |  / _ \\ | '__|
  \\ V /   |  __/ | |    | | |  _| | | |  __/ | |
   \\_/     \\___| |_|    |_| |_|   |_|  \\___| |_|
`;

console.log(`\n${signature}\n`);
console.log(`Environment: ${environment}`);

const server = app.listen(port, () => {
  console.log(`Listening on: ${host}:${port}`);
});

process.on('SIGTERM', () => {
  server.close();
  process.exit(0);
});
