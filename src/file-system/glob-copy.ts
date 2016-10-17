#!/usr/bin/env node

import * as path from "path";
import * as process from "process";

import {globCopy} from "./";

let args = process.argv.slice(2);
let source = path.resolve(args[0]);
let target = path.resolve(args[1]);
let segments = args.slice(2);

globCopy(source, segments, target);
