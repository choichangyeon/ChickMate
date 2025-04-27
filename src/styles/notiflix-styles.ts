'use client';

import { Confirm, Notify } from 'notiflix';

export const initNotiflix = () => {
  Confirm.init({
    className: 'notiflix-confirm',
    width: '386px',
    position: 'center', // 'right-top' - 'right-bottom' - 'left-top' - 'left-bottom' - 'center-top' - 'center-bottom' - 'center-center'
    distance: '10px',
    backgroundColor: '#ffffff',
    borderRadius: '30px',
    backOverlay: true,
    backOverlayColor: 'rgba(0,0,0,0.5)',
    rtl: false,
    fontFamily: 'SUIT Variable',
    cssAnimation: true,
    cssAnimationDuration: 300,
    cssAnimationStyle: 'fade',
    plainText: false,
    titleColor: '#E55A27',
    titleFontSize: '24px',
    titleMaxLength: 10,
    messageColor: '#111827',
    messageFontSize: '16px',
    messageMaxLength: 30,
    buttonsFontSize: '16px',
    buttonsMaxLength: 10,
    okButtonColor: '#ffffff',
    okButtonBackground: '#E55A27',
    cancelButtonColor: '#ffffff',
    cancelButtonBackground: '#D1D5DB',
  });

  Notify.init({
    width: '280px',
    position: 'right-top', // 'right-top' - 'right-bottom' - 'left-top' - 'left-bottom' - 'center-top' - 'center-bottom' - 'center-center'
    distance: '10px',
    opacity: 1,
    borderRadius: '10px',
    rtl: false,
    timeout: 2000,
    messageMaxLength: 100,
    backOverlay: false,
    backOverlayColor: 'rgba(0,0,0,0.5)',
    plainText: true,
    showOnlyTheLastOne: true,
    clickToClose: true,
    pauseOnHover: true,

    ID: 'NotiflixNotify',
    className: 'notiflix-notify',
    fontFamily: 'SUIT Variable',
    fontSize: '12px',
    cssAnimation: true,
    cssAnimationDuration: 400,
    cssAnimationStyle: 'fade', // 'fade' - 'zoom' - 'from-right' - 'from-top' - 'from-bottom' - 'from-left'
    closeButton: false,
    useIcon: true,
    useFontAwesome: false,
    fontAwesomeIconStyle: 'basic', // 'basic' - 'shadow'
    fontAwesomeIconSize: '34px',

    success: {
      background: '#374151',
      textColor: '#ffffff',
      childClassName: 'notiflix-notify-success',
      notiflixIconColor: '#D1D5DB',
      fontAwesomeClassName: 'fas fa-check-circle',
      fontAwesomeIconColor: '#D1D5DB',
      backOverlayColor: 'rgba(55, 65, 81, 0.6)',
    },

    failure: {
      background: '#E55A27',
      textColor: '#ffffff',
      childClassName: 'notiflix-notify-failure',
      notiflixIconColor: '#ffffff',
      fontAwesomeClassName: 'fas fa-times-circle',
      fontAwesomeIconColor: '#ffffff',
      backOverlayColor: 'rgba(194, 65, 12, 0.2)',
    },

    warning: {
      background: '#FBBF24',
      textColor: '#ffffff',
      childClassName: 'notiflix-notify-warning',
      notiflixIconColor: '#ffffff',
      fontAwesomeClassName: 'fas fa-exclamation-circle',
      fontAwesomeIconColor: '#ffffff',
      backOverlayColor: 'rgba(251, 191, 36, 0.2)',
    },

    info: {
      background: '#374151',
      textColor: '#ffffff',
      childClassName: 'notiflix-notify-info',
      notiflixIconColor: '#D1D5DB',
      fontAwesomeClassName: 'fas fa-info-circle',
      fontAwesomeIconColor: '#D1D5DB',
      backOverlayColor: 'rgba(55, 65, 81, 0.6)',
    },
  });
};
