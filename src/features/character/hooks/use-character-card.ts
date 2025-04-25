'use client';

import { Session } from 'next-auth';
import { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Notify } from 'notiflix';
import { useModalStore } from '@/store/use-modal-store';
import { CHARACTER_INFORMATION } from '@/constants/character-constants';
import { MODAL_ID } from '@/constants/modal-id-constants';
import { PATH } from '@/constants/path-constant';
import { getLevelAndPercentage } from '@/features/character/utils/get-level-and-percentage';
import { defaultCharacter } from '@/features/character/data/character-data';
import { launchConfettiFireworks } from '@/utils/launch-confetti-fireworks';
import type { CharacterType } from '@/types/DTO/character-dto';

type Props = {
  characterData?: CharacterType;
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
  const currentPath = usePathname();

  const isDefault = characterData === defaultCharacter && !!overlayText;
  const { type, experience } = characterData;
  const { level, percent, remainingExp } = getLevelAndPercentage(experience);
  const prevLevelRef = useRef<number | null>(level);
  const characterName = CHARACTER_INFORMATION[type][level].name;

  const handleClickCard = () => {
    if (!session) {
      router.push(PATH.AUTH.SIGN_IN_WITH_PREV_URL(currentPath));
    } else if (requiredModal) {
      toggleModal(CHARACTER_CREATE);
    } else if (!isDefault) {
      toggleModal(CHARACTER_DETAIL);
    }
  };

  useEffect(() => {
    if (prevLevelRef.current !== null && level > prevLevelRef.current) {
      launchConfettiFireworks();
      Notify.info(`레벨 ${level} 달성`);
    }
    prevLevelRef.current = level;
  }, [level]);

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
