
import { performance } from "node:perf_hooks";
import { REST, Routes } from "discord.js";

if (!process.env.TOKEN) {
  console.error("TOKEN required in env");
  process.exit(1);
}

let samples: number[] = [];
const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
for (let i = 0; i < 5; i++) {
  console.log(`Sample #${i + 1}`);
  const start = performance.now();
  await rest.get(Routes.user("@me"));
  samples.push(performance.now() - start);
  await new Promise(resolve => setTimeout(resolve, 250));
}

const avg = samples.reduce((total, s) => total + s, 0) / samples.length;
console.log(`Avg roundtrip latency ${Math.round(avg)}ms`);
