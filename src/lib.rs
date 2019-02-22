extern crate wasm_bindgen;
extern crate md5;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn compute(data: &[u8]) -> String {
    let digest = md5::compute(data);
    return format!("{:x}", digest);
}
