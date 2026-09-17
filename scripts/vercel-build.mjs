import { spawnSync } from 'node:child_process';

function run(args) {
  const result = spawnSync('npx', ['prisma', ...args], {
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

run(['generate']);

if (process.env.DATABASE_URL) {
  // This project currently has no committed Prisma migrations.
  // Push the schema so a newly connected Vercel Postgres database is ready
  // before the optional seed script runs.
  run(['db', 'push', '--accept-data-loss']);

  if (process.env.SEED_DATABASE === 'true') {
    run(['db', 'seed']);
  }
}

const build = spawnSync('npx', ['next', 'build'], {
  stdio: 'inherit',
  shell: process.platform === 'win32',
});

process.exit(build.status ?? 1);
