import { useRouter } from 'next/navigation';
import { useModalStore } from '@/store/use-modal-store';
import { getLevelAndPercentage } from '@/features/character/utils/get-level-and-percent';
import { CHARACTER_INFOMATIONS } from '@/constants/character-constants';
import { PATH } from '@/constants/path-constant';
import { defaultCharacter } from '@/features/character/data/character-data';
import { Session } from 'next-auth';
import { Character } from '@prisma/client';

type Props = {
  characterData?: Character;
  overlayText?: string;
  requiredModal?: boolean;
  session?: Session;
};

export const useCharacterCard = ({
  characterData = defaultCharacter,
  overlayText,
  requiredModal = false,
  session,
}: Props) => {
  const { isModalOpen, toggleModal } = useModalStore();
  const router = useRouter();

  const isDefault = characterData === defaultCharacter && !!overlayText;
  const { type, experience } = characterData;
  const { level, percent } = getLevelAndPercentage(experience);
  const characterName = CHARACTER_INFOMATIONS[type][level].name;

  const handleClickCard = () => {
    if (!session) {
      router.push(PATH.AUTH.SIGN_IN);
    } else if (requiredModal) {
      toggleModal();
    } else if (!isDefault) {
      // 캐릭터 상세 모달 toggle
    }
  };

  return {
    isModalOpen,
    toggleModal,
    isDefault,
    type,
    level,
    percent,
    characterName,
    handleClickCard,
  };
};
