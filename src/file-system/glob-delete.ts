#!/usr/bin/env node

import * as path from "path";
import * as process from "process";

import {globDelete} from "./";

let args = process.argv.slice(2);

globDelete(args, {});
