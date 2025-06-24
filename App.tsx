import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from './src/context/ThemeContext';
import RootNavigator from './src/navigation/RootNavigator';
import {BaseToast, ErrorToast} from 'react-native-toast-message';
import Toast from 'react-native-toast-message';

const toastConfig = {
  success: props => (
    <BaseToast
      {...props}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{borderLeftColor: 'green'}}
      // eslint-disable-next-line react-native/no-inline-styles
      text1Style={{fontSize: 16, fontWeight: '600'}}
      // eslint-disable-next-line react-native/no-inline-styles
      text2Style={{fontSize: 14}}
    />
  ),
  error: props => (
    <ErrorToast
      {...props}
      // eslint-disable-next-line react-native/no-inline-styles
      text1Style={{fontSize: 16, fontWeight: '600'}}
      // eslint-disable-next-line react-native/no-inline-styles
      text2Style={{fontSize: 14}}
    />
  ),
};

const App = () => {
  return (
    <PaperProvider>
      <ThemeProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
        <Toast config={toastConfig} />
      </ThemeProvider>
    </PaperProvider>
  );
};

export default App;
