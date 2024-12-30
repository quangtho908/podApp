import { green, red } from '@/constants/Pallete';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

export default function ToastApp() {
  return (
    <Toast
      position='top'
      autoHide={true}
      config={{
        success: (props) => <BaseToast
          {...props}
          style={{ borderLeftColor: green[300]}}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          text1Style={{
            fontSize: 15,
            fontWeight: '600'
          }}
          text2Style={{
            fontSize: 13,
            color: "#000"
          }}
        />,
        error: (props) => <ErrorToast
          {...props}
          style={{ borderLeftColor: red[500]}}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          text1Style={{
            fontSize: 15,
            fontWeight: '600'
          }}
          text2Style={{
            fontSize: 13,
            color: "#000"
          }}
        />
      }}
    />
  )
}