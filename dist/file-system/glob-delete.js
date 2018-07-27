#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var process = require("process");
var _1 = require("./");
var args = process.argv.slice(2);
_1.globDelete(args, {});
