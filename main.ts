
import { Json } from "./Json";
import { List } from "./List";


console.log("Test Sort");
console.log("######################################################");
List.testSort();
console.log("######################################################");
console.log("\nTest Buggy Sort");
console.log("######################################################");
List.testBuggySort();
console.log("######################################################");
console.log("\nTest Dummy Sort");
console.log("######################################################");
List.testDummySort();
console.log("######################################################");

console.log("\n\nTest JSON Stringify");
console.log("######################################################");
Json.testJsonStringify();
console.log("######################################################");
console.log("\nTest Custom JSON Stringify");
console.log("######################################################");
Json.testJsonMyStringify();
console.log("######################################################");