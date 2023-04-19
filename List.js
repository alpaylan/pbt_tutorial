"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = void 0;
var KelesCheck_1 = require("./KelesCheck");
// genList => TypeClasses.Gen<number[]>
// This is a generator for lists of numbers
// It generates a list of random length between 1 and 10
// and random elements between -1000 and 1000
var List;
(function (List) {
    var isSorted = function (list) {
        for (var i = 0; i < list.length - 1; i++) {
            if (list[i] > list[i + 1]) {
                return false;
            }
        }
        return true;
    };
    var sort = function (list) {
        var sorted = list.slice();
        sorted.sort(function (a, b) { return a - b; });
        return sorted;
    };
    var buggyQuickSort = function (arr, low, high) {
        if (low < high) {
            var pi = partition(arr, low, high);
            buggyQuickSort(arr, low, pi - 1);
            buggyQuickSort(arr, pi + 1, high - 1); // Bug: should be high
        }
    };
    var partition = function (arr, low, high) {
        var _a, _b;
        var pivot = arr[high];
        var i = low - 1;
        for (var j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                _a = [arr[j], arr[i]], arr[i] = _a[0], arr[j] = _a[1];
            }
        }
        _b = [arr[high], arr[i + 1]], arr[i + 1] = _b[0], arr[high] = _b[1];
        return i + 1;
    };
    var superDuperSort = function (list) {
        var sorted = list.slice();
        buggyQuickSort(sorted, 0, sorted.length - 1);
        return sorted;
    };
    var dummySort = function (list) {
        return [];
    };
    var propSort = function (list) {
        return isSorted(sort(list));
    };
    var propBuggySort = function (list) {
        return isSorted(superDuperSort(list));
    };
    var propDummySort = function (list) {
        return isSorted(dummySort(list));
    };
    List.testSort = function () {
        return KelesCheck_1.KelesCheck.quickCheck(propSort, KelesCheck_1.Generators.genList, KelesCheck_1.Shrinkers.shrinkNumberList, function (a, b) { return a.length < b.length; });
    };
    List.testBuggySort = function () {
        return KelesCheck_1.KelesCheck.quickCheck(propBuggySort, KelesCheck_1.Generators.genList, KelesCheck_1.Shrinkers.shrinkNumberList, function (a, b) { return a.length < b.length; });
    };
    List.testDummySort = function () {
        return KelesCheck_1.KelesCheck.quickCheck(propDummySort, KelesCheck_1.Generators.genList, KelesCheck_1.Shrinkers.shrinkNumberList, function (a, b) { return a.length < b.length; });
    };
})(List = exports.List || (exports.List = {}));
