import { spawnSync } from "node:child_process";

const result = spawnSync("python3", ["-m", "compileall", "app"], {
  cwd: process.cwd(),
  stdio: "inherit"
});

process.exit(result.status ?? 1);
