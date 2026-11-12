/**
 * Short hand-off prompt copied by the "Copy for your agent" button on /agents.
 * Kept byte-for-byte in sync with the production site.
 */
export const AGENT_PROMPT = `You can make private crypto payments with the \`blackpool\` CLI (env BLACKPOOL_KEY and BLACKPOOL_JSON=1 are set).
Always run commands with a timeout of at least 300 seconds and parse the single JSON object on stdout.
"ok": true means it succeeded; "ok": false has an "error" to report. Exit code 2 means you called it wrong.
Before paying, check \`blackpool balance --chain <c> --pool <p>\`; if it is short, \`blackpool deposit\` first.
Never retry deposit, send, swap or bridge after a timeout or unclear failure: run \`blackpool balance --wait\`
(or \`blackpool bridges\`) to see whether it landed. \`blackpool recover --chain all\` is always safe to run.
Never print, log or share BLACKPOOL_KEY or anything in ~/.blackpool.
Full guide: https://blackpool.cash/AGENTS.md`
