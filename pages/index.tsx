import { Box as MuiBox, Container, Grid, Typography, Paper } from '@mui/material';
import { AccessibilityNew, Navigation, RecordVoiceOver, TextFields } from '@mui/icons-material';
import { Box, Flex, H4, Panel, Switch } from "@bigcommerce/big-design";
import ErrorMessage from "../components/error";
import Loading from "../components/loading";
import { useScripts } from "../lib/hooks";
import { ChangeEvent } from "react";

const Index = () => {
  const { error, isLoading, scripts, toggleScript } = useScripts();

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;

  // Find the Readable script if it exists
  const readableScript = scripts?.find(script => script.name === "Readable");

  const handleToggle = async (event: ChangeEvent<HTMLInputElement>) => {
    await toggleScript(readableScript?.uuid, event.target.checked);
  };

  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <MuiBox sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Readable
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Enhance web accessibility and create an inclusive reading experience for everyone
        </Typography>

        {/* Enable Toggle Section - Moved here */}
        <MuiBox sx={{ mt: 4 }}>
          <Paper sx={{ p: 3, display: 'inline-block', minWidth: '300px' }}>
            <Flex justifyContent="space-between" alignItems="center">
              <H4>Enable on storefront</H4>
              <Switch
                checked={readableScript?.enabled ?? false}
                onChange={handleToggle}
              />
            </Flex>
          </Paper>
        </MuiBox>
      </MuiBox>

      {/* Feature Grid */}
      <Grid container spacing={4} sx={{ mb: 8 }}>
        {/* WCAG Accessibility */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 4, height: '100%' }}>
            <MuiBox sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <AccessibilityNew sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
              <Typography variant="h5" component="h2">
                WCAG Accessibility
              </Typography>
            </MuiBox>
            <Typography color="text.secondary">
              Built following Web Content Accessibility Guidelines (WCAG) to ensure 
              a universally accessible web experience.
            </Typography>
          </Paper>
        </Grid>

        {/* Personalized Settings */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 4, height: '100%' }}>
            <MuiBox sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TextFields sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
              <Typography variant="h5" component="h2">
                Personalized Settings
              </Typography>
            </MuiBox>
            <Typography color="text.secondary">
              Customize text scaling, line spacing, and font styles for an optimized 
              reading experience tailored to your preferences.
            </Typography>
          </Paper>
        </Grid>

        {/* Navigation Features */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 4, height: '100%' }}>
            <MuiBox sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Navigation sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
              <Typography variant="h5" component="h2">
                Effortless Navigation
              </Typography>
            </MuiBox>
            <Typography color="text.secondary">
              Enhanced navigation with link identification, flicker-free modes, 
              and improved mouse navigation with large cursors.
            </Typography>
          </Paper>
        </Grid>

        {/* Text-to-Speech */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 4, height: '100%' }}>
            <MuiBox sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <RecordVoiceOver sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
              <Typography variant="h5" component="h2">
                Text-to-Speech
              </Typography>
            </MuiBox>
            <Typography color="text.secondary">
              Enable Text-to-Speech with support for over 60 languages, providing 
              spoken versions of web content for users with visual impairments.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Additional Info */}
      <MuiBox sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom>
          Privacy-Focused & Compliant
        </Typography>
        <Typography color="text.secondary">
          GDPR and CCPA compliant, saving user preferences without compromising privacy.
          Compatible with all modern browsers and websites.
        </Typography>
      </MuiBox>
    </Container>
  );
};

export default Index;
