import cache from '@/service/cache';
import merchantService from '@/service/merchant/merchantStore';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useNavigation, usePathname, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import * as _ from 'lodash';
import { useEffect } from 'react';
import 'react-native-reanimated';

SplashScreen.preventAutoHideAsync();
export default function RootLayout() {

  const pathname = usePathname();
  const router = useRouter();
  const publicRouter = [/login/, /signup/]
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const {setCurrentMerchant} = merchantService();

  const checkLogin = async () => {
    const token = await cache.get("token")
    if((_.isNil(token) || _.isEmpty(token)) && !publicRouter.some(rx => rx.test(pathname))) {
      router.push('/')
      cache.clearAll();
      return
    }
    const cacheMerchant = await cache.get("currentMerchant")
    if(_.toNumber(cacheMerchant)){
      setCurrentMerchant(_.toNumber(cacheMerchant))
    }
  }

  useEffect(() => {
    checkLogin()
  }, [pathname])

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
          <Stack.Screen name="index" options={{headerShown: false}} />
          <Stack.Screen name='signup' options={{headerShown: false}} />
          <Stack.Screen name="payments" options={{headerShown: false}} />
          <Stack.Screen name="orders" options={{headerShown: false}} />
          <Stack.Screen name='pin' options={{headerShown: false}} />
          <Stack.Screen name="merchant" options={{ headerShown: false }}/>
          <Stack.Screen name="products" options={{ headerShown: false }}/>
          <Stack.Screen name="(drawer)" options={{ headerShown: false }}/>
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
  );
}
