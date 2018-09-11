# Cron

Hi! Hope you like it 😉

## How to run from npm registry

Requires npx or npm >= 5.2.0

```bash
npx @gmunguia/cron-parser HH:MM < config
```

## How to install from npm and run

```bash
mkdir cron-parser && cd cron-parser
npm install @gmunguia/cron-parser
node_modules/.bin/cron-parser HH:MM < config
```

## How to install from tarball and run

```bash
tar -xzf cron.tar.gz
cd cron-parser
chmod +x ./cli.js
./cli.js HH:MM < config
```

## Room for improvement

Given more time, I would have liked to validate input.

If performance was important (which is probably not in a script like this one, I would also optimize `FuzzyTime.nextTime` function.
