'use client';
import { DEVICE, useDeviceType } from '@/hooks/customs/useDeviceType';
import DesktopHome from '@/features/home/desktop-home';
import TabletHome from '@/features/home/tablet-home';
const { MOBILE, TABLET, DESKTOP } = DEVICE;
const RenderHome = () => {
  const device = useDeviceType();
  switch (device) {
    case DESKTOP:
      return <DesktopHome />;
    case TABLET:
      return <TabletHome />;
    case MOBILE:
      return <div>으으</div>;
    default:
      return <DesktopHome />;
  }
};

export default RenderHome;
