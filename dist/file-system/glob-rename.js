#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var process = require("process");
var _1 = require("./");
var args = process.argv.slice(2);
var find = path.resolve(args[0]);
var replace = path.resolve(args[1]);
var paths = args.slice(2);
_1.globRename(undefined, paths, find, replace);
