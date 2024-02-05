import { Ionicons } from "@expo/vector-icons";
import { HStack, Text } from "native-base";

const TabHeader = ({ name }) => {
  //   const navigation = useNavigation();
  return (
    <HStack
      backgroundColor={"white"}
      alignItems={"center"}
      px={4}
      py={3}
      borderBottomColor={"coolGray.200"}
      borderBottomStyle={"solid"}
      borderBottomWidth={2}
    >
      <HStack
        flexGrow={1}
        pl={3}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Text
          fontWeight={"semibold"}
          color={"#373737"}
          fontSize={"lg"}
          textAlign={"center"}
        >
          {name}
        </Text>
      </HStack>
    </HStack>
  );
};

export default TabHeader;

// const styles = StyleSheet.create({});
