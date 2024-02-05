// Import necessary components and libraries
import React, { useEffect, useState } from "react";
import { Container, Text, Button, Center, Box, Icon } from "native-base";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { setImage } from "../features/imageSlice";
import { setData } from "../features/imageDataSlice";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import { utils } from "@react-native-firebase/app";
import Submission from "../components/Submission";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const image = useSelector((state) => state.images.image);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [submission, setSubmission] = useState({
    status: false,
    text: "",
  });
  // console.log("NULL", undefined);
  // const [image, setImage] = useState(null);
  // console.log("HI");

  useEffect(() => {
    dispatch(setImage(null));
  }, []);

  // Function to handle image selection from gallery or camera
  // Function to handle fake server call
  const handleSubmit = async () => {
    if (image) {
      try {
        setDisableSubmit(true);
        const reference = storage().ref(image.fileName);
        let res = await reference.putFile(image.uri);
        console.log("Res obj", res);
        if (res.state === "success") {
          //call server
          setDisableSubmit(false);
          setSubmission({
            status: true,
            text: "Image stored successfully!",
          });
          setTimeout(() => {
            setSubmission({
              status: false,
              text: "",
            });
          }, 1500);

          console.log("Name of image:", res.metadata.name);
          let text = await axios.post(
            "https://taskrn-fastapi.onrender.com/api/v1/ocr",
            {
              imageName: res.metadata.name,
            }
          );
          console.log("Text from server", text.data);
          //create a dispatcher
          // dispatch(setData(text.data));
        }
      } catch (error) {
        setDisableSubmit(false);
        console.error("Error!:", error);
      }

      dispatch(setImage(null));
    }
  };

  const handleStorage = async () => {
    console.log("Storage Pressed");
    const options = {
      mediaType: "photo",
      selectionLimit: 1,
    };
    try {
      const res = await launchImageLibrary(options);
      if (res.errorCode) {
        throw res;
      }
      if (res.didCancel) {
        console.log("Cancel");
      }
      let result = res.assets[0];
      // setImage(result);
      dispatch(setImage(result));
      // console.log("Result:", result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCamera = async () => {
    console.log("Camera Pressed");
    const options = {
      mediaType: "photo",
      selectionLimit: 1,
    };
    try {
      const res = await launchCamera(options);
      if (res.errorCode) {
        throw res;
      }
      if (res.didCancel) {
        console.log("Cancel");
        return;
      }
      let result = res.assets[0];
      // setImage(result);
      dispatch(setImage(result));
      // console.log(result.fileName);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Center bg={"white"}>
      <Container
        height={"full"}
        width={"full"}
        centerContent
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {submission.status && (
          <Submission variant={"left-accent"} text={submission.text} />
        )}
        <Box
          alignItems={"center"}
          justifyContent={"center"}
          width={"full"}
          height={"50%"}
        >
          <Box
            marginY={10}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
          >
            <Button
              onPress={handleStorage}
              variant={"subtle"}
              marginY={3}
              leftIcon={<Icon as={Ionicons} name="folder-outline" size="sm" />}
            >
              Upload from storage
            </Button>
            <Button
              onPress={handleCamera}
              variant={"subtle"}
              marginY={3}
              leftIcon={<Icon as={Ionicons} name="camera-outline" size="sm" />}
            >
              Upload from camera
            </Button>
            {image !== null && (
              <Box>
                <Text textAlign={"center"} color={"blue.600"}>
                  * File selected
                </Text>
              </Box>
            )}
          </Box>
          <Box marginY={10}>
            <Button
              isLoading={disableSubmit}
              isLoadingText="Submitting"
              onPress={handleSubmit}
              // colorScheme={"secondary"}
              bgColor={"#EF5B5E"}
              leftIcon={
                <Icon as={Ionicons} name="cloud-upload-outline" size="2xl" />
              }
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </Center>
  );
};

export default HomeScreen;
