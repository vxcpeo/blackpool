/**
 * Short hand-off prompt copied by the "Copy for your agent" button on /agents.
 * Kept byte-for-byte in sync with the production site.
 */
export const AGENT_PROMPT = `You can make private crypto payments with the \`agpool\` CLI (env AGPOOL_KEY and AGPOOL_JSON=1 are set).
Always run commands with a timeout of at least 300 seconds and parse the single JSON object on stdout.
"ok": true means it succeeded; "ok": false has an "error" to report. Exit code 2 means you called it wrong.
Before paying, check \`agpool balance --chain <c> --pool <p>\`; if it is short, \`agpool deposit\` first.
Never retry deposit, send, swap or bridge after a timeout or unclear failure: run \`agpool balance --wait\`
(or \`agpool bridges\`) to see whether it landed. \`agpool recover --chain all\` is always safe to run.
Never print, log or share AGPOOL_KEY or anything in ~/.agpool.
Full guide: https://agpool.cash/AGENTS.md`
