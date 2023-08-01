import TailFile from '@logdna/tail-file'
import { createReadStream, createWriteStream } from 'fs'
import parser from 'stream-json/jsonl/Parser.js'
import stringer from 'stream-json/jsonl/Stringer.js'
import Chain from 'stream-chain'

const lines = []
let count = 0
const pipeline = new Chain([
  new parser(),
  data => (count++ < 100 ? data.value : null),
  new stringer(),
  createWriteStream('chopped.log')
])

createReadStream(process.env.LOG_FILE).pipe(pipeline)
