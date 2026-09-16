# FreightIQ — Intelligent Freight Forecasting & Charter Optimization

Vercel-ready Next.js + PostgreSQL SIH prototype for overseas bulk cargo planning into India's East Coast.

## Deploy

1. Push this repository to GitHub.
2. Create a PostgreSQL database and copy its connection string.
3. Import the repository into Vercel.
4. Add `DATABASE_URL`, `AUTH_SECRET`, and optionally `SEED_DATABASE=true`.
5. Deploy.

The build runs Prisma generation, migrations, optional seed, then Next.js build.

Demo account: `demo@freightiq.app` / `Demo@12345`

## Local development

```bash
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate deploy
npx prisma db seed
npm run dev
```

The forecasting engine is a transparent baseline for demonstration. The optimizer is a deterministic constraint-aware baseline. For SIH production work, replace/extend these with evaluated ML models and OR-Tools/Pyomo using validated data.
