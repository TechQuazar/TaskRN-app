import { View, Text } from "react-native";
import React from "react";
import { Alert, Divider, HStack, VStack } from "native-base";

const Submission = ({ variant, text }) => {
  const getTextColor = (variant) => {
    switch (variant) {
      case "left-accent":
      case "top-accent":
      case "subtle":
        return "coolGray.800";

      case "solid":
        return "warmGray.50";
    }
  };

  return (
    <>
      <Alert w="100%" variant={variant} colorScheme="success" status="success">
        <VStack space={2} flexShrink={1} w="100%">
          <HStack
            flexShrink={1}
            space={2}
            alignItems="center"
            justifyContent="space-between"
          >
            <HStack space={2} flexShrink={1} alignItems="center">
              <Alert.Icon />
              <Text color={getTextColor(variant)}>{text}</Text>
            </HStack>
          </HStack>
        </VStack>
      </Alert>
      <Divider mt="5" mb="2.5" />
    </>
  );
};

export default Submission;
