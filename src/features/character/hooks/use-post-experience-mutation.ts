import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-key';
import { patchCharacterExperience, PatchCharacterProps } from '@/features/character/api/client-services';
import type { CharacterType } from '@/types/DTO/character-dto';

const { CHARACTER } = QUERY_KEY;

export const usePostExperienceMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ characterId, amount, history }: PatchCharacterProps) =>
      patchCharacterExperience({ characterId, amount, history }),
    onMutate: async ({ characterId, amount }) => {
      await queryClient.cancelQueries({ queryKey: [CHARACTER] });
      const previousCharacter = queryClient.getQueryData([CHARACTER]) as CharacterType | undefined;
      queryClient.setQueryData([CHARACTER], (old: CharacterType | undefined) => {
        if (!old) return old;
        return {
          ...old,
          experience: old.experience + amount,
        };
      });
      return { previousCharacter };
    },
    onError: (err, characterId, context) => {
      if (context) {
        queryClient.setQueryData([CHARACTER], context.previousCharacter);
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [CHARACTER] }),
  });
};
