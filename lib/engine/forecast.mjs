export function forecastSeries(history, periods, seasonality = 0.02) {
  if (history.length < 2) throw new Error('At least two observations are required');
  if (periods < 1) return [];
  const window = Math.min(6, history.length); const level = history.slice(-window).reduce((a,b)=>a+b,0)/window;
  const changes = history.slice(1).map((v,i)=>v-history[i]); const trend=changes.slice(-window+1).reduce((a,b)=>a+b,0)/Math.max(1,Math.min(window-1,changes.length));
  const residuals=changes.map(d=>Math.abs(d-trend)); const volatility=residuals.reduce((a,b)=>a+b,0)/Math.max(1,residuals.length);
  return Array.from({length:periods},(_,i)=>{const step=i+1;const value=Math.max(0,Number((level+trend*step+level*seasonality*Math.sin(step/3*Math.PI)).toFixed(2)));const band=Math.max(volatility*1.65,value*0.05);return {period:`M+${step}`,value,low:Number(Math.max(0,value-band).toFixed(2)),high:Number((value+band).toFixed(2))};});
}
