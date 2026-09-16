export type VesselCandidate = { name: string; type: string; capacity: number; speed: number; fuelPerDay: number; dailyRate: number; availableInDays: number };
export type ShipmentInput = { tonnes: number; freightRate: number; bunkerPrice: number; portCostPerTonne: number; usdInr: number; deadlineDays: number; vessels: VesselCandidate[] };
export function optimizeShipment(input: ShipmentInput) {
  if (input.tonnes <= 0) throw new Error('Cargo quantity must be positive');
  const feasible = input.vessels.filter(v => v.capacity >= input.tonnes && v.availableInDays < input.deadlineDays);
  if (!feasible.length) throw new Error('No vessel satisfies capacity and deadline constraints');
  const scored = feasible.map(v => { const voyageDays=Math.ceil(input.tonnes/Math.max(1,v.speed*600)); const etaDays=v.availableInDays+voyageDays; const charter=etaDays*v.dailyRate; const fuel=voyageDays*v.fuelPerDay*input.bunkerPrice; const freight=input.tonnes*input.freightRate; const port=input.tonnes*input.portCostPerTonne; const totalUsd=charter+fuel+freight+port; return {vessel:v,etaDays,charterUsd:charter,fuelUsd:fuel,freightUsd:freight,portUsd:port,totalUsd}; });
  scored.sort((a,b)=>a.totalUsd-b.totalUsd); const best=scored[0]; return {...best,totalInr:best.totalUsd*input.usdInr,alternatives:scored.slice(1,4)};
}
