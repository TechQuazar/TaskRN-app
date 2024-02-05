import React from "react";
import { Button, Icon, Stack } from "native-base";

const UploadButton = () => {
  return (
    <Stack
      direction={{
        base: "column",
        md: "row",
      }}
      space={4}
    >
      <Button
        leftIcon={<Icon as={Ionicons} name="cloud-upload-outline" size="sm" />}
      >
        Upload
      </Button>
      <Button
        variant="subtle"
        endIcon={<Icon as={Ionicons} name="cloud-download-outline" size="sm" />}
      >
        Download
      </Button>
    </Stack>
  );
};

export default UploadButton;
