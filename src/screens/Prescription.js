import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Center,
  Container,
  Divider,
  VStack,
  Spinner,
  Heading,
  FlatList,
} from "native-base";
import { Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { firebase, database } from "@react-native-firebase/database";
import { setData } from "../features/imageDataSlice";
import { useFocusEffect } from "@react-navigation/native";

const Prescription = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  let data = useSelector((state) => state.imageData.data);

  const db = firebase
    .app()
    .database("https://task-rn-fd3f2-default-rtdb.firebaseio.com/");

  useEffect(() => {
    // console.log("Use effect running");
    setIsLoading(true);
    console.log("Inside UseEffect, isloading is true");
    // fetch the data once, when the screen is loaded (does not run when focused)
    db.ref(`/prescription/`).once("value", (snapshot) => {
      console.log("User data: ", snapshot.val());
      let rtdata = snapshot.val(); // is an object
      let dispatchData = Object.keys(rtdata).map((id) => ({
        id,
        ...rtdata[id],
      }));
      dispatch(setData(dispatchData));
    });

    setIsLoading(false);
    console.log("Inside UseEffect, isloading is false");
  }, []);

  const onRefresh = () => {
    setIsFetching(true);
    // Fetch Data from API
    console.log("Fetch Data from API");
    db.ref(`/prescription/`).once("value", (snapshot) => {
      console.log("User data: ", snapshot.val());
      let rtdata = snapshot.val(); // is an object
      let dispatchData = Object.keys(rtdata).map((id) => ({
        id,
        ...rtdata[id],
      }));
      // could check if old data is the same as new, prevent 1 extra dispatch
      dispatch(setData(dispatchData));
    });

    // dispatch(
    //   setData([
    //     {
    //       doctor: "Eric Foreman",
    //       patient: "Remy Hadly",
    //       medicine: [
    //         { name: "C32-AS", dose: "1 per week", totalDose: 4 },
    //         { name: "RedV", dose: "1 per day", totalDose: 7 },
    //       ],
    //     },
    //     {
    //       doctor: "Eric Foreman",
    //       patient: "Remy Hadly",
    //       medicine: [
    //         { name: "C32-AS", dose: "1 per week", totalDose: 4 },
    //         { name: "RedV", dose: "1 per day", totalDose: 7 },
    //       ],
    //     },
    //   ])
    // );

    setIsFetching(false);
  };

  function CAP(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <Center bg={"white"}>
      <Box
        height={"full"}
        width={"100%"}
        centerContent
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {isLoading ? (
          <Box
            alignItems={"center"}
            justifyContent={"center"}
            width={"100%"}
            height={"100%"}
            marginTop={10}
          >
            <Spinner
              size={"lg"}
              color="indigo.500"
              accessibilityLabel="Loading prescriptions"
            />
          </Box>
        ) : (
          <Box
            alignItems={"center"}
            justifyContent={"center"}
            width={"100%"}
            height={"100%"}
          >
            {/* If data is not present, render a "Empty data page" */}

            <FlatList
              onRefresh={onRefresh}
              width={"100%"}
              _contentContainerStyle={{
                alignItems: "center",
                paddingTop: 5,
              }}
              refreshing={isFetching}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <Box
                  alignItems={"center"}
                  justifyContent={"center"}
                  width={"100%"}
                  height={"100%"}
                  marginTop={10}
                >
                  <Spinner
                    size={"lg"}
                    color="indigo.500"
                    accessibilityLabel="Loading prescriptions"
                  />
                </Box>
              }
              // width={"full"}
              data={data}
              renderItem={({ item }) => {
                return (
                  <Box
                    marginBottom={"2"}
                    border="1"
                    width={"90%"}
                    borderRadius={"lg"}
                    shadow={"1"}
                    style={{
                      elevation: 8, // For Android
                      shadowColor: "#000",
                      shadowOffset: { width: 5, height: 6 },
                      shadowOpacity: 0.55,
                      shadowRadius: 5,
                      backgroundColor: "white",
                    }}
                  >
                    <VStack space="0" divider={<Divider />}>
                      <Box px="2" py="2" my="2" textAlign={"center"}>
                        <Box
                          display={"flex"}
                          flexDir={"row"}
                          justifyContent={"space-between"}
                          paddingX={2}
                        >
                          <Box>
                            <Text style={{ fontWeight: "bold" }}>
                              Dr. {item.doctor}, M.D.
                            </Text>
                          </Box>
                          <Box>
                            <Text>{new Date().toLocaleDateString()}</Text>
                          </Box>
                        </Box>
                        <Box display={"flex"} flexDir={"row"} paddingX={2}>
                          <Box>
                            <Text style={{ fontStyle: "italic" }}>
                              Prescription for{" "}
                            </Text>
                          </Box>
                          <Box>
                            <Text>{item.patient}</Text>
                          </Box>
                        </Box>
                      </Box>
                      <Box px="2" py="2" bg={"light.100"}>
                        <FlatList
                          ListHeaderComponent={() => (
                            <Box ml={2} mb={1}>
                              <Text style={{ fontWeight: "bold" }}>
                                Medicine
                              </Text>
                            </Box>
                          )}
                          data={item.medicine}
                          renderItem={(med) => {
                            return (
                              <Box
                                display={"flex"}
                                flexDir={"row"}
                                justifyContent={"space-between"}
                                paddingX={2}
                                mb={1}
                              >
                                <Box>
                                  <Text bold>
                                    {CAP(med.item.name)}
                                    {"   "}X {med.item.totaldose}
                                  </Text>
                                </Box>
                                <Box></Box>
                                <Box>
                                  <Text>{med.item.dose}</Text>
                                </Box>
                              </Box>
                            );
                          }}
                        />
                      </Box>
                      <Box px="2" py="2" mt="1" mb="2" textAlign={"center"}>
                        <Box
                          display={"flex"}
                          flexDir={"row"}
                          justifyContent={"space-between"}
                          paddingX={2}
                        >
                          <Box display={"flex"} flexDir={"column"}>
                            <Text style={{ fontWeight: "bold" }}>Notes</Text>
                            <Text
                              style={{
                                fontStyle: "italic",
                              }}
                            >
                              Headaches are normal. If unbearable, take one
                              Crocine after eating.
                            </Text>
                          </Box>
                        </Box>
                      </Box>
                    </VStack>
                  </Box>
                );
              }}
            />
          </Box>
        )}
      </Box>
    </Center>
  );
};

export default Prescription;
