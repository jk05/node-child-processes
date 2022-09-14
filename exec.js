const { exec } = require("node:child_process");

// snyk test
const overallProcess = exec(
  "snyk test fixture/spring-boot --json | head -n 10"
);

overallProcess.stdout.on("data", (data) => {
  console.log(`overallProcess stdout ${data}`);
});

overallProcess.stderr.on("data", (data) => {
  console.error(`overallProcess stderr: ${data}`);
  process.exit(1);
});

overallProcess.on("close", (code) => {
  console.log(`overallProcess child process exited with code ${code}
  `);
  process.exit(0);
});
