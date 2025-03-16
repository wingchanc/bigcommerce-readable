import { Box, Flex, H1, H2, H3, Panel, Switch, Text, Button } from "@bigcommerce/big-design";
import { CheckCircleIcon, LanguageIcon, SettingsIcon, VisibilityIcon } from "@bigcommerce/big-design-icons";
import ErrorMessage from "../components/error";
import Loading from "../components/loading";
import { useScripts } from "../lib/hooks";
import { useSession } from "../context/session";
import { ChangeEvent, useState } from "react";

const Index = () => {
  const { error, isLoading, scripts, toggleScript } = useScripts();
  const { context } = useSession();
  const [isUpgrading, setIsUpgrading] = useState(false);

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;

  // Find the Readable script if it exists
  const readableScript = scripts?.find(script => script.name === "Readable");

  const handleToggle = async (event: ChangeEvent<HTMLInputElement>) => {
    await toggleScript(readableScript?.uuid, event.target.checked);
  };

  const handleUpgrade = async () => {
    try {
      setIsUpgrading(true);
      const response = await fetch(`/api/upgrade?context=${context}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      
      if (data.errors) {
        throw new Error(data.errors[0].message);
      }

      // Redirect to the checkout URL
      const checkoutUrl = data.data.checkout.createCheckout.checkout.checkoutUrl;
      if (checkoutUrl) {
        window.open(checkoutUrl, '_blank');
      }
    } catch (error) {
      console.error('Upgrade failed:', error);
      // You might want to show an error message to the user here
    } finally {
      setIsUpgrading(false);
    }
  };

  const iconProps = {
    size: "large",
    color: "primary60"
  };

  return (
    <Box marginHorizontal="xxxLarge">
      {/* Hero Section */}
      <Box marginVertical="xxxLarge" marginBottom="xxLarge">
        <Box marginBottom="large">
          <Flex justifyContent="center">
            <H1>Welcome to Readable</H1>
          </Flex>
          <Flex justifyContent="center">
            <Text color="secondary">
              Enhance web accessibility and create an inclusive reading experience for everyone
            </Text>
          </Flex>
        </Box>

        {/* Enable Toggle Section */}
        <Box marginTop="large">
          <Panel>
            <Flex justifyContent="space-between" alignItems="center">
              <H3>Enable on storefront</H3>
              <Switch
                checked={readableScript?.enabled ?? false}
                onChange={handleToggle}
              />
            </Flex>
          </Panel>
        </Box>

        {/* Upgrade Button */}
        <Box marginTop="medium">
          <Flex justifyContent="center">
            <Button
              isLoading={isUpgrading}
              onClick={handleUpgrade}
              variant="primary"
              disabled={true}
            >
              Upgrade to Premium (Coming Soon)
            </Button>
          </Flex>
        </Box>
      </Box>

      {/* Feature Grid */}
      <Box marginBottom="xxxLarge">
        <Flex flexDirection="row" flexWrap="wrap" justifyContent="space-between">
          {/* WCAG Accessibility */}
          <Box marginBottom="large" style={{ width: '45%' }}>
            <Panel>
              <Box padding="medium">
                <Flex alignItems="center" marginBottom="xSmall">
                  <Box marginRight="small">
                    <CheckCircleIcon {...iconProps} />
                  </Box>
                  <H3 marginBottom="none">WCAG Accessibility</H3>
                </Flex>
                <Text color="secondary">
                  Built following Web Content Accessibility Guidelines (WCAG) to ensure 
                  a universally accessible web experience.
                </Text>
              </Box>
            </Panel>
          </Box>

          {/* Personalized Settings */}
          <Box marginBottom="large" style={{ width: '45%' }}>
            <Panel>
              <Box padding="medium">
                <Flex alignItems="center" marginBottom="xSmall">
                  <Box marginRight="small">
                    <SettingsIcon {...iconProps} />
                  </Box>
                  <H3 marginBottom="none">Personalized Settings</H3>
                </Flex>
                <Text color="secondary">
                  Customize text scaling, line spacing, and font styles for an optimized 
                  reading experience tailored to your preferences.
                </Text>
              </Box>
            </Panel>
          </Box>

          {/* Navigation Features */}
          <Box marginBottom="large" style={{ width: '45%' }}>
            <Panel>
              <Box padding="medium">
                <Flex alignItems="center" marginBottom="xSmall">
                  <Box marginRight="small">
                    <VisibilityIcon {...iconProps} />
                  </Box>
                  <H3 marginBottom="none">Effortless Navigation</H3>
                </Flex>
                <Text color="secondary">
                  Enhanced navigation with link identification, flicker-free modes, 
                  and improved mouse navigation with large cursors.
                </Text>
              </Box>
            </Panel>
          </Box>

          {/* Text-to-Speech */}
          <Box marginBottom="large" style={{ width: '45%' }}>
            <Panel>
              <Box padding="medium">
                <Flex alignItems="center" marginBottom="xSmall">
                  <Box marginRight="small">
                    <LanguageIcon {...iconProps} />
                  </Box>
                  <H3 marginBottom="none">Text-to-Speech</H3>
                </Flex>
                <Text color="secondary">
                  Enable Text-to-Speech with support for over 60 languages, providing 
                  spoken versions of web content for users with visual impairments.
                </Text>
              </Box>
            </Panel>
          </Box>
        </Flex>
      </Box>

      {/* Additional Info */}
      <Box marginVertical="xxLarge">
        <Flex flexDirection="column" alignItems="center">
          <H3>Privacy-Focused & Compliant</H3>
          <Text color="secondary">
            GDPR and CCPA compliant, saving user preferences without compromising privacy.
            Compatible with all modern browsers and websites.
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default Index;
