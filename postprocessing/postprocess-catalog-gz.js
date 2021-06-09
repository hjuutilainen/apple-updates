import { readJSON, writeJSON, removeFile } from 'https://deno.land/x/flat@0.0.10/mod.ts'
import { gzipFile, gunzipFile } from 'https://deno.land/x/compress@v0.3.8/gzip/mod.ts'
import * as path from 'https://deno.land/std@0.97.0/path/mod.ts'

const filename = Deno.args[0]
console.log(filename)
const path_obj = path.parse(filename)
console.log(path_obj)
const newFilename = path.join(path_obj.dir, path_obj.name)
console.log(newFilename)

await gunzipFile(filename, newFilename);
await removeFile(filename)

// Forwards the execution to the bash script
const bash_run = Deno.run({
    cmd: ['./postprocessing/plist-to-sorted-json.sh', newFilename].concat(Deno.args),
});
await bash_run.status();

await removeFile(newFilename)
