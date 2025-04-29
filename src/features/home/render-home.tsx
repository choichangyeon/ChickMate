'use client';
import { DEVICE, useDeviceType } from '@/hooks/customs/useDeviceType';
import DesktopHome from '@/features/home/desktop-home';
import TabletHome from '@/features/home/tablet-home';
import MobileHome from './mobile-home';
const { MOBILE, TABLET, DESKTOP } = DEVICE;
const RenderHome = () => {
  const device = useDeviceType();
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
