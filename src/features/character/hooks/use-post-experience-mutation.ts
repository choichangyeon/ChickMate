import { QUERY_KEY } from '@/constants/query-key';
import { patchCharacterExperience, PatchCharacterProps } from '@/features/character/api/client-services';
import { Character } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const { CHARACTER } = QUERY_KEY;

export const usePostExperienceMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ characterId, amount, history }: PatchCharacterProps) =>
      patchCharacterExperience({ characterId, amount, history }),
    onMutate: async ({ characterId, amount }) => {
      await queryClient.cancelQueries({ queryKey: [CHARACTER] });
      const previousCharacter = queryClient.getQueryData([CHARACTER]) as Character | undefined;
      queryClient.setQueryData([CHARACTER], (old: Character | undefined) => {
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
