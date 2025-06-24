// import Toast from 'react-native-toast-message';

// export const showToast = (
// p0: string, p1: string, type: 'success' | 'error' | 'info', p2: { newArea: Area; "": any; }, title: string, message: string, position: 'top' | 'bottom' | 'center' = 'top') => {
//   Toast.show({
//     type,
//     text1: title,
//     text2: message,
//     position,
//     visibilityTime: 3000,
//     autoHide: true,
//     topOffset: 60,
//     bottomOffset: 40,
//   });
// };

import Toast from 'react-native-toast-message';

export const showToast = (
  type: 'success' | 'error' | 'info',
  title: string,
  message: string,
  position: 'top' | 'bottom' | 'center' = 'top',
) => {
  Toast.show({
    type,
    text1: title,
    text2: message,
    position,
    visibilityTime: 3000,
    autoHide: true,
    topOffset: 60,
    bottomOffset: 40,
  });
};
