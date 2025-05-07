type AirCraft = {
    model: Models,
    year: number,
    isWorking: boolean,
    pilotsIds: string[]
    isRadarSystem?: boolean
    id?: string
}

enum Models {
    F22 = "F22",
    F35 = "F35",
    F16 = "F16"
}

const f22: AirCraft = { model: Models.F16, year: 2024, isWorking: true, pilotsIds: ["tomer111"] }

const f22FromDB: Required<AirCraft> = {
    isRadarSystem: true, id: "aaaaa", model: Models.F16,
    year: 2024, isWorking: true, pilotsIds: ["tomer111"]
}
type PartialA = Partial<AirCraft>
function addNewAircraft(a: Partial<AirCraft>) {

}


function searchAirCraft(data: AirCraft[], field: keyof Omit<AirCraft, "pilotsIds">, value: string | number) {
    const result = data.filter(item => item[field] === value)
}

searchAirCraft([], "year", 2024)

