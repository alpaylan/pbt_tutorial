"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Json = void 0;
var KelesCheck_1 = require("./KelesCheck");
var Json;
(function (Json) {
    Json.generateJsonArray = function (size) { return function () {
        var log = Math.log(size);
        var rest = Math.floor(size / log);
        var length = Math.floor(Math.random() * log);
        var arr = [];
        for (var i = 0; i < length; i++) {
            arr.push(Json.generateJson(rest));
        }
        return arr;
    }; };
    Json.generateJsonObject = function (size) { return function () {
        var log = Math.log(size);
        var rest = Math.floor(size / log);
        var obj = {};
        for (var i = 0; i < log; i++) {
            obj[KelesCheck_1.Generators.generateString()] = Json.generateJson(rest);
        }
        return obj;
    }; };
    Json.generateJson = function (size) {
        return KelesCheck_1.GenBuilders.freqOf([
            [KelesCheck_1.Generators.generateString, 1],
            [KelesCheck_1.Generators.generateNumber, 1],
            [KelesCheck_1.Generators.generateBoolean, 1],
            [KelesCheck_1.Generators.generateNull, 1],
            // [Generators.generateUndefined as JsonGenerator, 1],
            [Json.generateJsonArray(size), size - 1],
            [Json.generateJsonObject(size), size - 1],
        ])();
    };
    Json.genJson = function () {
        return Json.generateJson(5);
    };
    var json_stringify = function (obj) {
        if (typeof obj == 'undefined') {
            return 'undefined';
        }
        if (obj == null) {
            return "null";
        }
        else if (Array.isArray(obj)) {
            return "[" + obj.map(json_stringify).join(",") + "]";
        }
        else {
            var typ = typeof obj;
            switch (typ) {
                case "string":
                    return '"' + obj + '"';
                case "number":
                case "boolean":
                    return obj.toString();
                case "object":
                    return "{" + Object.keys(obj).map(function (k) { return '"' + k + '":' + json_stringify(obj[k]); }).join(",") + "}";
                default:
                    throw new Error("Unknown type: " + typ);
            }
        }
    };
    Json.propJsonStringify = function (json) {
        return JSON.stringify(JSON.parse(JSON.stringify(json))) === JSON.stringify(json);
    };
    Json.propJsonMyStringify = function (json) {
        return (json_stringify(json) === JSON.stringify(json));
    };
    Json.testJsonStringify = function () {
        return KelesCheck_1.KelesCheck.quickCheck(Json.propJsonStringify, Json.genJson, KelesCheck_1.Shrinkers.id, function (a, b) { return false; });
    };
    Json.testJsonMyStringify = function () {
        return KelesCheck_1.KelesCheck.quickCheck(Json.propJsonMyStringify, Json.genJson, KelesCheck_1.Shrinkers.id, function (a, b) { return false; });
    };
})(Json = exports.Json || (exports.Json = {}));
