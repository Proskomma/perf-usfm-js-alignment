const {Proskomma} = require('proskomma-core');
const {PipelineHandler} = require('proskomma-json-tools');

class PerfUsfmJsAlignment {

    constructor() {
        this._perf = null;
        this._pipelineHandler = new PipelineHandler({
            proskomma: new Proskomma(),
            verbose: false
        });
    }

    get perf() {
        if (!this._perf) {
            throw new Error("Attempt to read PERF when no PERF has been loaded");
        }
        return this._perf;
    }

    set perf(p) {
        let p2;
        try {
            p2 = JSON.parse(JSON.stringify(p));
            this._perf = p2;
        } catch (err) {
            throw new Error("Could not parse argument to setPerf() as a JSON-like object");
        }
    }

    perfFromUsfm(u) {
        const pk = new Proskomma();
        pk.importDocument({lang: "xxx", abbr: "yyy"}, "usfm", u);
        this._perf = JSON.parse(pk.gqlQuerySync("{documents {perf}}").data.documents[0].perf);
    }

    toUsfmJs() {
        if (!this._perf) {
            throw new Error("toUsfmJs() called when no PERF has been loaded");
        }
        const output = this._pipelineHandler.runPipeline(
            'perfToUsfmJsPipeline', {
                perf: this._perf
            }
        );
        return output.usfmJs;
    };


    fromUsfmJs(usfmJs) {
        if (!this._perf) {
            throw new Error("fromUsfmJs() called when no PERF has been loaded");
        }
        const output = this._pipelineHandler.runPipeline(
            'mergeUwAlignmentPipeline', {
                perf: this._perf,
                usfmJs: usfmJs
            }
        );
        return output.perf;
    }

}

module.exports = PerfUsfmJsAlignment;
