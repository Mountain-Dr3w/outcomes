/** Convert WGS84 decimal degrees using integer ticks to carry rounded seconds safely. */
export function formatCoordinate(value: number, latitude: boolean, format: "dms" | "ddm") {
  if (!Number.isFinite(value) || Math.abs(value) > (latitude ? 90 : 180)) throw new RangeError("Coordinate outside WGS84 latitude/longitude range");
  const negative = value < 0 || Object.is(value, -0);
  const hemisphere = latitude ? (negative ? "S" : "N") : (negative ? "W" : "E");
  const ticksPerDegree = format === "dms" ? 360000 : 60000;
  const ticks = Math.round(Math.abs(value) * ticksPerDegree);
  const degrees = Math.floor(ticks / ticksPerDegree);
  const rest = ticks % ticksPerDegree;
  if (format === "ddm") return `${degrees}° ${(rest / 1000).toFixed(3).padStart(6, "0")}′ ${hemisphere}`;
  const minutes = Math.floor(rest / 6000);
  const seconds = (rest % 6000) / 100;
  return `${degrees}° ${String(minutes).padStart(2,"0")}′ ${seconds.toFixed(2).padStart(5,"0")}″ ${hemisphere}`;
}

export function parseDecimalCoordinate(text: string, latitude: boolean): number | null {
  if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(text.trim())) return null;
  const value = Number(text);
  return Number.isFinite(value) && Math.abs(value) <= (latitude ? 90 : 180) ? value : null;
}
