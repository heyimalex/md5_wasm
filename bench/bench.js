const md5 = require("md5");
const md5_wasm = require("./wrapper");

const Benchmark = require("benchmark");
const suite = new Benchmark.Suite();

function run(fn) {
  fn("hello world!");
}

run(md5);
run(md5_wasm);

suite
  .add("md5", () => {
    run(md5);
  })
  .add("md5_wasm", () => {
    run(md5_wasm);
  })
  .on("cycle", function(event) {
    console.log(String(event.target));
  })
  .on("complete", function() {
    console.log("Fastest is " + this.filter("fastest").map("name"));
  })
  .run({ async: true });
