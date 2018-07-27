#!/usr/bin/env node

import * as path from "path";
import * as process from "process";

import {globRename} from "./";

let args = process.argv.slice(2);
let find = path.resolve(args[0]);
let replace = path.resolve(args[1]);
let paths = args.slice(2);

globRename(undefined, paths, find, replace);
