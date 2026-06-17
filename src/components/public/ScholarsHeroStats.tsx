import { PublicStatStrip } from './PublicStatStrip'
import type { PublicStatSeed } from '../../data/public/pageTypes'

type ScholarsHeroStatsProps = {
  stats: PublicStatSeed[]
}

export function ScholarsHeroStats({ stats }: ScholarsHeroStatsProps) {
  return <PublicStatStrip className="scholars-stat-strip" items={stats} />
}
