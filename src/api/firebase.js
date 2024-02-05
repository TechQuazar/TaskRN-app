import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import { utils } from "@react-native-firebase/app";

export const uploadToBucket = async (imageDetails) => {
  const reference = storage().ref(imageDetails.fileName);
  const pathToFile = `${utils.FilePath.PICTURES_DIRECTORY}/${imageDetails.fileName}`;
  let res = await reference.putFile(pathToFile);
  return res;
};
