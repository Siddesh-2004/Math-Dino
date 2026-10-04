import { DINO_LEFT, DINO_W, CACTUS_W, CACTUS_H } from './constants';

const FORGIVE = 8; // shrink hitboxes so near-misses feel fair

export function hits(cactusPos, arenaW, dinoY) {
  if (dinoY >= CACTUS_H - FORGIVE) return false; // high enough to clear it
  const dinoL = DINO_LEFT + FORGIVE;
  const dinoR = DINO_LEFT + DINO_W - FORGIVE;
  const cactusL = cactusPos * arenaW;
  const cactusR = cactusL + CACTUS_W - FORGIVE;
  return cactusL < dinoR && cactusR > dinoL;
}