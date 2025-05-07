"use strict";
var Models;
(function (Models) {
    Models["F22"] = "F22";
    Models["F35"] = "F35";
    Models["F16"] = "F16";
})(Models || (Models = {}));
const f22 = { model: Models.F16, year: 2024, isWorking: true, pilotsIds: ["tomer111"] };
const f22FromDB = {
    isRadarSystem: true, id: "aaaaa", model: Models.F16,
    year: 2024, isWorking: true, pilotsIds: ["tomer111"]
};
function addNewAircraft(a) {
}
function searchAirCraft(data, field, value) {
    const result = data.filter(item => item[field] === value);
}
searchAirCraft([], "year", 2024);
