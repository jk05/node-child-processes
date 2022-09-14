const { spawn } = require("node:child_process");

// snyk test
const snykTestProcess = spawn("snyk", [
  "test",
  "fixture/spring-boot",
  "--json",
]);

snykTestProcess.stdout.on("data", (data) => {
  console.log(`snykTestProcess stdout`);
});

snykTestProcess.stderr.on("data", (data) => {
  console.error(`snykTestProcess stderr: ${data}`);
  process.exit(1);
});

snykTestProcess.on("close", (code) => {
  console.log(`snykTestProcess child process exited with code ${code}
  `);
  process.exit(0);
});

// head first 10 lines
const head10Lines = spawn("head", ["-n", "10"]);

// pipe "snyk test" stdout to "head" stdin
snykTestProcess.stdout.pipe(head10Lines.stdin);

head10Lines.stdout.on("data", (data) => {
  console.log(`head10Lines stdout: ${data}`);
});

head10Lines.stderr.on("data", (data) => {
  console.error(`head10Lines stderr: ${data}`);
  process.exit(1);
});

head10Lines.on("close", (code) => {
  console.log(`head10Lines child process exited with code ${code}`);
  process.exit(0);
});
