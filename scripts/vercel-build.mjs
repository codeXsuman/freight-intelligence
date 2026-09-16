import { spawnSync } from 'node:child_process';
function run(args){const r=spawnSync('npx',['prisma',...args],{stdio:'inherit',shell:process.platform==='win32'});if(r.status!==0)process.exit(r.status??1)}
run(['generate']); if(process.env.DATABASE_URL){run(['migrate','deploy']);if(process.env.SEED_DATABASE==='true')run(['db','seed']);} const build=spawnSync('npx',['next','build'],{stdio:'inherit',shell:process.platform==='win32'});process.exit(build.status??1);
