import { DINO_W, CACTUS_W } from './constants';

const FORGIVE = 8; // keep equal to collision.js
const OVERLAP_PX = (DINO_W - 2 * FORGIVE) + (CACTUS_W - FORGIVE); // distance the cactus travels while overlapping

export function jumpDuration(arenaW, secs) {
  const speed = arenaW / secs;               // px per second
  const overlapTime = OVERLAP_PX / speed;
  return Math.max(0.7, (overlapTime / 0.74) * 1.4); // 0.74 = share of the arc high enough to clear, 1.4 = safety margin
}




const CAP = 100; // limits above this don't add more time

export function timeFor(preset, score, upper) {
  const extra = preset.perTen * (Math.min(Math.max(upper, 10), CAP) - 10) / 10;
  const start = preset.start + extra;
  const min = preset.min + extra;
  const t = Math.min(score / preset.ramp, 1);
  return start - (start - min) * t;
}