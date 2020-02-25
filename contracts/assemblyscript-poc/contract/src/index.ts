// The entry file of your WebAssembly module.

import * as contract from "./contract";
import { log, releaseOwnership, takeOwnership, wrapOk } from "./cosmwasm";
import { parse } from "./encoding/json";
import { Encoding } from "./utils";

export { allocate, deallocate } from "./cosmwasm";

export function init(_paramsPtr: usize, _messagePtr: usize): usize {
  throw new Error("Not implemented");
}

export function handle(_paramsPtr: usize, _messagePtr: usize): usize {
  throw new Error("Not implemented");
}

export function query(messagePtr: usize): usize {
  const msgJson = takeOwnership(messagePtr);
  log("JSON query request: " + Encoding.fromUtf8(msgJson));
  const msg = parse(msgJson).asObject();
  const out = wrapOk(contract.query(msg));
  return releaseOwnership(out);
}

// eslint-disable-next-line @typescript-eslint/camelcase
export function cosmwasm_api_0_6(): i32 {
  return 0x0603;
}
