'use client';
import { DEVICE, useDeviceType } from '@/hooks/customs/use-device-type';
import DesktopHome from '@/features/home/desktop-home';
import TabletHome from '@/features/home/tablet-home';
import MobileHome from './mobile-home';
import LoadingAnimation from '@/components/common/loading-animation';
import { useEffect, useState } from 'react';
const { MOBILE, TABLET, DESKTOP } = DEVICE;
const RenderHome = () => {
  const [isMounted, setIsMounted] = useState(false);
  const device = useDeviceType();
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <></>;

  switch (device) {
    case DESKTOP:
      return <DesktopHome />;
    case TABLET:
      return <TabletHome />;
    case MOBILE:
      return <MobileHome />;
    default:
      return <DesktopHome />;
  }
};

export default RenderHome;
