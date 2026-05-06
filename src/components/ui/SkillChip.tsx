import type { Skill } from '@/types';
import { Chip } from '@/components/common/Chip';

interface SkillChipProps {
  skill: Skill;
}

export function SkillChip({ skill }: SkillChipProps) {
  return <Chip label={skill.name} />;
}
