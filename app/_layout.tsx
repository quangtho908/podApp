import merchantService from '@/service/merchant/merchantStore';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import * as _ from 'lodash';
import { useEffect} from 'react';
import { AppState } from 'react-native';
import 'react-native-reanimated';
import AsyncStorage from "@react-native-async-storage/async-storage"
import Spinner from '@/components/common/Spinner';
import useSpinner from '@/service/spinner';
import ToastApp from '@/components/common/Toast';
import authService from '@/service/auth/authStore';

SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const {setCurrentMerchant} = merchantService();
  const {visible: visibleSpinner} = useSpinner();
  const setup = async () => {
    const cacheMerchant = await AsyncStorage.getItem("currentMerchant")
    if(_.toNumber(cacheMerchant)){
      setCurrentMerchant(_.toNumber(cacheMerchant))
    }
  }

  useEffect(() => {
    setup()
    const appState = AppState.addEventListener("change", (state) => {
      AsyncStorage.removeItem("verify_pin")
    })
    return () => appState.remove();
  }, [])

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
        <Stack initialRouteName='index'>
          <Stack.Screen name="index" options={{headerShown: false}} />
          <Stack.Screen name='signup' options={{headerShown: false}} />
          <Stack.Screen name='staff' options={{headerShown: false}} />
          <Stack.Screen name="payments" options={{headerShown: false}} />
          <Stack.Screen name="orders" options={{headerShown: false}} />
          <Stack.Screen name='pin' options={{headerShown: false}} />
          <Stack.Screen name="merchant" options={{ headerShown: false }}/>
          <Stack.Screen name="products" options={{ headerShown: false }}/>
          <Stack.Screen name="(drawer)" options={{ headerShown: false }}/>
          <Stack.Screen name="orderPayments" options={{ headerShown: false }}/>
          <Stack.Screen name="notification" options={{ headerShown: false }}/>
          <Stack.Screen name="changePassword" options={{ headerShown: false }}/>
          <Stack.Screen name="+not-found" />
        </Stack>
      {visibleSpinner && <Spinner />} 
      <ToastApp />
      </ThemeProvider>
  );
}
