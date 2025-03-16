import { Box, H1, Text } from '@bigcommerce/big-design';

export default function UpgradeSuccess() {
  return (
    <Box
      marginVertical="xxxLarge"
      padding="xxxLarge"
      backgroundColor="white"
      borderRadius="normal"
      shadow="floating"
    >
      <H1>Upgrade Successful!</H1>
      <Text marginTop="medium">
        Your subscription has been successfully upgraded. You can now close this window and return to using the app.
      </Text>
    </Box>
  );
} 