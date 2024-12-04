import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { TouchableOpacity } from 'react-native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  const router = useRouter();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
      <ThemeProvider value={DefaultTheme}>
        <Stack>
          <Stack.Screen name="login" options={{headerShown: false}} />
          <Stack.Screen name='pin' options={{headerShown: false}} />
          <Stack.Screen name='signup' options={{headerShown: false}} />
          <Stack.Screen name='setPassword' options={{headerTitle: "Thiết lập Mật Khẩu"}} />
          <Stack.Screen name="(drawer)" options={{ headerShown: false }}/>
          <Stack.Screen name='payment' />
          <Stack.Screen 
            name='selectBank'
            options={{
              headerTitle: 'Quay lại',
              headerRight: () => (
              <TouchableOpacity onPress={() => router.push('/payment')}>
                <TabBarIcon name='add' />
              </TouchableOpacity>
            )}}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
  );
}
