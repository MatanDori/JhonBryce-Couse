"use strict";
function logEntity(entity) {
    console.log(`Entity #${entity.id} was last updated at ${entity.timestamp} `);
}
logEntity({ id: 1, timestamp: new Date(), flavor: "mango", isDairy: true });
