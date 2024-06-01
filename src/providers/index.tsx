import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { mergeStore } from '@/redux/store';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '@/hooks';

const { store, persistor } = mergeStore();

type Props = {
  children: React.ReactNode;
};

export default function Providers({ children }: Readonly<Props>) {
  const { theme } = useTheme();

  return (
    <SafeAreaProvider>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <GestureHandlerRootView className="flex-1">
            <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
            <BottomSheetModalProvider>{children}</BottomSheetModalProvider>
          </GestureHandlerRootView>
        </PersistGate>
      </ReduxProvider>
    </SafeAreaProvider>
  );
}
