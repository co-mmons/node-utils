#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var process = require("process");
var globRename_1 = require("../globRename");
var args = process.argv.slice(2);
var find = args[0];
var replace = args[1];
var paths = args.slice(2);
globRename_1.globRename(undefined, paths, find, replace);
