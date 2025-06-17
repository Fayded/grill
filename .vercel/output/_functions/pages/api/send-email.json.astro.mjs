import { av as commonjsGlobal, aw as errorMap, ax as getDefaultExportFromCjs, ay as createKey, az as SlotString, c as createComponent, a as createAstro, m as maybeRenderHead, b as renderTemplate } from '../../chunks/astro/server_pDgY8W89.mjs';
import '../../chunks/astro-designed-error-pages_BzXQ6ng2.mjs';
import { e as apply, l as levels, g as getEventPrefix, P as Pipeline, c as createStylesheetElementSet, a as createModuleScriptElement, L as Logger } from '../../chunks/polyfill_mghF4AWi.mjs';
import path, { posix } from 'node:path';
import require$$0 from 'fs';
import require$$1 from 'os';
import require$$0$1 from 'path';
import require$$4 from 'child_process';
import require$$5 from 'crypto';
import require$$6 from 'tty';
import { i as idle_prebuilt_default, l as load_prebuilt_default, m as media_prebuilt_default, o as only_prebuilt_default, v as visible_prebuilt_default } from '../../chunks/astro_BeB3rv8s.mjs';
import { z, l as findRouteToRewrite, p as RenderContext } from '../../chunks/server_M9g32lm7.mjs';
import { p as prependForwardSlash, r as removeTrailingForwardSlash, a as appendForwardSlash, b as removeLeadingForwardSlash } from '../../chunks/path_CzpST-x-.mjs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import require$$1$1 from 'util';
import { N as NOOP_MIDDLEWARE_FN } from '../../chunks/noop-middleware_Dz4-A_05.mjs';
import { Resend } from 'resend';
export { renderers } from '../../renderers.mjs';

function getPattern(segments, base, addTrailingSlash) {
  const pathname = segments.map((segment) => {
    if (segment.length === 1 && segment[0].spread) {
      return "(?:\\/(.*?))?";
    } else {
      return "\\/" + segment.map((part) => {
        if (part.spread) {
          return "(.*?)";
        } else if (part.dynamic) {
          return "([^/]+?)";
        } else {
          return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        }
      }).join("");
    }
  }).join("");
  const trailing = addTrailingSlash && segments.length ? getTrailingSlashPattern(addTrailingSlash) : "$";
  let initial = "\\/";
  if (addTrailingSlash === "never" && base !== "/") {
    initial = "";
  }
  return new RegExp(`^${pathname || initial}${trailing}`);
}
function getTrailingSlashPattern(addTrailingSlash) {
  if (addTrailingSlash === "always") {
    return "\\/$";
  }
  if (addTrailingSlash === "never") {
    return "$";
  }
  return "\\/?$";
}

apply();

var main;
var hasRequiredMain;

function requireMain () {
	if (hasRequiredMain) return main;
	hasRequiredMain = 1;
	var __defProp = Object.defineProperty;
	var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames = Object.getOwnPropertyNames;
	var __hasOwnProp = Object.prototype.hasOwnProperty;
	var __export = (target, all) => {
	  for (var name in all)
	    __defProp(target, name, { get: all[name], enumerable: true });
	};
	var __copyProps = (to, from, except, desc) => {
	  if (from && typeof from === "object" || typeof from === "function") {
	    for (let key of __getOwnPropNames(from))
	      if (!__hasOwnProp.call(to, key) && key !== except)
	        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
	  }
	  return to;
	};
	var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

	// lib/npm/node.ts
	var node_exports = {};
	__export(node_exports, {
	  analyzeMetafile: () => analyzeMetafile,
	  analyzeMetafileSync: () => analyzeMetafileSync,
	  build: () => build,
	  buildSync: () => buildSync,
	  context: () => context,
	  default: () => node_default,
	  formatMessages: () => formatMessages,
	  formatMessagesSync: () => formatMessagesSync,
	  initialize: () => initialize,
	  stop: () => stop,
	  transform: () => transform,
	  transformSync: () => transformSync,
	  version: () => version
	});
	main = __toCommonJS(node_exports);

	// lib/shared/stdio_protocol.ts
	function encodePacket(packet) {
	  let visit = (value) => {
	    if (value === null) {
	      bb.write8(0);
	    } else if (typeof value === "boolean") {
	      bb.write8(1);
	      bb.write8(+value);
	    } else if (typeof value === "number") {
	      bb.write8(2);
	      bb.write32(value | 0);
	    } else if (typeof value === "string") {
	      bb.write8(3);
	      bb.write(encodeUTF8(value));
	    } else if (value instanceof Uint8Array) {
	      bb.write8(4);
	      bb.write(value);
	    } else if (value instanceof Array) {
	      bb.write8(5);
	      bb.write32(value.length);
	      for (let item of value) {
	        visit(item);
	      }
	    } else {
	      let keys = Object.keys(value);
	      bb.write8(6);
	      bb.write32(keys.length);
	      for (let key of keys) {
	        bb.write(encodeUTF8(key));
	        visit(value[key]);
	      }
	    }
	  };
	  let bb = new ByteBuffer();
	  bb.write32(0);
	  bb.write32(packet.id << 1 | +!packet.isRequest);
	  visit(packet.value);
	  writeUInt32LE(bb.buf, bb.len - 4, 0);
	  return bb.buf.subarray(0, bb.len);
	}
	function decodePacket(bytes) {
	  let visit = () => {
	    switch (bb.read8()) {
	      case 0:
	        return null;
	      case 1:
	        return !!bb.read8();
	      case 2:
	        return bb.read32();
	      case 3:
	        return decodeUTF8(bb.read());
	      case 4:
	        return bb.read();
	      case 5: {
	        let count = bb.read32();
	        let value2 = [];
	        for (let i = 0; i < count; i++) {
	          value2.push(visit());
	        }
	        return value2;
	      }
	      case 6: {
	        let count = bb.read32();
	        let value2 = {};
	        for (let i = 0; i < count; i++) {
	          value2[decodeUTF8(bb.read())] = visit();
	        }
	        return value2;
	      }
	      default:
	        throw new Error("Invalid packet");
	    }
	  };
	  let bb = new ByteBuffer(bytes);
	  let id = bb.read32();
	  let isRequest = (id & 1) === 0;
	  id >>>= 1;
	  let value = visit();
	  if (bb.ptr !== bytes.length) {
	    throw new Error("Invalid packet");
	  }
	  return { id, isRequest, value };
	}
	var ByteBuffer = class {
	  constructor(buf = new Uint8Array(1024)) {
	    this.buf = buf;
	    this.len = 0;
	    this.ptr = 0;
	  }
	  _write(delta) {
	    if (this.len + delta > this.buf.length) {
	      let clone = new Uint8Array((this.len + delta) * 2);
	      clone.set(this.buf);
	      this.buf = clone;
	    }
	    this.len += delta;
	    return this.len - delta;
	  }
	  write8(value) {
	    let offset = this._write(1);
	    this.buf[offset] = value;
	  }
	  write32(value) {
	    let offset = this._write(4);
	    writeUInt32LE(this.buf, value, offset);
	  }
	  write(bytes) {
	    let offset = this._write(4 + bytes.length);
	    writeUInt32LE(this.buf, bytes.length, offset);
	    this.buf.set(bytes, offset + 4);
	  }
	  _read(delta) {
	    if (this.ptr + delta > this.buf.length) {
	      throw new Error("Invalid packet");
	    }
	    this.ptr += delta;
	    return this.ptr - delta;
	  }
	  read8() {
	    return this.buf[this._read(1)];
	  }
	  read32() {
	    return readUInt32LE(this.buf, this._read(4));
	  }
	  read() {
	    let length = this.read32();
	    let bytes = new Uint8Array(length);
	    let ptr = this._read(bytes.length);
	    bytes.set(this.buf.subarray(ptr, ptr + length));
	    return bytes;
	  }
	};
	var encodeUTF8;
	var decodeUTF8;
	var encodeInvariant;
	if (typeof TextEncoder !== "undefined" && typeof TextDecoder !== "undefined") {
	  let encoder = new TextEncoder();
	  let decoder = new TextDecoder();
	  encodeUTF8 = (text) => encoder.encode(text);
	  decodeUTF8 = (bytes) => decoder.decode(bytes);
	  encodeInvariant = 'new TextEncoder().encode("")';
	} else if (typeof Buffer !== "undefined") {
	  encodeUTF8 = (text) => Buffer.from(text);
	  decodeUTF8 = (bytes) => {
	    let { buffer, byteOffset, byteLength } = bytes;
	    return Buffer.from(buffer, byteOffset, byteLength).toString();
	  };
	  encodeInvariant = 'Buffer.from("")';
	} else {
	  throw new Error("No UTF-8 codec found");
	}
	if (!(encodeUTF8("") instanceof Uint8Array))
	  throw new Error(`Invariant violation: "${encodeInvariant} instanceof Uint8Array" is incorrectly false

This indicates that your JavaScript environment is broken. You cannot use
esbuild in this environment because esbuild relies on this invariant. This
is not a problem with esbuild. You need to fix your environment instead.
`);
	function readUInt32LE(buffer, offset) {
	  return buffer[offset++] | buffer[offset++] << 8 | buffer[offset++] << 16 | buffer[offset++] << 24;
	}
	function writeUInt32LE(buffer, value, offset) {
	  buffer[offset++] = value;
	  buffer[offset++] = value >> 8;
	  buffer[offset++] = value >> 16;
	  buffer[offset++] = value >> 24;
	}

	// lib/shared/common.ts
	var quote = JSON.stringify;
	var buildLogLevelDefault = "warning";
	var transformLogLevelDefault = "silent";
	function validateTarget(target) {
	  validateStringValue(target, "target");
	  if (target.indexOf(",") >= 0) throw new Error(`Invalid target: ${target}`);
	  return target;
	}
	var canBeAnything = () => null;
	var mustBeBoolean = (value) => typeof value === "boolean" ? null : "a boolean";
	var mustBeString = (value) => typeof value === "string" ? null : "a string";
	var mustBeRegExp = (value) => value instanceof RegExp ? null : "a RegExp object";
	var mustBeInteger = (value) => typeof value === "number" && value === (value | 0) ? null : "an integer";
	var mustBeValidPortNumber = (value) => typeof value === "number" && value === (value | 0) && value >= 0 && value <= 65535 ? null : "a valid port number";
	var mustBeFunction = (value) => typeof value === "function" ? null : "a function";
	var mustBeArray = (value) => Array.isArray(value) ? null : "an array";
	var mustBeObject = (value) => typeof value === "object" && value !== null && !Array.isArray(value) ? null : "an object";
	var mustBeEntryPoints = (value) => typeof value === "object" && value !== null ? null : "an array or an object";
	var mustBeWebAssemblyModule = (value) => value instanceof WebAssembly.Module ? null : "a WebAssembly.Module";
	var mustBeObjectOrNull = (value) => typeof value === "object" && !Array.isArray(value) ? null : "an object or null";
	var mustBeStringOrBoolean = (value) => typeof value === "string" || typeof value === "boolean" ? null : "a string or a boolean";
	var mustBeStringOrObject = (value) => typeof value === "string" || typeof value === "object" && value !== null && !Array.isArray(value) ? null : "a string or an object";
	var mustBeStringOrArray = (value) => typeof value === "string" || Array.isArray(value) ? null : "a string or an array";
	var mustBeStringOrUint8Array = (value) => typeof value === "string" || value instanceof Uint8Array ? null : "a string or a Uint8Array";
	var mustBeStringOrURL = (value) => typeof value === "string" || value instanceof URL ? null : "a string or a URL";
	function getFlag(object, keys, key, mustBeFn) {
	  let value = object[key];
	  keys[key + ""] = true;
	  if (value === void 0) return void 0;
	  let mustBe = mustBeFn(value);
	  if (mustBe !== null) throw new Error(`${quote(key)} must be ${mustBe}`);
	  return value;
	}
	function checkForInvalidFlags(object, keys, where) {
	  for (let key in object) {
	    if (!(key in keys)) {
	      throw new Error(`Invalid option ${where}: ${quote(key)}`);
	    }
	  }
	}
	function validateInitializeOptions(options) {
	  let keys = /* @__PURE__ */ Object.create(null);
	  let wasmURL = getFlag(options, keys, "wasmURL", mustBeStringOrURL);
	  let wasmModule = getFlag(options, keys, "wasmModule", mustBeWebAssemblyModule);
	  let worker = getFlag(options, keys, "worker", mustBeBoolean);
	  checkForInvalidFlags(options, keys, "in initialize() call");
	  return {
	    wasmURL,
	    wasmModule,
	    worker
	  };
	}
	function validateMangleCache(mangleCache) {
	  let validated;
	  if (mangleCache !== void 0) {
	    validated = /* @__PURE__ */ Object.create(null);
	    for (let key in mangleCache) {
	      let value = mangleCache[key];
	      if (typeof value === "string" || value === false) {
	        validated[key] = value;
	      } else {
	        throw new Error(`Expected ${quote(key)} in mangle cache to map to either a string or false`);
	      }
	    }
	  }
	  return validated;
	}
	function pushLogFlags(flags, options, keys, isTTY2, logLevelDefault) {
	  let color = getFlag(options, keys, "color", mustBeBoolean);
	  let logLevel = getFlag(options, keys, "logLevel", mustBeString);
	  let logLimit = getFlag(options, keys, "logLimit", mustBeInteger);
	  if (color !== void 0) flags.push(`--color=${color}`);
	  else if (isTTY2) flags.push(`--color=true`);
	  flags.push(`--log-level=${logLevel || logLevelDefault}`);
	  flags.push(`--log-limit=${logLimit || 0}`);
	}
	function validateStringValue(value, what, key) {
	  if (typeof value !== "string") {
	    throw new Error(`Expected value for ${what}${key !== void 0 ? " " + quote(key) : ""} to be a string, got ${typeof value} instead`);
	  }
	  return value;
	}
	function pushCommonFlags(flags, options, keys) {
	  let legalComments = getFlag(options, keys, "legalComments", mustBeString);
	  let sourceRoot = getFlag(options, keys, "sourceRoot", mustBeString);
	  let sourcesContent = getFlag(options, keys, "sourcesContent", mustBeBoolean);
	  let target = getFlag(options, keys, "target", mustBeStringOrArray);
	  let format = getFlag(options, keys, "format", mustBeString);
	  let globalName = getFlag(options, keys, "globalName", mustBeString);
	  let mangleProps = getFlag(options, keys, "mangleProps", mustBeRegExp);
	  let reserveProps = getFlag(options, keys, "reserveProps", mustBeRegExp);
	  let mangleQuoted = getFlag(options, keys, "mangleQuoted", mustBeBoolean);
	  let minify = getFlag(options, keys, "minify", mustBeBoolean);
	  let minifySyntax = getFlag(options, keys, "minifySyntax", mustBeBoolean);
	  let minifyWhitespace = getFlag(options, keys, "minifyWhitespace", mustBeBoolean);
	  let minifyIdentifiers = getFlag(options, keys, "minifyIdentifiers", mustBeBoolean);
	  let lineLimit = getFlag(options, keys, "lineLimit", mustBeInteger);
	  let drop = getFlag(options, keys, "drop", mustBeArray);
	  let dropLabels = getFlag(options, keys, "dropLabels", mustBeArray);
	  let charset = getFlag(options, keys, "charset", mustBeString);
	  let treeShaking = getFlag(options, keys, "treeShaking", mustBeBoolean);
	  let ignoreAnnotations = getFlag(options, keys, "ignoreAnnotations", mustBeBoolean);
	  let jsx = getFlag(options, keys, "jsx", mustBeString);
	  let jsxFactory = getFlag(options, keys, "jsxFactory", mustBeString);
	  let jsxFragment = getFlag(options, keys, "jsxFragment", mustBeString);
	  let jsxImportSource = getFlag(options, keys, "jsxImportSource", mustBeString);
	  let jsxDev = getFlag(options, keys, "jsxDev", mustBeBoolean);
	  let jsxSideEffects = getFlag(options, keys, "jsxSideEffects", mustBeBoolean);
	  let define = getFlag(options, keys, "define", mustBeObject);
	  let logOverride = getFlag(options, keys, "logOverride", mustBeObject);
	  let supported = getFlag(options, keys, "supported", mustBeObject);
	  let pure = getFlag(options, keys, "pure", mustBeArray);
	  let keepNames = getFlag(options, keys, "keepNames", mustBeBoolean);
	  let platform = getFlag(options, keys, "platform", mustBeString);
	  let tsconfigRaw = getFlag(options, keys, "tsconfigRaw", mustBeStringOrObject);
	  if (legalComments) flags.push(`--legal-comments=${legalComments}`);
	  if (sourceRoot !== void 0) flags.push(`--source-root=${sourceRoot}`);
	  if (sourcesContent !== void 0) flags.push(`--sources-content=${sourcesContent}`);
	  if (target) {
	    if (Array.isArray(target)) flags.push(`--target=${Array.from(target).map(validateTarget).join(",")}`);
	    else flags.push(`--target=${validateTarget(target)}`);
	  }
	  if (format) flags.push(`--format=${format}`);
	  if (globalName) flags.push(`--global-name=${globalName}`);
	  if (platform) flags.push(`--platform=${platform}`);
	  if (tsconfigRaw) flags.push(`--tsconfig-raw=${typeof tsconfigRaw === "string" ? tsconfigRaw : JSON.stringify(tsconfigRaw)}`);
	  if (minify) flags.push("--minify");
	  if (minifySyntax) flags.push("--minify-syntax");
	  if (minifyWhitespace) flags.push("--minify-whitespace");
	  if (minifyIdentifiers) flags.push("--minify-identifiers");
	  if (lineLimit) flags.push(`--line-limit=${lineLimit}`);
	  if (charset) flags.push(`--charset=${charset}`);
	  if (treeShaking !== void 0) flags.push(`--tree-shaking=${treeShaking}`);
	  if (ignoreAnnotations) flags.push(`--ignore-annotations`);
	  if (drop) for (let what of drop) flags.push(`--drop:${validateStringValue(what, "drop")}`);
	  if (dropLabels) flags.push(`--drop-labels=${Array.from(dropLabels).map((what) => validateStringValue(what, "dropLabels")).join(",")}`);
	  if (mangleProps) flags.push(`--mangle-props=${jsRegExpToGoRegExp(mangleProps)}`);
	  if (reserveProps) flags.push(`--reserve-props=${jsRegExpToGoRegExp(reserveProps)}`);
	  if (mangleQuoted !== void 0) flags.push(`--mangle-quoted=${mangleQuoted}`);
	  if (jsx) flags.push(`--jsx=${jsx}`);
	  if (jsxFactory) flags.push(`--jsx-factory=${jsxFactory}`);
	  if (jsxFragment) flags.push(`--jsx-fragment=${jsxFragment}`);
	  if (jsxImportSource) flags.push(`--jsx-import-source=${jsxImportSource}`);
	  if (jsxDev) flags.push(`--jsx-dev`);
	  if (jsxSideEffects) flags.push(`--jsx-side-effects`);
	  if (define) {
	    for (let key in define) {
	      if (key.indexOf("=") >= 0) throw new Error(`Invalid define: ${key}`);
	      flags.push(`--define:${key}=${validateStringValue(define[key], "define", key)}`);
	    }
	  }
	  if (logOverride) {
	    for (let key in logOverride) {
	      if (key.indexOf("=") >= 0) throw new Error(`Invalid log override: ${key}`);
	      flags.push(`--log-override:${key}=${validateStringValue(logOverride[key], "log override", key)}`);
	    }
	  }
	  if (supported) {
	    for (let key in supported) {
	      if (key.indexOf("=") >= 0) throw new Error(`Invalid supported: ${key}`);
	      const value = supported[key];
	      if (typeof value !== "boolean") throw new Error(`Expected value for supported ${quote(key)} to be a boolean, got ${typeof value} instead`);
	      flags.push(`--supported:${key}=${value}`);
	    }
	  }
	  if (pure) for (let fn of pure) flags.push(`--pure:${validateStringValue(fn, "pure")}`);
	  if (keepNames) flags.push(`--keep-names`);
	}
	function flagsForBuildOptions(callName, options, isTTY2, logLevelDefault, writeDefault) {
	  var _a2;
	  let flags = [];
	  let entries = [];
	  let keys = /* @__PURE__ */ Object.create(null);
	  let stdinContents = null;
	  let stdinResolveDir = null;
	  pushLogFlags(flags, options, keys, isTTY2, logLevelDefault);
	  pushCommonFlags(flags, options, keys);
	  let sourcemap = getFlag(options, keys, "sourcemap", mustBeStringOrBoolean);
	  let bundle = getFlag(options, keys, "bundle", mustBeBoolean);
	  let splitting = getFlag(options, keys, "splitting", mustBeBoolean);
	  let preserveSymlinks = getFlag(options, keys, "preserveSymlinks", mustBeBoolean);
	  let metafile = getFlag(options, keys, "metafile", mustBeBoolean);
	  let outfile = getFlag(options, keys, "outfile", mustBeString);
	  let outdir = getFlag(options, keys, "outdir", mustBeString);
	  let outbase = getFlag(options, keys, "outbase", mustBeString);
	  let tsconfig = getFlag(options, keys, "tsconfig", mustBeString);
	  let resolveExtensions = getFlag(options, keys, "resolveExtensions", mustBeArray);
	  let nodePathsInput = getFlag(options, keys, "nodePaths", mustBeArray);
	  let mainFields = getFlag(options, keys, "mainFields", mustBeArray);
	  let conditions = getFlag(options, keys, "conditions", mustBeArray);
	  let external = getFlag(options, keys, "external", mustBeArray);
	  let packages = getFlag(options, keys, "packages", mustBeString);
	  let alias = getFlag(options, keys, "alias", mustBeObject);
	  let loader = getFlag(options, keys, "loader", mustBeObject);
	  let outExtension = getFlag(options, keys, "outExtension", mustBeObject);
	  let publicPath = getFlag(options, keys, "publicPath", mustBeString);
	  let entryNames = getFlag(options, keys, "entryNames", mustBeString);
	  let chunkNames = getFlag(options, keys, "chunkNames", mustBeString);
	  let assetNames = getFlag(options, keys, "assetNames", mustBeString);
	  let inject = getFlag(options, keys, "inject", mustBeArray);
	  let banner = getFlag(options, keys, "banner", mustBeObject);
	  let footer = getFlag(options, keys, "footer", mustBeObject);
	  let entryPoints = getFlag(options, keys, "entryPoints", mustBeEntryPoints);
	  let absWorkingDir = getFlag(options, keys, "absWorkingDir", mustBeString);
	  let stdin = getFlag(options, keys, "stdin", mustBeObject);
	  let write = (_a2 = getFlag(options, keys, "write", mustBeBoolean)) != null ? _a2 : writeDefault;
	  let allowOverwrite = getFlag(options, keys, "allowOverwrite", mustBeBoolean);
	  let mangleCache = getFlag(options, keys, "mangleCache", mustBeObject);
	  keys.plugins = true;
	  checkForInvalidFlags(options, keys, `in ${callName}() call`);
	  if (sourcemap) flags.push(`--sourcemap${sourcemap === true ? "" : `=${sourcemap}`}`);
	  if (bundle) flags.push("--bundle");
	  if (allowOverwrite) flags.push("--allow-overwrite");
	  if (splitting) flags.push("--splitting");
	  if (preserveSymlinks) flags.push("--preserve-symlinks");
	  if (metafile) flags.push(`--metafile`);
	  if (outfile) flags.push(`--outfile=${outfile}`);
	  if (outdir) flags.push(`--outdir=${outdir}`);
	  if (outbase) flags.push(`--outbase=${outbase}`);
	  if (tsconfig) flags.push(`--tsconfig=${tsconfig}`);
	  if (packages) flags.push(`--packages=${packages}`);
	  if (resolveExtensions) {
	    let values = [];
	    for (let value of resolveExtensions) {
	      validateStringValue(value, "resolve extension");
	      if (value.indexOf(",") >= 0) throw new Error(`Invalid resolve extension: ${value}`);
	      values.push(value);
	    }
	    flags.push(`--resolve-extensions=${values.join(",")}`);
	  }
	  if (publicPath) flags.push(`--public-path=${publicPath}`);
	  if (entryNames) flags.push(`--entry-names=${entryNames}`);
	  if (chunkNames) flags.push(`--chunk-names=${chunkNames}`);
	  if (assetNames) flags.push(`--asset-names=${assetNames}`);
	  if (mainFields) {
	    let values = [];
	    for (let value of mainFields) {
	      validateStringValue(value, "main field");
	      if (value.indexOf(",") >= 0) throw new Error(`Invalid main field: ${value}`);
	      values.push(value);
	    }
	    flags.push(`--main-fields=${values.join(",")}`);
	  }
	  if (conditions) {
	    let values = [];
	    for (let value of conditions) {
	      validateStringValue(value, "condition");
	      if (value.indexOf(",") >= 0) throw new Error(`Invalid condition: ${value}`);
	      values.push(value);
	    }
	    flags.push(`--conditions=${values.join(",")}`);
	  }
	  if (external) for (let name of external) flags.push(`--external:${validateStringValue(name, "external")}`);
	  if (alias) {
	    for (let old in alias) {
	      if (old.indexOf("=") >= 0) throw new Error(`Invalid package name in alias: ${old}`);
	      flags.push(`--alias:${old}=${validateStringValue(alias[old], "alias", old)}`);
	    }
	  }
	  if (banner) {
	    for (let type in banner) {
	      if (type.indexOf("=") >= 0) throw new Error(`Invalid banner file type: ${type}`);
	      flags.push(`--banner:${type}=${validateStringValue(banner[type], "banner", type)}`);
	    }
	  }
	  if (footer) {
	    for (let type in footer) {
	      if (type.indexOf("=") >= 0) throw new Error(`Invalid footer file type: ${type}`);
	      flags.push(`--footer:${type}=${validateStringValue(footer[type], "footer", type)}`);
	    }
	  }
	  if (inject) for (let path3 of inject) flags.push(`--inject:${validateStringValue(path3, "inject")}`);
	  if (loader) {
	    for (let ext in loader) {
	      if (ext.indexOf("=") >= 0) throw new Error(`Invalid loader extension: ${ext}`);
	      flags.push(`--loader:${ext}=${validateStringValue(loader[ext], "loader", ext)}`);
	    }
	  }
	  if (outExtension) {
	    for (let ext in outExtension) {
	      if (ext.indexOf("=") >= 0) throw new Error(`Invalid out extension: ${ext}`);
	      flags.push(`--out-extension:${ext}=${validateStringValue(outExtension[ext], "out extension", ext)}`);
	    }
	  }
	  if (entryPoints) {
	    if (Array.isArray(entryPoints)) {
	      for (let i = 0, n = entryPoints.length; i < n; i++) {
	        let entryPoint = entryPoints[i];
	        if (typeof entryPoint === "object" && entryPoint !== null) {
	          let entryPointKeys = /* @__PURE__ */ Object.create(null);
	          let input = getFlag(entryPoint, entryPointKeys, "in", mustBeString);
	          let output = getFlag(entryPoint, entryPointKeys, "out", mustBeString);
	          checkForInvalidFlags(entryPoint, entryPointKeys, "in entry point at index " + i);
	          if (input === void 0) throw new Error('Missing property "in" for entry point at index ' + i);
	          if (output === void 0) throw new Error('Missing property "out" for entry point at index ' + i);
	          entries.push([output, input]);
	        } else {
	          entries.push(["", validateStringValue(entryPoint, "entry point at index " + i)]);
	        }
	      }
	    } else {
	      for (let key in entryPoints) {
	        entries.push([key, validateStringValue(entryPoints[key], "entry point", key)]);
	      }
	    }
	  }
	  if (stdin) {
	    let stdinKeys = /* @__PURE__ */ Object.create(null);
	    let contents = getFlag(stdin, stdinKeys, "contents", mustBeStringOrUint8Array);
	    let resolveDir = getFlag(stdin, stdinKeys, "resolveDir", mustBeString);
	    let sourcefile = getFlag(stdin, stdinKeys, "sourcefile", mustBeString);
	    let loader2 = getFlag(stdin, stdinKeys, "loader", mustBeString);
	    checkForInvalidFlags(stdin, stdinKeys, 'in "stdin" object');
	    if (sourcefile) flags.push(`--sourcefile=${sourcefile}`);
	    if (loader2) flags.push(`--loader=${loader2}`);
	    if (resolveDir) stdinResolveDir = resolveDir;
	    if (typeof contents === "string") stdinContents = encodeUTF8(contents);
	    else if (contents instanceof Uint8Array) stdinContents = contents;
	  }
	  let nodePaths = [];
	  if (nodePathsInput) {
	    for (let value of nodePathsInput) {
	      value += "";
	      nodePaths.push(value);
	    }
	  }
	  return {
	    entries,
	    flags,
	    write,
	    stdinContents,
	    stdinResolveDir,
	    absWorkingDir,
	    nodePaths,
	    mangleCache: validateMangleCache(mangleCache)
	  };
	}
	function flagsForTransformOptions(callName, options, isTTY2, logLevelDefault) {
	  let flags = [];
	  let keys = /* @__PURE__ */ Object.create(null);
	  pushLogFlags(flags, options, keys, isTTY2, logLevelDefault);
	  pushCommonFlags(flags, options, keys);
	  let sourcemap = getFlag(options, keys, "sourcemap", mustBeStringOrBoolean);
	  let sourcefile = getFlag(options, keys, "sourcefile", mustBeString);
	  let loader = getFlag(options, keys, "loader", mustBeString);
	  let banner = getFlag(options, keys, "banner", mustBeString);
	  let footer = getFlag(options, keys, "footer", mustBeString);
	  let mangleCache = getFlag(options, keys, "mangleCache", mustBeObject);
	  checkForInvalidFlags(options, keys, `in ${callName}() call`);
	  if (sourcemap) flags.push(`--sourcemap=${sourcemap === true ? "external" : sourcemap}`);
	  if (sourcefile) flags.push(`--sourcefile=${sourcefile}`);
	  if (loader) flags.push(`--loader=${loader}`);
	  if (banner) flags.push(`--banner=${banner}`);
	  if (footer) flags.push(`--footer=${footer}`);
	  return {
	    flags,
	    mangleCache: validateMangleCache(mangleCache)
	  };
	}
	function createChannel(streamIn) {
	  const requestCallbacksByKey = {};
	  const closeData = { didClose: false, reason: "" };
	  let responseCallbacks = {};
	  let nextRequestID = 0;
	  let nextBuildKey = 0;
	  let stdout = new Uint8Array(16 * 1024);
	  let stdoutUsed = 0;
	  let readFromStdout = (chunk) => {
	    let limit = stdoutUsed + chunk.length;
	    if (limit > stdout.length) {
	      let swap = new Uint8Array(limit * 2);
	      swap.set(stdout);
	      stdout = swap;
	    }
	    stdout.set(chunk, stdoutUsed);
	    stdoutUsed += chunk.length;
	    let offset = 0;
	    while (offset + 4 <= stdoutUsed) {
	      let length = readUInt32LE(stdout, offset);
	      if (offset + 4 + length > stdoutUsed) {
	        break;
	      }
	      offset += 4;
	      handleIncomingPacket(stdout.subarray(offset, offset + length));
	      offset += length;
	    }
	    if (offset > 0) {
	      stdout.copyWithin(0, offset, stdoutUsed);
	      stdoutUsed -= offset;
	    }
	  };
	  let afterClose = (error) => {
	    closeData.didClose = true;
	    if (error) closeData.reason = ": " + (error.message || error);
	    const text = "The service was stopped" + closeData.reason;
	    for (let id in responseCallbacks) {
	      responseCallbacks[id](text, null);
	    }
	    responseCallbacks = {};
	  };
	  let sendRequest = (refs, value, callback) => {
	    if (closeData.didClose) return callback("The service is no longer running" + closeData.reason, null);
	    let id = nextRequestID++;
	    responseCallbacks[id] = (error, response) => {
	      try {
	        callback(error, response);
	      } finally {
	        if (refs) refs.unref();
	      }
	    };
	    if (refs) refs.ref();
	    streamIn.writeToStdin(encodePacket({ id, isRequest: true, value }));
	  };
	  let sendResponse = (id, value) => {
	    if (closeData.didClose) throw new Error("The service is no longer running" + closeData.reason);
	    streamIn.writeToStdin(encodePacket({ id, isRequest: false, value }));
	  };
	  let handleRequest = async (id, request) => {
	    try {
	      if (request.command === "ping") {
	        sendResponse(id, {});
	        return;
	      }
	      if (typeof request.key === "number") {
	        const requestCallbacks = requestCallbacksByKey[request.key];
	        if (!requestCallbacks) {
	          return;
	        }
	        const callback = requestCallbacks[request.command];
	        if (callback) {
	          await callback(id, request);
	          return;
	        }
	      }
	      throw new Error(`Invalid command: ` + request.command);
	    } catch (e) {
	      const errors = [extractErrorMessageV8(e, streamIn, null, void 0, "")];
	      try {
	        sendResponse(id, { errors });
	      } catch {
	      }
	    }
	  };
	  let isFirstPacket = true;
	  let handleIncomingPacket = (bytes) => {
	    if (isFirstPacket) {
	      isFirstPacket = false;
	      let binaryVersion = String.fromCharCode(...bytes);
	      if (binaryVersion !== "0.25.2") {
	        throw new Error(`Cannot start service: Host version "${"0.25.2"}" does not match binary version ${quote(binaryVersion)}`);
	      }
	      return;
	    }
	    let packet = decodePacket(bytes);
	    if (packet.isRequest) {
	      handleRequest(packet.id, packet.value);
	    } else {
	      let callback = responseCallbacks[packet.id];
	      delete responseCallbacks[packet.id];
	      if (packet.value.error) callback(packet.value.error, {});
	      else callback(null, packet.value);
	    }
	  };
	  let buildOrContext = ({ callName, refs, options, isTTY: isTTY2, defaultWD: defaultWD2, callback }) => {
	    let refCount = 0;
	    const buildKey = nextBuildKey++;
	    const requestCallbacks = {};
	    const buildRefs = {
	      ref() {
	        if (++refCount === 1) {
	          if (refs) refs.ref();
	        }
	      },
	      unref() {
	        if (--refCount === 0) {
	          delete requestCallbacksByKey[buildKey];
	          if (refs) refs.unref();
	        }
	      }
	    };
	    requestCallbacksByKey[buildKey] = requestCallbacks;
	    buildRefs.ref();
	    buildOrContextImpl(
	      callName,
	      buildKey,
	      sendRequest,
	      sendResponse,
	      buildRefs,
	      streamIn,
	      requestCallbacks,
	      options,
	      isTTY2,
	      defaultWD2,
	      (err, res) => {
	        try {
	          callback(err, res);
	        } finally {
	          buildRefs.unref();
	        }
	      }
	    );
	  };
	  let transform2 = ({ callName, refs, input, options, isTTY: isTTY2, fs: fs3, callback }) => {
	    const details = createObjectStash();
	    let start = (inputPath) => {
	      try {
	        if (typeof input !== "string" && !(input instanceof Uint8Array))
	          throw new Error('The input to "transform" must be a string or a Uint8Array');
	        let {
	          flags,
	          mangleCache
	        } = flagsForTransformOptions(callName, options, isTTY2, transformLogLevelDefault);
	        let request = {
	          command: "transform",
	          flags,
	          inputFS: inputPath !== null,
	          input: inputPath !== null ? encodeUTF8(inputPath) : typeof input === "string" ? encodeUTF8(input) : input
	        };
	        if (mangleCache) request.mangleCache = mangleCache;
	        sendRequest(refs, request, (error, response) => {
	          if (error) return callback(new Error(error), null);
	          let errors = replaceDetailsInMessages(response.errors, details);
	          let warnings = replaceDetailsInMessages(response.warnings, details);
	          let outstanding = 1;
	          let next = () => {
	            if (--outstanding === 0) {
	              let result = {
	                warnings,
	                code: response.code,
	                map: response.map,
	                mangleCache: void 0,
	                legalComments: void 0
	              };
	              if ("legalComments" in response) result.legalComments = response == null ? void 0 : response.legalComments;
	              if (response.mangleCache) result.mangleCache = response == null ? void 0 : response.mangleCache;
	              callback(null, result);
	            }
	          };
	          if (errors.length > 0) return callback(failureErrorWithLog("Transform failed", errors, warnings), null);
	          if (response.codeFS) {
	            outstanding++;
	            fs3.readFile(response.code, (err, contents) => {
	              if (err !== null) {
	                callback(err, null);
	              } else {
	                response.code = contents;
	                next();
	              }
	            });
	          }
	          if (response.mapFS) {
	            outstanding++;
	            fs3.readFile(response.map, (err, contents) => {
	              if (err !== null) {
	                callback(err, null);
	              } else {
	                response.map = contents;
	                next();
	              }
	            });
	          }
	          next();
	        });
	      } catch (e) {
	        let flags = [];
	        try {
	          pushLogFlags(flags, options, {}, isTTY2, transformLogLevelDefault);
	        } catch {
	        }
	        const error = extractErrorMessageV8(e, streamIn, details, void 0, "");
	        sendRequest(refs, { command: "error", flags, error }, () => {
	          error.detail = details.load(error.detail);
	          callback(failureErrorWithLog("Transform failed", [error], []), null);
	        });
	      }
	    };
	    if ((typeof input === "string" || input instanceof Uint8Array) && input.length > 1024 * 1024) {
	      let next = start;
	      start = () => fs3.writeFile(input, next);
	    }
	    start(null);
	  };
	  let formatMessages2 = ({ callName, refs, messages, options, callback }) => {
	    if (!options) throw new Error(`Missing second argument in ${callName}() call`);
	    let keys = {};
	    let kind = getFlag(options, keys, "kind", mustBeString);
	    let color = getFlag(options, keys, "color", mustBeBoolean);
	    let terminalWidth = getFlag(options, keys, "terminalWidth", mustBeInteger);
	    checkForInvalidFlags(options, keys, `in ${callName}() call`);
	    if (kind === void 0) throw new Error(`Missing "kind" in ${callName}() call`);
	    if (kind !== "error" && kind !== "warning") throw new Error(`Expected "kind" to be "error" or "warning" in ${callName}() call`);
	    let request = {
	      command: "format-msgs",
	      messages: sanitizeMessages(messages, "messages", null, "", terminalWidth),
	      isWarning: kind === "warning"
	    };
	    if (color !== void 0) request.color = color;
	    if (terminalWidth !== void 0) request.terminalWidth = terminalWidth;
	    sendRequest(refs, request, (error, response) => {
	      if (error) return callback(new Error(error), null);
	      callback(null, response.messages);
	    });
	  };
	  let analyzeMetafile2 = ({ callName, refs, metafile, options, callback }) => {
	    if (options === void 0) options = {};
	    let keys = {};
	    let color = getFlag(options, keys, "color", mustBeBoolean);
	    let verbose = getFlag(options, keys, "verbose", mustBeBoolean);
	    checkForInvalidFlags(options, keys, `in ${callName}() call`);
	    let request = {
	      command: "analyze-metafile",
	      metafile
	    };
	    if (color !== void 0) request.color = color;
	    if (verbose !== void 0) request.verbose = verbose;
	    sendRequest(refs, request, (error, response) => {
	      if (error) return callback(new Error(error), null);
	      callback(null, response.result);
	    });
	  };
	  return {
	    readFromStdout,
	    afterClose,
	    service: {
	      buildOrContext,
	      transform: transform2,
	      formatMessages: formatMessages2,
	      analyzeMetafile: analyzeMetafile2
	    }
	  };
	}
	function buildOrContextImpl(callName, buildKey, sendRequest, sendResponse, refs, streamIn, requestCallbacks, options, isTTY2, defaultWD2, callback) {
	  const details = createObjectStash();
	  const isContext = callName === "context";
	  const handleError = (e, pluginName) => {
	    const flags = [];
	    try {
	      pushLogFlags(flags, options, {}, isTTY2, buildLogLevelDefault);
	    } catch {
	    }
	    const message = extractErrorMessageV8(e, streamIn, details, void 0, pluginName);
	    sendRequest(refs, { command: "error", flags, error: message }, () => {
	      message.detail = details.load(message.detail);
	      callback(failureErrorWithLog(isContext ? "Context failed" : "Build failed", [message], []), null);
	    });
	  };
	  let plugins;
	  if (typeof options === "object") {
	    const value = options.plugins;
	    if (value !== void 0) {
	      if (!Array.isArray(value)) return handleError(new Error(`"plugins" must be an array`), "");
	      plugins = value;
	    }
	  }
	  if (plugins && plugins.length > 0) {
	    if (streamIn.isSync) return handleError(new Error("Cannot use plugins in synchronous API calls"), "");
	    handlePlugins(
	      buildKey,
	      sendRequest,
	      sendResponse,
	      refs,
	      streamIn,
	      requestCallbacks,
	      options,
	      plugins,
	      details
	    ).then(
	      (result) => {
	        if (!result.ok) return handleError(result.error, result.pluginName);
	        try {
	          buildOrContextContinue(result.requestPlugins, result.runOnEndCallbacks, result.scheduleOnDisposeCallbacks);
	        } catch (e) {
	          handleError(e, "");
	        }
	      },
	      (e) => handleError(e, "")
	    );
	    return;
	  }
	  try {
	    buildOrContextContinue(null, (result, done) => done([], []), () => {
	    });
	  } catch (e) {
	    handleError(e, "");
	  }
	  function buildOrContextContinue(requestPlugins, runOnEndCallbacks, scheduleOnDisposeCallbacks) {
	    const writeDefault = streamIn.hasFS;
	    const {
	      entries,
	      flags,
	      write,
	      stdinContents,
	      stdinResolveDir,
	      absWorkingDir,
	      nodePaths,
	      mangleCache
	    } = flagsForBuildOptions(callName, options, isTTY2, buildLogLevelDefault, writeDefault);
	    if (write && !streamIn.hasFS) throw new Error(`The "write" option is unavailable in this environment`);
	    const request = {
	      command: "build",
	      key: buildKey,
	      entries,
	      flags,
	      write,
	      stdinContents,
	      stdinResolveDir,
	      absWorkingDir: absWorkingDir || defaultWD2,
	      nodePaths,
	      context: isContext
	    };
	    if (requestPlugins) request.plugins = requestPlugins;
	    if (mangleCache) request.mangleCache = mangleCache;
	    const buildResponseToResult = (response, callback2) => {
	      const result = {
	        errors: replaceDetailsInMessages(response.errors, details),
	        warnings: replaceDetailsInMessages(response.warnings, details),
	        outputFiles: void 0,
	        metafile: void 0,
	        mangleCache: void 0
	      };
	      const originalErrors = result.errors.slice();
	      const originalWarnings = result.warnings.slice();
	      if (response.outputFiles) result.outputFiles = response.outputFiles.map(convertOutputFiles);
	      if (response.metafile) result.metafile = JSON.parse(response.metafile);
	      if (response.mangleCache) result.mangleCache = response.mangleCache;
	      if (response.writeToStdout !== void 0) console.log(decodeUTF8(response.writeToStdout).replace(/\n$/, ""));
	      runOnEndCallbacks(result, (onEndErrors, onEndWarnings) => {
	        if (originalErrors.length > 0 || onEndErrors.length > 0) {
	          const error = failureErrorWithLog("Build failed", originalErrors.concat(onEndErrors), originalWarnings.concat(onEndWarnings));
	          return callback2(error, null, onEndErrors, onEndWarnings);
	        }
	        callback2(null, result, onEndErrors, onEndWarnings);
	      });
	    };
	    let latestResultPromise;
	    let provideLatestResult;
	    if (isContext)
	      requestCallbacks["on-end"] = (id, request2) => new Promise((resolve) => {
	        buildResponseToResult(request2, (err, result, onEndErrors, onEndWarnings) => {
	          const response = {
	            errors: onEndErrors,
	            warnings: onEndWarnings
	          };
	          if (provideLatestResult) provideLatestResult(err, result);
	          latestResultPromise = void 0;
	          provideLatestResult = void 0;
	          sendResponse(id, response);
	          resolve();
	        });
	      });
	    sendRequest(refs, request, (error, response) => {
	      if (error) return callback(new Error(error), null);
	      if (!isContext) {
	        return buildResponseToResult(response, (err, res) => {
	          scheduleOnDisposeCallbacks();
	          return callback(err, res);
	        });
	      }
	      if (response.errors.length > 0) {
	        return callback(failureErrorWithLog("Context failed", response.errors, response.warnings), null);
	      }
	      let didDispose = false;
	      const result = {
	        rebuild: () => {
	          if (!latestResultPromise) latestResultPromise = new Promise((resolve, reject) => {
	            let settlePromise;
	            provideLatestResult = (err, result2) => {
	              if (!settlePromise) settlePromise = () => err ? reject(err) : resolve(result2);
	            };
	            const triggerAnotherBuild = () => {
	              const request2 = {
	                command: "rebuild",
	                key: buildKey
	              };
	              sendRequest(refs, request2, (error2, response2) => {
	                if (error2) {
	                  reject(new Error(error2));
	                } else if (settlePromise) {
	                  settlePromise();
	                } else {
	                  triggerAnotherBuild();
	                }
	              });
	            };
	            triggerAnotherBuild();
	          });
	          return latestResultPromise;
	        },
	        watch: (options2 = {}) => new Promise((resolve, reject) => {
	          if (!streamIn.hasFS) throw new Error(`Cannot use the "watch" API in this environment`);
	          const keys = {};
	          checkForInvalidFlags(options2, keys, `in watch() call`);
	          const request2 = {
	            command: "watch",
	            key: buildKey
	          };
	          sendRequest(refs, request2, (error2) => {
	            if (error2) reject(new Error(error2));
	            else resolve(void 0);
	          });
	        }),
	        serve: (options2 = {}) => new Promise((resolve, reject) => {
	          if (!streamIn.hasFS) throw new Error(`Cannot use the "serve" API in this environment`);
	          const keys = {};
	          const port = getFlag(options2, keys, "port", mustBeValidPortNumber);
	          const host = getFlag(options2, keys, "host", mustBeString);
	          const servedir = getFlag(options2, keys, "servedir", mustBeString);
	          const keyfile = getFlag(options2, keys, "keyfile", mustBeString);
	          const certfile = getFlag(options2, keys, "certfile", mustBeString);
	          const fallback = getFlag(options2, keys, "fallback", mustBeString);
	          const onRequest = getFlag(options2, keys, "onRequest", mustBeFunction);
	          checkForInvalidFlags(options2, keys, `in serve() call`);
	          const request2 = {
	            command: "serve",
	            key: buildKey,
	            onRequest: !!onRequest
	          };
	          if (port !== void 0) request2.port = port;
	          if (host !== void 0) request2.host = host;
	          if (servedir !== void 0) request2.servedir = servedir;
	          if (keyfile !== void 0) request2.keyfile = keyfile;
	          if (certfile !== void 0) request2.certfile = certfile;
	          if (fallback !== void 0) request2.fallback = fallback;
	          sendRequest(refs, request2, (error2, response2) => {
	            if (error2) return reject(new Error(error2));
	            if (onRequest) {
	              requestCallbacks["serve-request"] = (id, request3) => {
	                onRequest(request3.args);
	                sendResponse(id, {});
	              };
	            }
	            resolve(response2);
	          });
	        }),
	        cancel: () => new Promise((resolve) => {
	          if (didDispose) return resolve();
	          const request2 = {
	            command: "cancel",
	            key: buildKey
	          };
	          sendRequest(refs, request2, () => {
	            resolve();
	          });
	        }),
	        dispose: () => new Promise((resolve) => {
	          if (didDispose) return resolve();
	          didDispose = true;
	          const request2 = {
	            command: "dispose",
	            key: buildKey
	          };
	          sendRequest(refs, request2, () => {
	            resolve();
	            scheduleOnDisposeCallbacks();
	            refs.unref();
	          });
	        })
	      };
	      refs.ref();
	      callback(null, result);
	    });
	  }
	}
	var handlePlugins = async (buildKey, sendRequest, sendResponse, refs, streamIn, requestCallbacks, initialOptions, plugins, details) => {
	  let onStartCallbacks = [];
	  let onEndCallbacks = [];
	  let onResolveCallbacks = {};
	  let onLoadCallbacks = {};
	  let onDisposeCallbacks = [];
	  let nextCallbackID = 0;
	  let i = 0;
	  let requestPlugins = [];
	  let isSetupDone = false;
	  plugins = [...plugins];
	  for (let item of plugins) {
	    let keys = {};
	    if (typeof item !== "object") throw new Error(`Plugin at index ${i} must be an object`);
	    const name = getFlag(item, keys, "name", mustBeString);
	    if (typeof name !== "string" || name === "") throw new Error(`Plugin at index ${i} is missing a name`);
	    try {
	      let setup = getFlag(item, keys, "setup", mustBeFunction);
	      if (typeof setup !== "function") throw new Error(`Plugin is missing a setup function`);
	      checkForInvalidFlags(item, keys, `on plugin ${quote(name)}`);
	      let plugin = {
	        name,
	        onStart: false,
	        onEnd: false,
	        onResolve: [],
	        onLoad: []
	      };
	      i++;
	      let resolve = (path3, options = {}) => {
	        if (!isSetupDone) throw new Error('Cannot call "resolve" before plugin setup has completed');
	        if (typeof path3 !== "string") throw new Error(`The path to resolve must be a string`);
	        let keys2 = /* @__PURE__ */ Object.create(null);
	        let pluginName = getFlag(options, keys2, "pluginName", mustBeString);
	        let importer = getFlag(options, keys2, "importer", mustBeString);
	        let namespace = getFlag(options, keys2, "namespace", mustBeString);
	        let resolveDir = getFlag(options, keys2, "resolveDir", mustBeString);
	        let kind = getFlag(options, keys2, "kind", mustBeString);
	        let pluginData = getFlag(options, keys2, "pluginData", canBeAnything);
	        let importAttributes = getFlag(options, keys2, "with", mustBeObject);
	        checkForInvalidFlags(options, keys2, "in resolve() call");
	        return new Promise((resolve2, reject) => {
	          const request = {
	            command: "resolve",
	            path: path3,
	            key: buildKey,
	            pluginName: name
	          };
	          if (pluginName != null) request.pluginName = pluginName;
	          if (importer != null) request.importer = importer;
	          if (namespace != null) request.namespace = namespace;
	          if (resolveDir != null) request.resolveDir = resolveDir;
	          if (kind != null) request.kind = kind;
	          else throw new Error(`Must specify "kind" when calling "resolve"`);
	          if (pluginData != null) request.pluginData = details.store(pluginData);
	          if (importAttributes != null) request.with = sanitizeStringMap(importAttributes, "with");
	          sendRequest(refs, request, (error, response) => {
	            if (error !== null) reject(new Error(error));
	            else resolve2({
	              errors: replaceDetailsInMessages(response.errors, details),
	              warnings: replaceDetailsInMessages(response.warnings, details),
	              path: response.path,
	              external: response.external,
	              sideEffects: response.sideEffects,
	              namespace: response.namespace,
	              suffix: response.suffix,
	              pluginData: details.load(response.pluginData)
	            });
	          });
	        });
	      };
	      let promise = setup({
	        initialOptions,
	        resolve,
	        onStart(callback) {
	          let registeredText = `This error came from the "onStart" callback registered here:`;
	          let registeredNote = extractCallerV8(new Error(registeredText), streamIn, "onStart");
	          onStartCallbacks.push({ name, callback, note: registeredNote });
	          plugin.onStart = true;
	        },
	        onEnd(callback) {
	          let registeredText = `This error came from the "onEnd" callback registered here:`;
	          let registeredNote = extractCallerV8(new Error(registeredText), streamIn, "onEnd");
	          onEndCallbacks.push({ name, callback, note: registeredNote });
	          plugin.onEnd = true;
	        },
	        onResolve(options, callback) {
	          let registeredText = `This error came from the "onResolve" callback registered here:`;
	          let registeredNote = extractCallerV8(new Error(registeredText), streamIn, "onResolve");
	          let keys2 = {};
	          let filter = getFlag(options, keys2, "filter", mustBeRegExp);
	          let namespace = getFlag(options, keys2, "namespace", mustBeString);
	          checkForInvalidFlags(options, keys2, `in onResolve() call for plugin ${quote(name)}`);
	          if (filter == null) throw new Error(`onResolve() call is missing a filter`);
	          let id = nextCallbackID++;
	          onResolveCallbacks[id] = { name, callback, note: registeredNote };
	          plugin.onResolve.push({ id, filter: jsRegExpToGoRegExp(filter), namespace: namespace || "" });
	        },
	        onLoad(options, callback) {
	          let registeredText = `This error came from the "onLoad" callback registered here:`;
	          let registeredNote = extractCallerV8(new Error(registeredText), streamIn, "onLoad");
	          let keys2 = {};
	          let filter = getFlag(options, keys2, "filter", mustBeRegExp);
	          let namespace = getFlag(options, keys2, "namespace", mustBeString);
	          checkForInvalidFlags(options, keys2, `in onLoad() call for plugin ${quote(name)}`);
	          if (filter == null) throw new Error(`onLoad() call is missing a filter`);
	          let id = nextCallbackID++;
	          onLoadCallbacks[id] = { name, callback, note: registeredNote };
	          plugin.onLoad.push({ id, filter: jsRegExpToGoRegExp(filter), namespace: namespace || "" });
	        },
	        onDispose(callback) {
	          onDisposeCallbacks.push(callback);
	        },
	        esbuild: streamIn.esbuild
	      });
	      if (promise) await promise;
	      requestPlugins.push(plugin);
	    } catch (e) {
	      return { ok: false, error: e, pluginName: name };
	    }
	  }
	  requestCallbacks["on-start"] = async (id, request) => {
	    details.clear();
	    let response = { errors: [], warnings: [] };
	    await Promise.all(onStartCallbacks.map(async ({ name, callback, note }) => {
	      try {
	        let result = await callback();
	        if (result != null) {
	          if (typeof result !== "object") throw new Error(`Expected onStart() callback in plugin ${quote(name)} to return an object`);
	          let keys = {};
	          let errors = getFlag(result, keys, "errors", mustBeArray);
	          let warnings = getFlag(result, keys, "warnings", mustBeArray);
	          checkForInvalidFlags(result, keys, `from onStart() callback in plugin ${quote(name)}`);
	          if (errors != null) response.errors.push(...sanitizeMessages(errors, "errors", details, name, void 0));
	          if (warnings != null) response.warnings.push(...sanitizeMessages(warnings, "warnings", details, name, void 0));
	        }
	      } catch (e) {
	        response.errors.push(extractErrorMessageV8(e, streamIn, details, note && note(), name));
	      }
	    }));
	    sendResponse(id, response);
	  };
	  requestCallbacks["on-resolve"] = async (id, request) => {
	    let response = {}, name = "", callback, note;
	    for (let id2 of request.ids) {
	      try {
	        ({ name, callback, note } = onResolveCallbacks[id2]);
	        let result = await callback({
	          path: request.path,
	          importer: request.importer,
	          namespace: request.namespace,
	          resolveDir: request.resolveDir,
	          kind: request.kind,
	          pluginData: details.load(request.pluginData),
	          with: request.with
	        });
	        if (result != null) {
	          if (typeof result !== "object") throw new Error(`Expected onResolve() callback in plugin ${quote(name)} to return an object`);
	          let keys = {};
	          let pluginName = getFlag(result, keys, "pluginName", mustBeString);
	          let path3 = getFlag(result, keys, "path", mustBeString);
	          let namespace = getFlag(result, keys, "namespace", mustBeString);
	          let suffix = getFlag(result, keys, "suffix", mustBeString);
	          let external = getFlag(result, keys, "external", mustBeBoolean);
	          let sideEffects = getFlag(result, keys, "sideEffects", mustBeBoolean);
	          let pluginData = getFlag(result, keys, "pluginData", canBeAnything);
	          let errors = getFlag(result, keys, "errors", mustBeArray);
	          let warnings = getFlag(result, keys, "warnings", mustBeArray);
	          let watchFiles = getFlag(result, keys, "watchFiles", mustBeArray);
	          let watchDirs = getFlag(result, keys, "watchDirs", mustBeArray);
	          checkForInvalidFlags(result, keys, `from onResolve() callback in plugin ${quote(name)}`);
	          response.id = id2;
	          if (pluginName != null) response.pluginName = pluginName;
	          if (path3 != null) response.path = path3;
	          if (namespace != null) response.namespace = namespace;
	          if (suffix != null) response.suffix = suffix;
	          if (external != null) response.external = external;
	          if (sideEffects != null) response.sideEffects = sideEffects;
	          if (pluginData != null) response.pluginData = details.store(pluginData);
	          if (errors != null) response.errors = sanitizeMessages(errors, "errors", details, name, void 0);
	          if (warnings != null) response.warnings = sanitizeMessages(warnings, "warnings", details, name, void 0);
	          if (watchFiles != null) response.watchFiles = sanitizeStringArray(watchFiles, "watchFiles");
	          if (watchDirs != null) response.watchDirs = sanitizeStringArray(watchDirs, "watchDirs");
	          break;
	        }
	      } catch (e) {
	        response = { id: id2, errors: [extractErrorMessageV8(e, streamIn, details, note && note(), name)] };
	        break;
	      }
	    }
	    sendResponse(id, response);
	  };
	  requestCallbacks["on-load"] = async (id, request) => {
	    let response = {}, name = "", callback, note;
	    for (let id2 of request.ids) {
	      try {
	        ({ name, callback, note } = onLoadCallbacks[id2]);
	        let result = await callback({
	          path: request.path,
	          namespace: request.namespace,
	          suffix: request.suffix,
	          pluginData: details.load(request.pluginData),
	          with: request.with
	        });
	        if (result != null) {
	          if (typeof result !== "object") throw new Error(`Expected onLoad() callback in plugin ${quote(name)} to return an object`);
	          let keys = {};
	          let pluginName = getFlag(result, keys, "pluginName", mustBeString);
	          let contents = getFlag(result, keys, "contents", mustBeStringOrUint8Array);
	          let resolveDir = getFlag(result, keys, "resolveDir", mustBeString);
	          let pluginData = getFlag(result, keys, "pluginData", canBeAnything);
	          let loader = getFlag(result, keys, "loader", mustBeString);
	          let errors = getFlag(result, keys, "errors", mustBeArray);
	          let warnings = getFlag(result, keys, "warnings", mustBeArray);
	          let watchFiles = getFlag(result, keys, "watchFiles", mustBeArray);
	          let watchDirs = getFlag(result, keys, "watchDirs", mustBeArray);
	          checkForInvalidFlags(result, keys, `from onLoad() callback in plugin ${quote(name)}`);
	          response.id = id2;
	          if (pluginName != null) response.pluginName = pluginName;
	          if (contents instanceof Uint8Array) response.contents = contents;
	          else if (contents != null) response.contents = encodeUTF8(contents);
	          if (resolveDir != null) response.resolveDir = resolveDir;
	          if (pluginData != null) response.pluginData = details.store(pluginData);
	          if (loader != null) response.loader = loader;
	          if (errors != null) response.errors = sanitizeMessages(errors, "errors", details, name, void 0);
	          if (warnings != null) response.warnings = sanitizeMessages(warnings, "warnings", details, name, void 0);
	          if (watchFiles != null) response.watchFiles = sanitizeStringArray(watchFiles, "watchFiles");
	          if (watchDirs != null) response.watchDirs = sanitizeStringArray(watchDirs, "watchDirs");
	          break;
	        }
	      } catch (e) {
	        response = { id: id2, errors: [extractErrorMessageV8(e, streamIn, details, note && note(), name)] };
	        break;
	      }
	    }
	    sendResponse(id, response);
	  };
	  let runOnEndCallbacks = (result, done) => done([], []);
	  if (onEndCallbacks.length > 0) {
	    runOnEndCallbacks = (result, done) => {
	      (async () => {
	        const onEndErrors = [];
	        const onEndWarnings = [];
	        for (const { name, callback, note } of onEndCallbacks) {
	          let newErrors;
	          let newWarnings;
	          try {
	            const value = await callback(result);
	            if (value != null) {
	              if (typeof value !== "object") throw new Error(`Expected onEnd() callback in plugin ${quote(name)} to return an object`);
	              let keys = {};
	              let errors = getFlag(value, keys, "errors", mustBeArray);
	              let warnings = getFlag(value, keys, "warnings", mustBeArray);
	              checkForInvalidFlags(value, keys, `from onEnd() callback in plugin ${quote(name)}`);
	              if (errors != null) newErrors = sanitizeMessages(errors, "errors", details, name, void 0);
	              if (warnings != null) newWarnings = sanitizeMessages(warnings, "warnings", details, name, void 0);
	            }
	          } catch (e) {
	            newErrors = [extractErrorMessageV8(e, streamIn, details, note && note(), name)];
	          }
	          if (newErrors) {
	            onEndErrors.push(...newErrors);
	            try {
	              result.errors.push(...newErrors);
	            } catch {
	            }
	          }
	          if (newWarnings) {
	            onEndWarnings.push(...newWarnings);
	            try {
	              result.warnings.push(...newWarnings);
	            } catch {
	            }
	          }
	        }
	        done(onEndErrors, onEndWarnings);
	      })();
	    };
	  }
	  let scheduleOnDisposeCallbacks = () => {
	    for (const cb of onDisposeCallbacks) {
	      setTimeout(() => cb(), 0);
	    }
	  };
	  isSetupDone = true;
	  return {
	    ok: true,
	    requestPlugins,
	    runOnEndCallbacks,
	    scheduleOnDisposeCallbacks
	  };
	};
	function createObjectStash() {
	  const map = /* @__PURE__ */ new Map();
	  let nextID = 0;
	  return {
	    clear() {
	      map.clear();
	    },
	    load(id) {
	      return map.get(id);
	    },
	    store(value) {
	      if (value === void 0) return -1;
	      const id = nextID++;
	      map.set(id, value);
	      return id;
	    }
	  };
	}
	function extractCallerV8(e, streamIn, ident) {
	  let note;
	  let tried = false;
	  return () => {
	    if (tried) return note;
	    tried = true;
	    try {
	      let lines = (e.stack + "").split("\n");
	      lines.splice(1, 1);
	      let location = parseStackLinesV8(streamIn, lines, ident);
	      if (location) {
	        note = { text: e.message, location };
	        return note;
	      }
	    } catch {
	    }
	  };
	}
	function extractErrorMessageV8(e, streamIn, stash, note, pluginName) {
	  let text = "Internal error";
	  let location = null;
	  try {
	    text = (e && e.message || e) + "";
	  } catch {
	  }
	  try {
	    location = parseStackLinesV8(streamIn, (e.stack + "").split("\n"), "");
	  } catch {
	  }
	  return { id: "", pluginName, text, location, notes: note ? [note] : [], detail: stash ? stash.store(e) : -1 };
	}
	function parseStackLinesV8(streamIn, lines, ident) {
	  let at = "    at ";
	  if (streamIn.readFileSync && !lines[0].startsWith(at) && lines[1].startsWith(at)) {
	    for (let i = 1; i < lines.length; i++) {
	      let line = lines[i];
	      if (!line.startsWith(at)) continue;
	      line = line.slice(at.length);
	      while (true) {
	        let match = /^(?:new |async )?\S+ \((.*)\)$/.exec(line);
	        if (match) {
	          line = match[1];
	          continue;
	        }
	        match = /^eval at \S+ \((.*)\)(?:, \S+:\d+:\d+)?$/.exec(line);
	        if (match) {
	          line = match[1];
	          continue;
	        }
	        match = /^(\S+):(\d+):(\d+)$/.exec(line);
	        if (match) {
	          let contents;
	          try {
	            contents = streamIn.readFileSync(match[1], "utf8");
	          } catch {
	            break;
	          }
	          let lineText = contents.split(/\r\n|\r|\n|\u2028|\u2029/)[+match[2] - 1] || "";
	          let column = +match[3] - 1;
	          let length = lineText.slice(column, column + ident.length) === ident ? ident.length : 0;
	          return {
	            file: match[1],
	            namespace: "file",
	            line: +match[2],
	            column: encodeUTF8(lineText.slice(0, column)).length,
	            length: encodeUTF8(lineText.slice(column, column + length)).length,
	            lineText: lineText + "\n" + lines.slice(1).join("\n"),
	            suggestion: ""
	          };
	        }
	        break;
	      }
	    }
	  }
	  return null;
	}
	function failureErrorWithLog(text, errors, warnings) {
	  let limit = 5;
	  text += errors.length < 1 ? "" : ` with ${errors.length} error${errors.length < 2 ? "" : "s"}:` + errors.slice(0, limit + 1).map((e, i) => {
	    if (i === limit) return "\n...";
	    if (!e.location) return `
error: ${e.text}`;
	    let { file, line, column } = e.location;
	    let pluginText = e.pluginName ? `[plugin: ${e.pluginName}] ` : "";
	    return `
${file}:${line}:${column}: ERROR: ${pluginText}${e.text}`;
	  }).join("");
	  let error = new Error(text);
	  for (const [key, value] of [["errors", errors], ["warnings", warnings]]) {
	    Object.defineProperty(error, key, {
	      configurable: true,
	      enumerable: true,
	      get: () => value,
	      set: (value2) => Object.defineProperty(error, key, {
	        configurable: true,
	        enumerable: true,
	        value: value2
	      })
	    });
	  }
	  return error;
	}
	function replaceDetailsInMessages(messages, stash) {
	  for (const message of messages) {
	    message.detail = stash.load(message.detail);
	  }
	  return messages;
	}
	function sanitizeLocation(location, where, terminalWidth) {
	  if (location == null) return null;
	  let keys = {};
	  let file = getFlag(location, keys, "file", mustBeString);
	  let namespace = getFlag(location, keys, "namespace", mustBeString);
	  let line = getFlag(location, keys, "line", mustBeInteger);
	  let column = getFlag(location, keys, "column", mustBeInteger);
	  let length = getFlag(location, keys, "length", mustBeInteger);
	  let lineText = getFlag(location, keys, "lineText", mustBeString);
	  let suggestion = getFlag(location, keys, "suggestion", mustBeString);
	  checkForInvalidFlags(location, keys, where);
	  if (lineText) {
	    const relevantASCII = lineText.slice(
	      0,
	      (column && column > 0 ? column : 0) + (length && length > 0 ? length : 0) + (terminalWidth && terminalWidth > 0 ? terminalWidth : 80)
	    );
	    if (!/[\x7F-\uFFFF]/.test(relevantASCII) && !/\n/.test(lineText)) {
	      lineText = relevantASCII;
	    }
	  }
	  return {
	    file: file || "",
	    namespace: namespace || "",
	    line: line || 0,
	    column: column || 0,
	    length: length || 0,
	    lineText: lineText || "",
	    suggestion: suggestion || ""
	  };
	}
	function sanitizeMessages(messages, property, stash, fallbackPluginName, terminalWidth) {
	  let messagesClone = [];
	  let index = 0;
	  for (const message of messages) {
	    let keys = {};
	    let id = getFlag(message, keys, "id", mustBeString);
	    let pluginName = getFlag(message, keys, "pluginName", mustBeString);
	    let text = getFlag(message, keys, "text", mustBeString);
	    let location = getFlag(message, keys, "location", mustBeObjectOrNull);
	    let notes = getFlag(message, keys, "notes", mustBeArray);
	    let detail = getFlag(message, keys, "detail", canBeAnything);
	    let where = `in element ${index} of "${property}"`;
	    checkForInvalidFlags(message, keys, where);
	    let notesClone = [];
	    if (notes) {
	      for (const note of notes) {
	        let noteKeys = {};
	        let noteText = getFlag(note, noteKeys, "text", mustBeString);
	        let noteLocation = getFlag(note, noteKeys, "location", mustBeObjectOrNull);
	        checkForInvalidFlags(note, noteKeys, where);
	        notesClone.push({
	          text: noteText || "",
	          location: sanitizeLocation(noteLocation, where, terminalWidth)
	        });
	      }
	    }
	    messagesClone.push({
	      id: id || "",
	      pluginName: pluginName || fallbackPluginName,
	      text: text || "",
	      location: sanitizeLocation(location, where, terminalWidth),
	      notes: notesClone,
	      detail: stash ? stash.store(detail) : -1
	    });
	    index++;
	  }
	  return messagesClone;
	}
	function sanitizeStringArray(values, property) {
	  const result = [];
	  for (const value of values) {
	    if (typeof value !== "string") throw new Error(`${quote(property)} must be an array of strings`);
	    result.push(value);
	  }
	  return result;
	}
	function sanitizeStringMap(map, property) {
	  const result = /* @__PURE__ */ Object.create(null);
	  for (const key in map) {
	    const value = map[key];
	    if (typeof value !== "string") throw new Error(`key ${quote(key)} in object ${quote(property)} must be a string`);
	    result[key] = value;
	  }
	  return result;
	}
	function convertOutputFiles({ path: path3, contents, hash }) {
	  let text = null;
	  return {
	    path: path3,
	    contents,
	    hash,
	    get text() {
	      const binary = this.contents;
	      if (text === null || binary !== contents) {
	        contents = binary;
	        text = decodeUTF8(binary);
	      }
	      return text;
	    }
	  };
	}
	function jsRegExpToGoRegExp(regexp) {
	  let result = regexp.source;
	  if (regexp.flags) result = `(?${regexp.flags})${result}`;
	  return result;
	}

	// lib/npm/node-platform.ts
	var fs = require$$0;
	var os = require$$1;
	var path = require$$0$1;
	var ESBUILD_BINARY_PATH = process.env.ESBUILD_BINARY_PATH || ESBUILD_BINARY_PATH;
	var isValidBinaryPath = (x) => !!x && x !== "/usr/bin/esbuild";
	var packageDarwin_arm64 = "@esbuild/darwin-arm64";
	var packageDarwin_x64 = "@esbuild/darwin-x64";
	var knownWindowsPackages = {
	  "win32 arm64 LE": "@esbuild/win32-arm64",
	  "win32 ia32 LE": "@esbuild/win32-ia32",
	  "win32 x64 LE": "@esbuild/win32-x64"
	};
	var knownUnixlikePackages = {
	  "aix ppc64 BE": "@esbuild/aix-ppc64",
	  "android arm64 LE": "@esbuild/android-arm64",
	  "darwin arm64 LE": "@esbuild/darwin-arm64",
	  "darwin x64 LE": "@esbuild/darwin-x64",
	  "freebsd arm64 LE": "@esbuild/freebsd-arm64",
	  "freebsd x64 LE": "@esbuild/freebsd-x64",
	  "linux arm LE": "@esbuild/linux-arm",
	  "linux arm64 LE": "@esbuild/linux-arm64",
	  "linux ia32 LE": "@esbuild/linux-ia32",
	  "linux mips64el LE": "@esbuild/linux-mips64el",
	  "linux ppc64 LE": "@esbuild/linux-ppc64",
	  "linux riscv64 LE": "@esbuild/linux-riscv64",
	  "linux s390x BE": "@esbuild/linux-s390x",
	  "linux x64 LE": "@esbuild/linux-x64",
	  "linux loong64 LE": "@esbuild/linux-loong64",
	  "netbsd arm64 LE": "@esbuild/netbsd-arm64",
	  "netbsd x64 LE": "@esbuild/netbsd-x64",
	  "openbsd arm64 LE": "@esbuild/openbsd-arm64",
	  "openbsd x64 LE": "@esbuild/openbsd-x64",
	  "sunos x64 LE": "@esbuild/sunos-x64"
	};
	var knownWebAssemblyFallbackPackages = {
	  "android arm LE": "@esbuild/android-arm",
	  "android x64 LE": "@esbuild/android-x64"
	};
	function pkgAndSubpathForCurrentPlatform() {
	  let pkg;
	  let subpath;
	  let isWASM = false;
	  let platformKey = `${process.platform} ${os.arch()} ${os.endianness()}`;
	  if (platformKey in knownWindowsPackages) {
	    pkg = knownWindowsPackages[platformKey];
	    subpath = "esbuild.exe";
	  } else if (platformKey in knownUnixlikePackages) {
	    pkg = knownUnixlikePackages[platformKey];
	    subpath = "bin/esbuild";
	  } else if (platformKey in knownWebAssemblyFallbackPackages) {
	    pkg = knownWebAssemblyFallbackPackages[platformKey];
	    subpath = "bin/esbuild";
	    isWASM = true;
	  } else {
	    throw new Error(`Unsupported platform: ${platformKey}`);
	  }
	  return { pkg, subpath, isWASM };
	}
	function pkgForSomeOtherPlatform() {
	  const libMainJS = require.resolve("esbuild");
	  const nodeModulesDirectory = path.dirname(path.dirname(path.dirname(libMainJS)));
	  if (path.basename(nodeModulesDirectory) === "node_modules") {
	    for (const unixKey in knownUnixlikePackages) {
	      try {
	        const pkg = knownUnixlikePackages[unixKey];
	        if (fs.existsSync(path.join(nodeModulesDirectory, pkg))) return pkg;
	      } catch {
	      }
	    }
	    for (const windowsKey in knownWindowsPackages) {
	      try {
	        const pkg = knownWindowsPackages[windowsKey];
	        if (fs.existsSync(path.join(nodeModulesDirectory, pkg))) return pkg;
	      } catch {
	      }
	    }
	  }
	  return null;
	}
	function downloadedBinPath(pkg, subpath) {
	  const esbuildLibDir = path.dirname(require.resolve("esbuild"));
	  return path.join(esbuildLibDir, `downloaded-${pkg.replace("/", "-")}-${path.basename(subpath)}`);
	}
	function generateBinPath() {
	  if (isValidBinaryPath(ESBUILD_BINARY_PATH)) {
	    if (!fs.existsSync(ESBUILD_BINARY_PATH)) {
	      console.warn(`[esbuild] Ignoring bad configuration: ESBUILD_BINARY_PATH=${ESBUILD_BINARY_PATH}`);
	    } else {
	      return { binPath: ESBUILD_BINARY_PATH, isWASM: false };
	    }
	  }
	  const { pkg, subpath, isWASM } = pkgAndSubpathForCurrentPlatform();
	  let binPath;
	  try {
	    binPath = require.resolve(`${pkg}/${subpath}`);
	  } catch (e) {
	    binPath = downloadedBinPath(pkg, subpath);
	    if (!fs.existsSync(binPath)) {
	      try {
	        require.resolve(pkg);
	      } catch {
	        const otherPkg = pkgForSomeOtherPlatform();
	        if (otherPkg) {
	          let suggestions = `
Specifically the "${otherPkg}" package is present but this platform
needs the "${pkg}" package instead. People often get into this
situation by installing esbuild on Windows or macOS and copying "node_modules"
into a Docker image that runs Linux, or by copying "node_modules" between
Windows and WSL environments.

If you are installing with npm, you can try not copying the "node_modules"
directory when you copy the files over, and running "npm ci" or "npm install"
on the destination platform after the copy. Or you could consider using yarn
instead of npm which has built-in support for installing a package on multiple
platforms simultaneously.

If you are installing with yarn, you can try listing both this platform and the
other platform in your ".yarnrc.yml" file using the "supportedArchitectures"
feature: https://yarnpkg.com/configuration/yarnrc/#supportedArchitectures
Keep in mind that this means multiple copies of esbuild will be present.
`;
	          if (pkg === packageDarwin_x64 && otherPkg === packageDarwin_arm64 || pkg === packageDarwin_arm64 && otherPkg === packageDarwin_x64) {
	            suggestions = `
Specifically the "${otherPkg}" package is present but this platform
needs the "${pkg}" package instead. People often get into this
situation by installing esbuild with npm running inside of Rosetta 2 and then
trying to use it with node running outside of Rosetta 2, or vice versa (Rosetta
2 is Apple's on-the-fly x86_64-to-arm64 translation service).

If you are installing with npm, you can try ensuring that both npm and node are
not running under Rosetta 2 and then reinstalling esbuild. This likely involves
changing how you installed npm and/or node. For example, installing node with
the universal installer here should work: https://nodejs.org/en/download/. Or
you could consider using yarn instead of npm which has built-in support for
installing a package on multiple platforms simultaneously.

If you are installing with yarn, you can try listing both "arm64" and "x64"
in your ".yarnrc.yml" file using the "supportedArchitectures" feature:
https://yarnpkg.com/configuration/yarnrc/#supportedArchitectures
Keep in mind that this means multiple copies of esbuild will be present.
`;
	          }
	          throw new Error(`
You installed esbuild for another platform than the one you're currently using.
This won't work because esbuild is written with native code and needs to
install a platform-specific binary executable.
${suggestions}
Another alternative is to use the "esbuild-wasm" package instead, which works
the same way on all platforms. But it comes with a heavy performance cost and
can sometimes be 10x slower than the "esbuild" package, so you may also not
want to do that.
`);
	        }
	        throw new Error(`The package "${pkg}" could not be found, and is needed by esbuild.

If you are installing esbuild with npm, make sure that you don't specify the
"--no-optional" or "--omit=optional" flags. The "optionalDependencies" feature
of "package.json" is used by esbuild to install the correct binary executable
for your current platform.`);
	      }
	      throw e;
	    }
	  }
	  if (/\.zip\//.test(binPath)) {
	    let pnpapi;
	    try {
	      pnpapi = require("pnpapi");
	    } catch (e) {
	    }
	    if (pnpapi) {
	      const root = pnpapi.getPackageInformation(pnpapi.topLevel).packageLocation;
	      const binTargetPath = path.join(
	        root,
	        "node_modules",
	        ".cache",
	        "esbuild",
	        `pnpapi-${pkg.replace("/", "-")}-${"0.25.2"}-${path.basename(subpath)}`
	      );
	      if (!fs.existsSync(binTargetPath)) {
	        fs.mkdirSync(path.dirname(binTargetPath), { recursive: true });
	        fs.copyFileSync(binPath, binTargetPath);
	        fs.chmodSync(binTargetPath, 493);
	      }
	      return { binPath: binTargetPath, isWASM };
	    }
	  }
	  return { binPath, isWASM };
	}

	// lib/npm/node.ts
	var child_process = require$$4;
	var crypto = require$$5;
	var path2 = require$$0$1;
	var fs2 = require$$0;
	var os2 = require$$1;
	var tty = require$$6;
	var worker_threads;
	if (process.env.ESBUILD_WORKER_THREADS !== "0") {
	  try {
	    worker_threads = require("worker_threads");
	  } catch {
	  }
	  let [major, minor] = process.versions.node.split(".");
	  if (
	    // <v12.17.0 does not work
	    +major < 12 || +major === 12 && +minor < 17 || +major === 13 && +minor < 13
	  ) {
	    worker_threads = void 0;
	  }
	}
	var _a;
	var isInternalWorkerThread = ((_a = worker_threads == null ? void 0 : worker_threads.workerData) == null ? void 0 : _a.esbuildVersion) === "0.25.2";
	var esbuildCommandAndArgs = () => {
	  if ((!ESBUILD_BINARY_PATH || false) && (path2.basename(__filename) !== "main.js" || path2.basename(__dirname) !== "lib")) {
	    throw new Error(
	      `The esbuild JavaScript API cannot be bundled. Please mark the "esbuild" package as external so it's not included in the bundle.

	More information: The file containing the code for esbuild's JavaScript API (${__filename}) does not appear to be inside the esbuild package on the file system, which usually means that the esbuild package was bundled into another file. This is problematic because the API needs to run a binary executable inside the esbuild package which is located using a relative path from the API code to the executable. If the esbuild package is bundled, the relative path will be incorrect and the executable won't be found.`
	    );
	  }
	  {
	    const { binPath, isWASM } = generateBinPath();
	    if (isWASM) {
	      return ["node", [binPath]];
	    } else {
	      return [binPath, []];
	    }
	  }
	};
	var isTTY = () => tty.isatty(2);
	var fsSync = {
	  readFile(tempFile, callback) {
	    try {
	      let contents = fs2.readFileSync(tempFile, "utf8");
	      try {
	        fs2.unlinkSync(tempFile);
	      } catch {
	      }
	      callback(null, contents);
	    } catch (err) {
	      callback(err, null);
	    }
	  },
	  writeFile(contents, callback) {
	    try {
	      let tempFile = randomFileName();
	      fs2.writeFileSync(tempFile, contents);
	      callback(tempFile);
	    } catch {
	      callback(null);
	    }
	  }
	};
	var fsAsync = {
	  readFile(tempFile, callback) {
	    try {
	      fs2.readFile(tempFile, "utf8", (err, contents) => {
	        try {
	          fs2.unlink(tempFile, () => callback(err, contents));
	        } catch {
	          callback(err, contents);
	        }
	      });
	    } catch (err) {
	      callback(err, null);
	    }
	  },
	  writeFile(contents, callback) {
	    try {
	      let tempFile = randomFileName();
	      fs2.writeFile(tempFile, contents, (err) => err !== null ? callback(null) : callback(tempFile));
	    } catch {
	      callback(null);
	    }
	  }
	};
	var version = "0.25.2";
	var build = (options) => ensureServiceIsRunning().build(options);
	var context = (buildOptions) => ensureServiceIsRunning().context(buildOptions);
	var transform = (input, options) => ensureServiceIsRunning().transform(input, options);
	var formatMessages = (messages, options) => ensureServiceIsRunning().formatMessages(messages, options);
	var analyzeMetafile = (messages, options) => ensureServiceIsRunning().analyzeMetafile(messages, options);
	var buildSync = (options) => {
	  if (worker_threads && !isInternalWorkerThread) {
	    if (!workerThreadService) workerThreadService = startWorkerThreadService(worker_threads);
	    return workerThreadService.buildSync(options);
	  }
	  let result;
	  runServiceSync((service) => service.buildOrContext({
	    callName: "buildSync",
	    refs: null,
	    options,
	    isTTY: isTTY(),
	    defaultWD,
	    callback: (err, res) => {
	      if (err) throw err;
	      result = res;
	    }
	  }));
	  return result;
	};
	var transformSync = (input, options) => {
	  if (worker_threads && !isInternalWorkerThread) {
	    if (!workerThreadService) workerThreadService = startWorkerThreadService(worker_threads);
	    return workerThreadService.transformSync(input, options);
	  }
	  let result;
	  runServiceSync((service) => service.transform({
	    callName: "transformSync",
	    refs: null,
	    input,
	    options: options || {},
	    isTTY: isTTY(),
	    fs: fsSync,
	    callback: (err, res) => {
	      if (err) throw err;
	      result = res;
	    }
	  }));
	  return result;
	};
	var formatMessagesSync = (messages, options) => {
	  if (worker_threads && !isInternalWorkerThread) {
	    if (!workerThreadService) workerThreadService = startWorkerThreadService(worker_threads);
	    return workerThreadService.formatMessagesSync(messages, options);
	  }
	  let result;
	  runServiceSync((service) => service.formatMessages({
	    callName: "formatMessagesSync",
	    refs: null,
	    messages,
	    options,
	    callback: (err, res) => {
	      if (err) throw err;
	      result = res;
	    }
	  }));
	  return result;
	};
	var analyzeMetafileSync = (metafile, options) => {
	  if (worker_threads && !isInternalWorkerThread) {
	    if (!workerThreadService) workerThreadService = startWorkerThreadService(worker_threads);
	    return workerThreadService.analyzeMetafileSync(metafile, options);
	  }
	  let result;
	  runServiceSync((service) => service.analyzeMetafile({
	    callName: "analyzeMetafileSync",
	    refs: null,
	    metafile: typeof metafile === "string" ? metafile : JSON.stringify(metafile),
	    options,
	    callback: (err, res) => {
	      if (err) throw err;
	      result = res;
	    }
	  }));
	  return result;
	};
	var stop = () => {
	  if (stopService) stopService();
	  if (workerThreadService) workerThreadService.stop();
	  return Promise.resolve();
	};
	var initializeWasCalled = false;
	var initialize = (options) => {
	  options = validateInitializeOptions(options || {});
	  if (options.wasmURL) throw new Error(`The "wasmURL" option only works in the browser`);
	  if (options.wasmModule) throw new Error(`The "wasmModule" option only works in the browser`);
	  if (options.worker) throw new Error(`The "worker" option only works in the browser`);
	  if (initializeWasCalled) throw new Error('Cannot call "initialize" more than once');
	  ensureServiceIsRunning();
	  initializeWasCalled = true;
	  return Promise.resolve();
	};
	var defaultWD = process.cwd();
	var longLivedService;
	var stopService;
	var ensureServiceIsRunning = () => {
	  if (longLivedService) return longLivedService;
	  let [command, args] = esbuildCommandAndArgs();
	  let child = child_process.spawn(command, args.concat(`--service=${"0.25.2"}`, "--ping"), {
	    windowsHide: true,
	    stdio: ["pipe", "pipe", "inherit"],
	    cwd: defaultWD
	  });
	  let { readFromStdout, afterClose, service } = createChannel({
	    writeToStdin(bytes) {
	      child.stdin.write(bytes, (err) => {
	        if (err) afterClose(err);
	      });
	    },
	    readFileSync: fs2.readFileSync,
	    isSync: false,
	    hasFS: true,
	    esbuild: node_exports
	  });
	  child.stdin.on("error", afterClose);
	  child.on("error", afterClose);
	  const stdin = child.stdin;
	  const stdout = child.stdout;
	  stdout.on("data", readFromStdout);
	  stdout.on("end", afterClose);
	  stopService = () => {
	    stdin.destroy();
	    stdout.destroy();
	    child.kill();
	    initializeWasCalled = false;
	    longLivedService = void 0;
	    stopService = void 0;
	  };
	  let refCount = 0;
	  child.unref();
	  if (stdin.unref) {
	    stdin.unref();
	  }
	  if (stdout.unref) {
	    stdout.unref();
	  }
	  const refs = {
	    ref() {
	      if (++refCount === 1) child.ref();
	    },
	    unref() {
	      if (--refCount === 0) child.unref();
	    }
	  };
	  longLivedService = {
	    build: (options) => new Promise((resolve, reject) => {
	      service.buildOrContext({
	        callName: "build",
	        refs,
	        options,
	        isTTY: isTTY(),
	        defaultWD,
	        callback: (err, res) => err ? reject(err) : resolve(res)
	      });
	    }),
	    context: (options) => new Promise((resolve, reject) => service.buildOrContext({
	      callName: "context",
	      refs,
	      options,
	      isTTY: isTTY(),
	      defaultWD,
	      callback: (err, res) => err ? reject(err) : resolve(res)
	    })),
	    transform: (input, options) => new Promise((resolve, reject) => service.transform({
	      callName: "transform",
	      refs,
	      input,
	      options: options || {},
	      isTTY: isTTY(),
	      fs: fsAsync,
	      callback: (err, res) => err ? reject(err) : resolve(res)
	    })),
	    formatMessages: (messages, options) => new Promise((resolve, reject) => service.formatMessages({
	      callName: "formatMessages",
	      refs,
	      messages,
	      options,
	      callback: (err, res) => err ? reject(err) : resolve(res)
	    })),
	    analyzeMetafile: (metafile, options) => new Promise((resolve, reject) => service.analyzeMetafile({
	      callName: "analyzeMetafile",
	      refs,
	      metafile: typeof metafile === "string" ? metafile : JSON.stringify(metafile),
	      options,
	      callback: (err, res) => err ? reject(err) : resolve(res)
	    }))
	  };
	  return longLivedService;
	};
	var runServiceSync = (callback) => {
	  let [command, args] = esbuildCommandAndArgs();
	  let stdin = new Uint8Array();
	  let { readFromStdout, afterClose, service } = createChannel({
	    writeToStdin(bytes) {
	      if (stdin.length !== 0) throw new Error("Must run at most one command");
	      stdin = bytes;
	    },
	    isSync: true,
	    hasFS: true,
	    esbuild: node_exports
	  });
	  callback(service);
	  let stdout = child_process.execFileSync(command, args.concat(`--service=${"0.25.2"}`), {
	    cwd: defaultWD,
	    windowsHide: true,
	    input: stdin,
	    // We don't know how large the output could be. If it's too large, the
	    // command will fail with ENOBUFS. Reserve 16mb for now since that feels
	    // like it should be enough. Also allow overriding this with an environment
	    // variable.
	    maxBuffer: +process.env.ESBUILD_MAX_BUFFER || 16 * 1024 * 1024
	  });
	  readFromStdout(stdout);
	  afterClose(null);
	};
	var randomFileName = () => {
	  return path2.join(os2.tmpdir(), `esbuild-${crypto.randomBytes(32).toString("hex")}`);
	};
	var workerThreadService = null;
	var startWorkerThreadService = (worker_threads2) => {
	  let { port1: mainPort, port2: workerPort } = new worker_threads2.MessageChannel();
	  let worker = new worker_threads2.Worker(__filename, {
	    workerData: { workerPort, defaultWD, esbuildVersion: "0.25.2" },
	    transferList: [workerPort],
	    // From node's documentation: https://nodejs.org/api/worker_threads.html
	    //
	    //   Take care when launching worker threads from preload scripts (scripts loaded
	    //   and run using the `-r` command line flag). Unless the `execArgv` option is
	    //   explicitly set, new Worker threads automatically inherit the command line flags
	    //   from the running process and will preload the same preload scripts as the main
	    //   thread. If the preload script unconditionally launches a worker thread, every
	    //   thread spawned will spawn another until the application crashes.
	    //
	    execArgv: []
	  });
	  let nextID = 0;
	  let fakeBuildError = (text) => {
	    let error = new Error(`Build failed with 1 error:
error: ${text}`);
	    let errors = [{ id: "", pluginName: "", text, location: null, notes: [], detail: void 0 }];
	    error.errors = errors;
	    error.warnings = [];
	    return error;
	  };
	  let validateBuildSyncOptions = (options) => {
	    if (!options) return;
	    let plugins = options.plugins;
	    if (plugins && plugins.length > 0) throw fakeBuildError(`Cannot use plugins in synchronous API calls`);
	  };
	  let applyProperties = (object, properties) => {
	    for (let key in properties) {
	      object[key] = properties[key];
	    }
	  };
	  let runCallSync = (command, args) => {
	    let id = nextID++;
	    let sharedBuffer = new SharedArrayBuffer(8);
	    let sharedBufferView = new Int32Array(sharedBuffer);
	    let msg = { sharedBuffer, id, command, args };
	    worker.postMessage(msg);
	    let status = Atomics.wait(sharedBufferView, 0, 0);
	    if (status !== "ok" && status !== "not-equal") throw new Error("Internal error: Atomics.wait() failed: " + status);
	    let { message: { id: id2, resolve, reject, properties } } = worker_threads2.receiveMessageOnPort(mainPort);
	    if (id !== id2) throw new Error(`Internal error: Expected id ${id} but got id ${id2}`);
	    if (reject) {
	      applyProperties(reject, properties);
	      throw reject;
	    }
	    return resolve;
	  };
	  worker.unref();
	  return {
	    buildSync(options) {
	      validateBuildSyncOptions(options);
	      return runCallSync("build", [options]);
	    },
	    transformSync(input, options) {
	      return runCallSync("transform", [input, options]);
	    },
	    formatMessagesSync(messages, options) {
	      return runCallSync("formatMessages", [messages, options]);
	    },
	    analyzeMetafileSync(metafile, options) {
	      return runCallSync("analyzeMetafile", [metafile, options]);
	    },
	    stop() {
	      worker.terminate();
	      workerThreadService = null;
	    }
	  };
	};
	var startSyncServiceWorker = () => {
	  let workerPort = worker_threads.workerData.workerPort;
	  let parentPort = worker_threads.parentPort;
	  let extractProperties = (object) => {
	    let properties = {};
	    if (object && typeof object === "object") {
	      for (let key in object) {
	        properties[key] = object[key];
	      }
	    }
	    return properties;
	  };
	  try {
	    let service = ensureServiceIsRunning();
	    defaultWD = worker_threads.workerData.defaultWD;
	    parentPort.on("message", (msg) => {
	      (async () => {
	        let { sharedBuffer, id, command, args } = msg;
	        let sharedBufferView = new Int32Array(sharedBuffer);
	        try {
	          switch (command) {
	            case "build":
	              workerPort.postMessage({ id, resolve: await service.build(args[0]) });
	              break;
	            case "transform":
	              workerPort.postMessage({ id, resolve: await service.transform(args[0], args[1]) });
	              break;
	            case "formatMessages":
	              workerPort.postMessage({ id, resolve: await service.formatMessages(args[0], args[1]) });
	              break;
	            case "analyzeMetafile":
	              workerPort.postMessage({ id, resolve: await service.analyzeMetafile(args[0], args[1]) });
	              break;
	            default:
	              throw new Error(`Invalid command: ${command}`);
	          }
	        } catch (reject) {
	          workerPort.postMessage({ id, reject, properties: extractProperties(reject) });
	        }
	        Atomics.add(sharedBufferView, 0, 1);
	        Atomics.notify(sharedBufferView, 0, Infinity);
	      })();
	    });
	  } catch (reject) {
	    parentPort.on("message", (msg) => {
	      let { sharedBuffer, id } = msg;
	      let sharedBufferView = new Int32Array(sharedBuffer);
	      workerPort.postMessage({ id, reject, properties: extractProperties(reject) });
	      Atomics.add(sharedBufferView, 0, 1);
	      Atomics.notify(sharedBufferView, 0, Infinity);
	    });
	  }
	};
	if (isInternalWorkerThread) {
	  startSyncServiceWorker();
	}
	var node_default = node_exports;
	return main;
}

requireMain();

function getDefaultClientDirectives() {
  return /* @__PURE__ */ new Map([
    ["idle", idle_prebuilt_default],
    ["load", load_prebuilt_default],
    ["media", media_prebuilt_default],
    ["only", only_prebuilt_default],
    ["visible", visible_prebuilt_default]
  ]);
}

var prism = {exports: {}};

var hasRequiredPrism;

function requirePrism () {
	if (hasRequiredPrism) return prism.exports;
	hasRequiredPrism = 1;
	(function (module) {
		/* **********************************************
		     Begin prism-core.js
		********************************************** */

		/// <reference lib="WebWorker"/>

		var _self = (typeof window !== 'undefined')
			? window   // if in browser
			: (
				(typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope)
					? self // if in worker
					: {}   // if in node js
			);

		/**
		 * Prism: Lightweight, robust, elegant syntax highlighting
		 *
		 * @license MIT <https://opensource.org/licenses/MIT>
		 * @author Lea Verou <https://lea.verou.me>
		 * @namespace
		 * @public
		 */
		var Prism = (function (_self) {

			// Private helper vars
			var lang = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i;
			var uniqueId = 0;

			// The grammar object for plaintext
			var plainTextGrammar = {};


			var _ = {
				/**
				 * By default, Prism will attempt to highlight all code elements (by calling {@link Prism.highlightAll}) on the
				 * current page after the page finished loading. This might be a problem if e.g. you wanted to asynchronously load
				 * additional languages or plugins yourself.
				 *
				 * By setting this value to `true`, Prism will not automatically highlight all code elements on the page.
				 *
				 * You obviously have to change this value before the automatic highlighting started. To do this, you can add an
				 * empty Prism object into the global scope before loading the Prism script like this:
				 *
				 * ```js
				 * window.Prism = window.Prism || {};
				 * Prism.manual = true;
				 * // add a new <script> to load Prism's script
				 * ```
				 *
				 * @default false
				 * @type {boolean}
				 * @memberof Prism
				 * @public
				 */
				manual: _self.Prism && _self.Prism.manual,
				/**
				 * By default, if Prism is in a web worker, it assumes that it is in a worker it created itself, so it uses
				 * `addEventListener` to communicate with its parent instance. However, if you're using Prism manually in your
				 * own worker, you don't want it to do this.
				 *
				 * By setting this value to `true`, Prism will not add its own listeners to the worker.
				 *
				 * You obviously have to change this value before Prism executes. To do this, you can add an
				 * empty Prism object into the global scope before loading the Prism script like this:
				 *
				 * ```js
				 * window.Prism = window.Prism || {};
				 * Prism.disableWorkerMessageHandler = true;
				 * // Load Prism's script
				 * ```
				 *
				 * @default false
				 * @type {boolean}
				 * @memberof Prism
				 * @public
				 */
				disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler,

				/**
				 * A namespace for utility methods.
				 *
				 * All function in this namespace that are not explicitly marked as _public_ are for __internal use only__ and may
				 * change or disappear at any time.
				 *
				 * @namespace
				 * @memberof Prism
				 */
				util: {
					encode: function encode(tokens) {
						if (tokens instanceof Token) {
							return new Token(tokens.type, encode(tokens.content), tokens.alias);
						} else if (Array.isArray(tokens)) {
							return tokens.map(encode);
						} else {
							return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
						}
					},

					/**
					 * Returns the name of the type of the given value.
					 *
					 * @param {any} o
					 * @returns {string}
					 * @example
					 * type(null)      === 'Null'
					 * type(undefined) === 'Undefined'
					 * type(123)       === 'Number'
					 * type('foo')     === 'String'
					 * type(true)      === 'Boolean'
					 * type([1, 2])    === 'Array'
					 * type({})        === 'Object'
					 * type(String)    === 'Function'
					 * type(/abc+/)    === 'RegExp'
					 */
					type: function (o) {
						return Object.prototype.toString.call(o).slice(8, -1);
					},

					/**
					 * Returns a unique number for the given object. Later calls will still return the same number.
					 *
					 * @param {Object} obj
					 * @returns {number}
					 */
					objId: function (obj) {
						if (!obj['__id']) {
							Object.defineProperty(obj, '__id', { value: ++uniqueId });
						}
						return obj['__id'];
					},

					/**
					 * Creates a deep clone of the given object.
					 *
					 * The main intended use of this function is to clone language definitions.
					 *
					 * @param {T} o
					 * @param {Record<number, any>} [visited]
					 * @returns {T}
					 * @template T
					 */
					clone: function deepClone(o, visited) {
						visited = visited || {};

						var clone; var id;
						switch (_.util.type(o)) {
							case 'Object':
								id = _.util.objId(o);
								if (visited[id]) {
									return visited[id];
								}
								clone = /** @type {Record<string, any>} */ ({});
								visited[id] = clone;

								for (var key in o) {
									if (o.hasOwnProperty(key)) {
										clone[key] = deepClone(o[key], visited);
									}
								}

								return /** @type {any} */ (clone);

							case 'Array':
								id = _.util.objId(o);
								if (visited[id]) {
									return visited[id];
								}
								clone = [];
								visited[id] = clone;

								(/** @type {Array} */(/** @type {any} */(o))).forEach(function (v, i) {
									clone[i] = deepClone(v, visited);
								});

								return /** @type {any} */ (clone);

							default:
								return o;
						}
					},

					/**
					 * Returns the Prism language of the given element set by a `language-xxxx` or `lang-xxxx` class.
					 *
					 * If no language is set for the element or the element is `null` or `undefined`, `none` will be returned.
					 *
					 * @param {Element} element
					 * @returns {string}
					 */
					getLanguage: function (element) {
						while (element) {
							var m = lang.exec(element.className);
							if (m) {
								return m[1].toLowerCase();
							}
							element = element.parentElement;
						}
						return 'none';
					},

					/**
					 * Sets the Prism `language-xxxx` class of the given element.
					 *
					 * @param {Element} element
					 * @param {string} language
					 * @returns {void}
					 */
					setLanguage: function (element, language) {
						// remove all `language-xxxx` classes
						// (this might leave behind a leading space)
						element.className = element.className.replace(RegExp(lang, 'gi'), '');

						// add the new `language-xxxx` class
						// (using `classList` will automatically clean up spaces for us)
						element.classList.add('language-' + language);
					},

					/**
					 * Returns the script element that is currently executing.
					 *
					 * This does __not__ work for line script element.
					 *
					 * @returns {HTMLScriptElement | null}
					 */
					currentScript: function () {
						if (typeof document === 'undefined') {
							return null;
						}
						if (document.currentScript && document.currentScript.tagName === 'SCRIPT' && 1 < 2 /* hack to trip TS' flow analysis */) {
							return /** @type {any} */ (document.currentScript);
						}

						// IE11 workaround
						// we'll get the src of the current script by parsing IE11's error stack trace
						// this will not work for inline scripts

						try {
							throw new Error();
						} catch (err) {
							// Get file src url from stack. Specifically works with the format of stack traces in IE.
							// A stack will look like this:
							//
							// Error
							//    at _.util.currentScript (http://localhost/components/prism-core.js:119:5)
							//    at Global code (http://localhost/components/prism-core.js:606:1)

							var src = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(err.stack) || [])[1];
							if (src) {
								var scripts = document.getElementsByTagName('script');
								for (var i in scripts) {
									if (scripts[i].src == src) {
										return scripts[i];
									}
								}
							}
							return null;
						}
					},

					/**
					 * Returns whether a given class is active for `element`.
					 *
					 * The class can be activated if `element` or one of its ancestors has the given class and it can be deactivated
					 * if `element` or one of its ancestors has the negated version of the given class. The _negated version_ of the
					 * given class is just the given class with a `no-` prefix.
					 *
					 * Whether the class is active is determined by the closest ancestor of `element` (where `element` itself is
					 * closest ancestor) that has the given class or the negated version of it. If neither `element` nor any of its
					 * ancestors have the given class or the negated version of it, then the default activation will be returned.
					 *
					 * In the paradoxical situation where the closest ancestor contains __both__ the given class and the negated
					 * version of it, the class is considered active.
					 *
					 * @param {Element} element
					 * @param {string} className
					 * @param {boolean} [defaultActivation=false]
					 * @returns {boolean}
					 */
					isActive: function (element, className, defaultActivation) {
						var no = 'no-' + className;

						while (element) {
							var classList = element.classList;
							if (classList.contains(className)) {
								return true;
							}
							if (classList.contains(no)) {
								return false;
							}
							element = element.parentElement;
						}
						return !!defaultActivation;
					}
				},

				/**
				 * This namespace contains all currently loaded languages and the some helper functions to create and modify languages.
				 *
				 * @namespace
				 * @memberof Prism
				 * @public
				 */
				languages: {
					/**
					 * The grammar for plain, unformatted text.
					 */
					plain: plainTextGrammar,
					plaintext: plainTextGrammar,
					text: plainTextGrammar,
					txt: plainTextGrammar,

					/**
					 * Creates a deep copy of the language with the given id and appends the given tokens.
					 *
					 * If a token in `redef` also appears in the copied language, then the existing token in the copied language
					 * will be overwritten at its original position.
					 *
					 * ## Best practices
					 *
					 * Since the position of overwriting tokens (token in `redef` that overwrite tokens in the copied language)
					 * doesn't matter, they can technically be in any order. However, this can be confusing to others that trying to
					 * understand the language definition because, normally, the order of tokens matters in Prism grammars.
					 *
					 * Therefore, it is encouraged to order overwriting tokens according to the positions of the overwritten tokens.
					 * Furthermore, all non-overwriting tokens should be placed after the overwriting ones.
					 *
					 * @param {string} id The id of the language to extend. This has to be a key in `Prism.languages`.
					 * @param {Grammar} redef The new tokens to append.
					 * @returns {Grammar} The new language created.
					 * @public
					 * @example
					 * Prism.languages['css-with-colors'] = Prism.languages.extend('css', {
					 *     // Prism.languages.css already has a 'comment' token, so this token will overwrite CSS' 'comment' token
					 *     // at its original position
					 *     'comment': { ... },
					 *     // CSS doesn't have a 'color' token, so this token will be appended
					 *     'color': /\b(?:red|green|blue)\b/
					 * });
					 */
					extend: function (id, redef) {
						var lang = _.util.clone(_.languages[id]);

						for (var key in redef) {
							lang[key] = redef[key];
						}

						return lang;
					},

					/**
					 * Inserts tokens _before_ another token in a language definition or any other grammar.
					 *
					 * ## Usage
					 *
					 * This helper method makes it easy to modify existing languages. For example, the CSS language definition
					 * not only defines CSS highlighting for CSS documents, but also needs to define highlighting for CSS embedded
					 * in HTML through `<style>` elements. To do this, it needs to modify `Prism.languages.markup` and add the
					 * appropriate tokens. However, `Prism.languages.markup` is a regular JavaScript object literal, so if you do
					 * this:
					 *
					 * ```js
					 * Prism.languages.markup.style = {
					 *     // token
					 * };
					 * ```
					 *
					 * then the `style` token will be added (and processed) at the end. `insertBefore` allows you to insert tokens
					 * before existing tokens. For the CSS example above, you would use it like this:
					 *
					 * ```js
					 * Prism.languages.insertBefore('markup', 'cdata', {
					 *     'style': {
					 *         // token
					 *     }
					 * });
					 * ```
					 *
					 * ## Special cases
					 *
					 * If the grammars of `inside` and `insert` have tokens with the same name, the tokens in `inside`'s grammar
					 * will be ignored.
					 *
					 * This behavior can be used to insert tokens after `before`:
					 *
					 * ```js
					 * Prism.languages.insertBefore('markup', 'comment', {
					 *     'comment': Prism.languages.markup.comment,
					 *     // tokens after 'comment'
					 * });
					 * ```
					 *
					 * ## Limitations
					 *
					 * The main problem `insertBefore` has to solve is iteration order. Since ES2015, the iteration order for object
					 * properties is guaranteed to be the insertion order (except for integer keys) but some browsers behave
					 * differently when keys are deleted and re-inserted. So `insertBefore` can't be implemented by temporarily
					 * deleting properties which is necessary to insert at arbitrary positions.
					 *
					 * To solve this problem, `insertBefore` doesn't actually insert the given tokens into the target object.
					 * Instead, it will create a new object and replace all references to the target object with the new one. This
					 * can be done without temporarily deleting properties, so the iteration order is well-defined.
					 *
					 * However, only references that can be reached from `Prism.languages` or `insert` will be replaced. I.e. if
					 * you hold the target object in a variable, then the value of the variable will not change.
					 *
					 * ```js
					 * var oldMarkup = Prism.languages.markup;
					 * var newMarkup = Prism.languages.insertBefore('markup', 'comment', { ... });
					 *
					 * assert(oldMarkup !== Prism.languages.markup);
					 * assert(newMarkup === Prism.languages.markup);
					 * ```
					 *
					 * @param {string} inside The property of `root` (e.g. a language id in `Prism.languages`) that contains the
					 * object to be modified.
					 * @param {string} before The key to insert before.
					 * @param {Grammar} insert An object containing the key-value pairs to be inserted.
					 * @param {Object<string, any>} [root] The object containing `inside`, i.e. the object that contains the
					 * object to be modified.
					 *
					 * Defaults to `Prism.languages`.
					 * @returns {Grammar} The new grammar object.
					 * @public
					 */
					insertBefore: function (inside, before, insert, root) {
						root = root || /** @type {any} */ (_.languages);
						var grammar = root[inside];
						/** @type {Grammar} */
						var ret = {};

						for (var token in grammar) {
							if (grammar.hasOwnProperty(token)) {

								if (token == before) {
									for (var newToken in insert) {
										if (insert.hasOwnProperty(newToken)) {
											ret[newToken] = insert[newToken];
										}
									}
								}

								// Do not insert token which also occur in insert. See #1525
								if (!insert.hasOwnProperty(token)) {
									ret[token] = grammar[token];
								}
							}
						}

						var old = root[inside];
						root[inside] = ret;

						// Update references in other language definitions
						_.languages.DFS(_.languages, function (key, value) {
							if (value === old && key != inside) {
								this[key] = ret;
							}
						});

						return ret;
					},

					// Traverse a language definition with Depth First Search
					DFS: function DFS(o, callback, type, visited) {
						visited = visited || {};

						var objId = _.util.objId;

						for (var i in o) {
							if (o.hasOwnProperty(i)) {
								callback.call(o, i, o[i], type || i);

								var property = o[i];
								var propertyType = _.util.type(property);

								if (propertyType === 'Object' && !visited[objId(property)]) {
									visited[objId(property)] = true;
									DFS(property, callback, null, visited);
								} else if (propertyType === 'Array' && !visited[objId(property)]) {
									visited[objId(property)] = true;
									DFS(property, callback, i, visited);
								}
							}
						}
					}
				},

				plugins: {},

				/**
				 * This is the most high-level function in Prism’s API.
				 * It fetches all the elements that have a `.language-xxxx` class and then calls {@link Prism.highlightElement} on
				 * each one of them.
				 *
				 * This is equivalent to `Prism.highlightAllUnder(document, async, callback)`.
				 *
				 * @param {boolean} [async=false] Same as in {@link Prism.highlightAllUnder}.
				 * @param {HighlightCallback} [callback] Same as in {@link Prism.highlightAllUnder}.
				 * @memberof Prism
				 * @public
				 */
				highlightAll: function (async, callback) {
					_.highlightAllUnder(document, async, callback);
				},

				/**
				 * Fetches all the descendants of `container` that have a `.language-xxxx` class and then calls
				 * {@link Prism.highlightElement} on each one of them.
				 *
				 * The following hooks will be run:
				 * 1. `before-highlightall`
				 * 2. `before-all-elements-highlight`
				 * 3. All hooks of {@link Prism.highlightElement} for each element.
				 *
				 * @param {ParentNode} container The root element, whose descendants that have a `.language-xxxx` class will be highlighted.
				 * @param {boolean} [async=false] Whether each element is to be highlighted asynchronously using Web Workers.
				 * @param {HighlightCallback} [callback] An optional callback to be invoked on each element after its highlighting is done.
				 * @memberof Prism
				 * @public
				 */
				highlightAllUnder: function (container, async, callback) {
					var env = {
						callback: callback,
						container: container,
						selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
					};

					_.hooks.run('before-highlightall', env);

					env.elements = Array.prototype.slice.apply(env.container.querySelectorAll(env.selector));

					_.hooks.run('before-all-elements-highlight', env);

					for (var i = 0, element; (element = env.elements[i++]);) {
						_.highlightElement(element, async === true, env.callback);
					}
				},

				/**
				 * Highlights the code inside a single element.
				 *
				 * The following hooks will be run:
				 * 1. `before-sanity-check`
				 * 2. `before-highlight`
				 * 3. All hooks of {@link Prism.highlight}. These hooks will be run by an asynchronous worker if `async` is `true`.
				 * 4. `before-insert`
				 * 5. `after-highlight`
				 * 6. `complete`
				 *
				 * Some the above hooks will be skipped if the element doesn't contain any text or there is no grammar loaded for
				 * the element's language.
				 *
				 * @param {Element} element The element containing the code.
				 * It must have a class of `language-xxxx` to be processed, where `xxxx` is a valid language identifier.
				 * @param {boolean} [async=false] Whether the element is to be highlighted asynchronously using Web Workers
				 * to improve performance and avoid blocking the UI when highlighting very large chunks of code. This option is
				 * [disabled by default](https://prismjs.com/faq.html#why-is-asynchronous-highlighting-disabled-by-default).
				 *
				 * Note: All language definitions required to highlight the code must be included in the main `prism.js` file for
				 * asynchronous highlighting to work. You can build your own bundle on the
				 * [Download page](https://prismjs.com/download.html).
				 * @param {HighlightCallback} [callback] An optional callback to be invoked after the highlighting is done.
				 * Mostly useful when `async` is `true`, since in that case, the highlighting is done asynchronously.
				 * @memberof Prism
				 * @public
				 */
				highlightElement: function (element, async, callback) {
					// Find language
					var language = _.util.getLanguage(element);
					var grammar = _.languages[language];

					// Set language on the element, if not present
					_.util.setLanguage(element, language);

					// Set language on the parent, for styling
					var parent = element.parentElement;
					if (parent && parent.nodeName.toLowerCase() === 'pre') {
						_.util.setLanguage(parent, language);
					}

					var code = element.textContent;

					var env = {
						element: element,
						language: language,
						grammar: grammar,
						code: code
					};

					function insertHighlightedCode(highlightedCode) {
						env.highlightedCode = highlightedCode;

						_.hooks.run('before-insert', env);

						env.element.innerHTML = env.highlightedCode;

						_.hooks.run('after-highlight', env);
						_.hooks.run('complete', env);
						callback && callback.call(env.element);
					}

					_.hooks.run('before-sanity-check', env);

					// plugins may change/add the parent/element
					parent = env.element.parentElement;
					if (parent && parent.nodeName.toLowerCase() === 'pre' && !parent.hasAttribute('tabindex')) {
						parent.setAttribute('tabindex', '0');
					}

					if (!env.code) {
						_.hooks.run('complete', env);
						callback && callback.call(env.element);
						return;
					}

					_.hooks.run('before-highlight', env);

					if (!env.grammar) {
						insertHighlightedCode(_.util.encode(env.code));
						return;
					}

					if (async && _self.Worker) {
						var worker = new Worker(_.filename);

						worker.onmessage = function (evt) {
							insertHighlightedCode(evt.data);
						};

						worker.postMessage(JSON.stringify({
							language: env.language,
							code: env.code,
							immediateClose: true
						}));
					} else {
						insertHighlightedCode(_.highlight(env.code, env.grammar, env.language));
					}
				},

				/**
				 * Low-level function, only use if you know what you’re doing. It accepts a string of text as input
				 * and the language definitions to use, and returns a string with the HTML produced.
				 *
				 * The following hooks will be run:
				 * 1. `before-tokenize`
				 * 2. `after-tokenize`
				 * 3. `wrap`: On each {@link Token}.
				 *
				 * @param {string} text A string with the code to be highlighted.
				 * @param {Grammar} grammar An object containing the tokens to use.
				 *
				 * Usually a language definition like `Prism.languages.markup`.
				 * @param {string} language The name of the language definition passed to `grammar`.
				 * @returns {string} The highlighted HTML.
				 * @memberof Prism
				 * @public
				 * @example
				 * Prism.highlight('var foo = true;', Prism.languages.javascript, 'javascript');
				 */
				highlight: function (text, grammar, language) {
					var env = {
						code: text,
						grammar: grammar,
						language: language
					};
					_.hooks.run('before-tokenize', env);
					if (!env.grammar) {
						throw new Error('The language "' + env.language + '" has no grammar.');
					}
					env.tokens = _.tokenize(env.code, env.grammar);
					_.hooks.run('after-tokenize', env);
					return Token.stringify(_.util.encode(env.tokens), env.language);
				},

				/**
				 * This is the heart of Prism, and the most low-level function you can use. It accepts a string of text as input
				 * and the language definitions to use, and returns an array with the tokenized code.
				 *
				 * When the language definition includes nested tokens, the function is called recursively on each of these tokens.
				 *
				 * This method could be useful in other contexts as well, as a very crude parser.
				 *
				 * @param {string} text A string with the code to be highlighted.
				 * @param {Grammar} grammar An object containing the tokens to use.
				 *
				 * Usually a language definition like `Prism.languages.markup`.
				 * @returns {TokenStream} An array of strings and tokens, a token stream.
				 * @memberof Prism
				 * @public
				 * @example
				 * let code = `var foo = 0;`;
				 * let tokens = Prism.tokenize(code, Prism.languages.javascript);
				 * tokens.forEach(token => {
				 *     if (token instanceof Prism.Token && token.type === 'number') {
				 *         console.log(`Found numeric literal: ${token.content}`);
				 *     }
				 * });
				 */
				tokenize: function (text, grammar) {
					var rest = grammar.rest;
					if (rest) {
						for (var token in rest) {
							grammar[token] = rest[token];
						}

						delete grammar.rest;
					}

					var tokenList = new LinkedList();
					addAfter(tokenList, tokenList.head, text);

					matchGrammar(text, tokenList, grammar, tokenList.head, 0);

					return toArray(tokenList);
				},

				/**
				 * @namespace
				 * @memberof Prism
				 * @public
				 */
				hooks: {
					all: {},

					/**
					 * Adds the given callback to the list of callbacks for the given hook.
					 *
					 * The callback will be invoked when the hook it is registered for is run.
					 * Hooks are usually directly run by a highlight function but you can also run hooks yourself.
					 *
					 * One callback function can be registered to multiple hooks and the same hook multiple times.
					 *
					 * @param {string} name The name of the hook.
					 * @param {HookCallback} callback The callback function which is given environment variables.
					 * @public
					 */
					add: function (name, callback) {
						var hooks = _.hooks.all;

						hooks[name] = hooks[name] || [];

						hooks[name].push(callback);
					},

					/**
					 * Runs a hook invoking all registered callbacks with the given environment variables.
					 *
					 * Callbacks will be invoked synchronously and in the order in which they were registered.
					 *
					 * @param {string} name The name of the hook.
					 * @param {Object<string, any>} env The environment variables of the hook passed to all callbacks registered.
					 * @public
					 */
					run: function (name, env) {
						var callbacks = _.hooks.all[name];

						if (!callbacks || !callbacks.length) {
							return;
						}

						for (var i = 0, callback; (callback = callbacks[i++]);) {
							callback(env);
						}
					}
				},

				Token: Token
			};
			_self.Prism = _;


			// Typescript note:
			// The following can be used to import the Token type in JSDoc:
			//
			//   @typedef {InstanceType<import("./prism-core")["Token"]>} Token

			/**
			 * Creates a new token.
			 *
			 * @param {string} type See {@link Token#type type}
			 * @param {string | TokenStream} content See {@link Token#content content}
			 * @param {string|string[]} [alias] The alias(es) of the token.
			 * @param {string} [matchedStr=""] A copy of the full string this token was created from.
			 * @class
			 * @global
			 * @public
			 */
			function Token(type, content, alias, matchedStr) {
				/**
				 * The type of the token.
				 *
				 * This is usually the key of a pattern in a {@link Grammar}.
				 *
				 * @type {string}
				 * @see GrammarToken
				 * @public
				 */
				this.type = type;
				/**
				 * The strings or tokens contained by this token.
				 *
				 * This will be a token stream if the pattern matched also defined an `inside` grammar.
				 *
				 * @type {string | TokenStream}
				 * @public
				 */
				this.content = content;
				/**
				 * The alias(es) of the token.
				 *
				 * @type {string|string[]}
				 * @see GrammarToken
				 * @public
				 */
				this.alias = alias;
				// Copy of the full string this token was created from
				this.length = (matchedStr || '').length | 0;
			}

			/**
			 * A token stream is an array of strings and {@link Token Token} objects.
			 *
			 * Token streams have to fulfill a few properties that are assumed by most functions (mostly internal ones) that process
			 * them.
			 *
			 * 1. No adjacent strings.
			 * 2. No empty strings.
			 *
			 *    The only exception here is the token stream that only contains the empty string and nothing else.
			 *
			 * @typedef {Array<string | Token>} TokenStream
			 * @global
			 * @public
			 */

			/**
			 * Converts the given token or token stream to an HTML representation.
			 *
			 * The following hooks will be run:
			 * 1. `wrap`: On each {@link Token}.
			 *
			 * @param {string | Token | TokenStream} o The token or token stream to be converted.
			 * @param {string} language The name of current language.
			 * @returns {string} The HTML representation of the token or token stream.
			 * @memberof Token
			 * @static
			 */
			Token.stringify = function stringify(o, language) {
				if (typeof o == 'string') {
					return o;
				}
				if (Array.isArray(o)) {
					var s = '';
					o.forEach(function (e) {
						s += stringify(e, language);
					});
					return s;
				}

				var env = {
					type: o.type,
					content: stringify(o.content, language),
					tag: 'span',
					classes: ['token', o.type],
					attributes: {},
					language: language
				};

				var aliases = o.alias;
				if (aliases) {
					if (Array.isArray(aliases)) {
						Array.prototype.push.apply(env.classes, aliases);
					} else {
						env.classes.push(aliases);
					}
				}

				_.hooks.run('wrap', env);

				var attributes = '';
				for (var name in env.attributes) {
					attributes += ' ' + name + '="' + (env.attributes[name] || '').replace(/"/g, '&quot;') + '"';
				}

				return '<' + env.tag + ' class="' + env.classes.join(' ') + '"' + attributes + '>' + env.content + '</' + env.tag + '>';
			};

			/**
			 * @param {RegExp} pattern
			 * @param {number} pos
			 * @param {string} text
			 * @param {boolean} lookbehind
			 * @returns {RegExpExecArray | null}
			 */
			function matchPattern(pattern, pos, text, lookbehind) {
				pattern.lastIndex = pos;
				var match = pattern.exec(text);
				if (match && lookbehind && match[1]) {
					// change the match to remove the text matched by the Prism lookbehind group
					var lookbehindLength = match[1].length;
					match.index += lookbehindLength;
					match[0] = match[0].slice(lookbehindLength);
				}
				return match;
			}

			/**
			 * @param {string} text
			 * @param {LinkedList<string | Token>} tokenList
			 * @param {any} grammar
			 * @param {LinkedListNode<string | Token>} startNode
			 * @param {number} startPos
			 * @param {RematchOptions} [rematch]
			 * @returns {void}
			 * @private
			 *
			 * @typedef RematchOptions
			 * @property {string} cause
			 * @property {number} reach
			 */
			function matchGrammar(text, tokenList, grammar, startNode, startPos, rematch) {
				for (var token in grammar) {
					if (!grammar.hasOwnProperty(token) || !grammar[token]) {
						continue;
					}

					var patterns = grammar[token];
					patterns = Array.isArray(patterns) ? patterns : [patterns];

					for (var j = 0; j < patterns.length; ++j) {
						if (rematch && rematch.cause == token + ',' + j) {
							return;
						}

						var patternObj = patterns[j];
						var inside = patternObj.inside;
						var lookbehind = !!patternObj.lookbehind;
						var greedy = !!patternObj.greedy;
						var alias = patternObj.alias;

						if (greedy && !patternObj.pattern.global) {
							// Without the global flag, lastIndex won't work
							var flags = patternObj.pattern.toString().match(/[imsuy]*$/)[0];
							patternObj.pattern = RegExp(patternObj.pattern.source, flags + 'g');
						}

						/** @type {RegExp} */
						var pattern = patternObj.pattern || patternObj;

						for ( // iterate the token list and keep track of the current token/string position
							var currentNode = startNode.next, pos = startPos;
							currentNode !== tokenList.tail;
							pos += currentNode.value.length, currentNode = currentNode.next
						) {

							if (rematch && pos >= rematch.reach) {
								break;
							}

							var str = currentNode.value;

							if (tokenList.length > text.length) {
								// Something went terribly wrong, ABORT, ABORT!
								return;
							}

							if (str instanceof Token) {
								continue;
							}

							var removeCount = 1; // this is the to parameter of removeBetween
							var match;

							if (greedy) {
								match = matchPattern(pattern, pos, text, lookbehind);
								if (!match || match.index >= text.length) {
									break;
								}

								var from = match.index;
								var to = match.index + match[0].length;
								var p = pos;

								// find the node that contains the match
								p += currentNode.value.length;
								while (from >= p) {
									currentNode = currentNode.next;
									p += currentNode.value.length;
								}
								// adjust pos (and p)
								p -= currentNode.value.length;
								pos = p;

								// the current node is a Token, then the match starts inside another Token, which is invalid
								if (currentNode.value instanceof Token) {
									continue;
								}

								// find the last node which is affected by this match
								for (
									var k = currentNode;
									k !== tokenList.tail && (p < to || typeof k.value === 'string');
									k = k.next
								) {
									removeCount++;
									p += k.value.length;
								}
								removeCount--;

								// replace with the new match
								str = text.slice(pos, p);
								match.index -= pos;
							} else {
								match = matchPattern(pattern, 0, str, lookbehind);
								if (!match) {
									continue;
								}
							}

							// eslint-disable-next-line no-redeclare
							var from = match.index;
							var matchStr = match[0];
							var before = str.slice(0, from);
							var after = str.slice(from + matchStr.length);

							var reach = pos + str.length;
							if (rematch && reach > rematch.reach) {
								rematch.reach = reach;
							}

							var removeFrom = currentNode.prev;

							if (before) {
								removeFrom = addAfter(tokenList, removeFrom, before);
								pos += before.length;
							}

							removeRange(tokenList, removeFrom, removeCount);

							var wrapped = new Token(token, inside ? _.tokenize(matchStr, inside) : matchStr, alias, matchStr);
							currentNode = addAfter(tokenList, removeFrom, wrapped);

							if (after) {
								addAfter(tokenList, currentNode, after);
							}

							if (removeCount > 1) {
								// at least one Token object was removed, so we have to do some rematching
								// this can only happen if the current pattern is greedy

								/** @type {RematchOptions} */
								var nestedRematch = {
									cause: token + ',' + j,
									reach: reach
								};
								matchGrammar(text, tokenList, grammar, currentNode.prev, pos, nestedRematch);

								// the reach might have been extended because of the rematching
								if (rematch && nestedRematch.reach > rematch.reach) {
									rematch.reach = nestedRematch.reach;
								}
							}
						}
					}
				}
			}

			/**
			 * @typedef LinkedListNode
			 * @property {T} value
			 * @property {LinkedListNode<T> | null} prev The previous node.
			 * @property {LinkedListNode<T> | null} next The next node.
			 * @template T
			 * @private
			 */

			/**
			 * @template T
			 * @private
			 */
			function LinkedList() {
				/** @type {LinkedListNode<T>} */
				var head = { value: null, prev: null, next: null };
				/** @type {LinkedListNode<T>} */
				var tail = { value: null, prev: head, next: null };
				head.next = tail;

				/** @type {LinkedListNode<T>} */
				this.head = head;
				/** @type {LinkedListNode<T>} */
				this.tail = tail;
				this.length = 0;
			}

			/**
			 * Adds a new node with the given value to the list.
			 *
			 * @param {LinkedList<T>} list
			 * @param {LinkedListNode<T>} node
			 * @param {T} value
			 * @returns {LinkedListNode<T>} The added node.
			 * @template T
			 */
			function addAfter(list, node, value) {
				// assumes that node != list.tail && values.length >= 0
				var next = node.next;

				var newNode = { value: value, prev: node, next: next };
				node.next = newNode;
				next.prev = newNode;
				list.length++;

				return newNode;
			}
			/**
			 * Removes `count` nodes after the given node. The given node will not be removed.
			 *
			 * @param {LinkedList<T>} list
			 * @param {LinkedListNode<T>} node
			 * @param {number} count
			 * @template T
			 */
			function removeRange(list, node, count) {
				var next = node.next;
				for (var i = 0; i < count && next !== list.tail; i++) {
					next = next.next;
				}
				node.next = next;
				next.prev = node;
				list.length -= i;
			}
			/**
			 * @param {LinkedList<T>} list
			 * @returns {T[]}
			 * @template T
			 */
			function toArray(list) {
				var array = [];
				var node = list.head.next;
				while (node !== list.tail) {
					array.push(node.value);
					node = node.next;
				}
				return array;
			}


			if (!_self.document) {
				if (!_self.addEventListener) {
					// in Node.js
					return _;
				}

				if (!_.disableWorkerMessageHandler) {
					// In worker
					_self.addEventListener('message', function (evt) {
						var message = JSON.parse(evt.data);
						var lang = message.language;
						var code = message.code;
						var immediateClose = message.immediateClose;

						_self.postMessage(_.highlight(code, _.languages[lang], lang));
						if (immediateClose) {
							_self.close();
						}
					}, false);
				}

				return _;
			}

			// Get current script and highlight
			var script = _.util.currentScript();

			if (script) {
				_.filename = script.src;

				if (script.hasAttribute('data-manual')) {
					_.manual = true;
				}
			}

			function highlightAutomaticallyCallback() {
				if (!_.manual) {
					_.highlightAll();
				}
			}

			if (!_.manual) {
				// If the document state is "loading", then we'll use DOMContentLoaded.
				// If the document state is "interactive" and the prism.js script is deferred, then we'll also use the
				// DOMContentLoaded event because there might be some plugins or languages which have also been deferred and they
				// might take longer one animation frame to execute which can create a race condition where only some plugins have
				// been loaded when Prism.highlightAll() is executed, depending on how fast resources are loaded.
				// See https://github.com/PrismJS/prism/issues/2102
				var readyState = document.readyState;
				if (readyState === 'loading' || readyState === 'interactive' && script && script.defer) {
					document.addEventListener('DOMContentLoaded', highlightAutomaticallyCallback);
				} else {
					if (window.requestAnimationFrame) {
						window.requestAnimationFrame(highlightAutomaticallyCallback);
					} else {
						window.setTimeout(highlightAutomaticallyCallback, 16);
					}
				}
			}

			return _;

		}(_self));

		if (module.exports) {
			module.exports = Prism;
		}

		// hack for components to work correctly in node.js
		if (typeof commonjsGlobal !== 'undefined') {
			commonjsGlobal.Prism = Prism;
		}

		// some additional documentation/types

		/**
		 * The expansion of a simple `RegExp` literal to support additional properties.
		 *
		 * @typedef GrammarToken
		 * @property {RegExp} pattern The regular expression of the token.
		 * @property {boolean} [lookbehind=false] If `true`, then the first capturing group of `pattern` will (effectively)
		 * behave as a lookbehind group meaning that the captured text will not be part of the matched text of the new token.
		 * @property {boolean} [greedy=false] Whether the token is greedy.
		 * @property {string|string[]} [alias] An optional alias or list of aliases.
		 * @property {Grammar} [inside] The nested grammar of this token.
		 *
		 * The `inside` grammar will be used to tokenize the text value of each token of this kind.
		 *
		 * This can be used to make nested and even recursive language definitions.
		 *
		 * Note: This can cause infinite recursion. Be careful when you embed different languages or even the same language into
		 * each another.
		 * @global
		 * @public
		 */

		/**
		 * @typedef Grammar
		 * @type {Object<string, RegExp | GrammarToken | Array<RegExp | GrammarToken>>}
		 * @property {Grammar} [rest] An optional grammar object that will be appended to this grammar.
		 * @global
		 * @public
		 */

		/**
		 * A function which will invoked after an element was successfully highlighted.
		 *
		 * @callback HighlightCallback
		 * @param {Element} element The element successfully highlighted.
		 * @returns {void}
		 * @global
		 * @public
		 */

		/**
		 * @callback HookCallback
		 * @param {Object<string, any>} env The environment variables of the hook.
		 * @returns {void}
		 * @global
		 * @public
		 */


		/* **********************************************
		     Begin prism-markup.js
		********************************************** */

		Prism.languages.markup = {
			'comment': {
				pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
				greedy: true
			},
			'prolog': {
				pattern: /<\?[\s\S]+?\?>/,
				greedy: true
			},
			'doctype': {
				// https://www.w3.org/TR/xml/#NT-doctypedecl
				pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
				greedy: true,
				inside: {
					'internal-subset': {
						pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
						lookbehind: true,
						greedy: true,
						inside: null // see below
					},
					'string': {
						pattern: /"[^"]*"|'[^']*'/,
						greedy: true
					},
					'punctuation': /^<!|>$|[[\]]/,
					'doctype-tag': /^DOCTYPE/i,
					'name': /[^\s<>'"]+/
				}
			},
			'cdata': {
				pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
				greedy: true
			},
			'tag': {
				pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
				greedy: true,
				inside: {
					'tag': {
						pattern: /^<\/?[^\s>\/]+/,
						inside: {
							'punctuation': /^<\/?/,
							'namespace': /^[^\s>\/:]+:/
						}
					},
					'special-attr': [],
					'attr-value': {
						pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
						inside: {
							'punctuation': [
								{
									pattern: /^=/,
									alias: 'attr-equals'
								},
								{
									pattern: /^(\s*)["']|["']$/,
									lookbehind: true
								}
							]
						}
					},
					'punctuation': /\/?>/,
					'attr-name': {
						pattern: /[^\s>\/]+/,
						inside: {
							'namespace': /^[^\s>\/:]+:/
						}
					}

				}
			},
			'entity': [
				{
					pattern: /&[\da-z]{1,8};/i,
					alias: 'named-entity'
				},
				/&#x?[\da-f]{1,8};/i
			]
		};

		Prism.languages.markup['tag'].inside['attr-value'].inside['entity'] =
			Prism.languages.markup['entity'];
		Prism.languages.markup['doctype'].inside['internal-subset'].inside = Prism.languages.markup;

		// Plugin to make entity title show the real entity, idea by Roman Komarov
		Prism.hooks.add('wrap', function (env) {

			if (env.type === 'entity') {
				env.attributes['title'] = env.content.replace(/&amp;/, '&');
			}
		});

		Object.defineProperty(Prism.languages.markup.tag, 'addInlined', {
			/**
			 * Adds an inlined language to markup.
			 *
			 * An example of an inlined language is CSS with `<style>` tags.
			 *
			 * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
			 * case insensitive.
			 * @param {string} lang The language key.
			 * @example
			 * addInlined('style', 'css');
			 */
			value: function addInlined(tagName, lang) {
				var includedCdataInside = {};
				includedCdataInside['language-' + lang] = {
					pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
					lookbehind: true,
					inside: Prism.languages[lang]
				};
				includedCdataInside['cdata'] = /^<!\[CDATA\[|\]\]>$/i;

				var inside = {
					'included-cdata': {
						pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
						inside: includedCdataInside
					}
				};
				inside['language-' + lang] = {
					pattern: /[\s\S]+/,
					inside: Prism.languages[lang]
				};

				var def = {};
				def[tagName] = {
					pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function () { return tagName; }), 'i'),
					lookbehind: true,
					greedy: true,
					inside: inside
				};

				Prism.languages.insertBefore('markup', 'cdata', def);
			}
		});
		Object.defineProperty(Prism.languages.markup.tag, 'addAttribute', {
			/**
			 * Adds an pattern to highlight languages embedded in HTML attributes.
			 *
			 * An example of an inlined language is CSS with `style` attributes.
			 *
			 * @param {string} attrName The name of the tag that contains the inlined language. This name will be treated as
			 * case insensitive.
			 * @param {string} lang The language key.
			 * @example
			 * addAttribute('style', 'css');
			 */
			value: function (attrName, lang) {
				Prism.languages.markup.tag.inside['special-attr'].push({
					pattern: RegExp(
						/(^|["'\s])/.source + '(?:' + attrName + ')' + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,
						'i'
					),
					lookbehind: true,
					inside: {
						'attr-name': /^[^\s=]+/,
						'attr-value': {
							pattern: /=[\s\S]+/,
							inside: {
								'value': {
									pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
									lookbehind: true,
									alias: [lang, 'language-' + lang],
									inside: Prism.languages[lang]
								},
								'punctuation': [
									{
										pattern: /^=/,
										alias: 'attr-equals'
									},
									/"|'/
								]
							}
						}
					}
				});
			}
		});

		Prism.languages.html = Prism.languages.markup;
		Prism.languages.mathml = Prism.languages.markup;
		Prism.languages.svg = Prism.languages.markup;

		Prism.languages.xml = Prism.languages.extend('markup', {});
		Prism.languages.ssml = Prism.languages.xml;
		Prism.languages.atom = Prism.languages.xml;
		Prism.languages.rss = Prism.languages.xml;


		/* **********************************************
		     Begin prism-css.js
		********************************************** */

		(function (Prism) {

			var string = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;

			Prism.languages.css = {
				'comment': /\/\*[\s\S]*?\*\//,
				'atrule': {
					pattern: RegExp('@[\\w-](?:' + /[^;{\s"']|\s+(?!\s)/.source + '|' + string.source + ')*?' + /(?:;|(?=\s*\{))/.source),
					inside: {
						'rule': /^@[\w-]+/,
						'selector-function-argument': {
							pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
							lookbehind: true,
							alias: 'selector'
						},
						'keyword': {
							pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
							lookbehind: true
						}
						// See rest below
					}
				},
				'url': {
					// https://drafts.csswg.org/css-values-3/#urls
					pattern: RegExp('\\burl\\((?:' + string.source + '|' + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ')\\)', 'i'),
					greedy: true,
					inside: {
						'function': /^url/i,
						'punctuation': /^\(|\)$/,
						'string': {
							pattern: RegExp('^' + string.source + '$'),
							alias: 'url'
						}
					}
				},
				'selector': {
					pattern: RegExp('(^|[{}\\s])[^{}\\s](?:[^{};"\'\\s]|\\s+(?![\\s{])|' + string.source + ')*(?=\\s*\\{)'),
					lookbehind: true
				},
				'string': {
					pattern: string,
					greedy: true
				},
				'property': {
					pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
					lookbehind: true
				},
				'important': /!important\b/i,
				'function': {
					pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
					lookbehind: true
				},
				'punctuation': /[(){};:,]/
			};

			Prism.languages.css['atrule'].inside.rest = Prism.languages.css;

			var markup = Prism.languages.markup;
			if (markup) {
				markup.tag.addInlined('style', 'css');
				markup.tag.addAttribute('style', 'css');
			}

		}(Prism));


		/* **********************************************
		     Begin prism-clike.js
		********************************************** */

		Prism.languages.clike = {
			'comment': [
				{
					pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
					lookbehind: true,
					greedy: true
				},
				{
					pattern: /(^|[^\\:])\/\/.*/,
					lookbehind: true,
					greedy: true
				}
			],
			'string': {
				pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
				greedy: true
			},
			'class-name': {
				pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
				lookbehind: true,
				inside: {
					'punctuation': /[.\\]/
				}
			},
			'keyword': /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
			'boolean': /\b(?:false|true)\b/,
			'function': /\b\w+(?=\()/,
			'number': /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
			'operator': /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
			'punctuation': /[{}[\];(),.:]/
		};


		/* **********************************************
		     Begin prism-javascript.js
		********************************************** */

		Prism.languages.javascript = Prism.languages.extend('clike', {
			'class-name': [
				Prism.languages.clike['class-name'],
				{
					pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
					lookbehind: true
				}
			],
			'keyword': [
				{
					pattern: /((?:^|\})\s*)catch\b/,
					lookbehind: true
				},
				{
					pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
					lookbehind: true
				},
			],
			// Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
			'function': /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
			'number': {
				pattern: RegExp(
					/(^|[^\w$])/.source +
					'(?:' +
					(
						// constant
						/NaN|Infinity/.source +
						'|' +
						// binary integer
						/0[bB][01]+(?:_[01]+)*n?/.source +
						'|' +
						// octal integer
						/0[oO][0-7]+(?:_[0-7]+)*n?/.source +
						'|' +
						// hexadecimal integer
						/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source +
						'|' +
						// decimal bigint
						/\d+(?:_\d+)*n/.source +
						'|' +
						// decimal number (integer or float) but no bigint
						/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source
					) +
					')' +
					/(?![\w$])/.source
				),
				lookbehind: true
			},
			'operator': /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
		});

		Prism.languages.javascript['class-name'][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;

		Prism.languages.insertBefore('javascript', 'keyword', {
			'regex': {
				pattern: RegExp(
					// lookbehind
					// eslint-disable-next-line regexp/no-dupe-characters-character-class
					/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source +
					// Regex pattern:
					// There are 2 regex patterns here. The RegExp set notation proposal added support for nested character
					// classes if the `v` flag is present. Unfortunately, nested CCs are both context-free and incompatible
					// with the only syntax, so we have to define 2 different regex patterns.
					/\//.source +
					'(?:' +
					/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source +
					'|' +
					// `v` flag syntax. This supports 3 levels of nested character classes.
					/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source +
					')' +
					// lookahead
					/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source
				),
				lookbehind: true,
				greedy: true,
				inside: {
					'regex-source': {
						pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
						lookbehind: true,
						alias: 'language-regex',
						inside: Prism.languages.regex
					},
					'regex-delimiter': /^\/|\/$/,
					'regex-flags': /^[a-z]+$/,
				}
			},
			// This must be declared before keyword because we use "function" inside the look-forward
			'function-variable': {
				pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
				alias: 'function'
			},
			'parameter': [
				{
					pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
					lookbehind: true,
					inside: Prism.languages.javascript
				},
				{
					pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
					lookbehind: true,
					inside: Prism.languages.javascript
				},
				{
					pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
					lookbehind: true,
					inside: Prism.languages.javascript
				},
				{
					pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
					lookbehind: true,
					inside: Prism.languages.javascript
				}
			],
			'constant': /\b[A-Z](?:[A-Z_]|\dx?)*\b/
		});

		Prism.languages.insertBefore('javascript', 'string', {
			'hashbang': {
				pattern: /^#!.*/,
				greedy: true,
				alias: 'comment'
			},
			'template-string': {
				pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
				greedy: true,
				inside: {
					'template-punctuation': {
						pattern: /^`|`$/,
						alias: 'string'
					},
					'interpolation': {
						pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
						lookbehind: true,
						inside: {
							'interpolation-punctuation': {
								pattern: /^\$\{|\}$/,
								alias: 'punctuation'
							},
							rest: Prism.languages.javascript
						}
					},
					'string': /[\s\S]+/
				}
			},
			'string-property': {
				pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
				lookbehind: true,
				greedy: true,
				alias: 'property'
			}
		});

		Prism.languages.insertBefore('javascript', 'operator', {
			'literal-property': {
				pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
				lookbehind: true,
				alias: 'property'
			},
		});

		if (Prism.languages.markup) {
			Prism.languages.markup.tag.addInlined('script', 'javascript');

			// add attribute support for all DOM events.
			// https://developer.mozilla.org/en-US/docs/Web/Events#Standard_events
			Prism.languages.markup.tag.addAttribute(
				/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,
				'javascript'
			);
		}

		Prism.languages.js = Prism.languages.javascript;


		/* **********************************************
		     Begin prism-file-highlight.js
		********************************************** */

		(function () {

			if (typeof Prism === 'undefined' || typeof document === 'undefined') {
				return;
			}

			// https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill
			if (!Element.prototype.matches) {
				Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
			}

			var LOADING_MESSAGE = 'Loading…';
			var FAILURE_MESSAGE = function (status, message) {
				return '✖ Error ' + status + ' while fetching file: ' + message;
			};
			var FAILURE_EMPTY_MESSAGE = '✖ Error: File does not exist or is empty';

			var EXTENSIONS = {
				'js': 'javascript',
				'py': 'python',
				'rb': 'ruby',
				'ps1': 'powershell',
				'psm1': 'powershell',
				'sh': 'bash',
				'bat': 'batch',
				'h': 'c',
				'tex': 'latex'
			};

			var STATUS_ATTR = 'data-src-status';
			var STATUS_LOADING = 'loading';
			var STATUS_LOADED = 'loaded';
			var STATUS_FAILED = 'failed';

			var SELECTOR = 'pre[data-src]:not([' + STATUS_ATTR + '="' + STATUS_LOADED + '"])'
				+ ':not([' + STATUS_ATTR + '="' + STATUS_LOADING + '"])';

			/**
			 * Loads the given file.
			 *
			 * @param {string} src The URL or path of the source file to load.
			 * @param {(result: string) => void} success
			 * @param {(reason: string) => void} error
			 */
			function loadFile(src, success, error) {
				var xhr = new XMLHttpRequest();
				xhr.open('GET', src, true);
				xhr.onreadystatechange = function () {
					if (xhr.readyState == 4) {
						if (xhr.status < 400 && xhr.responseText) {
							success(xhr.responseText);
						} else {
							if (xhr.status >= 400) {
								error(FAILURE_MESSAGE(xhr.status, xhr.statusText));
							} else {
								error(FAILURE_EMPTY_MESSAGE);
							}
						}
					}
				};
				xhr.send(null);
			}

			/**
			 * Parses the given range.
			 *
			 * This returns a range with inclusive ends.
			 *
			 * @param {string | null | undefined} range
			 * @returns {[number, number | undefined] | undefined}
			 */
			function parseRange(range) {
				var m = /^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(range || '');
				if (m) {
					var start = Number(m[1]);
					var comma = m[2];
					var end = m[3];

					if (!comma) {
						return [start, start];
					}
					if (!end) {
						return [start, undefined];
					}
					return [start, Number(end)];
				}
				return undefined;
			}

			Prism.hooks.add('before-highlightall', function (env) {
				env.selector += ', ' + SELECTOR;
			});

			Prism.hooks.add('before-sanity-check', function (env) {
				var pre = /** @type {HTMLPreElement} */ (env.element);
				if (pre.matches(SELECTOR)) {
					env.code = ''; // fast-path the whole thing and go to complete

					pre.setAttribute(STATUS_ATTR, STATUS_LOADING); // mark as loading

					// add code element with loading message
					var code = pre.appendChild(document.createElement('CODE'));
					code.textContent = LOADING_MESSAGE;

					var src = pre.getAttribute('data-src');

					var language = env.language;
					if (language === 'none') {
						// the language might be 'none' because there is no language set;
						// in this case, we want to use the extension as the language
						var extension = (/\.(\w+)$/.exec(src) || [, 'none'])[1];
						language = EXTENSIONS[extension] || extension;
					}

					// set language classes
					Prism.util.setLanguage(code, language);
					Prism.util.setLanguage(pre, language);

					// preload the language
					var autoloader = Prism.plugins.autoloader;
					if (autoloader) {
						autoloader.loadLanguages(language);
					}

					// load file
					loadFile(
						src,
						function (text) {
							// mark as loaded
							pre.setAttribute(STATUS_ATTR, STATUS_LOADED);

							// handle data-range
							var range = parseRange(pre.getAttribute('data-range'));
							if (range) {
								var lines = text.split(/\r\n?|\n/g);

								// the range is one-based and inclusive on both ends
								var start = range[0];
								var end = range[1] == null ? lines.length : range[1];

								if (start < 0) { start += lines.length; }
								start = Math.max(0, Math.min(start - 1, lines.length));
								if (end < 0) { end += lines.length; }
								end = Math.max(0, Math.min(end, lines.length));

								text = lines.slice(start, end).join('\n');

								// add data-start for line numbers
								if (!pre.hasAttribute('data-start')) {
									pre.setAttribute('data-start', String(start + 1));
								}
							}

							// highlight code
							code.textContent = text;
							Prism.highlightElement(code);
						},
						function (error) {
							// mark as failed
							pre.setAttribute(STATUS_ATTR, STATUS_FAILED);

							code.textContent = error;
						}
					);
				}
			});

			Prism.plugins.fileHighlight = {
				/**
				 * Executes the File Highlight plugin for all matching `pre` elements under the given container.
				 *
				 * Note: Elements which are already loaded or currently loading will not be touched by this method.
				 *
				 * @param {ParentNode} [container=document]
				 */
				highlight: function highlight(container) {
					var elements = (container || document).querySelectorAll(SELECTOR);

					for (var i = 0, element; (element = elements[i++]);) {
						Prism.highlightElement(element);
					}
				}
			};

			var logged = false;
			/** @deprecated Use `Prism.plugins.fileHighlight.highlight` instead. */
			Prism.fileHighlight = function () {
				if (!logged) {
					console.warn('Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead.');
					logged = true;
				}
				Prism.plugins.fileHighlight.highlight.apply(this, arguments);
			};

		}()); 
	} (prism));
	return prism.exports;
}

requirePrism();

function commonjsRequire(path) {
	throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}

var components = {exports: {}};

var hasRequiredComponents$1;

function requireComponents$1 () {
	if (hasRequiredComponents$1) return components.exports;
	hasRequiredComponents$1 = 1;
	(function (module) {
		var components = {"core":{"meta":{"path":"components/prism-core.js","option":"mandatory"},"core":"Core"},"themes":{"meta":{"path":"themes/{id}.css","link":"index.html?theme={id}","exclusive":true},"prism":{"title":"Default","option":"default"},"prism-dark":"Dark","prism-funky":"Funky","prism-okaidia":{"title":"Okaidia","owner":"ocodia"},"prism-twilight":{"title":"Twilight","owner":"remybach"},"prism-coy":{"title":"Coy","owner":"tshedor"},"prism-solarizedlight":{"title":"Solarized Light","owner":"hectormatos2011 "},"prism-tomorrow":{"title":"Tomorrow Night","owner":"Rosey"}},"languages":{"meta":{"path":"components/prism-{id}","noCSS":true,"examplesPath":"examples/prism-{id}","addCheckAll":true},"markup":{"title":"Markup","alias":["html","xml","svg","mathml","ssml","atom","rss"],"aliasTitles":{"html":"HTML","xml":"XML","svg":"SVG","mathml":"MathML","ssml":"SSML","atom":"Atom","rss":"RSS"},"option":"default"},"css":{"title":"CSS","option":"default","modify":"markup"},"clike":{"title":"C-like","option":"default"},"javascript":{"title":"JavaScript","require":"clike","modify":"markup","optional":"regex","alias":"js","option":"default"},"abap":{"title":"ABAP","owner":"dellagustin"},"abnf":{"title":"ABNF","owner":"RunDevelopment"},"actionscript":{"title":"ActionScript","require":"javascript","modify":"markup","owner":"Golmote"},"ada":{"title":"Ada","owner":"Lucretia"},"agda":{"title":"Agda","owner":"xy-ren"},"al":{"title":"AL","owner":"RunDevelopment"},"antlr4":{"title":"ANTLR4","alias":"g4","owner":"RunDevelopment"},"apacheconf":{"title":"Apache Configuration","owner":"GuiTeK"},"apex":{"title":"Apex","require":["clike","sql"],"owner":"RunDevelopment"},"apl":{"title":"APL","owner":"ngn"},"applescript":{"title":"AppleScript","owner":"Golmote"},"aql":{"title":"AQL","owner":"RunDevelopment"},"arduino":{"title":"Arduino","require":"cpp","alias":"ino","owner":"dkern"},"arff":{"title":"ARFF","owner":"Golmote"},"armasm":{"title":"ARM Assembly","alias":"arm-asm","owner":"RunDevelopment"},"arturo":{"title":"Arturo","alias":"art","optional":["bash","css","javascript","markup","markdown","sql"],"owner":"drkameleon"},"asciidoc":{"alias":"adoc","title":"AsciiDoc","owner":"Golmote"},"aspnet":{"title":"ASP.NET (C#)","require":["markup","csharp"],"owner":"nauzilus"},"asm6502":{"title":"6502 Assembly","owner":"kzurawel"},"asmatmel":{"title":"Atmel AVR Assembly","owner":"cerkit"},"autohotkey":{"title":"AutoHotkey","owner":"aviaryan"},"autoit":{"title":"AutoIt","owner":"Golmote"},"avisynth":{"title":"AviSynth","alias":"avs","owner":"Zinfidel"},"avro-idl":{"title":"Avro IDL","alias":"avdl","owner":"RunDevelopment"},"awk":{"title":"AWK","alias":"gawk","aliasTitles":{"gawk":"GAWK"},"owner":"RunDevelopment"},"bash":{"title":"Bash","alias":["sh","shell"],"aliasTitles":{"sh":"Shell","shell":"Shell"},"owner":"zeitgeist87"},"basic":{"title":"BASIC","owner":"Golmote"},"batch":{"title":"Batch","owner":"Golmote"},"bbcode":{"title":"BBcode","alias":"shortcode","aliasTitles":{"shortcode":"Shortcode"},"owner":"RunDevelopment"},"bbj":{"title":"BBj","owner":"hyyan"},"bicep":{"title":"Bicep","owner":"johnnyreilly"},"birb":{"title":"Birb","require":"clike","owner":"Calamity210"},"bison":{"title":"Bison","require":"c","owner":"Golmote"},"bnf":{"title":"BNF","alias":"rbnf","aliasTitles":{"rbnf":"RBNF"},"owner":"RunDevelopment"},"bqn":{"title":"BQN","owner":"yewscion"},"brainfuck":{"title":"Brainfuck","owner":"Golmote"},"brightscript":{"title":"BrightScript","owner":"RunDevelopment"},"bro":{"title":"Bro","owner":"wayward710"},"bsl":{"title":"BSL (1C:Enterprise)","alias":"oscript","aliasTitles":{"oscript":"OneScript"},"owner":"Diversus23"},"c":{"title":"C","require":"clike","owner":"zeitgeist87"},"csharp":{"title":"C#","require":"clike","alias":["cs","dotnet"],"owner":"mvalipour"},"cpp":{"title":"C++","require":"c","owner":"zeitgeist87"},"cfscript":{"title":"CFScript","require":"clike","alias":"cfc","owner":"mjclemente"},"chaiscript":{"title":"ChaiScript","require":["clike","cpp"],"owner":"RunDevelopment"},"cil":{"title":"CIL","owner":"sbrl"},"cilkc":{"title":"Cilk/C","require":"c","alias":"cilk-c","owner":"OpenCilk"},"cilkcpp":{"title":"Cilk/C++","require":"cpp","alias":["cilk-cpp","cilk"],"owner":"OpenCilk"},"clojure":{"title":"Clojure","owner":"troglotit"},"cmake":{"title":"CMake","owner":"mjrogozinski"},"cobol":{"title":"COBOL","owner":"RunDevelopment"},"coffeescript":{"title":"CoffeeScript","require":"javascript","alias":"coffee","owner":"R-osey"},"concurnas":{"title":"Concurnas","alias":"conc","owner":"jasontatton"},"csp":{"title":"Content-Security-Policy","owner":"ScottHelme"},"cooklang":{"title":"Cooklang","owner":"ahue"},"coq":{"title":"Coq","owner":"RunDevelopment"},"crystal":{"title":"Crystal","require":"ruby","owner":"MakeNowJust"},"css-extras":{"title":"CSS Extras","require":"css","modify":"css","owner":"milesj"},"csv":{"title":"CSV","owner":"RunDevelopment"},"cue":{"title":"CUE","owner":"RunDevelopment"},"cypher":{"title":"Cypher","owner":"RunDevelopment"},"d":{"title":"D","require":"clike","owner":"Golmote"},"dart":{"title":"Dart","require":"clike","owner":"Golmote"},"dataweave":{"title":"DataWeave","owner":"machaval"},"dax":{"title":"DAX","owner":"peterbud"},"dhall":{"title":"Dhall","owner":"RunDevelopment"},"diff":{"title":"Diff","owner":"uranusjr"},"django":{"title":"Django/Jinja2","require":"markup-templating","alias":"jinja2","owner":"romanvm"},"dns-zone-file":{"title":"DNS zone file","owner":"RunDevelopment","alias":"dns-zone"},"docker":{"title":"Docker","alias":"dockerfile","owner":"JustinBeckwith"},"dot":{"title":"DOT (Graphviz)","alias":"gv","optional":"markup","owner":"RunDevelopment"},"ebnf":{"title":"EBNF","owner":"RunDevelopment"},"editorconfig":{"title":"EditorConfig","owner":"osipxd"},"eiffel":{"title":"Eiffel","owner":"Conaclos"},"ejs":{"title":"EJS","require":["javascript","markup-templating"],"owner":"RunDevelopment","alias":"eta","aliasTitles":{"eta":"Eta"}},"elixir":{"title":"Elixir","owner":"Golmote"},"elm":{"title":"Elm","owner":"zwilias"},"etlua":{"title":"Embedded Lua templating","require":["lua","markup-templating"],"owner":"RunDevelopment"},"erb":{"title":"ERB","require":["ruby","markup-templating"],"owner":"Golmote"},"erlang":{"title":"Erlang","owner":"Golmote"},"excel-formula":{"title":"Excel Formula","alias":["xlsx","xls"],"owner":"RunDevelopment"},"fsharp":{"title":"F#","require":"clike","owner":"simonreynolds7"},"factor":{"title":"Factor","owner":"catb0t"},"false":{"title":"False","owner":"edukisto"},"firestore-security-rules":{"title":"Firestore security rules","require":"clike","owner":"RunDevelopment"},"flow":{"title":"Flow","require":"javascript","owner":"Golmote"},"fortran":{"title":"Fortran","owner":"Golmote"},"ftl":{"title":"FreeMarker Template Language","require":"markup-templating","owner":"RunDevelopment"},"gml":{"title":"GameMaker Language","alias":"gamemakerlanguage","require":"clike","owner":"LiarOnce"},"gap":{"title":"GAP (CAS)","owner":"RunDevelopment"},"gcode":{"title":"G-code","owner":"RunDevelopment"},"gdscript":{"title":"GDScript","owner":"RunDevelopment"},"gedcom":{"title":"GEDCOM","owner":"Golmote"},"gettext":{"title":"gettext","alias":"po","owner":"RunDevelopment"},"gherkin":{"title":"Gherkin","owner":"hason"},"git":{"title":"Git","owner":"lgiraudel"},"glsl":{"title":"GLSL","require":"c","owner":"Golmote"},"gn":{"title":"GN","alias":"gni","owner":"RunDevelopment"},"linker-script":{"title":"GNU Linker Script","alias":"ld","owner":"RunDevelopment"},"go":{"title":"Go","require":"clike","owner":"arnehormann"},"go-module":{"title":"Go module","alias":"go-mod","owner":"RunDevelopment"},"gradle":{"title":"Gradle","require":"clike","owner":"zeabdelkhalek-badido18"},"graphql":{"title":"GraphQL","optional":"markdown","owner":"Golmote"},"groovy":{"title":"Groovy","require":"clike","owner":"robfletcher"},"haml":{"title":"Haml","require":"ruby","optional":["css","css-extras","coffeescript","erb","javascript","less","markdown","scss","textile"],"owner":"Golmote"},"handlebars":{"title":"Handlebars","require":"markup-templating","alias":["hbs","mustache"],"aliasTitles":{"mustache":"Mustache"},"owner":"Golmote"},"haskell":{"title":"Haskell","alias":"hs","owner":"bholst"},"haxe":{"title":"Haxe","require":"clike","optional":"regex","owner":"Golmote"},"hcl":{"title":"HCL","owner":"outsideris"},"hlsl":{"title":"HLSL","require":"c","owner":"RunDevelopment"},"hoon":{"title":"Hoon","owner":"matildepark"},"http":{"title":"HTTP","optional":["csp","css","hpkp","hsts","javascript","json","markup","uri"],"owner":"danielgtaylor"},"hpkp":{"title":"HTTP Public-Key-Pins","owner":"ScottHelme"},"hsts":{"title":"HTTP Strict-Transport-Security","owner":"ScottHelme"},"ichigojam":{"title":"IchigoJam","owner":"BlueCocoa"},"icon":{"title":"Icon","owner":"Golmote"},"icu-message-format":{"title":"ICU Message Format","owner":"RunDevelopment"},"idris":{"title":"Idris","alias":"idr","owner":"KeenS","require":"haskell"},"ignore":{"title":".ignore","owner":"osipxd","alias":["gitignore","hgignore","npmignore"],"aliasTitles":{"gitignore":".gitignore","hgignore":".hgignore","npmignore":".npmignore"}},"inform7":{"title":"Inform 7","owner":"Golmote"},"ini":{"title":"Ini","owner":"aviaryan"},"io":{"title":"Io","owner":"AlesTsurko"},"j":{"title":"J","owner":"Golmote"},"java":{"title":"Java","require":"clike","owner":"sherblot"},"javadoc":{"title":"JavaDoc","require":["markup","java","javadoclike"],"modify":"java","optional":"scala","owner":"RunDevelopment"},"javadoclike":{"title":"JavaDoc-like","modify":["java","javascript","php"],"owner":"RunDevelopment"},"javastacktrace":{"title":"Java stack trace","owner":"RunDevelopment"},"jexl":{"title":"Jexl","owner":"czosel"},"jolie":{"title":"Jolie","require":"clike","owner":"thesave"},"jq":{"title":"JQ","owner":"RunDevelopment"},"jsdoc":{"title":"JSDoc","require":["javascript","javadoclike","typescript"],"modify":"javascript","optional":["actionscript","coffeescript"],"owner":"RunDevelopment"},"js-extras":{"title":"JS Extras","require":"javascript","modify":"javascript","optional":["actionscript","coffeescript","flow","n4js","typescript"],"owner":"RunDevelopment"},"json":{"title":"JSON","alias":"webmanifest","aliasTitles":{"webmanifest":"Web App Manifest"},"owner":"CupOfTea696"},"json5":{"title":"JSON5","require":"json","owner":"RunDevelopment"},"jsonp":{"title":"JSONP","require":"json","owner":"RunDevelopment"},"jsstacktrace":{"title":"JS stack trace","owner":"sbrl"},"js-templates":{"title":"JS Templates","require":"javascript","modify":"javascript","optional":["css","css-extras","graphql","markdown","markup","sql"],"owner":"RunDevelopment"},"julia":{"title":"Julia","owner":"cdagnino"},"keepalived":{"title":"Keepalived Configure","owner":"dev-itsheng"},"keyman":{"title":"Keyman","owner":"mcdurdin"},"kotlin":{"title":"Kotlin","alias":["kt","kts"],"aliasTitles":{"kts":"Kotlin Script"},"require":"clike","owner":"Golmote"},"kumir":{"title":"KuMir (КуМир)","alias":"kum","owner":"edukisto"},"kusto":{"title":"Kusto","owner":"RunDevelopment"},"latex":{"title":"LaTeX","alias":["tex","context"],"aliasTitles":{"tex":"TeX","context":"ConTeXt"},"owner":"japborst"},"latte":{"title":"Latte","require":["clike","markup-templating","php"],"owner":"nette"},"less":{"title":"Less","require":"css","optional":"css-extras","owner":"Golmote"},"lilypond":{"title":"LilyPond","require":"scheme","alias":"ly","owner":"RunDevelopment"},"liquid":{"title":"Liquid","require":"markup-templating","owner":"cinhtau"},"lisp":{"title":"Lisp","alias":["emacs","elisp","emacs-lisp"],"owner":"JuanCaicedo"},"livescript":{"title":"LiveScript","owner":"Golmote"},"llvm":{"title":"LLVM IR","owner":"porglezomp"},"log":{"title":"Log file","optional":"javastacktrace","owner":"RunDevelopment"},"lolcode":{"title":"LOLCODE","owner":"Golmote"},"lua":{"title":"Lua","owner":"Golmote"},"magma":{"title":"Magma (CAS)","owner":"RunDevelopment"},"makefile":{"title":"Makefile","owner":"Golmote"},"markdown":{"title":"Markdown","require":"markup","optional":"yaml","alias":"md","owner":"Golmote"},"markup-templating":{"title":"Markup templating","require":"markup","owner":"Golmote"},"mata":{"title":"Mata","owner":"RunDevelopment"},"matlab":{"title":"MATLAB","owner":"Golmote"},"maxscript":{"title":"MAXScript","owner":"RunDevelopment"},"mel":{"title":"MEL","owner":"Golmote"},"mermaid":{"title":"Mermaid","owner":"RunDevelopment"},"metafont":{"title":"METAFONT","owner":"LaeriExNihilo"},"mizar":{"title":"Mizar","owner":"Golmote"},"mongodb":{"title":"MongoDB","owner":"airs0urce","require":"javascript"},"monkey":{"title":"Monkey","owner":"Golmote"},"moonscript":{"title":"MoonScript","alias":"moon","owner":"RunDevelopment"},"n1ql":{"title":"N1QL","owner":"TMWilds"},"n4js":{"title":"N4JS","require":"javascript","optional":"jsdoc","alias":"n4jsd","owner":"bsmith-n4"},"nand2tetris-hdl":{"title":"Nand To Tetris HDL","owner":"stephanmax"},"naniscript":{"title":"Naninovel Script","owner":"Elringus","alias":"nani"},"nasm":{"title":"NASM","owner":"rbmj"},"neon":{"title":"NEON","owner":"nette"},"nevod":{"title":"Nevod","owner":"nezaboodka"},"nginx":{"title":"nginx","owner":"volado"},"nim":{"title":"Nim","owner":"Golmote"},"nix":{"title":"Nix","owner":"Golmote"},"nsis":{"title":"NSIS","owner":"idleberg"},"objectivec":{"title":"Objective-C","require":"c","alias":"objc","owner":"uranusjr"},"ocaml":{"title":"OCaml","owner":"Golmote"},"odin":{"title":"Odin","owner":"edukisto"},"opencl":{"title":"OpenCL","require":"c","modify":["c","cpp"],"owner":"Milania1"},"openqasm":{"title":"OpenQasm","alias":"qasm","owner":"RunDevelopment"},"oz":{"title":"Oz","owner":"Golmote"},"parigp":{"title":"PARI/GP","owner":"Golmote"},"parser":{"title":"Parser","require":"markup","owner":"Golmote"},"pascal":{"title":"Pascal","alias":"objectpascal","aliasTitles":{"objectpascal":"Object Pascal"},"owner":"Golmote"},"pascaligo":{"title":"Pascaligo","owner":"DefinitelyNotAGoat"},"psl":{"title":"PATROL Scripting Language","owner":"bertysentry"},"pcaxis":{"title":"PC-Axis","alias":"px","owner":"RunDevelopment"},"peoplecode":{"title":"PeopleCode","alias":"pcode","owner":"RunDevelopment"},"perl":{"title":"Perl","owner":"Golmote"},"php":{"title":"PHP","require":"markup-templating","owner":"milesj"},"phpdoc":{"title":"PHPDoc","require":["php","javadoclike"],"modify":"php","owner":"RunDevelopment"},"php-extras":{"title":"PHP Extras","require":"php","modify":"php","owner":"milesj"},"plant-uml":{"title":"PlantUML","alias":"plantuml","owner":"RunDevelopment"},"plsql":{"title":"PL/SQL","require":"sql","owner":"Golmote"},"powerquery":{"title":"PowerQuery","alias":["pq","mscript"],"owner":"peterbud"},"powershell":{"title":"PowerShell","owner":"nauzilus"},"processing":{"title":"Processing","require":"clike","owner":"Golmote"},"prolog":{"title":"Prolog","owner":"Golmote"},"promql":{"title":"PromQL","owner":"arendjr"},"properties":{"title":".properties","owner":"Golmote"},"protobuf":{"title":"Protocol Buffers","require":"clike","owner":"just-boris"},"pug":{"title":"Pug","require":["markup","javascript"],"optional":["coffeescript","ejs","handlebars","less","livescript","markdown","scss","stylus","twig"],"owner":"Golmote"},"puppet":{"title":"Puppet","owner":"Golmote"},"pure":{"title":"Pure","optional":["c","cpp","fortran"],"owner":"Golmote"},"purebasic":{"title":"PureBasic","require":"clike","alias":"pbfasm","owner":"HeX0R101"},"purescript":{"title":"PureScript","require":"haskell","alias":"purs","owner":"sriharshachilakapati"},"python":{"title":"Python","alias":"py","owner":"multipetros"},"qsharp":{"title":"Q#","require":"clike","alias":"qs","owner":"fedonman"},"q":{"title":"Q (kdb+ database)","owner":"Golmote"},"qml":{"title":"QML","require":"javascript","owner":"RunDevelopment"},"qore":{"title":"Qore","require":"clike","owner":"temnroegg"},"r":{"title":"R","owner":"Golmote"},"racket":{"title":"Racket","require":"scheme","alias":"rkt","owner":"RunDevelopment"},"cshtml":{"title":"Razor C#","alias":"razor","require":["markup","csharp"],"optional":["css","css-extras","javascript","js-extras"],"owner":"RunDevelopment"},"jsx":{"title":"React JSX","require":["markup","javascript"],"optional":["jsdoc","js-extras","js-templates"],"owner":"vkbansal"},"tsx":{"title":"React TSX","require":["jsx","typescript"]},"reason":{"title":"Reason","require":"clike","owner":"Golmote"},"regex":{"title":"Regex","owner":"RunDevelopment"},"rego":{"title":"Rego","owner":"JordanSh"},"renpy":{"title":"Ren'py","alias":"rpy","owner":"HyuchiaDiego"},"rescript":{"title":"ReScript","alias":"res","owner":"vmarcosp"},"rest":{"title":"reST (reStructuredText)","owner":"Golmote"},"rip":{"title":"Rip","owner":"ravinggenius"},"roboconf":{"title":"Roboconf","owner":"Golmote"},"robotframework":{"title":"Robot Framework","alias":"robot","owner":"RunDevelopment"},"ruby":{"title":"Ruby","require":"clike","alias":"rb","owner":"samflores"},"rust":{"title":"Rust","owner":"Golmote"},"sas":{"title":"SAS","optional":["groovy","lua","sql"],"owner":"Golmote"},"sass":{"title":"Sass (Sass)","require":"css","optional":"css-extras","owner":"Golmote"},"scss":{"title":"Sass (SCSS)","require":"css","optional":"css-extras","owner":"MoOx"},"scala":{"title":"Scala","require":"java","owner":"jozic"},"scheme":{"title":"Scheme","owner":"bacchus123"},"shell-session":{"title":"Shell session","require":"bash","alias":["sh-session","shellsession"],"owner":"RunDevelopment"},"smali":{"title":"Smali","owner":"RunDevelopment"},"smalltalk":{"title":"Smalltalk","owner":"Golmote"},"smarty":{"title":"Smarty","require":"markup-templating","optional":"php","owner":"Golmote"},"sml":{"title":"SML","alias":"smlnj","aliasTitles":{"smlnj":"SML/NJ"},"owner":"RunDevelopment"},"solidity":{"title":"Solidity (Ethereum)","alias":"sol","require":"clike","owner":"glachaud"},"solution-file":{"title":"Solution file","alias":"sln","owner":"RunDevelopment"},"soy":{"title":"Soy (Closure Template)","require":"markup-templating","owner":"Golmote"},"sparql":{"title":"SPARQL","require":"turtle","owner":"Triply-Dev","alias":"rq"},"splunk-spl":{"title":"Splunk SPL","owner":"RunDevelopment"},"sqf":{"title":"SQF: Status Quo Function (Arma 3)","require":"clike","owner":"RunDevelopment"},"sql":{"title":"SQL","owner":"multipetros"},"squirrel":{"title":"Squirrel","require":"clike","owner":"RunDevelopment"},"stan":{"title":"Stan","owner":"RunDevelopment"},"stata":{"title":"Stata Ado","require":["mata","java","python"],"owner":"RunDevelopment"},"iecst":{"title":"Structured Text (IEC 61131-3)","owner":"serhioromano"},"stylus":{"title":"Stylus","owner":"vkbansal"},"supercollider":{"title":"SuperCollider","alias":"sclang","owner":"RunDevelopment"},"swift":{"title":"Swift","owner":"chrischares"},"systemd":{"title":"Systemd configuration file","owner":"RunDevelopment"},"t4-templating":{"title":"T4 templating","owner":"RunDevelopment"},"t4-cs":{"title":"T4 Text Templates (C#)","require":["t4-templating","csharp"],"alias":"t4","owner":"RunDevelopment"},"t4-vb":{"title":"T4 Text Templates (VB)","require":["t4-templating","vbnet"],"owner":"RunDevelopment"},"tap":{"title":"TAP","owner":"isaacs","require":"yaml"},"tcl":{"title":"Tcl","owner":"PeterChaplin"},"tt2":{"title":"Template Toolkit 2","require":["clike","markup-templating"],"owner":"gflohr"},"textile":{"title":"Textile","require":"markup","optional":"css","owner":"Golmote"},"toml":{"title":"TOML","owner":"RunDevelopment"},"tremor":{"title":"Tremor","alias":["trickle","troy"],"owner":"darach","aliasTitles":{"trickle":"trickle","troy":"troy"}},"turtle":{"title":"Turtle","alias":"trig","aliasTitles":{"trig":"TriG"},"owner":"jakubklimek"},"twig":{"title":"Twig","require":"markup-templating","owner":"brandonkelly"},"typescript":{"title":"TypeScript","require":"javascript","optional":"js-templates","alias":"ts","owner":"vkbansal"},"typoscript":{"title":"TypoScript","alias":"tsconfig","aliasTitles":{"tsconfig":"TSConfig"},"owner":"dkern"},"unrealscript":{"title":"UnrealScript","alias":["uscript","uc"],"owner":"RunDevelopment"},"uorazor":{"title":"UO Razor Script","owner":"jaseowns"},"uri":{"title":"URI","alias":"url","aliasTitles":{"url":"URL"},"owner":"RunDevelopment"},"v":{"title":"V","require":"clike","owner":"taggon"},"vala":{"title":"Vala","require":"clike","optional":"regex","owner":"TemplarVolk"},"vbnet":{"title":"VB.Net","require":"basic","owner":"Bigsby"},"velocity":{"title":"Velocity","require":"markup","owner":"Golmote"},"verilog":{"title":"Verilog","owner":"a-rey"},"vhdl":{"title":"VHDL","owner":"a-rey"},"vim":{"title":"vim","owner":"westonganger"},"visual-basic":{"title":"Visual Basic","alias":["vb","vba"],"aliasTitles":{"vba":"VBA"},"owner":"Golmote"},"warpscript":{"title":"WarpScript","owner":"RunDevelopment"},"wasm":{"title":"WebAssembly","owner":"Golmote"},"web-idl":{"title":"Web IDL","alias":"webidl","owner":"RunDevelopment"},"wgsl":{"title":"WGSL","owner":"Dr4gonthree"},"wiki":{"title":"Wiki markup","require":"markup","owner":"Golmote"},"wolfram":{"title":"Wolfram language","alias":["mathematica","nb","wl"],"aliasTitles":{"mathematica":"Mathematica","nb":"Mathematica Notebook"},"owner":"msollami"},"wren":{"title":"Wren","owner":"clsource"},"xeora":{"title":"Xeora","require":"markup","alias":"xeoracube","aliasTitles":{"xeoracube":"XeoraCube"},"owner":"freakmaxi"},"xml-doc":{"title":"XML doc (.net)","require":"markup","modify":["csharp","fsharp","vbnet"],"owner":"RunDevelopment"},"xojo":{"title":"Xojo (REALbasic)","owner":"Golmote"},"xquery":{"title":"XQuery","require":"markup","owner":"Golmote"},"yaml":{"title":"YAML","alias":"yml","owner":"hason"},"yang":{"title":"YANG","owner":"RunDevelopment"},"zig":{"title":"Zig","owner":"RunDevelopment"}},"plugins":{"meta":{"path":"plugins/{id}/prism-{id}","link":"plugins/{id}/"},"line-highlight":{"title":"Line Highlight","description":"Highlights specific lines and/or line ranges."},"line-numbers":{"title":"Line Numbers","description":"Line number at the beginning of code lines.","owner":"kuba-kubula"},"show-invisibles":{"title":"Show Invisibles","description":"Show hidden characters such as tabs and line breaks.","optional":["autolinker","data-uri-highlight"]},"autolinker":{"title":"Autolinker","description":"Converts URLs and emails in code to clickable links. Parses Markdown links in comments."},"wpd":{"title":"WebPlatform Docs","description":"Makes tokens link to <a href=\"https://webplatform.github.io/docs/\">WebPlatform.org documentation</a>. The links open in a new tab."},"custom-class":{"title":"Custom Class","description":"This plugin allows you to prefix Prism's default classes (<code>.comment</code> can become <code>.namespace--comment</code>) or replace them with your defined ones (like <code>.editor__comment</code>). You can even add new classes.","owner":"dvkndn","noCSS":true},"file-highlight":{"title":"File Highlight","description":"Fetch external files and highlight them with Prism. Used on the Prism website itself.","noCSS":true},"show-language":{"title":"Show Language","description":"Display the highlighted language in code blocks (inline code does not show the label).","owner":"nauzilus","noCSS":true,"require":"toolbar"},"jsonp-highlight":{"title":"JSONP Highlight","description":"Fetch content with JSONP and highlight some interesting content (e.g. GitHub/Gists or Bitbucket API).","noCSS":true,"owner":"nauzilus"},"highlight-keywords":{"title":"Highlight Keywords","description":"Adds special CSS classes for each keyword for fine-grained highlighting.","owner":"vkbansal","noCSS":true},"remove-initial-line-feed":{"title":"Remove initial line feed","description":"Removes the initial line feed in code blocks.","owner":"Golmote","noCSS":true},"inline-color":{"title":"Inline color","description":"Adds a small inline preview for colors in style sheets.","require":"css-extras","owner":"RunDevelopment"},"previewers":{"title":"Previewers","description":"Previewers for angles, colors, gradients, easing and time.","require":"css-extras","owner":"Golmote"},"autoloader":{"title":"Autoloader","description":"Automatically loads the needed languages to highlight the code blocks.","owner":"Golmote","noCSS":true},"keep-markup":{"title":"Keep Markup","description":"Prevents custom markup from being dropped out during highlighting.","owner":"Golmote","optional":"normalize-whitespace","noCSS":true},"command-line":{"title":"Command Line","description":"Display a command line with a prompt and, optionally, the output/response from the commands.","owner":"chriswells0"},"unescaped-markup":{"title":"Unescaped Markup","description":"Write markup without having to escape anything."},"normalize-whitespace":{"title":"Normalize Whitespace","description":"Supports multiple operations to normalize whitespace in code blocks.","owner":"zeitgeist87","optional":"unescaped-markup","noCSS":true},"data-uri-highlight":{"title":"Data-URI Highlight","description":"Highlights data-URI contents.","owner":"Golmote","noCSS":true},"toolbar":{"title":"Toolbar","description":"Attach a toolbar for plugins to easily register buttons on the top of a code block.","owner":"mAAdhaTTah"},"copy-to-clipboard":{"title":"Copy to Clipboard Button","description":"Add a button that copies the code block to the clipboard when clicked.","owner":"mAAdhaTTah","require":"toolbar","noCSS":true},"download-button":{"title":"Download Button","description":"A button in the toolbar of a code block adding a convenient way to download a code file.","owner":"Golmote","require":"toolbar","noCSS":true},"match-braces":{"title":"Match braces","description":"Highlights matching braces.","owner":"RunDevelopment"},"diff-highlight":{"title":"Diff Highlight","description":"Highlights the code inside diff blocks.","owner":"RunDevelopment","require":"diff"},"filter-highlight-all":{"title":"Filter highlightAll","description":"Filters the elements the <code>highlightAll</code> and <code>highlightAllUnder</code> methods actually highlight.","owner":"RunDevelopment","noCSS":true},"treeview":{"title":"Treeview","description":"A language with special styles to highlight file system tree structures.","owner":"Golmote"}}};
		if (module.exports) { module.exports = components; } 
	} (components));
	return components.exports;
}

var dependencies = {exports: {}};

var hasRequiredDependencies;

function requireDependencies () {
	if (hasRequiredDependencies) return dependencies.exports;
	hasRequiredDependencies = 1;
	(function (module) {

		/**
		 * @typedef {Object<string, ComponentCategory>} Components
		 * @typedef {Object<string, ComponentEntry | string>} ComponentCategory
		 *
		 * @typedef ComponentEntry
		 * @property {string} [title] The title of the component.
		 * @property {string} [owner] The GitHub user name of the owner.
		 * @property {boolean} [noCSS=false] Whether the component doesn't have style sheets which should also be loaded.
		 * @property {string | string[]} [alias] An optional list of aliases for the id of the component.
		 * @property {Object<string, string>} [aliasTitles] An optional map from an alias to its title.
		 *
		 * Aliases which are not in this map will the get title of the component.
		 * @property {string | string[]} [optional]
		 * @property {string | string[]} [require]
		 * @property {string | string[]} [modify]
		 */

		var getLoader = (function () {

			/**
			 * A function which does absolutely nothing.
			 *
			 * @type {any}
			 */
			var noop = function () { };

			/**
			 * Invokes the given callback for all elements of the given value.
			 *
			 * If the given value is an array, the callback will be invokes for all elements. If the given value is `null` or
			 * `undefined`, the callback will not be invoked. In all other cases, the callback will be invoked with the given
			 * value as parameter.
			 *
			 * @param {null | undefined | T | T[]} value
			 * @param {(value: T, index: number) => void} callbackFn
			 * @returns {void}
			 * @template T
			 */
			function forEach(value, callbackFn) {
				if (Array.isArray(value)) {
					value.forEach(callbackFn);
				} else if (value != null) {
					callbackFn(value, 0);
				}
			}

			/**
			 * Returns a new set for the given string array.
			 *
			 * @param {string[]} array
			 * @returns {StringSet}
			 *
			 * @typedef {Object<string, true>} StringSet
			 */
			function toSet(array) {
				/** @type {StringSet} */
				var set = {};
				for (var i = 0, l = array.length; i < l; i++) {
					set[array[i]] = true;
				}
				return set;
			}

			/**
			 * Creates a map of every components id to its entry.
			 *
			 * @param {Components} components
			 * @returns {EntryMap}
			 *
			 * @typedef {{ readonly [id: string]: Readonly<ComponentEntry> | undefined }} EntryMap
			 */
			function createEntryMap(components) {
				/** @type {Object<string, Readonly<ComponentEntry>>} */
				var map = {};

				for (var categoryName in components) {
					var category = components[categoryName];
					for (var id in category) {
						if (id != 'meta') {
							/** @type {ComponentEntry | string} */
							var entry = category[id];
							map[id] = typeof entry == 'string' ? { title: entry } : entry;
						}
					}
				}

				return map;
			}

			/**
			 * Creates a full dependencies map which includes all types of dependencies and their transitive dependencies.
			 *
			 * @param {EntryMap} entryMap
			 * @returns {DependencyResolver}
			 *
			 * @typedef {(id: string) => StringSet} DependencyResolver
			 */
			function createDependencyResolver(entryMap) {
				/** @type {Object<string, StringSet>} */
				var map = {};
				var _stackArray = [];

				/**
				 * Adds the dependencies of the given component to the dependency map.
				 *
				 * @param {string} id
				 * @param {string[]} stack
				 */
				function addToMap(id, stack) {
					if (id in map) {
						return;
					}

					stack.push(id);

					// check for circular dependencies
					var firstIndex = stack.indexOf(id);
					if (firstIndex < stack.length - 1) {
						throw new Error('Circular dependency: ' + stack.slice(firstIndex).join(' -> '));
					}

					/** @type {StringSet} */
					var dependencies = {};

					var entry = entryMap[id];
					if (entry) {
						/**
						 * This will add the direct dependency and all of its transitive dependencies to the set of
						 * dependencies of `entry`.
						 *
						 * @param {string} depId
						 * @returns {void}
						 */
						function handleDirectDependency(depId) {
							if (!(depId in entryMap)) {
								throw new Error(id + ' depends on an unknown component ' + depId);
							}
							if (depId in dependencies) {
								// if the given dependency is already in the set of deps, then so are its transitive deps
								return;
							}

							addToMap(depId, stack);
							dependencies[depId] = true;
							for (var transitiveDepId in map[depId]) {
								dependencies[transitiveDepId] = true;
							}
						}

						forEach(entry.require, handleDirectDependency);
						forEach(entry.optional, handleDirectDependency);
						forEach(entry.modify, handleDirectDependency);
					}

					map[id] = dependencies;

					stack.pop();
				}

				return function (id) {
					var deps = map[id];
					if (!deps) {
						addToMap(id, _stackArray);
						deps = map[id];
					}
					return deps;
				};
			}

			/**
			 * Returns a function which resolves the aliases of its given id of alias.
			 *
			 * @param {EntryMap} entryMap
			 * @returns {(idOrAlias: string) => string}
			 */
			function createAliasResolver(entryMap) {
				/** @type {Object<string, string> | undefined} */
				var map;

				return function (idOrAlias) {
					if (idOrAlias in entryMap) {
						return idOrAlias;
					} else {
						// only create the alias map if necessary
						if (!map) {
							map = {};

							for (var id in entryMap) {
								var entry = entryMap[id];
								forEach(entry && entry.alias, function (alias) {
									if (alias in map) {
										throw new Error(alias + ' cannot be alias for both ' + id + ' and ' + map[alias]);
									}
									if (alias in entryMap) {
										throw new Error(alias + ' cannot be alias of ' + id + ' because it is a component.');
									}
									map[alias] = id;
								});
							}
						}
						return map[idOrAlias] || idOrAlias;
					}
				};
			}

			/**
			 * @typedef LoadChainer
			 * @property {(before: T, after: () => T) => T} series
			 * @property {(values: T[]) => T} parallel
			 * @template T
			 */

			/**
			 * Creates an implicit DAG from the given components and dependencies and call the given `loadComponent` for each
			 * component in topological order.
			 *
			 * @param {DependencyResolver} dependencyResolver
			 * @param {StringSet} ids
			 * @param {(id: string) => T} loadComponent
			 * @param {LoadChainer<T>} [chainer]
			 * @returns {T}
			 * @template T
			 */
			function loadComponentsInOrder(dependencyResolver, ids, loadComponent, chainer) {
				var series = chainer ? chainer.series : undefined;
				var parallel = chainer ? chainer.parallel : noop;

				/** @type {Object<string, T>} */
				var cache = {};

				/**
				 * A set of ids of nodes which are not depended upon by any other node in the graph.
				 *
				 * @type {StringSet}
				 */
				var ends = {};

				/**
				 * Loads the given component and its dependencies or returns the cached value.
				 *
				 * @param {string} id
				 * @returns {T}
				 */
				function handleId(id) {
					if (id in cache) {
						return cache[id];
					}

					// assume that it's an end
					// if it isn't, it will be removed later
					ends[id] = true;

					// all dependencies of the component in the given ids
					var dependsOn = [];
					for (var depId in dependencyResolver(id)) {
						if (depId in ids) {
							dependsOn.push(depId);
						}
					}

					/**
					 * The value to be returned.
					 *
					 * @type {T}
					 */
					var value;

					if (dependsOn.length === 0) {
						value = loadComponent(id);
					} else {
						var depsValue = parallel(dependsOn.map(function (depId) {
							var value = handleId(depId);
							// none of the dependencies can be ends
							delete ends[depId];
							return value;
						}));
						if (series) {
							// the chainer will be responsibly for calling the function calling loadComponent
							value = series(depsValue, function () { return loadComponent(id); });
						} else {
							// we don't have a chainer, so we call loadComponent ourselves
							loadComponent(id);
						}
					}

					// cache and return
					return cache[id] = value;
				}

				for (var id in ids) {
					handleId(id);
				}

				/** @type {T[]} */
				var endValues = [];
				for (var endId in ends) {
					endValues.push(cache[endId]);
				}
				return parallel(endValues);
			}

			/**
			 * Returns whether the given object has any keys.
			 *
			 * @param {object} obj
			 */
			function hasKeys(obj) {
				for (var key in obj) {
					return true;
				}
				return false;
			}

			/**
			 * Returns an object which provides methods to get the ids of the components which have to be loaded (`getIds`) and
			 * a way to efficiently load them in synchronously and asynchronous contexts (`load`).
			 *
			 * The set of ids to be loaded is a superset of `load`. If some of these ids are in `loaded`, the corresponding
			 * components will have to reloaded.
			 *
			 * The ids in `load` and `loaded` may be in any order and can contain duplicates.
			 *
			 * @param {Components} components
			 * @param {string[]} load
			 * @param {string[]} [loaded=[]] A list of already loaded components.
			 *
			 * If a component is in this list, then all of its requirements will also be assumed to be in the list.
			 * @returns {Loader}
			 *
			 * @typedef Loader
			 * @property {() => string[]} getIds A function to get all ids of the components to load.
			 *
			 * The returned ids will be duplicate-free, alias-free and in load order.
			 * @property {LoadFunction} load A functional interface to load components.
			 *
			 * @typedef {<T> (loadComponent: (id: string) => T, chainer?: LoadChainer<T>) => T} LoadFunction
			 * A functional interface to load components.
			 *
			 * The `loadComponent` function will be called for every component in the order in which they have to be loaded.
			 *
			 * The `chainer` is useful for asynchronous loading and its `series` and `parallel` functions can be thought of as
			 * `Promise#then` and `Promise.all`.
			 *
			 * @example
			 * load(id => { loadComponent(id); }); // returns undefined
			 *
			 * await load(
			 *     id => loadComponentAsync(id), // returns a Promise for each id
			 *     {
			 *         series: async (before, after) => {
			 *             await before;
			 *             await after();
			 *         },
			 *         parallel: async (values) => {
			 *             await Promise.all(values);
			 *         }
			 *     }
			 * );
			 */
			function getLoader(components, load, loaded) {
				var entryMap = createEntryMap(components);
				var resolveAlias = createAliasResolver(entryMap);

				load = load.map(resolveAlias);
				loaded = (loaded || []).map(resolveAlias);

				var loadSet = toSet(load);
				var loadedSet = toSet(loaded);

				// add requirements

				load.forEach(addRequirements);
				function addRequirements(id) {
					var entry = entryMap[id];
					forEach(entry && entry.require, function (reqId) {
						if (!(reqId in loadedSet)) {
							loadSet[reqId] = true;
							addRequirements(reqId);
						}
					});
				}

				// add components to reload

				// A component x in `loaded` has to be reloaded if
				//  1) a component in `load` modifies x.
				//  2) x depends on a component in `load`.
				// The above two condition have to be applied until nothing changes anymore.

				var dependencyResolver = createDependencyResolver(entryMap);

				/** @type {StringSet} */
				var loadAdditions = loadSet;
				/** @type {StringSet} */
				var newIds;
				while (hasKeys(loadAdditions)) {
					newIds = {};

					// condition 1)
					for (var loadId in loadAdditions) {
						var entry = entryMap[loadId];
						forEach(entry && entry.modify, function (modId) {
							if (modId in loadedSet) {
								newIds[modId] = true;
							}
						});
					}

					// condition 2)
					for (var loadedId in loadedSet) {
						if (!(loadedId in loadSet)) {
							for (var depId in dependencyResolver(loadedId)) {
								if (depId in loadSet) {
									newIds[loadedId] = true;
									break;
								}
							}
						}
					}

					loadAdditions = newIds;
					for (var newId in loadAdditions) {
						loadSet[newId] = true;
					}
				}

				/** @type {Loader} */
				var loader = {
					getIds: function () {
						var ids = [];
						loader.load(function (id) {
							ids.push(id);
						});
						return ids;
					},
					load: function (loadComponent, chainer) {
						return loadComponentsInOrder(dependencyResolver, loadSet, loadComponent, chainer);
					}
				};

				return loader;
			}

			return getLoader;

		}());

		{
			module.exports = getLoader;
		} 
	} (dependencies));
	return dependencies.exports;
}

var components_1;
var hasRequiredComponents;

function requireComponents () {
	if (hasRequiredComponents) return components_1;
	hasRequiredComponents = 1;
	const components = requireComponents$1();
	const getLoader = requireDependencies();


	/**
	 * The set of all languages which have been loaded using the below function.
	 *
	 * @type {Set<string>}
	 */
	const loadedLanguages = new Set();

	/**
	 * Loads the given languages and adds them to the current Prism instance.
	 *
	 * If no languages are provided, __all__ Prism languages will be loaded.
	 *
	 * @param {string|string[]} [languages]
	 * @returns {void}
	 */
	function loadLanguages(languages) {
		if (languages === undefined) {
			languages = Object.keys(components.languages).filter(l => l != 'meta');
		} else if (!Array.isArray(languages)) {
			languages = [languages];
		}

		// the user might have loaded languages via some other way or used `prism.js` which already includes some
		// we don't need to validate the ids because `getLoader` will ignore invalid ones
		const loaded = [...loadedLanguages, ...Object.keys(Prism.languages)];

		getLoader(components, languages, loaded).load(lang => {
			if (!(lang in components.languages)) {
				if (!loadLanguages.silent) {
					console.warn('Language does not exist: ' + lang);
				}
				return;
			}

			const pathToLanguage = './prism-' + lang;

			// remove from require cache and from Prism
			delete require.cache[require.resolve(pathToLanguage)];
			delete Prism.languages[lang];

			commonjsRequire(pathToLanguage);

			loadedLanguages.add(lang);
		});
	}

	/**
	 * Set this to `true` to prevent all warning messages `loadLanguages` logs.
	 */
	loadLanguages.silent = false;

	components_1 = loadLanguages;
	return components_1;
}

requireComponents();

const defaultExcludeLanguages = ["math"];

const bundledThemesInfo = [
  {
    "id": "andromeeda",
    "displayName": "Andromeeda",
    "type": "dark",
    "import": () => import('../../chunks/andromeeda_D-dyEEuC.mjs')
  },
  {
    "id": "aurora-x",
    "displayName": "Aurora X",
    "type": "dark",
    "import": () => import('../../chunks/aurora-x_DshMyg21.mjs')
  },
  {
    "id": "ayu-dark",
    "displayName": "Ayu Dark",
    "type": "dark",
    "import": () => import('../../chunks/ayu-dark_DD2fThwq.mjs')
  },
  {
    "id": "catppuccin-frappe",
    "displayName": "Catppuccin Frapp\xE9",
    "type": "dark",
    "import": () => import('../../chunks/catppuccin-frappe_CEzquTvj.mjs')
  },
  {
    "id": "catppuccin-latte",
    "displayName": "Catppuccin Latte",
    "type": "light",
    "import": () => import('../../chunks/catppuccin-latte_B8YzEL4U.mjs')
  },
  {
    "id": "catppuccin-macchiato",
    "displayName": "Catppuccin Macchiato",
    "type": "dark",
    "import": () => import('../../chunks/catppuccin-macchiato_DBodMbX6.mjs')
  },
  {
    "id": "catppuccin-mocha",
    "displayName": "Catppuccin Mocha",
    "type": "dark",
    "import": () => import('../../chunks/catppuccin-mocha_CoTKjSmv.mjs')
  },
  {
    "id": "dark-plus",
    "displayName": "Dark Plus",
    "type": "dark",
    "import": () => import('../../chunks/dark-plus_DP7-e98C.mjs')
  },
  {
    "id": "dracula",
    "displayName": "Dracula Theme",
    "type": "dark",
    "import": () => import('../../chunks/dracula_CouoCS9k.mjs')
  },
  {
    "id": "dracula-soft",
    "displayName": "Dracula Theme Soft",
    "type": "dark",
    "import": () => import('../../chunks/dracula-soft_CxzKlz_N.mjs')
  },
  {
    "id": "everforest-dark",
    "displayName": "Everforest Dark",
    "type": "dark",
    "import": () => import('../../chunks/everforest-dark_CXzHRD9z.mjs')
  },
  {
    "id": "everforest-light",
    "displayName": "Everforest Light",
    "type": "light",
    "import": () => import('../../chunks/everforest-light_YpEbvjLS.mjs')
  },
  {
    "id": "github-dark",
    "displayName": "GitHub Dark",
    "type": "dark",
    "import": () => import('../../chunks/github-dark_D_gS3ClN.mjs')
  },
  {
    "id": "github-dark-default",
    "displayName": "GitHub Dark Default",
    "type": "dark",
    "import": () => import('../../chunks/github-dark-default_ywR9tGEY.mjs')
  },
  {
    "id": "github-dark-dimmed",
    "displayName": "GitHub Dark Dimmed",
    "type": "dark",
    "import": () => import('../../chunks/github-dark-dimmed_b5JcwDjr.mjs')
  },
  {
    "id": "github-dark-high-contrast",
    "displayName": "GitHub Dark High Contrast",
    "type": "dark",
    "import": () => import('../../chunks/github-dark-high-contrast_CvFIkt-b.mjs')
  },
  {
    "id": "github-light",
    "displayName": "GitHub Light",
    "type": "light",
    "import": () => import('../../chunks/github-light_gaovf5-A.mjs')
  },
  {
    "id": "github-light-default",
    "displayName": "GitHub Light Default",
    "type": "light",
    "import": () => import('../../chunks/github-light-default_DM7VWHsb.mjs')
  },
  {
    "id": "github-light-high-contrast",
    "displayName": "GitHub Light High Contrast",
    "type": "light",
    "import": () => import('../../chunks/github-light-high-contrast_CStbdJlV.mjs')
  },
  {
    "id": "gruvbox-dark-hard",
    "displayName": "Gruvbox Dark Hard",
    "type": "dark",
    "import": () => import('../../chunks/gruvbox-dark-hard_BYAkpGcH.mjs')
  },
  {
    "id": "gruvbox-dark-medium",
    "displayName": "Gruvbox Dark Medium",
    "type": "dark",
    "import": () => import('../../chunks/gruvbox-dark-medium_CX8rWr1v.mjs')
  },
  {
    "id": "gruvbox-dark-soft",
    "displayName": "Gruvbox Dark Soft",
    "type": "dark",
    "import": () => import('../../chunks/gruvbox-dark-soft_Cm3XKvR3.mjs')
  },
  {
    "id": "gruvbox-light-hard",
    "displayName": "Gruvbox Light Hard",
    "type": "light",
    "import": () => import('../../chunks/gruvbox-light-hard_BmnAofKV.mjs')
  },
  {
    "id": "gruvbox-light-medium",
    "displayName": "Gruvbox Light Medium",
    "type": "light",
    "import": () => import('../../chunks/gruvbox-light-medium_7EJeL-am.mjs')
  },
  {
    "id": "gruvbox-light-soft",
    "displayName": "Gruvbox Light Soft",
    "type": "light",
    "import": () => import('../../chunks/gruvbox-light-soft_D0k4TwLw.mjs')
  },
  {
    "id": "houston",
    "displayName": "Houston",
    "type": "dark",
    "import": () => import('../../chunks/houston_bDcgnEjL.mjs')
  },
  {
    "id": "kanagawa-dragon",
    "displayName": "Kanagawa Dragon",
    "type": "dark",
    "import": () => import('../../chunks/kanagawa-dragon_GntfEwJ6.mjs')
  },
  {
    "id": "kanagawa-lotus",
    "displayName": "Kanagawa Lotus",
    "type": "light",
    "import": () => import('../../chunks/kanagawa-lotus_DHrQLQeA.mjs')
  },
  {
    "id": "kanagawa-wave",
    "displayName": "Kanagawa Wave",
    "type": "dark",
    "import": () => import('../../chunks/kanagawa-wave_bbll0PjQ.mjs')
  },
  {
    "id": "laserwave",
    "displayName": "LaserWave",
    "type": "dark",
    "import": () => import('../../chunks/laserwave_Bb_pI3nj.mjs')
  },
  {
    "id": "light-plus",
    "displayName": "Light Plus",
    "type": "light",
    "import": () => import('../../chunks/light-plus_D6etIKYp.mjs')
  },
  {
    "id": "material-theme",
    "displayName": "Material Theme",
    "type": "dark",
    "import": () => import('../../chunks/material-theme_ChAq2e_7.mjs')
  },
  {
    "id": "material-theme-darker",
    "displayName": "Material Theme Darker",
    "type": "dark",
    "import": () => import('../../chunks/material-theme-darker_DzCD7v6U.mjs')
  },
  {
    "id": "material-theme-lighter",
    "displayName": "Material Theme Lighter",
    "type": "light",
    "import": () => import('../../chunks/material-theme-lighter_CUFfiVL0.mjs')
  },
  {
    "id": "material-theme-ocean",
    "displayName": "Material Theme Ocean",
    "type": "dark",
    "import": () => import('../../chunks/material-theme-ocean_B9CiKwQz.mjs')
  },
  {
    "id": "material-theme-palenight",
    "displayName": "Material Theme Palenight",
    "type": "dark",
    "import": () => import('../../chunks/material-theme-palenight_BYo8VdVU.mjs')
  },
  {
    "id": "min-dark",
    "displayName": "Min Dark",
    "type": "dark",
    "import": () => import('../../chunks/min-dark_CHh5UpyO.mjs')
  },
  {
    "id": "min-light",
    "displayName": "Min Light",
    "type": "light",
    "import": () => import('../../chunks/min-light_yIv78I0g.mjs')
  },
  {
    "id": "monokai",
    "displayName": "Monokai",
    "type": "dark",
    "import": () => import('../../chunks/monokai_Cqj9PaUG.mjs')
  },
  {
    "id": "night-owl",
    "displayName": "Night Owl",
    "type": "dark",
    "import": () => import('../../chunks/night-owl_DauMo4cW.mjs')
  },
  {
    "id": "nord",
    "displayName": "Nord",
    "type": "dark",
    "import": () => import('../../chunks/nord_DVoFGF1J.mjs')
  },
  {
    "id": "one-dark-pro",
    "displayName": "One Dark Pro",
    "type": "dark",
    "import": () => import('../../chunks/one-dark-pro_P-wMM9nA.mjs')
  },
  {
    "id": "one-light",
    "displayName": "One Light",
    "type": "light",
    "import": () => import('../../chunks/one-light_C6pcpa1k.mjs')
  },
  {
    "id": "plastic",
    "displayName": "Plastic",
    "type": "dark",
    "import": () => import('../../chunks/plastic_C2lZWGLM.mjs')
  },
  {
    "id": "poimandres",
    "displayName": "Poimandres",
    "type": "dark",
    "import": () => import('../../chunks/poimandres_D58Ktq78.mjs')
  },
  {
    "id": "red",
    "displayName": "Red",
    "type": "dark",
    "import": () => import('../../chunks/red_pjQno-2I.mjs')
  },
  {
    "id": "rose-pine",
    "displayName": "Ros\xE9 Pine",
    "type": "dark",
    "import": () => import('../../chunks/rose-pine_CY9y_eDZ.mjs')
  },
  {
    "id": "rose-pine-dawn",
    "displayName": "Ros\xE9 Pine Dawn",
    "type": "light",
    "import": () => import('../../chunks/rose-pine-dawn_DluplHgC.mjs')
  },
  {
    "id": "rose-pine-moon",
    "displayName": "Ros\xE9 Pine Moon",
    "type": "dark",
    "import": () => import('../../chunks/rose-pine-moon_Bv6CGvAO.mjs')
  },
  {
    "id": "slack-dark",
    "displayName": "Slack Dark",
    "type": "dark",
    "import": () => import('../../chunks/slack-dark_DLj306G7.mjs')
  },
  {
    "id": "slack-ochin",
    "displayName": "Slack Ochin",
    "type": "light",
    "import": () => import('../../chunks/slack-ochin_X2jD6z_U.mjs')
  },
  {
    "id": "snazzy-light",
    "displayName": "Snazzy Light",
    "type": "light",
    "import": () => import('../../chunks/snazzy-light_BcaEs35m.mjs')
  },
  {
    "id": "solarized-dark",
    "displayName": "Solarized Dark",
    "type": "dark",
    "import": () => import('../../chunks/solarized-dark_KKu6WsVZ.mjs')
  },
  {
    "id": "solarized-light",
    "displayName": "Solarized Light",
    "type": "light",
    "import": () => import('../../chunks/solarized-light_CkAp-a_S.mjs')
  },
  {
    "id": "synthwave-84",
    "displayName": "Synthwave '84",
    "type": "dark",
    "import": () => import('../../chunks/synthwave-84_Bjjlv9xo.mjs')
  },
  {
    "id": "tokyo-night",
    "displayName": "Tokyo Night",
    "type": "dark",
    "import": () => import('../../chunks/tokyo-night_BMSkKMwS.mjs')
  },
  {
    "id": "vesper",
    "displayName": "Vesper",
    "type": "dark",
    "import": () => import('../../chunks/vesper_bao0e2qq.mjs')
  },
  {
    "id": "vitesse-black",
    "displayName": "Vitesse Black",
    "type": "dark",
    "import": () => import('../../chunks/vitesse-black_BsezKPiF.mjs')
  },
  {
    "id": "vitesse-dark",
    "displayName": "Vitesse Dark",
    "type": "dark",
    "import": () => import('../../chunks/vitesse-dark_KFjgxGBE.mjs')
  },
  {
    "id": "vitesse-light",
    "displayName": "Vitesse Light",
    "type": "light",
    "import": () => import('../../chunks/vitesse-light_B8BGGTVV.mjs')
  }
];
const bundledThemes = Object.fromEntries(bundledThemesInfo.map((i) => [i.id, i.import]));

/*! js-yaml 4.1.0 https://github.com/nodeca/js-yaml @license MIT */
function isNothing(subject) {
  return (typeof subject === 'undefined') || (subject === null);
}


function isObject(subject) {
  return (typeof subject === 'object') && (subject !== null);
}


function toArray(sequence) {
  if (Array.isArray(sequence)) return sequence;
  else if (isNothing(sequence)) return [];

  return [ sequence ];
}


function extend(target, source) {
  var index, length, key, sourceKeys;

  if (source) {
    sourceKeys = Object.keys(source);

    for (index = 0, length = sourceKeys.length; index < length; index += 1) {
      key = sourceKeys[index];
      target[key] = source[key];
    }
  }

  return target;
}


function repeat(string, count) {
  var result = '', cycle;

  for (cycle = 0; cycle < count; cycle += 1) {
    result += string;
  }

  return result;
}


function isNegativeZero(number) {
  return (number === 0) && (Number.NEGATIVE_INFINITY === 1 / number);
}


var isNothing_1      = isNothing;
var isObject_1       = isObject;
var toArray_1        = toArray;
var repeat_1         = repeat;
var isNegativeZero_1 = isNegativeZero;
var extend_1         = extend;

var common$1 = {
	isNothing: isNothing_1,
	isObject: isObject_1,
	toArray: toArray_1,
	repeat: repeat_1,
	isNegativeZero: isNegativeZero_1,
	extend: extend_1
};

// YAML error class. http://stackoverflow.com/questions/8458984


function formatError(exception, compact) {
  var where = '', message = exception.reason || '(unknown reason)';

  if (!exception.mark) return message;

  if (exception.mark.name) {
    where += 'in "' + exception.mark.name + '" ';
  }

  where += '(' + (exception.mark.line + 1) + ':' + (exception.mark.column + 1) + ')';

  if (!compact && exception.mark.snippet) {
    where += '\n\n' + exception.mark.snippet;
  }

  return message + ' ' + where;
}


function YAMLException$1(reason, mark) {
  // Super constructor
  Error.call(this);

  this.name = 'YAMLException';
  this.reason = reason;
  this.mark = mark;
  this.message = formatError(this, false);

  // Include stack trace in error object
  if (Error.captureStackTrace) {
    // Chrome and NodeJS
    Error.captureStackTrace(this, this.constructor);
  } else {
    // FF, IE 10+ and Safari 6+. Fallback for others
    this.stack = (new Error()).stack || '';
  }
}


// Inherit from Error
YAMLException$1.prototype = Object.create(Error.prototype);
YAMLException$1.prototype.constructor = YAMLException$1;


YAMLException$1.prototype.toString = function toString(compact) {
  return this.name + ': ' + formatError(this, compact);
};


var exception = YAMLException$1;

var TYPE_CONSTRUCTOR_OPTIONS = [
  'kind',
  'multi',
  'resolve',
  'construct',
  'instanceOf',
  'predicate',
  'represent',
  'representName',
  'defaultStyle',
  'styleAliases'
];

var YAML_NODE_KINDS = [
  'scalar',
  'sequence',
  'mapping'
];

function compileStyleAliases(map) {
  var result = {};

  if (map !== null) {
    Object.keys(map).forEach(function (style) {
      map[style].forEach(function (alias) {
        result[String(alias)] = style;
      });
    });
  }

  return result;
}

function Type$1(tag, options) {
  options = options || {};

  Object.keys(options).forEach(function (name) {
    if (TYPE_CONSTRUCTOR_OPTIONS.indexOf(name) === -1) {
      throw new exception('Unknown option "' + name + '" is met in definition of "' + tag + '" YAML type.');
    }
  });

  // TODO: Add tag format check.
  this.options       = options; // keep original options in case user wants to extend this type later
  this.tag           = tag;
  this.kind          = options['kind']          || null;
  this.resolve       = options['resolve']       || function () { return true; };
  this.construct     = options['construct']     || function (data) { return data; };
  this.instanceOf    = options['instanceOf']    || null;
  this.predicate     = options['predicate']     || null;
  this.represent     = options['represent']     || null;
  this.representName = options['representName'] || null;
  this.defaultStyle  = options['defaultStyle']  || null;
  this.multi         = options['multi']         || false;
  this.styleAliases  = compileStyleAliases(options['styleAliases'] || null);

  if (YAML_NODE_KINDS.indexOf(this.kind) === -1) {
    throw new exception('Unknown kind "' + this.kind + '" is specified for "' + tag + '" YAML type.');
  }
}

var type = Type$1;

/*eslint-disable max-len*/





function compileList(schema, name) {
  var result = [];

  schema[name].forEach(function (currentType) {
    var newIndex = result.length;

    result.forEach(function (previousType, previousIndex) {
      if (previousType.tag === currentType.tag &&
          previousType.kind === currentType.kind &&
          previousType.multi === currentType.multi) {

        newIndex = previousIndex;
      }
    });

    result[newIndex] = currentType;
  });

  return result;
}


function compileMap(/* lists... */) {
  var result = {
        scalar: {},
        sequence: {},
        mapping: {},
        fallback: {},
        multi: {
          scalar: [],
          sequence: [],
          mapping: [],
          fallback: []
        }
      }, index, length;

  function collectType(type) {
    if (type.multi) {
      result.multi[type.kind].push(type);
      result.multi['fallback'].push(type);
    } else {
      result[type.kind][type.tag] = result['fallback'][type.tag] = type;
    }
  }

  for (index = 0, length = arguments.length; index < length; index += 1) {
    arguments[index].forEach(collectType);
  }
  return result;
}


function Schema$1(definition) {
  return this.extend(definition);
}


Schema$1.prototype.extend = function extend(definition) {
  var implicit = [];
  var explicit = [];

  if (definition instanceof type) {
    // Schema.extend(type)
    explicit.push(definition);

  } else if (Array.isArray(definition)) {
    // Schema.extend([ type1, type2, ... ])
    explicit = explicit.concat(definition);

  } else if (definition && (Array.isArray(definition.implicit) || Array.isArray(definition.explicit))) {
    // Schema.extend({ explicit: [ type1, type2, ... ], implicit: [ type1, type2, ... ] })
    if (definition.implicit) implicit = implicit.concat(definition.implicit);
    if (definition.explicit) explicit = explicit.concat(definition.explicit);

  } else {
    throw new exception('Schema.extend argument should be a Type, [ Type ], ' +
      'or a schema definition ({ implicit: [...], explicit: [...] })');
  }

  implicit.forEach(function (type$1) {
    if (!(type$1 instanceof type)) {
      throw new exception('Specified list of YAML types (or a single Type object) contains a non-Type object.');
    }

    if (type$1.loadKind && type$1.loadKind !== 'scalar') {
      throw new exception('There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.');
    }

    if (type$1.multi) {
      throw new exception('There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.');
    }
  });

  explicit.forEach(function (type$1) {
    if (!(type$1 instanceof type)) {
      throw new exception('Specified list of YAML types (or a single Type object) contains a non-Type object.');
    }
  });

  var result = Object.create(Schema$1.prototype);

  result.implicit = (this.implicit || []).concat(implicit);
  result.explicit = (this.explicit || []).concat(explicit);

  result.compiledImplicit = compileList(result, 'implicit');
  result.compiledExplicit = compileList(result, 'explicit');
  result.compiledTypeMap  = compileMap(result.compiledImplicit, result.compiledExplicit);

  return result;
};


var schema = Schema$1;

var str = new type('tag:yaml.org,2002:str', {
  kind: 'scalar',
  construct: function (data) { return data !== null ? data : ''; }
});

var seq = new type('tag:yaml.org,2002:seq', {
  kind: 'sequence',
  construct: function (data) { return data !== null ? data : []; }
});

var map = new type('tag:yaml.org,2002:map', {
  kind: 'mapping',
  construct: function (data) { return data !== null ? data : {}; }
});

var failsafe = new schema({
  explicit: [
    str,
    seq,
    map
  ]
});

function resolveYamlNull(data) {
  if (data === null) return true;

  var max = data.length;

  return (max === 1 && data === '~') ||
         (max === 4 && (data === 'null' || data === 'Null' || data === 'NULL'));
}

function constructYamlNull() {
  return null;
}

function isNull(object) {
  return object === null;
}

var _null = new type('tag:yaml.org,2002:null', {
  kind: 'scalar',
  resolve: resolveYamlNull,
  construct: constructYamlNull,
  predicate: isNull,
  represent: {
    canonical: function () { return '~';    },
    lowercase: function () { return 'null'; },
    uppercase: function () { return 'NULL'; },
    camelcase: function () { return 'Null'; },
    empty:     function () { return '';     }
  },
  defaultStyle: 'lowercase'
});

function resolveYamlBoolean(data) {
  if (data === null) return false;

  var max = data.length;

  return (max === 4 && (data === 'true' || data === 'True' || data === 'TRUE')) ||
         (max === 5 && (data === 'false' || data === 'False' || data === 'FALSE'));
}

function constructYamlBoolean(data) {
  return data === 'true' ||
         data === 'True' ||
         data === 'TRUE';
}

function isBoolean(object) {
  return Object.prototype.toString.call(object) === '[object Boolean]';
}

var bool = new type('tag:yaml.org,2002:bool', {
  kind: 'scalar',
  resolve: resolveYamlBoolean,
  construct: constructYamlBoolean,
  predicate: isBoolean,
  represent: {
    lowercase: function (object) { return object ? 'true' : 'false'; },
    uppercase: function (object) { return object ? 'TRUE' : 'FALSE'; },
    camelcase: function (object) { return object ? 'True' : 'False'; }
  },
  defaultStyle: 'lowercase'
});

function isHexCode(c) {
  return ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */)) ||
         ((0x41/* A */ <= c) && (c <= 0x46/* F */)) ||
         ((0x61/* a */ <= c) && (c <= 0x66/* f */));
}

function isOctCode(c) {
  return ((0x30/* 0 */ <= c) && (c <= 0x37/* 7 */));
}

function isDecCode(c) {
  return ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */));
}

function resolveYamlInteger(data) {
  if (data === null) return false;

  var max = data.length,
      index = 0,
      hasDigits = false,
      ch;

  if (!max) return false;

  ch = data[index];

  // sign
  if (ch === '-' || ch === '+') {
    ch = data[++index];
  }

  if (ch === '0') {
    // 0
    if (index + 1 === max) return true;
    ch = data[++index];

    // base 2, base 8, base 16

    if (ch === 'b') {
      // base 2
      index++;

      for (; index < max; index++) {
        ch = data[index];
        if (ch === '_') continue;
        if (ch !== '0' && ch !== '1') return false;
        hasDigits = true;
      }
      return hasDigits && ch !== '_';
    }


    if (ch === 'x') {
      // base 16
      index++;

      for (; index < max; index++) {
        ch = data[index];
        if (ch === '_') continue;
        if (!isHexCode(data.charCodeAt(index))) return false;
        hasDigits = true;
      }
      return hasDigits && ch !== '_';
    }


    if (ch === 'o') {
      // base 8
      index++;

      for (; index < max; index++) {
        ch = data[index];
        if (ch === '_') continue;
        if (!isOctCode(data.charCodeAt(index))) return false;
        hasDigits = true;
      }
      return hasDigits && ch !== '_';
    }
  }

  // base 10 (except 0)

  // value should not start with `_`;
  if (ch === '_') return false;

  for (; index < max; index++) {
    ch = data[index];
    if (ch === '_') continue;
    if (!isDecCode(data.charCodeAt(index))) {
      return false;
    }
    hasDigits = true;
  }

  // Should have digits and should not end with `_`
  if (!hasDigits || ch === '_') return false;

  return true;
}

function constructYamlInteger(data) {
  var value = data, sign = 1, ch;

  if (value.indexOf('_') !== -1) {
    value = value.replace(/_/g, '');
  }

  ch = value[0];

  if (ch === '-' || ch === '+') {
    if (ch === '-') sign = -1;
    value = value.slice(1);
    ch = value[0];
  }

  if (value === '0') return 0;

  if (ch === '0') {
    if (value[1] === 'b') return sign * parseInt(value.slice(2), 2);
    if (value[1] === 'x') return sign * parseInt(value.slice(2), 16);
    if (value[1] === 'o') return sign * parseInt(value.slice(2), 8);
  }

  return sign * parseInt(value, 10);
}

function isInteger(object) {
  return (Object.prototype.toString.call(object)) === '[object Number]' &&
         (object % 1 === 0 && !common$1.isNegativeZero(object));
}

var int = new type('tag:yaml.org,2002:int', {
  kind: 'scalar',
  resolve: resolveYamlInteger,
  construct: constructYamlInteger,
  predicate: isInteger,
  represent: {
    binary:      function (obj) { return obj >= 0 ? '0b' + obj.toString(2) : '-0b' + obj.toString(2).slice(1); },
    octal:       function (obj) { return obj >= 0 ? '0o'  + obj.toString(8) : '-0o'  + obj.toString(8).slice(1); },
    decimal:     function (obj) { return obj.toString(10); },
    /* eslint-disable max-len */
    hexadecimal: function (obj) { return obj >= 0 ? '0x' + obj.toString(16).toUpperCase() :  '-0x' + obj.toString(16).toUpperCase().slice(1); }
  },
  defaultStyle: 'decimal',
  styleAliases: {
    binary:      [ 2,  'bin' ],
    octal:       [ 8,  'oct' ],
    decimal:     [ 10, 'dec' ],
    hexadecimal: [ 16, 'hex' ]
  }
});

var YAML_FLOAT_PATTERN = new RegExp(
  // 2.5e4, 2.5 and integers
  '^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?' +
  // .2e4, .2
  // special case, seems not from spec
  '|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?' +
  // .inf
  '|[-+]?\\.(?:inf|Inf|INF)' +
  // .nan
  '|\\.(?:nan|NaN|NAN))$');

function resolveYamlFloat(data) {
  if (data === null) return false;

  if (!YAML_FLOAT_PATTERN.test(data) ||
      // Quick hack to not allow integers end with `_`
      // Probably should update regexp & check speed
      data[data.length - 1] === '_') {
    return false;
  }

  return true;
}

function constructYamlFloat(data) {
  var value, sign;

  value  = data.replace(/_/g, '').toLowerCase();
  sign   = value[0] === '-' ? -1 : 1;

  if ('+-'.indexOf(value[0]) >= 0) {
    value = value.slice(1);
  }

  if (value === '.inf') {
    return (sign === 1) ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;

  } else if (value === '.nan') {
    return NaN;
  }
  return sign * parseFloat(value, 10);
}


var SCIENTIFIC_WITHOUT_DOT = /^[-+]?[0-9]+e/;

function representYamlFloat(object, style) {
  var res;

  if (isNaN(object)) {
    switch (style) {
      case 'lowercase': return '.nan';
      case 'uppercase': return '.NAN';
      case 'camelcase': return '.NaN';
    }
  } else if (Number.POSITIVE_INFINITY === object) {
    switch (style) {
      case 'lowercase': return '.inf';
      case 'uppercase': return '.INF';
      case 'camelcase': return '.Inf';
    }
  } else if (Number.NEGATIVE_INFINITY === object) {
    switch (style) {
      case 'lowercase': return '-.inf';
      case 'uppercase': return '-.INF';
      case 'camelcase': return '-.Inf';
    }
  } else if (common$1.isNegativeZero(object)) {
    return '-0.0';
  }

  res = object.toString(10);

  // JS stringifier can build scientific format without dots: 5e-100,
  // while YAML requres dot: 5.e-100. Fix it with simple hack

  return SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace('e', '.e') : res;
}

function isFloat(object) {
  return (Object.prototype.toString.call(object) === '[object Number]') &&
         (object % 1 !== 0 || common$1.isNegativeZero(object));
}

var float = new type('tag:yaml.org,2002:float', {
  kind: 'scalar',
  resolve: resolveYamlFloat,
  construct: constructYamlFloat,
  predicate: isFloat,
  represent: representYamlFloat,
  defaultStyle: 'lowercase'
});

var json = failsafe.extend({
  implicit: [
    _null,
    bool,
    int,
    float
  ]
});

var core = json;

var YAML_DATE_REGEXP = new RegExp(
  '^([0-9][0-9][0-9][0-9])'          + // [1] year
  '-([0-9][0-9])'                    + // [2] month
  '-([0-9][0-9])$');                   // [3] day

var YAML_TIMESTAMP_REGEXP = new RegExp(
  '^([0-9][0-9][0-9][0-9])'          + // [1] year
  '-([0-9][0-9]?)'                   + // [2] month
  '-([0-9][0-9]?)'                   + // [3] day
  '(?:[Tt]|[ \\t]+)'                 + // ...
  '([0-9][0-9]?)'                    + // [4] hour
  ':([0-9][0-9])'                    + // [5] minute
  ':([0-9][0-9])'                    + // [6] second
  '(?:\\.([0-9]*))?'                 + // [7] fraction
  '(?:[ \\t]*(Z|([-+])([0-9][0-9]?)' + // [8] tz [9] tz_sign [10] tz_hour
  '(?::([0-9][0-9]))?))?$');           // [11] tz_minute

function resolveYamlTimestamp(data) {
  if (data === null) return false;
  if (YAML_DATE_REGEXP.exec(data) !== null) return true;
  if (YAML_TIMESTAMP_REGEXP.exec(data) !== null) return true;
  return false;
}

function constructYamlTimestamp(data) {
  var match, year, month, day, hour, minute, second, fraction = 0,
      delta = null, tz_hour, tz_minute, date;

  match = YAML_DATE_REGEXP.exec(data);
  if (match === null) match = YAML_TIMESTAMP_REGEXP.exec(data);

  if (match === null) throw new Error('Date resolve error');

  // match: [1] year [2] month [3] day

  year = +(match[1]);
  month = +(match[2]) - 1; // JS month starts with 0
  day = +(match[3]);

  if (!match[4]) { // no hour
    return new Date(Date.UTC(year, month, day));
  }

  // match: [4] hour [5] minute [6] second [7] fraction

  hour = +(match[4]);
  minute = +(match[5]);
  second = +(match[6]);

  if (match[7]) {
    fraction = match[7].slice(0, 3);
    while (fraction.length < 3) { // milli-seconds
      fraction += '0';
    }
    fraction = +fraction;
  }

  // match: [8] tz [9] tz_sign [10] tz_hour [11] tz_minute

  if (match[9]) {
    tz_hour = +(match[10]);
    tz_minute = +(match[11] || 0);
    delta = (tz_hour * 60 + tz_minute) * 60000; // delta in mili-seconds
    if (match[9] === '-') delta = -delta;
  }

  date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));

  if (delta) date.setTime(date.getTime() - delta);

  return date;
}

function representYamlTimestamp(object /*, style*/) {
  return object.toISOString();
}

var timestamp = new type('tag:yaml.org,2002:timestamp', {
  kind: 'scalar',
  resolve: resolveYamlTimestamp,
  construct: constructYamlTimestamp,
  instanceOf: Date,
  represent: representYamlTimestamp
});

function resolveYamlMerge(data) {
  return data === '<<' || data === null;
}

var merge = new type('tag:yaml.org,2002:merge', {
  kind: 'scalar',
  resolve: resolveYamlMerge
});

/*eslint-disable no-bitwise*/





// [ 64, 65, 66 ] -> [ padding, CR, LF ]
var BASE64_MAP = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r';


function resolveYamlBinary(data) {
  if (data === null) return false;

  var code, idx, bitlen = 0, max = data.length, map = BASE64_MAP;

  // Convert one by one.
  for (idx = 0; idx < max; idx++) {
    code = map.indexOf(data.charAt(idx));

    // Skip CR/LF
    if (code > 64) continue;

    // Fail on illegal characters
    if (code < 0) return false;

    bitlen += 6;
  }

  // If there are any bits left, source was corrupted
  return (bitlen % 8) === 0;
}

function constructYamlBinary(data) {
  var idx, tailbits,
      input = data.replace(/[\r\n=]/g, ''), // remove CR/LF & padding to simplify scan
      max = input.length,
      map = BASE64_MAP,
      bits = 0,
      result = [];

  // Collect by 6*4 bits (3 bytes)

  for (idx = 0; idx < max; idx++) {
    if ((idx % 4 === 0) && idx) {
      result.push((bits >> 16) & 0xFF);
      result.push((bits >> 8) & 0xFF);
      result.push(bits & 0xFF);
    }

    bits = (bits << 6) | map.indexOf(input.charAt(idx));
  }

  // Dump tail

  tailbits = (max % 4) * 6;

  if (tailbits === 0) {
    result.push((bits >> 16) & 0xFF);
    result.push((bits >> 8) & 0xFF);
    result.push(bits & 0xFF);
  } else if (tailbits === 18) {
    result.push((bits >> 10) & 0xFF);
    result.push((bits >> 2) & 0xFF);
  } else if (tailbits === 12) {
    result.push((bits >> 4) & 0xFF);
  }

  return new Uint8Array(result);
}

function representYamlBinary(object /*, style*/) {
  var result = '', bits = 0, idx, tail,
      max = object.length,
      map = BASE64_MAP;

  // Convert every three bytes to 4 ASCII characters.

  for (idx = 0; idx < max; idx++) {
    if ((idx % 3 === 0) && idx) {
      result += map[(bits >> 18) & 0x3F];
      result += map[(bits >> 12) & 0x3F];
      result += map[(bits >> 6) & 0x3F];
      result += map[bits & 0x3F];
    }

    bits = (bits << 8) + object[idx];
  }

  // Dump tail

  tail = max % 3;

  if (tail === 0) {
    result += map[(bits >> 18) & 0x3F];
    result += map[(bits >> 12) & 0x3F];
    result += map[(bits >> 6) & 0x3F];
    result += map[bits & 0x3F];
  } else if (tail === 2) {
    result += map[(bits >> 10) & 0x3F];
    result += map[(bits >> 4) & 0x3F];
    result += map[(bits << 2) & 0x3F];
    result += map[64];
  } else if (tail === 1) {
    result += map[(bits >> 2) & 0x3F];
    result += map[(bits << 4) & 0x3F];
    result += map[64];
    result += map[64];
  }

  return result;
}

function isBinary(obj) {
  return Object.prototype.toString.call(obj) ===  '[object Uint8Array]';
}

var binary = new type('tag:yaml.org,2002:binary', {
  kind: 'scalar',
  resolve: resolveYamlBinary,
  construct: constructYamlBinary,
  predicate: isBinary,
  represent: representYamlBinary
});

var _hasOwnProperty$3 = Object.prototype.hasOwnProperty;
var _toString$2       = Object.prototype.toString;

function resolveYamlOmap(data) {
  if (data === null) return true;

  var objectKeys = [], index, length, pair, pairKey, pairHasKey,
      object = data;

  for (index = 0, length = object.length; index < length; index += 1) {
    pair = object[index];
    pairHasKey = false;

    if (_toString$2.call(pair) !== '[object Object]') return false;

    for (pairKey in pair) {
      if (_hasOwnProperty$3.call(pair, pairKey)) {
        if (!pairHasKey) pairHasKey = true;
        else return false;
      }
    }

    if (!pairHasKey) return false;

    if (objectKeys.indexOf(pairKey) === -1) objectKeys.push(pairKey);
    else return false;
  }

  return true;
}

function constructYamlOmap(data) {
  return data !== null ? data : [];
}

var omap = new type('tag:yaml.org,2002:omap', {
  kind: 'sequence',
  resolve: resolveYamlOmap,
  construct: constructYamlOmap
});

var _toString$1 = Object.prototype.toString;

function resolveYamlPairs(data) {
  if (data === null) return true;

  var index, length, pair, keys, result,
      object = data;

  result = new Array(object.length);

  for (index = 0, length = object.length; index < length; index += 1) {
    pair = object[index];

    if (_toString$1.call(pair) !== '[object Object]') return false;

    keys = Object.keys(pair);

    if (keys.length !== 1) return false;

    result[index] = [ keys[0], pair[keys[0]] ];
  }

  return true;
}

function constructYamlPairs(data) {
  if (data === null) return [];

  var index, length, pair, keys, result,
      object = data;

  result = new Array(object.length);

  for (index = 0, length = object.length; index < length; index += 1) {
    pair = object[index];

    keys = Object.keys(pair);

    result[index] = [ keys[0], pair[keys[0]] ];
  }

  return result;
}

var pairs = new type('tag:yaml.org,2002:pairs', {
  kind: 'sequence',
  resolve: resolveYamlPairs,
  construct: constructYamlPairs
});

var _hasOwnProperty$2 = Object.prototype.hasOwnProperty;

function resolveYamlSet(data) {
  if (data === null) return true;

  var key, object = data;

  for (key in object) {
    if (_hasOwnProperty$2.call(object, key)) {
      if (object[key] !== null) return false;
    }
  }

  return true;
}

function constructYamlSet(data) {
  return data !== null ? data : {};
}

var set = new type('tag:yaml.org,2002:set', {
  kind: 'mapping',
  resolve: resolveYamlSet,
  construct: constructYamlSet
});

core.extend({
  implicit: [
    timestamp,
    merge
  ],
  explicit: [
    binary,
    omap,
    pairs,
    set
  ]
});

function simpleEscapeSequence(c) {
  /* eslint-disable indent */
  return (c === 0x30/* 0 */) ? '\x00' :
        (c === 0x61/* a */) ? '\x07' :
        (c === 0x62/* b */) ? '\x08' :
        (c === 0x74/* t */) ? '\x09' :
        (c === 0x09/* Tab */) ? '\x09' :
        (c === 0x6E/* n */) ? '\x0A' :
        (c === 0x76/* v */) ? '\x0B' :
        (c === 0x66/* f */) ? '\x0C' :
        (c === 0x72/* r */) ? '\x0D' :
        (c === 0x65/* e */) ? '\x1B' :
        (c === 0x20/* Space */) ? ' ' :
        (c === 0x22/* " */) ? '\x22' :
        (c === 0x2F/* / */) ? '/' :
        (c === 0x5C/* \ */) ? '\x5C' :
        (c === 0x4E/* N */) ? '\x85' :
        (c === 0x5F/* _ */) ? '\xA0' :
        (c === 0x4C/* L */) ? '\u2028' :
        (c === 0x50/* P */) ? '\u2029' : '';
}

var simpleEscapeCheck = new Array(256); // integer, for fast access
var simpleEscapeMap = new Array(256);
for (var i = 0; i < 256; i++) {
  simpleEscapeCheck[i] = simpleEscapeSequence(i) ? 1 : 0;
  simpleEscapeMap[i] = simpleEscapeSequence(i);
}

const syntaxHighlightDefaults = {
  type: "shiki",
  excludeLangs: defaultExcludeLanguages
};
const markdownConfigDefaults = {
  syntaxHighlight: syntaxHighlightDefaults,
  shikiConfig: {
    langs: [],
    theme: "github-dark",
    themes: {},
    wrap: false,
    transformers: [],
    langAlias: {}
  },
  remarkPlugins: [],
  rehypePlugins: [],
  remarkRehype: {},
  gfm: true,
  smartypants: true
};
Boolean(process.env.ASTRO_PERFORMANCE_BENCHMARK);

const LOCAL_PROVIDER_NAME = "local";

const weightSchema = z.union([z.string(), z.number()]);
const styleSchema = z.enum(["normal", "italic", "oblique"]);
const unicodeRangeSchema = z.array(z.string()).nonempty();
const familyPropertiesSchema = z.object({
  /**
   * A [font weight](https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight). If the associated font is a [variable font](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_fonts/Variable_fonts_guide), you can specify a range of weights:
   *
   * ```js
   * weight: "100 900"
   * ```
   */
  weight: weightSchema.optional(),
  /**
   * A [font style](https://developer.mozilla.org/en-US/docs/Web/CSS/font-style).
   */
  style: styleSchema.optional(),
  /**
   * @default `"swap"`
   *
   * A [font display](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display).
   */
  display: z.enum(["auto", "block", "swap", "fallback", "optional"]).optional(),
  /**
   * A [font stretch](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-stretch).
   */
  stretch: z.string().optional(),
  /**
   * Font [feature settings](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-feature-settings).
   */
  featureSettings: z.string().optional(),
  /**
   * Font [variation settings](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-variation-settings).
   */
  variationSettings: z.string().optional()
});
const fallbacksSchema = z.object({
  /**
  	 * @default `["sans-serif"]`
  	 *
  	 * An array of fonts to use when your chosen font is unavailable, or loading. Fallback fonts will be chosen in the order listed. The first available font will be used:
  	 *
  	 * ```js
  	 * fallbacks: ["CustomFont", "serif"]
  	 * ```
  	 *
  	 * To disable fallback fonts completely, configure an empty array:
  	 *
  	 * ```js
  	 * fallbacks: []
  	 * ```
  	 *
  
  	 * If the last font in the `fallbacks` array is a [generic family name](https://developer.mozilla.org/en-US/docs/Web/CSS/font-family#generic-name), Astro will attempt to generate [optimized fallbacks](https://developer.chrome.com/blog/font-fallbacks) using font metrics will be generated. To disable this optimization, set `optimizedFallbacks` to false.
  	 */
  fallbacks: z.array(z.string()).optional(),
  /**
   * @default `true`
   *
   * Whether or not to enable optimized fallback generation. You may disable this default optimization to have full control over `fallbacks`.
   */
  optimizedFallbacks: z.boolean().optional()
});
const requiredFamilyAttributesSchema = z.object({
  /**
   * The font family name, as identified by your font provider.
   */
  name: z.string(),
  /**
   * A valid [ident](https://developer.mozilla.org/en-US/docs/Web/CSS/ident) in the form of a CSS variable (i.e. starting with `--`).
   */
  cssVariable: z.string()
});
const entrypointSchema = z.union([z.string(), z.instanceof(URL)]);
const fontProviderSchema = z.object({
  /**
   * URL, path relative to the root or package import.
   */
  entrypoint: entrypointSchema,
  /**
   * Optional serializable object passed to the unifont provider.
   */
  config: z.record(z.string(), z.any()).optional()
}).strict();
const localFontFamilySchema = requiredFamilyAttributesSchema.merge(fallbacksSchema).merge(
  z.object({
    /**
     * The source of your font files. Set to `"local"` to use local font files.
     */
    provider: z.literal(LOCAL_PROVIDER_NAME),
    /**
     * Each variant represents a [`@font-face` declaration](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/).
     */
    variants: z.array(
      familyPropertiesSchema.merge(
        z.object({
          /**
           * Font [sources](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/src). It can be a path relative to the root, a package import or a URL. URLs are particularly useful if you inject local fonts through an integration.
           */
          src: z.array(
            z.union([
              entrypointSchema,
              z.object({ url: entrypointSchema, tech: z.string().optional() }).strict()
            ])
          ).nonempty(),
          /**
           * A [unicode range](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/unicode-range).
           */
          unicodeRange: unicodeRangeSchema.optional()
          // TODO: find a way to support subsets (through fontkit?)
        }).strict()
      )
    ).nonempty()
  })
).strict();
const remoteFontFamilySchema = requiredFamilyAttributesSchema.merge(
  familyPropertiesSchema.omit({
    weight: true,
    style: true
  })
).merge(fallbacksSchema).merge(
  z.object({
    /**
     * The source of your font files. You can use a built-in provider or write your own custom provider.
     */
    provider: fontProviderSchema,
    /**
     * @default `[400]`
     *
     * An array of [font weights](https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight). If the associated font is a [variable font](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_fonts/Variable_fonts_guide), you can specify a range of weights:
     *
     * ```js
     * weight: "100 900"
     * ```
     */
    weights: z.array(weightSchema).nonempty().optional(),
    /**
     * @default `["normal", "italic"]`
     *
     * An array of [font styles](https://developer.mozilla.org/en-US/docs/Web/CSS/font-style).
     */
    styles: z.array(styleSchema).nonempty().optional(),
    /**
     * @default `["cyrillic-ext", "cyrillic", "greek-ext", "greek", "vietnamese", "latin-ext", "latin"]`
     *
     * An array of [font subsets](https://knaap.dev/posts/font-subsetting/):
     */
    subsets: z.array(z.string()).nonempty().optional(),
    /**
     * A [unicode range](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/unicode-range).
     */
    unicodeRange: unicodeRangeSchema.optional()
  })
).strict();

const StringSchema = z.object({
  type: z.literal("string"),
  optional: z.boolean().optional(),
  default: z.string().optional(),
  max: z.number().optional(),
  min: z.number().min(0).optional(),
  length: z.number().optional(),
  url: z.boolean().optional(),
  includes: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional()
});
const NumberSchema = z.object({
  type: z.literal("number"),
  optional: z.boolean().optional(),
  default: z.number().optional(),
  gt: z.number().optional(),
  min: z.number().optional(),
  lt: z.number().optional(),
  max: z.number().optional(),
  int: z.boolean().optional()
});
const BooleanSchema = z.object({
  type: z.literal("boolean"),
  optional: z.boolean().optional(),
  default: z.boolean().optional()
});
const EnumSchema = z.object({
  type: z.literal("enum"),
  values: z.array(
    // We use "'" for codegen so it can't be passed here
    z.string().refine((v) => !v.includes("'"), {
      message: `The "'" character can't be used as an enum value`
    })
  ),
  optional: z.boolean().optional(),
  default: z.string().optional()
});
const EnvFieldType = z.union([
  StringSchema,
  NumberSchema,
  BooleanSchema,
  EnumSchema.superRefine((schema, ctx) => {
    if (schema.default) {
      if (!schema.values.includes(schema.default)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `The default value "${schema.default}" must be one of the specified values: ${schema.values.join(", ")}.`
        });
      }
    }
  })
]);
const PublicClientEnvFieldMetadata = z.object({
  context: z.literal("client"),
  access: z.literal("public")
});
const PublicServerEnvFieldMetadata = z.object({
  context: z.literal("server"),
  access: z.literal("public")
});
const SecretServerEnvFieldMetadata = z.object({
  context: z.literal("server"),
  access: z.literal("secret")
});
const _EnvFieldMetadata = z.union([
  PublicClientEnvFieldMetadata,
  PublicServerEnvFieldMetadata,
  SecretServerEnvFieldMetadata
]);
const EnvFieldMetadata = z.custom().superRefine((data, ctx) => {
  const result = _EnvFieldMetadata.safeParse(data);
  if (result.success) {
    return;
  }
  for (const issue of result.error.issues) {
    if (issue.code === z.ZodIssueCode.invalid_union) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `**Invalid combination** of "access" and "context" options:
  Secret client variables are not supported. Please review the configuration of \`env.schema.${ctx.path.at(-1)}\`.
  Learn more at https://docs.astro.build/en/guides/environment-variables/#variable-types`,
        path: ["context", "access"]
      });
    } else {
      ctx.addIssue(issue);
    }
  }
});
const EnvSchemaKey = z.string().min(1).refine(([firstChar]) => isNaN(Number.parseInt(firstChar)), {
  message: "A valid variable name cannot start with a number."
}).refine((str) => /^[A-Z0-9_]+$/.test(str), {
  message: "A valid variable name can only contain uppercase letters, numbers and underscores."
});
const EnvSchema = z.record(EnvSchemaKey, z.intersection(EnvFieldMetadata, EnvFieldType));

const ASTRO_CONFIG_DEFAULTS = {
  root: ".",
  srcDir: "./src",
  publicDir: "./public",
  outDir: "./dist",
  cacheDir: "./node_modules/.astro",
  base: "/",
  trailingSlash: "ignore",
  build: {
    format: "directory",
    client: "./client/",
    server: "./server/",
    assets: "_astro",
    serverEntry: "entry.mjs",
    redirects: true,
    inlineStylesheets: "auto",
    concurrency: 1
  },
  image: {
    endpoint: { entrypoint: void 0, route: "/_image" },
    service: { entrypoint: "astro/assets/services/sharp", config: {} }
  },
  devToolbar: {
    enabled: true
  },
  compressHTML: true,
  server: {
    host: false,
    port: 4321,
    open: false,
    allowedHosts: []
  },
  integrations: [],
  markdown: markdownConfigDefaults,
  vite: {},
  legacy: {
    collections: false
  },
  redirects: {},
  security: {
    checkOrigin: true
  },
  env: {
    schema: {},
    validateSecrets: false
  },
  session: void 0,
  experimental: {
    clientPrerender: false,
    contentIntellisense: false,
    responsiveImages: false,
    headingIdCompat: false,
    preserveScriptOrder: false
  }
};
const highlighterTypesSchema = z.union([z.literal("shiki"), z.literal("prism")]).default(syntaxHighlightDefaults.type);
const AstroConfigSchema = z.object({
  root: z.string().optional().default(ASTRO_CONFIG_DEFAULTS.root).transform((val) => new URL(val)),
  srcDir: z.string().optional().default(ASTRO_CONFIG_DEFAULTS.srcDir).transform((val) => new URL(val)),
  publicDir: z.string().optional().default(ASTRO_CONFIG_DEFAULTS.publicDir).transform((val) => new URL(val)),
  outDir: z.string().optional().default(ASTRO_CONFIG_DEFAULTS.outDir).transform((val) => new URL(val)),
  cacheDir: z.string().optional().default(ASTRO_CONFIG_DEFAULTS.cacheDir).transform((val) => new URL(val)),
  site: z.string().url().optional(),
  compressHTML: z.boolean().optional().default(ASTRO_CONFIG_DEFAULTS.compressHTML),
  base: z.string().optional().default(ASTRO_CONFIG_DEFAULTS.base),
  trailingSlash: z.union([z.literal("always"), z.literal("never"), z.literal("ignore")]).optional().default(ASTRO_CONFIG_DEFAULTS.trailingSlash),
  output: z.union([z.literal("static"), z.literal("server")]).optional().default("static"),
  scopedStyleStrategy: z.union([z.literal("where"), z.literal("class"), z.literal("attribute")]).optional().default("attribute"),
  adapter: z.object({ name: z.string(), hooks: z.object({}).passthrough().default({}) }).optional(),
  integrations: z.preprocess(
    // preprocess
    (val) => Array.isArray(val) ? val.flat(Infinity).filter(Boolean) : val,
    // validate
    z.array(z.object({ name: z.string(), hooks: z.object({}).passthrough().default({}) })).default(ASTRO_CONFIG_DEFAULTS.integrations)
  ),
  build: z.object({
    format: z.union([z.literal("file"), z.literal("directory"), z.literal("preserve")]).optional().default(ASTRO_CONFIG_DEFAULTS.build.format),
    client: z.string().optional().default(ASTRO_CONFIG_DEFAULTS.build.client).transform((val) => new URL(val)),
    server: z.string().optional().default(ASTRO_CONFIG_DEFAULTS.build.server).transform((val) => new URL(val)),
    assets: z.string().optional().default(ASTRO_CONFIG_DEFAULTS.build.assets),
    assetsPrefix: z.string().optional().or(z.object({ fallback: z.string() }).and(z.record(z.string())).optional()),
    serverEntry: z.string().optional().default(ASTRO_CONFIG_DEFAULTS.build.serverEntry),
    redirects: z.boolean().optional().default(ASTRO_CONFIG_DEFAULTS.build.redirects),
    inlineStylesheets: z.enum(["always", "auto", "never"]).optional().default(ASTRO_CONFIG_DEFAULTS.build.inlineStylesheets),
    concurrency: z.number().min(1).optional().default(ASTRO_CONFIG_DEFAULTS.build.concurrency)
  }).default({}),
  server: z.preprocess(
    // preprocess
    // NOTE: Uses the "error" command here because this is overwritten by the
    // individualized schema parser with the correct command.
    (val) => typeof val === "function" ? val({ command: "error" }) : val,
    // validate
    z.object({
      open: z.union([z.string(), z.boolean()]).optional().default(ASTRO_CONFIG_DEFAULTS.server.open),
      host: z.union([z.string(), z.boolean()]).optional().default(ASTRO_CONFIG_DEFAULTS.server.host),
      port: z.number().optional().default(ASTRO_CONFIG_DEFAULTS.server.port),
      headers: z.custom().optional(),
      allowedHosts: z.union([z.array(z.string()), z.literal(true)]).optional().default(ASTRO_CONFIG_DEFAULTS.server.allowedHosts)
    }).default({})
  ),
  redirects: z.record(
    z.string(),
    z.union([
      z.string(),
      z.object({
        status: z.union([
          z.literal(300),
          z.literal(301),
          z.literal(302),
          z.literal(303),
          z.literal(304),
          z.literal(307),
          z.literal(308)
        ]),
        destination: z.string()
      })
    ])
  ).default(ASTRO_CONFIG_DEFAULTS.redirects),
  prefetch: z.union([
    z.boolean(),
    z.object({
      prefetchAll: z.boolean().optional(),
      defaultStrategy: z.enum(["tap", "hover", "viewport", "load"]).optional()
    })
  ]).optional(),
  image: z.object({
    endpoint: z.object({
      route: z.literal("/_image").or(z.string()).default(ASTRO_CONFIG_DEFAULTS.image.endpoint.route),
      entrypoint: z.string().optional()
    }).default(ASTRO_CONFIG_DEFAULTS.image.endpoint),
    service: z.object({
      entrypoint: z.union([z.literal("astro/assets/services/sharp"), z.string()]).default(ASTRO_CONFIG_DEFAULTS.image.service.entrypoint),
      config: z.record(z.any()).default({})
    }).default(ASTRO_CONFIG_DEFAULTS.image.service),
    domains: z.array(z.string()).default([]),
    remotePatterns: z.array(
      z.object({
        protocol: z.string().optional(),
        hostname: z.string().optional(),
        port: z.string().optional(),
        pathname: z.string().optional()
      })
    ).default([]),
    experimentalLayout: z.enum(["constrained", "fixed", "full-width", "none"]).optional(),
    experimentalObjectFit: z.string().optional(),
    experimentalObjectPosition: z.string().optional(),
    experimentalBreakpoints: z.array(z.number()).optional()
  }).default(ASTRO_CONFIG_DEFAULTS.image),
  devToolbar: z.object({
    enabled: z.boolean().default(ASTRO_CONFIG_DEFAULTS.devToolbar.enabled)
  }).default(ASTRO_CONFIG_DEFAULTS.devToolbar),
  markdown: z.object({
    syntaxHighlight: z.union([
      z.object({
        type: highlighterTypesSchema,
        excludeLangs: z.array(z.string()).optional().default(syntaxHighlightDefaults.excludeLangs)
      }).default(syntaxHighlightDefaults),
      highlighterTypesSchema,
      z.literal(false)
    ]).default(ASTRO_CONFIG_DEFAULTS.markdown.syntaxHighlight),
    shikiConfig: z.object({
      langs: z.custom().array().transform((langs) => {
        for (const lang of langs) {
          if (typeof lang === "object") {
            if (lang.id) {
              lang.name = lang.id;
            }
            if (lang.grammar) {
              Object.assign(lang, lang.grammar);
            }
          }
        }
        return langs;
      }).default([]),
      langAlias: z.record(z.string(), z.string()).optional().default(ASTRO_CONFIG_DEFAULTS.markdown.shikiConfig.langAlias),
      theme: z.enum(Object.keys(bundledThemes)).or(z.custom()).default(ASTRO_CONFIG_DEFAULTS.markdown.shikiConfig.theme),
      themes: z.record(
        z.enum(Object.keys(bundledThemes)).or(z.custom())
      ).default(ASTRO_CONFIG_DEFAULTS.markdown.shikiConfig.themes),
      defaultColor: z.union([z.literal("light"), z.literal("dark"), z.string(), z.literal(false)]).optional(),
      wrap: z.boolean().or(z.null()).default(ASTRO_CONFIG_DEFAULTS.markdown.shikiConfig.wrap),
      transformers: z.custom().array().default(ASTRO_CONFIG_DEFAULTS.markdown.shikiConfig.transformers)
    }).default({}),
    remarkPlugins: z.union([
      z.string(),
      z.tuple([z.string(), z.any()]),
      z.custom((data) => typeof data === "function"),
      z.tuple([z.custom((data) => typeof data === "function"), z.any()])
    ]).array().default(ASTRO_CONFIG_DEFAULTS.markdown.remarkPlugins),
    rehypePlugins: z.union([
      z.string(),
      z.tuple([z.string(), z.any()]),
      z.custom((data) => typeof data === "function"),
      z.tuple([z.custom((data) => typeof data === "function"), z.any()])
    ]).array().default(ASTRO_CONFIG_DEFAULTS.markdown.rehypePlugins),
    remarkRehype: z.custom((data) => data instanceof Object && !Array.isArray(data)).default(ASTRO_CONFIG_DEFAULTS.markdown.remarkRehype),
    gfm: z.boolean().default(ASTRO_CONFIG_DEFAULTS.markdown.gfm),
    smartypants: z.boolean().default(ASTRO_CONFIG_DEFAULTS.markdown.smartypants)
  }).default({}),
  vite: z.custom((data) => data instanceof Object && !Array.isArray(data)).default(ASTRO_CONFIG_DEFAULTS.vite),
  i18n: z.optional(
    z.object({
      defaultLocale: z.string(),
      locales: z.array(
        z.union([
          z.string(),
          z.object({
            path: z.string(),
            codes: z.string().array().nonempty()
          })
        ])
      ),
      domains: z.record(
        z.string(),
        z.string().url(
          "The domain value must be a valid URL, and it has to start with 'https' or 'http'."
        )
      ).optional(),
      fallback: z.record(z.string(), z.string()).optional(),
      routing: z.literal("manual").or(
        z.object({
          prefixDefaultLocale: z.boolean().optional().default(false),
          // TODO: Astro 6.0 change to false
          redirectToDefaultLocale: z.boolean().optional().default(true),
          fallbackType: z.enum(["redirect", "rewrite"]).optional().default("redirect")
        })
      ).optional().default({})
    }).optional()
  ),
  security: z.object({
    checkOrigin: z.boolean().default(ASTRO_CONFIG_DEFAULTS.security.checkOrigin)
  }).optional().default(ASTRO_CONFIG_DEFAULTS.security),
  env: z.object({
    schema: EnvSchema.optional().default(ASTRO_CONFIG_DEFAULTS.env.schema),
    validateSecrets: z.boolean().optional().default(ASTRO_CONFIG_DEFAULTS.env.validateSecrets)
  }).strict().optional().default(ASTRO_CONFIG_DEFAULTS.env),
  session: z.object({
    driver: z.string(),
    options: z.record(z.any()).optional(),
    cookie: z.object({
      name: z.string().optional(),
      domain: z.string().optional(),
      path: z.string().optional(),
      maxAge: z.number().optional(),
      sameSite: z.union([z.enum(["strict", "lax", "none"]), z.boolean()]).optional(),
      secure: z.boolean().optional()
    }).or(z.string()).transform((val) => {
      if (typeof val === "string") {
        return { name: val };
      }
      return val;
    }).optional(),
    ttl: z.number().optional()
  }).optional(),
  experimental: z.object({
    clientPrerender: z.boolean().optional().default(ASTRO_CONFIG_DEFAULTS.experimental.clientPrerender),
    contentIntellisense: z.boolean().optional().default(ASTRO_CONFIG_DEFAULTS.experimental.contentIntellisense),
    responsiveImages: z.boolean().optional().default(ASTRO_CONFIG_DEFAULTS.experimental.responsiveImages),
    headingIdCompat: z.boolean().optional().default(ASTRO_CONFIG_DEFAULTS.experimental.headingIdCompat),
    preserveScriptOrder: z.boolean().optional().default(ASTRO_CONFIG_DEFAULTS.experimental.preserveScriptOrder),
    fonts: z.array(z.union([localFontFamilySchema, remoteFontFamilySchema])).optional()
  }).strict(
    `Invalid or outdated experimental feature.
Check for incorrect spelling or outdated Astro version.
See https://docs.astro.build/en/reference/experimental-flags/ for a list of all current experiments.`
  ).default({}),
  legacy: z.object({
    collections: z.boolean().optional().default(ASTRO_CONFIG_DEFAULTS.legacy.collections)
  }).default({})
});

function resolveDirAsUrl(dir, root) {
  let resolvedDir = path.resolve(root, dir);
  if (!resolvedDir.endsWith(path.sep)) {
    resolvedDir += path.sep;
  }
  return pathToFileURL(resolvedDir);
}
function createRelativeSchema(cmd, fileProtocolRoot) {
  let originalBuildClient;
  let originalBuildServer;
  const AstroConfigRelativeSchema = AstroConfigSchema.extend({
    root: z.string().default(ASTRO_CONFIG_DEFAULTS.root).transform((val) => resolveDirAsUrl(val, fileProtocolRoot)),
    srcDir: z.string().default(ASTRO_CONFIG_DEFAULTS.srcDir).transform((val) => resolveDirAsUrl(val, fileProtocolRoot)),
    compressHTML: z.boolean().optional().default(ASTRO_CONFIG_DEFAULTS.compressHTML),
    publicDir: z.string().default(ASTRO_CONFIG_DEFAULTS.publicDir).transform((val) => resolveDirAsUrl(val, fileProtocolRoot)),
    outDir: z.string().default(ASTRO_CONFIG_DEFAULTS.outDir).transform((val) => resolveDirAsUrl(val, fileProtocolRoot)),
    cacheDir: z.string().default(ASTRO_CONFIG_DEFAULTS.cacheDir).transform((val) => resolveDirAsUrl(val, fileProtocolRoot)),
    build: z.object({
      format: z.union([z.literal("file"), z.literal("directory"), z.literal("preserve")]).optional().default(ASTRO_CONFIG_DEFAULTS.build.format),
      // NOTE: `client` and `server` are transformed relative to the default outDir first,
      // later we'll fix this to be relative to the actual `outDir`
      client: z.string().optional().default(ASTRO_CONFIG_DEFAULTS.build.client).transform((val) => {
        originalBuildClient = val;
        return resolveDirAsUrl(
          val,
          path.resolve(fileProtocolRoot, ASTRO_CONFIG_DEFAULTS.outDir)
        );
      }),
      server: z.string().optional().default(ASTRO_CONFIG_DEFAULTS.build.server).transform((val) => {
        originalBuildServer = val;
        return resolveDirAsUrl(
          val,
          path.resolve(fileProtocolRoot, ASTRO_CONFIG_DEFAULTS.outDir)
        );
      }),
      assets: z.string().optional().default(ASTRO_CONFIG_DEFAULTS.build.assets),
      assetsPrefix: z.string().optional().or(z.object({ fallback: z.string() }).and(z.record(z.string())).optional()),
      serverEntry: z.string().optional().default(ASTRO_CONFIG_DEFAULTS.build.serverEntry),
      redirects: z.boolean().optional().default(ASTRO_CONFIG_DEFAULTS.build.redirects),
      inlineStylesheets: z.enum(["always", "auto", "never"]).optional().default(ASTRO_CONFIG_DEFAULTS.build.inlineStylesheets),
      concurrency: z.number().min(1).optional().default(ASTRO_CONFIG_DEFAULTS.build.concurrency)
    }).optional().default({}),
    server: z.preprocess(
      // preprocess
      (val) => {
        if (typeof val === "function") {
          return val({ command: "preview" });
        }
        return val;
      },
      // validate
      z.object({
        open: z.union([z.string(), z.boolean()]).optional().default(ASTRO_CONFIG_DEFAULTS.server.open),
        host: z.union([z.string(), z.boolean()]).optional().default(ASTRO_CONFIG_DEFAULTS.server.host),
        port: z.number().optional().default(ASTRO_CONFIG_DEFAULTS.server.port),
        headers: z.custom().optional(),
        streaming: z.boolean().optional().default(true),
        allowedHosts: z.union([z.array(z.string()), z.literal(true)]).optional().default(ASTRO_CONFIG_DEFAULTS.server.allowedHosts)
      }).optional().default({})
    )
  }).transform((config) => {
    if (config.outDir.toString() !== resolveDirAsUrl(ASTRO_CONFIG_DEFAULTS.outDir, fileProtocolRoot).toString()) {
      const outDirPath = fileURLToPath(config.outDir);
      config.build.client = resolveDirAsUrl(originalBuildClient, outDirPath);
      config.build.server = resolveDirAsUrl(originalBuildServer, outDirPath);
    }
    if (config.trailingSlash === "never") {
      config.base = prependForwardSlash(removeTrailingForwardSlash(config.base));
      config.image.endpoint.route = prependForwardSlash(
        removeTrailingForwardSlash(config.image.endpoint.route)
      );
    } else if (config.trailingSlash === "always") {
      config.base = prependForwardSlash(appendForwardSlash(config.base));
      config.image.endpoint.route = prependForwardSlash(
        appendForwardSlash(config.image.endpoint.route)
      );
    } else {
      config.base = prependForwardSlash(config.base);
      config.image.endpoint.route = prependForwardSlash(config.image.endpoint.route);
    }
    return config;
  });
  return AstroConfigRelativeSchema;
}

const AstroConfigRefinedSchema = z.custom().superRefine((config, ctx) => {
  if (config.build.assetsPrefix && typeof config.build.assetsPrefix !== "string" && !config.build.assetsPrefix.fallback) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "The `fallback` is mandatory when defining the option as an object.",
      path: ["build", "assetsPrefix"]
    });
  }
  for (let i = 0; i < config.image.remotePatterns.length; i++) {
    const { hostname, pathname } = config.image.remotePatterns[i];
    if (hostname && hostname.includes("*") && !(hostname.startsWith("*.") || hostname.startsWith("**."))) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "wildcards can only be placed at the beginning of the hostname",
        path: ["image", "remotePatterns", i, "hostname"]
      });
    }
    if (pathname && pathname.includes("*") && !(pathname.endsWith("/*") || pathname.endsWith("/**"))) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "wildcards can only be placed at the end of a pathname",
        path: ["image", "remotePatterns", i, "pathname"]
      });
    }
  }
  if (config.outDir.toString().startsWith(config.publicDir.toString())) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "The value of `outDir` must not point to a path within the folder set as `publicDir`, this will cause an infinite loop",
      path: ["outDir"]
    });
  }
  if (config.i18n) {
    const { defaultLocale, locales: _locales, fallback, domains } = config.i18n;
    const locales = _locales.map((locale) => {
      if (typeof locale === "string") {
        return locale;
      } else {
        return locale.path;
      }
    });
    if (!locales.includes(defaultLocale)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `The default locale \`${defaultLocale}\` is not present in the \`i18n.locales\` array.`,
        path: ["i18n", "locales"]
      });
    }
    if (fallback) {
      for (const [fallbackFrom, fallbackTo] of Object.entries(fallback)) {
        if (!locales.includes(fallbackFrom)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `The locale \`${fallbackFrom}\` key in the \`i18n.fallback\` record doesn't exist in the \`i18n.locales\` array.`,
            path: ["i18n", "fallbacks"]
          });
        }
        if (fallbackFrom === defaultLocale) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `You can't use the default locale as a key. The default locale can only be used as value.`,
            path: ["i18n", "fallbacks"]
          });
        }
        if (!locales.includes(fallbackTo)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `The locale \`${fallbackTo}\` value in the \`i18n.fallback\` record doesn't exist in the \`i18n.locales\` array.`,
            path: ["i18n", "fallbacks"]
          });
        }
      }
    }
    if (domains) {
      const entries = Object.entries(domains);
      const hasDomains = domains ? Object.keys(domains).length > 0 : false;
      if (entries.length > 0 && !hasDomains) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `When specifying some domains, the property \`i18n.routing.strategy\` must be set to \`"domains"\`.`,
          path: ["i18n", "routing", "strategy"]
        });
      }
      if (hasDomains) {
        if (!config.site) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "The option `site` isn't set. When using the 'domains' strategy for `i18n`, `site` is required to create absolute URLs for locales that aren't mapped to a domain.",
            path: ["site"]
          });
        }
        if (config.output !== "server") {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Domain support is only available when `output` is `"server"`.',
            path: ["output"]
          });
        }
      }
      for (const [domainKey, domainValue] of entries) {
        if (!locales.includes(domainKey)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `The locale \`${domainKey}\` key in the \`i18n.domains\` record doesn't exist in the \`i18n.locales\` array.`,
            path: ["i18n", "domains"]
          });
        }
        if (!domainValue.startsWith("https") && !domainValue.startsWith("http")) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "The domain value must be a valid URL, and it has to start with 'https' or 'http'.",
            path: ["i18n", "domains"]
          });
        } else {
          try {
            const domainUrl = new URL(domainValue);
            if (domainUrl.pathname !== "/") {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `The URL \`${domainValue}\` must contain only the origin. A subsequent pathname isn't allowed here. Remove \`${domainUrl.pathname}\`.`,
                path: ["i18n", "domains"]
              });
            }
          } catch {
          }
        }
      }
    }
  }
  if (!config.experimental.responsiveImages && (config.image.experimentalLayout || config.image.experimentalObjectFit || config.image.experimentalObjectPosition || config.image.experimentalBreakpoints)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "The `experimentalLayout`, `experimentalObjectFit`, `experimentalObjectPosition` and `experimentalBreakpoints` options are only available when `experimental.responsiveImages` is enabled.",
      path: ["experimental", "responsiveImages"]
    });
  }
  if (config.experimental.fonts && config.experimental.fonts.length > 0) {
    for (let i = 0; i < config.experimental.fonts.length; i++) {
      const { cssVariable } = config.experimental.fonts[i];
      if (!cssVariable.startsWith("--") || cssVariable.includes(" ") || cssVariable.includes(":")) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `**cssVariable** property "${cssVariable}" contains invalid characters for CSS variable generation. It must start with -- and be a valid indent: https://developer.mozilla.org/en-US/docs/Web/CSS/ident.`,
          path: ["fonts", i, "cssVariable"]
        });
      }
    }
  }
});

async function validateConfig(userConfig, root, cmd) {
  const AstroConfigRelativeSchema = createRelativeSchema(cmd, root);
  return await validateConfigRefined(
    await AstroConfigRelativeSchema.parseAsync(userConfig, { errorMap })
  );
}
async function validateConfigRefined(updatedConfig) {
  return await AstroConfigRefinedSchema.parseAsync(updatedConfig, { errorMap });
}

var src = {exports: {}};

var browser = {exports: {}};

/**
 * Helpers.
 */

var ms;
var hasRequiredMs;

function requireMs () {
	if (hasRequiredMs) return ms;
	hasRequiredMs = 1;
	var s = 1000;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var w = d * 7;
	var y = d * 365.25;

	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} [options]
	 * @throws {Error} throw an error if val is not a non-empty string or a number
	 * @return {String|Number}
	 * @api public
	 */

	ms = function (val, options) {
	  options = options || {};
	  var type = typeof val;
	  if (type === 'string' && val.length > 0) {
	    return parse(val);
	  } else if (type === 'number' && isFinite(val)) {
	    return options.long ? fmtLong(val) : fmtShort(val);
	  }
	  throw new Error(
	    'val is not a non-empty string or a valid number. val=' +
	      JSON.stringify(val)
	  );
	};

	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */

	function parse(str) {
	  str = String(str);
	  if (str.length > 100) {
	    return;
	  }
	  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
	    str
	  );
	  if (!match) {
	    return;
	  }
	  var n = parseFloat(match[1]);
	  var type = (match[2] || 'ms').toLowerCase();
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'yrs':
	    case 'yr':
	    case 'y':
	      return n * y;
	    case 'weeks':
	    case 'week':
	    case 'w':
	      return n * w;
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d;
	    case 'hours':
	    case 'hour':
	    case 'hrs':
	    case 'hr':
	    case 'h':
	      return n * h;
	    case 'minutes':
	    case 'minute':
	    case 'mins':
	    case 'min':
	    case 'm':
	      return n * m;
	    case 'seconds':
	    case 'second':
	    case 'secs':
	    case 'sec':
	    case 's':
	      return n * s;
	    case 'milliseconds':
	    case 'millisecond':
	    case 'msecs':
	    case 'msec':
	    case 'ms':
	      return n;
	    default:
	      return undefined;
	  }
	}

	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function fmtShort(ms) {
	  var msAbs = Math.abs(ms);
	  if (msAbs >= d) {
	    return Math.round(ms / d) + 'd';
	  }
	  if (msAbs >= h) {
	    return Math.round(ms / h) + 'h';
	  }
	  if (msAbs >= m) {
	    return Math.round(ms / m) + 'm';
	  }
	  if (msAbs >= s) {
	    return Math.round(ms / s) + 's';
	  }
	  return ms + 'ms';
	}

	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function fmtLong(ms) {
	  var msAbs = Math.abs(ms);
	  if (msAbs >= d) {
	    return plural(ms, msAbs, d, 'day');
	  }
	  if (msAbs >= h) {
	    return plural(ms, msAbs, h, 'hour');
	  }
	  if (msAbs >= m) {
	    return plural(ms, msAbs, m, 'minute');
	  }
	  if (msAbs >= s) {
	    return plural(ms, msAbs, s, 'second');
	  }
	  return ms + ' ms';
	}

	/**
	 * Pluralization helper.
	 */

	function plural(ms, msAbs, n, name) {
	  var isPlural = msAbs >= n * 1.5;
	  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
	}
	return ms;
}

var common;
var hasRequiredCommon;

function requireCommon () {
	if (hasRequiredCommon) return common;
	hasRequiredCommon = 1;
	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 */

	function setup(env) {
		createDebug.debug = createDebug;
		createDebug.default = createDebug;
		createDebug.coerce = coerce;
		createDebug.disable = disable;
		createDebug.enable = enable;
		createDebug.enabled = enabled;
		createDebug.humanize = requireMs();
		createDebug.destroy = destroy;

		Object.keys(env).forEach(key => {
			createDebug[key] = env[key];
		});

		/**
		* The currently active debug mode names, and names to skip.
		*/

		createDebug.names = [];
		createDebug.skips = [];

		/**
		* Map of special "%n" handling functions, for the debug "format" argument.
		*
		* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
		*/
		createDebug.formatters = {};

		/**
		* Selects a color for a debug namespace
		* @param {String} namespace The namespace string for the debug instance to be colored
		* @return {Number|String} An ANSI color code for the given namespace
		* @api private
		*/
		function selectColor(namespace) {
			let hash = 0;

			for (let i = 0; i < namespace.length; i++) {
				hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
				hash |= 0; // Convert to 32bit integer
			}

			return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
		}
		createDebug.selectColor = selectColor;

		/**
		* Create a debugger with the given `namespace`.
		*
		* @param {String} namespace
		* @return {Function}
		* @api public
		*/
		function createDebug(namespace) {
			let prevTime;
			let enableOverride = null;
			let namespacesCache;
			let enabledCache;

			function debug(...args) {
				// Disabled?
				if (!debug.enabled) {
					return;
				}

				const self = debug;

				// Set `diff` timestamp
				const curr = Number(new Date());
				const ms = curr - (prevTime || curr);
				self.diff = ms;
				self.prev = prevTime;
				self.curr = curr;
				prevTime = curr;

				args[0] = createDebug.coerce(args[0]);

				if (typeof args[0] !== 'string') {
					// Anything else let's inspect with %O
					args.unshift('%O');
				}

				// Apply any `formatters` transformations
				let index = 0;
				args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
					// If we encounter an escaped % then don't increase the array index
					if (match === '%%') {
						return '%';
					}
					index++;
					const formatter = createDebug.formatters[format];
					if (typeof formatter === 'function') {
						const val = args[index];
						match = formatter.call(self, val);

						// Now we need to remove `args[index]` since it's inlined in the `format`
						args.splice(index, 1);
						index--;
					}
					return match;
				});

				// Apply env-specific formatting (colors, etc.)
				createDebug.formatArgs.call(self, args);

				const logFn = self.log || createDebug.log;
				logFn.apply(self, args);
			}

			debug.namespace = namespace;
			debug.useColors = createDebug.useColors();
			debug.color = createDebug.selectColor(namespace);
			debug.extend = extend;
			debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.

			Object.defineProperty(debug, 'enabled', {
				enumerable: true,
				configurable: false,
				get: () => {
					if (enableOverride !== null) {
						return enableOverride;
					}
					if (namespacesCache !== createDebug.namespaces) {
						namespacesCache = createDebug.namespaces;
						enabledCache = createDebug.enabled(namespace);
					}

					return enabledCache;
				},
				set: v => {
					enableOverride = v;
				}
			});

			// Env-specific initialization logic for debug instances
			if (typeof createDebug.init === 'function') {
				createDebug.init(debug);
			}

			return debug;
		}

		function extend(namespace, delimiter) {
			const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
			newDebug.log = this.log;
			return newDebug;
		}

		/**
		* Enables a debug mode by namespaces. This can include modes
		* separated by a colon and wildcards.
		*
		* @param {String} namespaces
		* @api public
		*/
		function enable(namespaces) {
			createDebug.save(namespaces);
			createDebug.namespaces = namespaces;

			createDebug.names = [];
			createDebug.skips = [];

			const split = (typeof namespaces === 'string' ? namespaces : '')
				.trim()
				.replace(' ', ',')
				.split(',')
				.filter(Boolean);

			for (const ns of split) {
				if (ns[0] === '-') {
					createDebug.skips.push(ns.slice(1));
				} else {
					createDebug.names.push(ns);
				}
			}
		}

		/**
		 * Checks if the given string matches a namespace template, honoring
		 * asterisks as wildcards.
		 *
		 * @param {String} search
		 * @param {String} template
		 * @return {Boolean}
		 */
		function matchesTemplate(search, template) {
			let searchIndex = 0;
			let templateIndex = 0;
			let starIndex = -1;
			let matchIndex = 0;

			while (searchIndex < search.length) {
				if (templateIndex < template.length && (template[templateIndex] === search[searchIndex] || template[templateIndex] === '*')) {
					// Match character or proceed with wildcard
					if (template[templateIndex] === '*') {
						starIndex = templateIndex;
						matchIndex = searchIndex;
						templateIndex++; // Skip the '*'
					} else {
						searchIndex++;
						templateIndex++;
					}
				} else if (starIndex !== -1) { // eslint-disable-line no-negated-condition
					// Backtrack to the last '*' and try to match more characters
					templateIndex = starIndex + 1;
					matchIndex++;
					searchIndex = matchIndex;
				} else {
					return false; // No match
				}
			}

			// Handle trailing '*' in template
			while (templateIndex < template.length && template[templateIndex] === '*') {
				templateIndex++;
			}

			return templateIndex === template.length;
		}

		/**
		* Disable debug output.
		*
		* @return {String} namespaces
		* @api public
		*/
		function disable() {
			const namespaces = [
				...createDebug.names,
				...createDebug.skips.map(namespace => '-' + namespace)
			].join(',');
			createDebug.enable('');
			return namespaces;
		}

		/**
		* Returns true if the given mode name is enabled, false otherwise.
		*
		* @param {String} name
		* @return {Boolean}
		* @api public
		*/
		function enabled(name) {
			for (const skip of createDebug.skips) {
				if (matchesTemplate(name, skip)) {
					return false;
				}
			}

			for (const ns of createDebug.names) {
				if (matchesTemplate(name, ns)) {
					return true;
				}
			}

			return false;
		}

		/**
		* Coerce `val`.
		*
		* @param {Mixed} val
		* @return {Mixed}
		* @api private
		*/
		function coerce(val) {
			if (val instanceof Error) {
				return val.stack || val.message;
			}
			return val;
		}

		/**
		* XXX DO NOT USE. This is a temporary stub function.
		* XXX It WILL be removed in the next major release.
		*/
		function destroy() {
			console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
		}

		createDebug.enable(createDebug.load());

		return createDebug;
	}

	common = setup;
	return common;
}

/* eslint-env browser */

var hasRequiredBrowser;

function requireBrowser () {
	if (hasRequiredBrowser) return browser.exports;
	hasRequiredBrowser = 1;
	(function (module, exports) {
		/**
		 * This is the web browser implementation of `debug()`.
		 */

		exports.formatArgs = formatArgs;
		exports.save = save;
		exports.load = load;
		exports.useColors = useColors;
		exports.storage = localstorage();
		exports.destroy = (() => {
			let warned = false;

			return () => {
				if (!warned) {
					warned = true;
					console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
				}
			};
		})();

		/**
		 * Colors.
		 */

		exports.colors = [
			'#0000CC',
			'#0000FF',
			'#0033CC',
			'#0033FF',
			'#0066CC',
			'#0066FF',
			'#0099CC',
			'#0099FF',
			'#00CC00',
			'#00CC33',
			'#00CC66',
			'#00CC99',
			'#00CCCC',
			'#00CCFF',
			'#3300CC',
			'#3300FF',
			'#3333CC',
			'#3333FF',
			'#3366CC',
			'#3366FF',
			'#3399CC',
			'#3399FF',
			'#33CC00',
			'#33CC33',
			'#33CC66',
			'#33CC99',
			'#33CCCC',
			'#33CCFF',
			'#6600CC',
			'#6600FF',
			'#6633CC',
			'#6633FF',
			'#66CC00',
			'#66CC33',
			'#9900CC',
			'#9900FF',
			'#9933CC',
			'#9933FF',
			'#99CC00',
			'#99CC33',
			'#CC0000',
			'#CC0033',
			'#CC0066',
			'#CC0099',
			'#CC00CC',
			'#CC00FF',
			'#CC3300',
			'#CC3333',
			'#CC3366',
			'#CC3399',
			'#CC33CC',
			'#CC33FF',
			'#CC6600',
			'#CC6633',
			'#CC9900',
			'#CC9933',
			'#CCCC00',
			'#CCCC33',
			'#FF0000',
			'#FF0033',
			'#FF0066',
			'#FF0099',
			'#FF00CC',
			'#FF00FF',
			'#FF3300',
			'#FF3333',
			'#FF3366',
			'#FF3399',
			'#FF33CC',
			'#FF33FF',
			'#FF6600',
			'#FF6633',
			'#FF9900',
			'#FF9933',
			'#FFCC00',
			'#FFCC33'
		];

		/**
		 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
		 * and the Firebug extension (any Firefox version) are known
		 * to support "%c" CSS customizations.
		 *
		 * TODO: add a `localStorage` variable to explicitly enable/disable colors
		 */

		// eslint-disable-next-line complexity
		function useColors() {
			// NB: In an Electron preload script, document will be defined but not fully
			// initialized. Since we know we're in Chrome, we'll just detect this case
			// explicitly
			if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
				return true;
			}

			// Internet Explorer and Edge do not support colors.
			if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
				return false;
			}

			let m;

			// Is webkit? http://stackoverflow.com/a/16459606/376773
			// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
			// eslint-disable-next-line no-return-assign
			return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
				// Is firebug? http://stackoverflow.com/a/398120/376773
				(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
				// Is firefox >= v31?
				// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
				(typeof navigator !== 'undefined' && navigator.userAgent && (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m[1], 10) >= 31) ||
				// Double check webkit in userAgent just in case we are in a worker
				(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
		}

		/**
		 * Colorize log arguments if enabled.
		 *
		 * @api public
		 */

		function formatArgs(args) {
			args[0] = (this.useColors ? '%c' : '') +
				this.namespace +
				(this.useColors ? ' %c' : ' ') +
				args[0] +
				(this.useColors ? '%c ' : ' ') +
				'+' + module.exports.humanize(this.diff);

			if (!this.useColors) {
				return;
			}

			const c = 'color: ' + this.color;
			args.splice(1, 0, c, 'color: inherit');

			// The final "%c" is somewhat tricky, because there could be other
			// arguments passed either before or after the %c, so we need to
			// figure out the correct index to insert the CSS into
			let index = 0;
			let lastC = 0;
			args[0].replace(/%[a-zA-Z%]/g, match => {
				if (match === '%%') {
					return;
				}
				index++;
				if (match === '%c') {
					// We only are interested in the *last* %c
					// (the user may have provided their own)
					lastC = index;
				}
			});

			args.splice(lastC, 0, c);
		}

		/**
		 * Invokes `console.debug()` when available.
		 * No-op when `console.debug` is not a "function".
		 * If `console.debug` is not available, falls back
		 * to `console.log`.
		 *
		 * @api public
		 */
		exports.log = console.debug || console.log || (() => {});

		/**
		 * Save `namespaces`.
		 *
		 * @param {String} namespaces
		 * @api private
		 */
		function save(namespaces) {
			try {
				if (namespaces) {
					exports.storage.setItem('debug', namespaces);
				} else {
					exports.storage.removeItem('debug');
				}
			} catch (error) {
				// Swallow
				// XXX (@Qix-) should we be logging these?
			}
		}

		/**
		 * Load `namespaces`.
		 *
		 * @return {String} returns the previously persisted debug modes
		 * @api private
		 */
		function load() {
			let r;
			try {
				r = exports.storage.getItem('debug');
			} catch (error) {
				// Swallow
				// XXX (@Qix-) should we be logging these?
			}

			// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
			if (!r && typeof process !== 'undefined' && 'env' in process) {
				r = process.env.DEBUG;
			}

			return r;
		}

		/**
		 * Localstorage attempts to return the localstorage.
		 *
		 * This is necessary because safari throws
		 * when a user disables cookies/localstorage
		 * and you attempt to access it.
		 *
		 * @return {LocalStorage}
		 * @api private
		 */

		function localstorage() {
			try {
				// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
				// The Browser also has localStorage in the global context.
				return localStorage;
			} catch (error) {
				// Swallow
				// XXX (@Qix-) should we be logging these?
			}
		}

		module.exports = requireCommon()(exports);

		const {formatters} = module.exports;

		/**
		 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
		 */

		formatters.j = function (v) {
			try {
				return JSON.stringify(v);
			} catch (error) {
				return '[UnexpectedJSONParseError]: ' + error.message;
			}
		}; 
	} (browser, browser.exports));
	return browser.exports;
}

var node = {exports: {}};

/**
 * Module dependencies.
 */

var hasRequiredNode;

function requireNode () {
	if (hasRequiredNode) return node.exports;
	hasRequiredNode = 1;
	(function (module, exports) {
		const tty = require$$6;
		const util = require$$1$1;

		/**
		 * This is the Node.js implementation of `debug()`.
		 */

		exports.init = init;
		exports.log = log;
		exports.formatArgs = formatArgs;
		exports.save = save;
		exports.load = load;
		exports.useColors = useColors;
		exports.destroy = util.deprecate(
			() => {},
			'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.'
		);

		/**
		 * Colors.
		 */

		exports.colors = [6, 2, 3, 4, 5, 1];

		try {
			// Optional dependency (as in, doesn't need to be installed, NOT like optionalDependencies in package.json)
			// eslint-disable-next-line import/no-extraneous-dependencies
			const supportsColor = require('supports-color');

			if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
				exports.colors = [
					20,
					21,
					26,
					27,
					32,
					33,
					38,
					39,
					40,
					41,
					42,
					43,
					44,
					45,
					56,
					57,
					62,
					63,
					68,
					69,
					74,
					75,
					76,
					77,
					78,
					79,
					80,
					81,
					92,
					93,
					98,
					99,
					112,
					113,
					128,
					129,
					134,
					135,
					148,
					149,
					160,
					161,
					162,
					163,
					164,
					165,
					166,
					167,
					168,
					169,
					170,
					171,
					172,
					173,
					178,
					179,
					184,
					185,
					196,
					197,
					198,
					199,
					200,
					201,
					202,
					203,
					204,
					205,
					206,
					207,
					208,
					209,
					214,
					215,
					220,
					221
				];
			}
		} catch (error) {
			// Swallow - we only care if `supports-color` is available; it doesn't have to be.
		}

		/**
		 * Build up the default `inspectOpts` object from the environment variables.
		 *
		 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
		 */

		exports.inspectOpts = Object.keys(process.env).filter(key => {
			return /^debug_/i.test(key);
		}).reduce((obj, key) => {
			// Camel-case
			const prop = key
				.substring(6)
				.toLowerCase()
				.replace(/_([a-z])/g, (_, k) => {
					return k.toUpperCase();
				});

			// Coerce string value into JS value
			let val = process.env[key];
			if (/^(yes|on|true|enabled)$/i.test(val)) {
				val = true;
			} else if (/^(no|off|false|disabled)$/i.test(val)) {
				val = false;
			} else if (val === 'null') {
				val = null;
			} else {
				val = Number(val);
			}

			obj[prop] = val;
			return obj;
		}, {});

		/**
		 * Is stdout a TTY? Colored output is enabled when `true`.
		 */

		function useColors() {
			return 'colors' in exports.inspectOpts ?
				Boolean(exports.inspectOpts.colors) :
				tty.isatty(process.stderr.fd);
		}

		/**
		 * Adds ANSI color escape codes if enabled.
		 *
		 * @api public
		 */

		function formatArgs(args) {
			const {namespace: name, useColors} = this;

			if (useColors) {
				const c = this.color;
				const colorCode = '\u001B[3' + (c < 8 ? c : '8;5;' + c);
				const prefix = `  ${colorCode};1m${name} \u001B[0m`;

				args[0] = prefix + args[0].split('\n').join('\n' + prefix);
				args.push(colorCode + 'm+' + module.exports.humanize(this.diff) + '\u001B[0m');
			} else {
				args[0] = getDate() + name + ' ' + args[0];
			}
		}

		function getDate() {
			if (exports.inspectOpts.hideDate) {
				return '';
			}
			return new Date().toISOString() + ' ';
		}

		/**
		 * Invokes `util.formatWithOptions()` with the specified arguments and writes to stderr.
		 */

		function log(...args) {
			return process.stderr.write(util.formatWithOptions(exports.inspectOpts, ...args) + '\n');
		}

		/**
		 * Save `namespaces`.
		 *
		 * @param {String} namespaces
		 * @api private
		 */
		function save(namespaces) {
			if (namespaces) {
				process.env.DEBUG = namespaces;
			} else {
				// If you set a process.env field to null or undefined, it gets cast to the
				// string 'null' or 'undefined'. Just delete instead.
				delete process.env.DEBUG;
			}
		}

		/**
		 * Load `namespaces`.
		 *
		 * @return {String} returns the previously persisted debug modes
		 * @api private
		 */

		function load() {
			return process.env.DEBUG;
		}

		/**
		 * Init logic for `debug` instances.
		 *
		 * Create a new `inspectOpts` object in case `useColors` is set
		 * differently for a particular `debug` instance.
		 */

		function init(debug) {
			debug.inspectOpts = {};

			const keys = Object.keys(exports.inspectOpts);
			for (let i = 0; i < keys.length; i++) {
				debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
			}
		}

		module.exports = requireCommon()(exports);

		const {formatters} = module.exports;

		/**
		 * Map %o to `util.inspect()`, all on a single line.
		 */

		formatters.o = function (v) {
			this.inspectOpts.colors = this.useColors;
			return util.inspect(v, this.inspectOpts)
				.split('\n')
				.map(str => str.trim())
				.join(' ');
		};

		/**
		 * Map %O to `util.inspect()`, allowing multiple lines if needed.
		 */

		formatters.O = function (v) {
			this.inspectOpts.colors = this.useColors;
			return util.inspect(v, this.inspectOpts);
		}; 
	} (node, node.exports));
	return node.exports;
}

/**
 * Detect Electron renderer / nwjs process, which is node, but we should
 * treat as a browser.
 */

var hasRequiredSrc;

function requireSrc () {
	if (hasRequiredSrc) return src.exports;
	hasRequiredSrc = 1;
	if (typeof process === 'undefined' || process.type === 'renderer' || process.browser === true || process.__nwjs) {
		src.exports = requireBrowser();
	} else {
		src.exports = requireNode();
	}
	return src.exports;
}

var srcExports = requireSrc();
const debugPackage = /*@__PURE__*/getDefaultExportFromCjs(srcExports);

const nodeLogDestination = {
  write(event) {
    let dest = process.stderr;
    if (levels[event.level] < levels["error"]) {
      dest = process.stdout;
    }
    let trailingLine = event.newLine ? "\n" : "";
    if (event.label === "SKIP_FORMAT") {
      dest.write(event.message + trailingLine);
    } else {
      dest.write(getEventPrefix(event) + " " + event.message + trailingLine);
    }
    return true;
  }
};
const debuggers = {};
function debug(type, ...messages) {
  const namespace = `astro:${type}`;
  debuggers[namespace] = debuggers[namespace] || debugPackage(namespace);
  return debuggers[namespace](...messages);
}
globalThis._astroGlobalDebug = debug;

const ROUTE_DYNAMIC_SPLIT = /\[(.+?\(.+?\)|.+?)\]/;
const ROUTE_SPREAD = /^\.{3}.+$/;
function getParts(part, file) {
  const result = [];
  part.split(ROUTE_DYNAMIC_SPLIT).map((str, i) => {
    if (!str) return;
    const dynamic = i % 2 === 1;
    const [, content] = dynamic ? /([^(]+)$/.exec(str) || [null, null] : [null, str];
    if (!content || dynamic && !/^(?:\.\.\.)?[\w$]+$/.test(content)) {
      throw new Error(`Invalid route ${file} \u2014 parameter name must match /^[a-zA-Z0-9_$]+$/`);
    }
    result.push({
      content,
      dynamic,
      spread: dynamic && ROUTE_SPREAD.test(content)
    });
  });
  return result;
}

function validateSegment(segment, file = "") {
  if (!file) file = segment;
  if (segment.includes("][")) {
    throw new Error(`Invalid route ${file} \u2014 parameters must be separated`);
  }
  if (countOccurrences("[", segment) !== countOccurrences("]", segment)) {
    throw new Error(`Invalid route ${file} \u2014 brackets are unbalanced`);
  }
  if ((/.+\[\.\.\.[^\]]+\]/.test(segment) || /\[\.\.\.[^\]]+\].+/.test(segment)) && file.endsWith(".astro")) {
    throw new Error(`Invalid route ${file} \u2014 rest parameter must be a standalone segment`);
  }
}
function countOccurrences(needle, haystack) {
  let count = 0;
  for (const hay of haystack) {
    if (hay === needle) count += 1;
  }
  return count;
}

class ContainerPipeline extends Pipeline {
  /**
   * Internal cache to store components instances by `RouteData`.
   * @private
   */
  #componentsInterner = /* @__PURE__ */ new WeakMap();
  static create({
    logger,
    manifest,
    renderers,
    resolve,
    serverLike,
    streaming
  }) {
    return new ContainerPipeline(
      logger,
      manifest,
      "development",
      renderers,
      resolve,
      serverLike,
      streaming
    );
  }
  componentMetadata(_routeData) {
  }
  headElements(routeData) {
    const routeInfo = this.manifest.routes.find((route) => route.routeData === routeData);
    const links = /* @__PURE__ */ new Set();
    const scripts = /* @__PURE__ */ new Set();
    const styles = createStylesheetElementSet(routeInfo?.styles ?? []);
    for (const script of routeInfo?.scripts ?? []) {
      if ("stage" in script) {
        if (script.stage === "head-inline") {
          scripts.add({
            props: {},
            children: script.children
          });
        }
      } else {
        scripts.add(createModuleScriptElement(script));
      }
    }
    return { links, styles, scripts };
  }
  async tryRewrite(payload, request) {
    const { newUrl, pathname, routeData } = findRouteToRewrite({
      payload,
      request,
      routes: this.manifest?.routes.map((r) => r.routeData),
      trailingSlash: this.manifest.trailingSlash,
      buildFormat: this.manifest.buildFormat,
      base: this.manifest.base
    });
    const componentInstance = await this.getComponentByRoute(routeData);
    return { componentInstance, routeData, newUrl, pathname };
  }
  insertRoute(route, componentInstance) {
    this.#componentsInterner.set(route, {
      page() {
        return Promise.resolve(componentInstance);
      },
      renderers: this.manifest.renderers,
      onRequest: this.resolvedMiddleware
    });
  }
  // At the moment it's not used by the container via any public API
  async getComponentByRoute(routeData) {
    const page = this.#componentsInterner.get(routeData);
    if (page) {
      return page.page();
    }
    throw new Error("Couldn't find component for route " + routeData.pathname);
  }
}

function createManifest(manifest, renderers, middleware) {
  function middlewareInstance() {
    return {
      onRequest: NOOP_MIDDLEWARE_FN
    };
  }
  return {
    hrefRoot: import.meta.url,
    srcDir: manifest?.srcDir ?? ASTRO_CONFIG_DEFAULTS.srcDir,
    buildClientDir: manifest?.buildClientDir ?? ASTRO_CONFIG_DEFAULTS.build.client,
    buildServerDir: manifest?.buildServerDir ?? ASTRO_CONFIG_DEFAULTS.build.server,
    publicDir: manifest?.publicDir ?? ASTRO_CONFIG_DEFAULTS.publicDir,
    outDir: manifest?.outDir ?? ASTRO_CONFIG_DEFAULTS.outDir,
    cacheDir: manifest?.cacheDir ?? ASTRO_CONFIG_DEFAULTS.cacheDir,
    trailingSlash: manifest?.trailingSlash ?? ASTRO_CONFIG_DEFAULTS.trailingSlash,
    buildFormat: manifest?.buildFormat ?? ASTRO_CONFIG_DEFAULTS.build.format,
    compressHTML: manifest?.compressHTML ?? ASTRO_CONFIG_DEFAULTS.compressHTML,
    assets: manifest?.assets ?? /* @__PURE__ */ new Set(),
    assetsPrefix: manifest?.assetsPrefix ?? void 0,
    entryModules: manifest?.entryModules ?? {},
    routes: manifest?.routes ?? [],
    adapterName: "",
    clientDirectives: manifest?.clientDirectives ?? getDefaultClientDirectives(),
    renderers: renderers ?? manifest?.renderers ?? [],
    base: manifest?.base ?? ASTRO_CONFIG_DEFAULTS.base,
    userAssetsBase: manifest?.userAssetsBase ?? "",
    componentMetadata: manifest?.componentMetadata ?? /* @__PURE__ */ new Map(),
    inlinedScripts: manifest?.inlinedScripts ?? /* @__PURE__ */ new Map(),
    i18n: manifest?.i18n,
    checkOrigin: false,
    middleware: manifest?.middleware ?? middlewareInstance,
    key: createKey()
  };
}
class experimental_AstroContainer {
  #pipeline;
  /**
   * Internally used to check if the container was created with a manifest.
   * @private
   */
  #withManifest = false;
  constructor({
    streaming = false,
    manifest,
    renderers,
    resolve,
    astroConfig
  }) {
    this.#pipeline = ContainerPipeline.create({
      logger: new Logger({
        level: "info",
        dest: nodeLogDestination
      }),
      manifest: createManifest(manifest, renderers),
      streaming,
      serverLike: true,
      renderers: renderers ?? manifest?.renderers ?? [],
      resolve: async (specifier) => {
        if (this.#withManifest) {
          return this.#containerResolve(specifier, astroConfig);
        } else if (resolve) {
          return resolve(specifier);
        }
        return specifier;
      }
    });
  }
  async #containerResolve(specifier, astroConfig) {
    const found = this.#pipeline.manifest.entryModules[specifier];
    if (found) {
      return new URL(found, astroConfig?.build.client).toString();
    }
    return found;
  }
  /**
   * Creates a new instance of a container.
   *
   * @param {AstroContainerOptions=} containerOptions
   */
  static async create(containerOptions = {}) {
    const { streaming = false, manifest, renderers = [], resolve } = containerOptions;
    const astroConfig = await validateConfig(ASTRO_CONFIG_DEFAULTS, process.cwd(), "container");
    return new experimental_AstroContainer({
      streaming,
      manifest,
      renderers,
      astroConfig,
      resolve
    });
  }
  /**
   * Use this function to manually add a **server** renderer to the container.
   *
   * This function is preferred when you require to use the container with a renderer in environments such as on-demand pages.
   *
   * ## Example
   *
   * ```js
   * import reactRenderer from "@astrojs/react/server.js";
   * import vueRenderer from "@astrojs/vue/server.js";
   * import customRenderer from "../renderer/customRenderer.js";
   * import { experimental_AstroContainer as AstroContainer } from "astro/container"
   *
   * const container = await AstroContainer.create();
   * container.addServerRenderer(reactRenderer);
   * container.addServerRenderer(vueRenderer);
   * container.addServerRenderer("customRenderer", customRenderer);
   * ```
   *
   * @param options {object}
   * @param options.name The name of the renderer. The name **isn't** arbitrary, and it should match the name of the package.
   * @param options.renderer The server renderer exported by integration.
   */
  addServerRenderer(options) {
    const { renderer, name } = options;
    if (!renderer.check || !renderer.renderToStaticMarkup) {
      throw new Error(
        "The renderer you passed isn't valid. A renderer is usually an object that exposes the `check` and `renderToStaticMarkup` functions.\nUsually, the renderer is exported by a /server.js entrypoint e.g. `import renderer from '@astrojs/react/server.js'`"
      );
    }
    if (isNamedRenderer(renderer)) {
      this.#pipeline.manifest.renderers.push({
        name: renderer.name,
        ssr: renderer
      });
    } else {
      this.#pipeline.manifest.renderers.push({
        name,
        ssr: renderer
      });
    }
  }
  /**
   * Use this function to manually add a **client** renderer to the container.
   *
   * When rendering components that use the `client:*` directives, you need to use this function.
   *
   * ## Example
   *
   * ```js
   * import reactRenderer from "@astrojs/react/server.js";
   * import { experimental_AstroContainer as AstroContainer } from "astro/container"
   *
   * const container = await AstroContainer.create();
   * container.addServerRenderer(reactRenderer);
   * container.addClientRenderer({
   * 	name: "@astrojs/react",
   * 	entrypoint: "@astrojs/react/client.js"
   * });
   * ```
   *
   * @param options {object}
   * @param options.name The name of the renderer. The name **isn't** arbitrary, and it should match the name of the package.
   * @param options.entrypoint The entrypoint of the client renderer.
   */
  addClientRenderer(options) {
    const { entrypoint, name } = options;
    const rendererIndex = this.#pipeline.manifest.renderers.findIndex((r) => r.name === name);
    if (rendererIndex === -1) {
      throw new Error(
        "You tried to add the " + name + " client renderer, but its server renderer wasn't added. You must add the server renderer first. Use the `addServerRenderer` function."
      );
    }
    const renderer = this.#pipeline.manifest.renderers[rendererIndex];
    renderer.clientEntrypoint = entrypoint;
    this.#pipeline.manifest.renderers[rendererIndex] = renderer;
  }
  // NOTE: we keep this private via TS instead via `#` so it's still available on the surface, so we can play with it.
  // @ts-expect-error @ematipico: I plan to use it for a possible integration that could help people
  static async createFromManifest(manifest) {
    const astroConfig = await validateConfig(ASTRO_CONFIG_DEFAULTS, process.cwd(), "container");
    const container = new experimental_AstroContainer({
      manifest,
      astroConfig
    });
    container.#withManifest = true;
    return container;
  }
  #insertRoute({
    path,
    componentInstance,
    params = {},
    type = "page"
  }) {
    const pathUrl = new URL(path, "https://example.com");
    const routeData = this.#createRoute(pathUrl, params, type);
    this.#pipeline.manifest.routes.push({
      routeData,
      file: "",
      links: [],
      styles: [],
      scripts: []
    });
    this.#pipeline.insertRoute(routeData, componentInstance);
    return routeData;
  }
  /**
   * @description
   * It renders a component and returns the result as a string.
   *
   * ## Example
   *
   * ```js
   * import Card from "../src/components/Card.astro";
   *
   * const container = await AstroContainer.create();
   * const result = await container.renderToString(Card);
   *
   * console.log(result); // it's a string
   * ```
   *
   *
   * @param {AstroComponentFactory} component The instance of the component.
   * @param {ContainerRenderOptions=} options Possible options to pass when rendering the component.
   */
  async renderToString(component, options = {}) {
    if (options.slots) {
      options.slots = markAllSlotsAsSlotString(options.slots);
    }
    const response = await this.renderToResponse(component, options);
    return await response.text();
  }
  /**
   * @description
   * It renders a component and returns the `Response` as result of the rendering phase.
   *
   * ## Example
   *
   * ```js
   * import Card from "../src/components/Card.astro";
   *
   * const container = await AstroContainer.create();
   * const response = await container.renderToResponse(Card);
   *
   * console.log(response.status); // it's a number
   * ```
   *
   *
   * @param {AstroComponentFactory} component The instance of the component.
   * @param {ContainerRenderOptions=} options Possible options to pass when rendering the component.
   */
  async renderToResponse(component, options = {}) {
    const { routeType = "page", slots } = options;
    const request = options?.request ?? new Request("https://example.com/");
    const url = new URL(request.url);
    const componentInstance = routeType === "endpoint" ? component : this.#wrapComponent(component, options.params);
    const routeData = this.#insertRoute({
      path: request.url,
      componentInstance,
      params: options.params,
      type: routeType
    });
    const renderContext = await RenderContext.create({
      pipeline: this.#pipeline,
      routeData,
      status: 200,
      request,
      pathname: url.pathname,
      locals: options?.locals ?? {},
      partial: options?.partial ?? true,
      clientAddress: ""
    });
    if (options.params) {
      renderContext.params = options.params;
    }
    if (options.props) {
      renderContext.props = options.props;
    }
    return renderContext.render(componentInstance, slots);
  }
  /**
   * It stores an Astro **page** route. The first argument, `route`, gets associated to the `component`.
   *
   * This function can be useful when you want to render a route via `AstroContainer.renderToString`, where that
   * route eventually renders another route via `Astro.rewrite`.
   *
   * @param {string} route - The URL that will render the component.
   * @param {AstroComponentFactory} component - The component factory to be used for rendering the route.
   * @param {Record<string, string | undefined>} params - An object containing key-value pairs of route parameters.
   */
  insertPageRoute(route, component, params) {
    const url = new URL(route, "https://example.com/");
    const routeData = this.#createRoute(url, params ?? {}, "page");
    this.#pipeline.manifest.routes.push({
      routeData,
      file: "",
      links: [],
      styles: [],
      scripts: []
    });
    const componentInstance = this.#wrapComponent(component, params);
    this.#pipeline.insertRoute(routeData, componentInstance);
  }
  #createRoute(url, params, type) {
    const segments = removeLeadingForwardSlash(url.pathname).split(posix.sep).filter(Boolean).map((s) => {
      validateSegment(s);
      return getParts(s, url.pathname);
    });
    return {
      route: url.pathname,
      component: "",
      generate(_data) {
        return "";
      },
      params: Object.keys(params),
      pattern: getPattern(
        segments,
        ASTRO_CONFIG_DEFAULTS.base,
        ASTRO_CONFIG_DEFAULTS.trailingSlash
      ),
      prerender: false,
      segments,
      type,
      fallbackRoutes: [],
      isIndex: false,
      origin: "internal"
    };
  }
  /**
   * If the provided component isn't a default export, the function wraps it in an object `{default: Component }` to mimic the default export.
   * @param componentFactory
   * @param params
   * @private
   */
  #wrapComponent(componentFactory, params) {
    if (params) {
      return {
        default: componentFactory,
        getStaticPaths() {
          return [{ params }];
        }
      };
    }
    return { default: componentFactory };
  }
}
function isNamedRenderer(renderer) {
  return !!renderer?.name;
}
function markAllSlotsAsSlotString(slots) {
  const markedSlots = {};
  for (const slotName in slots) {
    markedSlots[slotName] = new SlotString(slots[slotName], null);
  }
  return markedSlots;
}

const $$Astro = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { name, address, email, city, zip, date, time, phone, people, service, order, requests } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="container catering grid grid-cols-24 gap-4 py-10"> <p class="col-span-22 col-start-2 lg:col-span-10 lg:col-start-2 xl:col-start-0 mt-4 uppercase">Name: ${name}</p> <p class="col-span-22 col-start-2 lg:col-span-10 lg:col-start-2 xl:col-start-0 mt-4 uppercase">Event Address: ${address}</p> <p class="col-span-22 col-start-2 lg:col-span-10 lg:col-start-2 xl:col-start-0 mt-4 uppercase">Email: ${email}</p> <p class="col-span-22 col-start-2 lg:col-span-10 lg:col-start-2 xl:col-start-0 mt-4 uppercase">City: ${city}</p> <p class="col-span-22 col-start-2 lg:col-span-10 lg:col-start-2 xl:col-start-0 mt-4 uppercase">Zip: ${zip}</p> <p class="col-span-22 col-start-2 lg:col-span-10 lg:col-start-2 xl:col-start-0 mt-4 uppercase">Date: ${date}</p> <p class="col-span-22 col-start-2 lg:col-span-10 lg:col-start-2 xl:col-start-0 mt-4 uppercase">Time: ${time}</p> <p class="col-span-22 col-start-2 lg:col-span-10 lg:col-start-2 xl:col-start-0 mt-4 uppercase">Phone: ${phone}</p> <p class="col-span-22 col-start-2 lg:col-span-10 lg:col-start-2 xl:col-start-0 mt-4 uppercase">People: ${people}</p> <p class="col-span-22 col-start-2 lg:col-span-10 lg:col-start-2 xl:col-start-0 mt-4 uppercase">Service: ${service}</p> <p class="col-span-22 col-start-2 lg:col-span-10 lg:col-start-2 xl:col-start-0 mt-4 uppercase">Order: ${order}</p> <p class="col-span-22 col-start-2 lg:col-span-10 lg:col-start-2 xl:col-start-0 mt-4 uppercase">Special Requests: ${requests}</p> </section>`;
}, "/Users/kevinfay/Sites/astro/grill/src/components/catering/index.astro", void 0);

const prerender = false;
const resendApiKey = process.env.RESEND_API_KEY || "re_FLEAc2kS_9MYvDtUZD21pXcUJxujwQ4Xu";
const resend = new Resend(resendApiKey);
const POST = async ({ request }) => {
  const container = await experimental_AstroContainer.create();
  const data = await request.formData();
  const name = data.get("name")?.toString() || "";
  const address = data.get("address")?.toString() || "";
  const email = data.get("email")?.toString() || "";
  const city = data.get("city")?.toString() || "";
  const zip = data.get("zip")?.toString() || "";
  const date = data.get("date")?.toString() || "";
  const time = data.get("time")?.toString() || "";
  const phone = data.get("phone")?.toString() || "";
  const peopleValue = data.get("people");
  const people = peopleValue !== null ? parseInt(peopleValue.toString(), 10) : 1;
  const service = data.get("service")?.toString() || "pickup";
  const order = data.get("order")?.toString() || "";
  const requests = data.get("requests")?.toString() || "";
  if (!name) {
    return new Response(
      JSON.stringify({
        message: `Fill out all fields.`
      }),
      {
        status: 400,
        statusText: "Did not provide the right data"
      }
    );
  }
  const emailCateringHtml = await container.renderToString($$Index, {
    props: { name, address, email, city, zip, date, time, phone, people, service, order, requests }
  });
  const sendCateringResend = await resend.emails.send({
    from: "catering@thegrillatlj.com",
    to: ["bridgette@thegrillatlj.com", email],
    subject: `Catering for ${name}`,
    html: emailCateringHtml
  });
  if (sendCateringResend.data) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/thank-you"
      }
    });
  } else {
    return new Response(
      JSON.stringify({
        message: `Messages failed to send: User- ${JSON.stringify(sendCateringResend.error)}`
      }),
      {
        status: 500,
        statusText: `Internal Server Error: User- ${JSON.stringify(sendCateringResend.error)}`
      }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
