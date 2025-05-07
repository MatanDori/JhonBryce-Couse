

type HasId = { id: number }
type HasTimestamp = { timestamp: Date }
type hasIceCream = { flavor: string, isDairy: boolean }

type logEntityInput =  HasId & HasTimestamp & hasIceCream
function logEntity(entity: logEntityInput): void {
    console.log(`Entity #${entity.id} was last updated at ${entity.timestamp} `);
}

logEntity({ id: 1, timestamp: new Date(), flavor: "mango", isDairy: true })