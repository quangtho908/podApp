import React, { useRef, useState } from "react";
import { TouchableOpacity, Text, StyleSheet, Image, Modal, View } from "react-native";
import { TabBarIcon } from "../navigation/TabBarIcon";
import color from "@/styles/color";
import styleText from "@/styles/text";
import { pictonBlue, red, white } from "@/constants/Pallete";
import { CameraView, useCameraPermissions } from "expo-camera";
import _ from "lodash";
export default function ButtonCamera({onChange}: {onChange: (uri: string) => void}) {
  const [camState, setCamState] = useState(false)
  const [uri, setUri] = useState("")
  const [permission, requestPermission] = useCameraPermissions();
  const refCam = useRef<CameraView>(null)
  const openCam = async () => {
    if(!permission?.granted) {
      await requestPermission()
    }
    setCamState(permission?.granted || false)
  }

  const takePicture = async () => {
    const picture = await refCam.current?.takePictureAsync()
    setUri(picture?.uri || "")
    setCamState(false)
    onChange(picture?.uri || "")
  }
  return (
    <>
      <TouchableOpacity style={{...styles.action, backgroundColor: pictonBlue[800]}} onPress={openCam}>
        <TabBarIcon name="camera" color={white[50]}/>
        <Text style={{...styleText.text, ...color.textWhite50}}>Chụp hình</Text>
      </TouchableOpacity>
      {!_.isEmpty(uri) && <Image source={{uri}} width={350} height={600} />}
      <Modal visible={camState} style={styles.container} animationType="slide" >
        <CameraView ref={refCam} style={styles.camera} facing={"back"} active={camState} pictureSize="1280x720">
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={takePicture}>
              <TabBarIcon name="radio-button-on" size={70} color={white[50]} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeBtn} onPress={() => setCamState(false)}>
              <TabBarIcon name="backspace" size={30} color={red[400]} />
            </TouchableOpacity>
          </View>
        </CameraView>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5
  },
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    marginBottom: 50,
    alignItems: "flex-end",
    justifyContent: "center"
  },
  button: {
    justifyContent: "center"
  },
  closeBtn: {
    position: "absolute",
    right: 50,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  }
})