import { CLANS_STRONGEST_FIRST } from './uniques';

export function getEnemyOrder(playerClan) {
  const index = CLANS_STRONGEST_FIRST.indexOf(playerClan);
  const afterPlayer = CLANS_STRONGEST_FIRST.slice(index + 1);
  const upToPlayer = CLANS_STRONGEST_FIRST.slice(0, index + 1);
  return [...afterPlayer, ...upToPlayer];
}