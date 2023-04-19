

import { TypeClasses, Generators, Shrinkers, KelesCheck } from "./KelesCheck";
// genList => TypeClasses.Gen<number[]>
// This is a generator for lists of numbers
// It generates a list of random length between 1 and 10
// and random elements between -1000 and 1000

export module List {
    const isSorted: (list: number[]) => boolean = (list: number[]) => {
        for (let i = 0; i < list.length - 1; i++) {
            if (list[i] > list[i + 1]) {
                return false;
            }
        }
        return true;
    }

    const sort = (list: number[]) => {
        let sorted = list.slice();
        sorted.sort((a, b) => a - b);
        return sorted;
    }

    const buggyQuickSort = (arr: number[], low: number, high: number) => {
        if (low < high) {
            let pi = partition(arr, low, high);

            buggyQuickSort(arr, low, pi - 1);
            buggyQuickSort(arr, pi + 1, high - 1); // Bug: should be high
        }
    }

    const partition = (arr: number[], low: number, high: number) => {
        let pivot = arr[high];
        let i = low - 1;

        for (let j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
        }

        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        return i + 1;
    }

    const superDuperSort = (list: number[]) => {
        let sorted = list.slice();
        buggyQuickSort(sorted, 0, sorted.length - 1);
        return sorted;
    }

    const dummySort = (list: number[]) => {
        return [];
    }


    const propSort = (list: number[]) => {
        return isSorted(sort(list));
    }

    const propBuggySort = (list: number[]) => {
        return isSorted(superDuperSort(list));
    }

    const propDummySort = (list: number[]) => {
        return isSorted(dummySort(list));
    }

    export const testSort = () => {
        return KelesCheck.quickCheck(propSort, Generators.genList, Shrinkers.shrinkNumberList, (a: number[], b: number[]) => a.length < b.length);
    }

    export const testBuggySort = () => {
        return KelesCheck.quickCheck(propBuggySort, Generators.genList, Shrinkers.shrinkNumberList, (a: number[], b: number[]) => a.length < b.length);
    }

    export const testDummySort = () => {
        return KelesCheck.quickCheck(propDummySort, Generators.genList, Shrinkers.shrinkNumberList, (a: number[], b: number[]) => a.length < b.length);
    }

}