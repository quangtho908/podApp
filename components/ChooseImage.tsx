import { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { TabBarIcon } from "./navigation/TabBarIcon";
import { pictonBlue, red, white } from "@/constants/Pallete";
import * as _ from "lodash";
export default function ChooseIamge({onChange, initFile} : {onChange?: (uri: string) => void, initFile?: string}) {
  const [file, setFile] = useState("");
  const [haveInitFile, setHaveInitFile] = useState(!_.isEmpty(initFile))
  const [error, setError] = useState(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.
        requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
        Alert.alert(
            "Permission Denied",
            `Sorry, we need camera 
              roll permission to upload images.`
        );
    } else {

      const result = await ImagePicker.launchImageLibraryAsync({allowsMultipleSelection: false});
      if (!result.canceled) {
          setFile(result.assets[0].uri)
          !_.isNil(onChange) && onChange(result.assets[0].uri)
          setError(null);
      }
    }
  };

  const removeImage = () => {
    setHaveInitFile(false)
    setFile("")
    !_.isNil(onChange) && onChange("delete")
  }
  return (
    <View style={styles.container}>
      <Text style={styles.header}>
          Chọn hình ảnh
      </Text>
      {!_.isEmpty(file) ? (
          <View style={styles.imageContainer}>
              <Image source={{ uri: file }}
                  style={styles.image} />
          </View>
      ) : (
        <View>
          <Text style={styles.errorText}>{error}</Text>
          <View style={styles.imageContainer}>
            {
              haveInitFile
              ? <Image source={{uri: `${process.env.EXPO_PUBLIC_SERVER_HOST}/${initFile}`}} style={styles.image} />
              : <Image source={require('@/assets/images/upload-placeholder.jpg')} style={styles.image} />
            }
          </View>
        </View>
          
      )}
      <View style={{flexDirection: "row", gap: 10}}>
        <TouchableOpacity style={{...styles.button, backgroundColor: red[700]}} onPress={removeImage}>
          <TabBarIcon name='trash' color={white[50]} />
          <Text style={styles.buttonText}>
              Xoá
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <TabBarIcon name='cloud-upload' color={white[50]} />
            <Text style={styles.buttonText}>
                Tải ảnh lên
            </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      justifyContent: "center",
  },
  header: {
      fontSize: 20,
      marginBottom: 16,
  },
  button: {
      backgroundColor: pictonBlue[500],
      padding: 10,
      borderRadius: 8,
      marginBottom: 16,
      shadowColor: white[800],
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.4,
      shadowRadius: 4,
      elevation: 5,
      alignSelf: 'flex-start',
      flexDirection: 'row',
      alignContent: 'center',
      gap: 10,
      alignItems: "center"
  },
  buttonText: {
      color: white[50],
      fontSize: 16,
      fontWeight: "bold",
  },
  imageContainer: {
      borderRadius: 8,
      marginBottom: 16,
  },
  image: {
      width: 100,
      height: 100,
      borderRadius: 8,
  },
  errorText: {
      color: red[500],
      marginBottom: 5
  },
});