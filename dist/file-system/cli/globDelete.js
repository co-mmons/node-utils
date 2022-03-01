#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var process = require("process");
var globDelete_1 = require("../globDelete");
var args = process.argv.slice(2);
(0, globDelete_1.globDelete)(args, {});
