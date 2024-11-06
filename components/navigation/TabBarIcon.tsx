// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import { pictonBlue } from '@/app/common/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';

export function TabBarIcon({ style, size, ...rest }: IconProps<ComponentProps<typeof Ionicons>['name']>) {
  return <Ionicons size={size || 28} style={[{ marginBottom: -3 }, style]} {...rest} color={pictonBlue[500]} />;
}
