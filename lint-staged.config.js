module.exports = {
  "ts": [
    () => "tsc -p ./tsconfig.json --noEmit",
    "eslint --fix",
    "prettier --write"
  ],
}