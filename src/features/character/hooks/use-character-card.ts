'use client';

import { useRouter } from 'next/navigation';
import { useModalStore } from '@/store/use-modal-store';
import { getLevelAndPercentage } from '@/features/character/utils/get-level-and-percent';
import { CHARACTER_INFORMATION } from '@/constants/character-constants';
import { PATH } from '@/constants/path-constant';
import { defaultCharacter } from '@/features/character/data/character-data';
import { Session } from 'next-auth';
import { Character } from '@prisma/client';
import { MODAL_ID } from '@/constants/modal-id-constants';

type Props = {
  characterData?: Character;
  overlayText?: string;
  requiredModal?: boolean;
  session?: Session;
};

const { CHARACTER_CREATE, CHARACTER_DETAIL } = MODAL_ID;

export const useCharacterCard = ({
  characterData = defaultCharacter,
  overlayText,
  requiredModal = false,
  session,
}: Props) => {
  const toggleModal = useModalStore((state) => state.toggleModal);
  const isCreateModalOpen = useModalStore((state) => state.getIsModalOpen(CHARACTER_CREATE));
  const isDetailModalOpen = useModalStore((state) => state.getIsModalOpen(CHARACTER_DETAIL));

  const router = useRouter();

  const isDefault = characterData === defaultCharacter && !!overlayText;
  const { type, experience } = characterData;
  const { level, percent, remainingExp } = getLevelAndPercentage(experience);
  const characterName = CHARACTER_INFORMATION[type][level].name;

  const handleClickCard = () => {
    if (!session) {
      router.push(PATH.AUTH.SIGN_IN);
    } else if (requiredModal) {
      toggleModal(CHARACTER_CREATE);
    } else if (!isDefault) {
      toggleModal(CHARACTER_DETAIL);
    }
  };

  return {
    toggleModal,
    isCreateModalOpen,
    isDetailModalOpen,
    isDefault,
    type,
    level,
    remainingExp,
    percent,
    characterName,
    handleClickCard,
  };
};
