#!/usr/bin/env node

import * as path from "path";
import * as process from "process";

import {globRename} from "./";

let args = process.argv.slice(2);
let find = args[0];
let replace = args[1];
let paths = args.slice(2);

globRename(undefined, paths, find, replace);
