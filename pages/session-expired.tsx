import { Box, H1, Text } from '@bigcommerce/big-design';

export default function SessionExpired() {
  return (
    <Box
      marginVertical="xxxLarge"
      padding="xxxLarge"
      backgroundColor="white"
      borderRadius="normal"
      shadow="floating"
    >
      <H1>Session Expired</H1>
      <Text marginTop="medium">
        Your session has expired. Please close this window and reopen the app from your BigCommerce dashboard.
      </Text>
    </Box>
  );
} 