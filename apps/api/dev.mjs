import { existsSync } from "node:fs";
import { spawn, spawnSync } from "node:child_process";
import path from "node:path";

const cwd = process.cwd();
const venv = path.join(cwd, ".venv");
const python = process.platform === "win32"
  ? path.join(venv, "Scripts", "python.exe")
  : path.join(venv, "bin", "python");

function run(command, args) {
  const result = spawnSync(command, args, {
    cwd,
    stdio: "inherit"
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

if (!existsSync(python)) {
  run("python3", ["-m", "venv", ".venv"]);
}

run(python, ["-m", "pip", "install", "-r", "requirements.txt"]);

const flask = spawn(python, ["-m", "flask", "--app", "app", "run", "--port", "5001", "--debug"], {
  cwd,
  env: {
    ...process.env,
    FLASK_ENV: "development"
  },
  stdio: "inherit"
});

flask.on("exit", (code) => {
  process.exit(code ?? 0);
});
