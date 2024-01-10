const fse = require('fs-extra');
const PerfUsfmJsAlignment = require('../../src/index.js');

const usfm = fse.readFileSync('../test_data/titus_aligned.usfm').toString();

console.log("USFM", usfm.substring(0,80), "...")

const pkUJA = new PerfUsfmJsAlignment();

pkUJA.perfFromUsfm(usfm);

console.log("PERF", JSON.stringify(pkUJA.perf).substring(0,80), "...");

const usfmJs = pkUJA.toUsfmJs();

console.log("usfmJs", JSON.stringify(usfmJs).substring(0,80), "...");

pkUJA.fromUsfmJs(usfmJs);

const newPerf = pkUJA.perf;

console.log("NEW PERF", JSON.stringify(newPerf).substring(0,80), "...");
