#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var process = require("process");
var globCopy_1 = require("../globCopy");
var args = process.argv.slice(2);
var source = path.resolve(args[0]);
var target = path.resolve(args[1]);
var segments = args.slice(2);
(0, globCopy_1.globCopy)(source, segments, target);
