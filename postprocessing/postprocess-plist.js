import { readJSON, writeJSON, removeFile } from 'https://deno.land/x/flat@0.0.10/mod.ts'

const filename = Deno.args[0]
console.log(filename)

// Forwards the execution to the bash script
const bash_run = Deno.run({
    cmd: ['./postprocessing/plist-to-sorted-json.sh', filename].concat(Deno.args),
});
await bash_run.status();

await removeFile(filename)
