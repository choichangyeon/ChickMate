import { useCharacterStore } from '@/store/use-character-store';
import { usePostExperienceMutation } from '@/features/character/hooks/use-post-experience-mutation';
import { CHARACTER_HISTORY, CHARACTER_HISTORY_KEY } from '@/constants/character-constants';

export const useExperienceUp = () => {
  const characterId = useCharacterStore((state) => state.characterId);
  const { mutate: expUpdateMutation } = usePostExperienceMutation();

  const handleExperienceUp = (history: keyof typeof CHARACTER_HISTORY_KEY) => {
    if (characterId === null) return;

    const { amount } = CHARACTER_HISTORY[history];
    expUpdateMutation({ characterId, amount, history });
  };

  return { handleExperienceUp };
};
