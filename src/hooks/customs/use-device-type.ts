'use client';
import { useEffect, useLayoutEffect, useState } from 'react';

export const DEVICE = {
  MOBILE: 'mobile',
  TABLET: 'tablet',
  DESKTOP: 'desktop',
} as const;

const { MOBILE, TABLET, DESKTOP } = DEVICE;

type DeviceType = (typeof DEVICE)[keyof typeof DEVICE];
const TABLET_MAX = 1279;
const TABLET_MIN = 744;
const MOBILE_MAX = 743;

const getDeviceType = () => {
  if (typeof window === 'undefined') return null;
  const width = window.innerWidth;
  if (width <= MOBILE_MAX) return MOBILE;
  if (width <= TABLET_MAX && width >= TABLET_MIN) return TABLET;
  else return DESKTOP;
};

export const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState<DeviceType | null>(() => getDeviceType());

  useEffect(() => {
    const handleResize = () => setDeviceType(getDeviceType);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return deviceType;
};
