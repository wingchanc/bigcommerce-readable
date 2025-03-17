import { Box, Flex, H1, H2, H3, Panel, Switch, Text, Button, Tabs, Input, Form, FormGroup, Radio, Select } from "@bigcommerce/big-design";
import { CheckCircleIcon, LanguageIcon, SettingsIcon, VisibilityIcon } from "@bigcommerce/big-design-icons";
import ErrorMessage from "../components/error";
import Loading from "../components/loading";
import { useScripts } from "../lib/hooks";
import { useSession } from "../context/session";
import { ChangeEvent, useState, useEffect } from "react";

interface ConfigState {
  path: string;
  disableOnMobile: boolean;
  debug: boolean;
  template: 'popup' | 'off-canvas' | 'aside';
  sidebarAlign: 'left' | 'right';
  showOpenButton: boolean;
  buttonTabulationIndex: number;
  buttonPosition: string;
  buttonCaption: string;
  buttonIcon: string;
  buttonIconPosition: 'none' | 'before' | 'after' | 'above' | 'below';
  buttonEntranceAnimation: string;
  buttonHoverAnimation: string;
  popupOverlay: boolean;
  popupAnimation: string;
  popupScroll: boolean;
  closeAnywhere: boolean;
  closeButton: boolean;
  popupDraggable: boolean;
  popupShadow: boolean;
  headingTag: string;
  subHeadingTag: string;
  accessibilityProfiles: boolean;
  profileEpilepsy: boolean;
  profileVisuallyImpaired: boolean;
  profileCognitiveDisability: boolean;
  profileAdhdFriendly: boolean;
  profileBlindUsers: boolean;
  onlineDictionary: boolean;
  language: string;
  readableExperience: boolean;
  contentScaling: boolean;
  textMagnifier: boolean;
  readableFont: boolean;
  dyslexiaFont: boolean;
  highlightTitles: boolean;
  highlightLinks: boolean;
  fontSizing: boolean;
  lineHeight: boolean;
  letterSpacing: boolean;
  alignCenter: boolean;
  alignLeft: boolean;
  alignRight: boolean;
  visuallyPleasingExperience: boolean;
  darkContrast: boolean;
  lightContrast: boolean;
  monochrome: boolean;
  highSaturation: boolean;
  highContrast: boolean;
  lowSaturation: boolean;
  textColors: boolean;
  titleColors: boolean;
  backgroundColors: boolean;
  // Easy Orientation options
  easyOrientation: boolean;
  muteSounds: boolean;
  hideImages: boolean;
  virtualKeyboard: boolean;
  readingGuide: boolean;
  usefulLinks: boolean;
  stopAnimations: boolean;
  readingMask: boolean;
  highlightHover: boolean;
  highlightFocus: boolean;
  bigBlackCursor: boolean;
  bigWhiteCursor: boolean;
  cognitiveReading: boolean;
  textToSpeech: boolean;
  voiceNavigation: boolean;
  keyboardNavigation: boolean;
  cognitiveReadingFocus: boolean;
  cognitiveReadingFixation: 'low' | 'normal' | 'strong';
  // Reading Mask options
  readingMaskHeight: number;
  // Virtual Keyboard options
  virtualKeyboardLayout: string;
  // Speech Synthesis options
  ttsLang: string;
  ttsPitch: number;
  ttsRate: number;
  ttsVolume: number;
  // Text to Speech options
  ttsMode: 'selection' | 'click';
  ttsTooltipPosition: 'top' | 'bottom' | 'left' | 'right';
  // Footer options
  resetButton: boolean;
  hideButton: boolean;
  accessibilityStatement: boolean;
  accessibilityStatementType: 'iframe' | 'html' | 'link';
  accessibilityStatementLink: string;
  accessibilityStatementHtml: string;
  poweredBy: boolean;
  // Hot Keys options
  hotKeyOpenInterface: string;
  hotKeyMenu: string;
  hotKeyHeadings: string;
  hotKeyForms: string;
  hotKeyButtons: string;
  hotKeyGraphics: string;
}

const Index = () => {
  const { error, isLoading, scripts, toggleScript } = useScripts();
  const { context } = useSession();
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [hasSubscription, setHasSubscription] = useState(false);
  const [checkingSubscription, setCheckingSubscription] = useState(true);
  const [activeTab, setActiveTab] = useState("base");
  const [isSaving, setIsSaving] = useState(false);
  const [config, setConfig] = useState<ConfigState>({
    path: './readabler',
    disableOnMobile: false,
    debug: false,
    template: 'popup',
    sidebarAlign: 'left',
    showOpenButton: true,
    buttonTabulationIndex: 0,
    buttonPosition: 'bottom-right',
    buttonCaption: '',
    buttonIcon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 293.05 349.63"><path d="M95.37,51.29a51.23,51.23,0,1,1,51.29,51.16h-.07A51.19,51.19,0,0,1,95.37,51.29ZM293,134.59A25.61,25.61,0,0,0,265.49,111h-.13l-89.64,8c-3.06.28-6.13.42-9.19.42H126.65q-4.59,0-9.16-.41L27.7,111a25.58,25.58,0,0,0-4.23,51l.22,0,72.45,6.56a8.55,8.55,0,0,1,7.77,8.48v19.62a33.82,33.82,0,0,1-2.36,12.45L60.48,313.66a25.61,25.61,0,1,0,46.85,20.71h0l39.14-95.61L186,334.63A25.61,25.61,0,0,0,232.86,314L191.63,209.14a34.14,34.14,0,0,1-2.35-12.44V177.09a8.55,8.55,0,0,1,7.77-8.49l72.33-6.55A25.61,25.61,0,0,0,293,134.59Z"/></svg>',
    buttonIconPosition: 'before',
    buttonEntranceAnimation: 'fade',
    buttonHoverAnimation: 'none',
    popupOverlay: true,
    popupAnimation: 'fade',
    popupScroll: false,
    closeAnywhere: true,
    closeButton: true,
    popupDraggable: true,
    popupShadow: true,
    headingTag: 'h3',
    subHeadingTag: 'h4',
    accessibilityProfiles: true,
    profileEpilepsy: true,
    profileVisuallyImpaired: true,
    profileCognitiveDisability: true,
    profileAdhdFriendly: true,
    profileBlindUsers: true,
    onlineDictionary: true,
    language: 'auto',
    readableExperience: true,
    contentScaling: true,
    textMagnifier: true,
    readableFont: true,
    dyslexiaFont: true,
    highlightTitles: true,
    highlightLinks: true,
    fontSizing: true,
    lineHeight: true,
    letterSpacing: true,
    alignCenter: true,
    alignLeft: true,
    alignRight: true,
    visuallyPleasingExperience: true,
    darkContrast: true,
    lightContrast: true,
    monochrome: true,
    highSaturation: true,
    highContrast: true,
    lowSaturation: true,
    textColors: true,
    titleColors: true,
    backgroundColors: true,
    // Easy Orientation defaults
    easyOrientation: true,
    muteSounds: true,
    hideImages: true,
    virtualKeyboard: true,
    readingGuide: true,
    usefulLinks: true,
    stopAnimations: true,
    readingMask: true,
    highlightHover: true,
    highlightFocus: true,
    bigBlackCursor: true,
    bigWhiteCursor: true,
    cognitiveReading: true,
    textToSpeech: true,
    voiceNavigation: true,
    keyboardNavigation: true,
    cognitiveReadingFocus: true,
    cognitiveReadingFixation: 'normal',
    // Reading Mask defaults
    readingMaskHeight: 100,
    // Virtual Keyboard defaults
    virtualKeyboardLayout: 'english',
    // Speech Synthesis defaults
    ttsLang: '',
    ttsPitch: 1,
    ttsRate: 1,
    ttsVolume: 1,
    // Text to Speech defaults
    ttsMode: 'selection',
    ttsTooltipPosition: 'top',
    // Footer defaults
    resetButton: true,
    hideButton: true,
    accessibilityStatement: true,
    accessibilityStatementType: 'iframe',
    accessibilityStatementLink: './readabler/accessibility-statement.html',
    accessibilityStatementHtml: '',
    poweredBy: true,
    // Hot Keys defaults
    hotKeyOpenInterface: 'Alt+9',
    hotKeyMenu: 'M',
    hotKeyHeadings: 'H',
    hotKeyForms: 'F',
    hotKeyButtons: 'B',
    hotKeyGraphics: 'G',
  });

  // Load config on mount
  useEffect(() => {
    const loadConfig = async () => {
      try {
        const response = await fetch(`/api/config?context=${context}`);
        if (!response.ok) {
          throw new Error('Failed to load configuration');
        }
        const savedConfig = await response.json();
        if (Object.keys(savedConfig).length > 0) {
          setConfig(prev => ({
            ...prev,
            ...savedConfig
          }));
        }
      } catch (error) {
        console.error('Error loading config:', error);
      }
    };

    if (context) {
      loadConfig();
    }
  }, [context]);

  // Save config whenever it changes
  useEffect(() => {
    const saveConfig = async () => {
      try {
        setIsSaving(true);
        const response = await fetch(`/api/config?context=${context}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ config }),
        });
        if (!response.ok) {
          throw new Error('Failed to save configuration');
        }
      } catch (error) {
        console.error('Error saving config:', error);
      } finally {
        setIsSaving(false);
      }
    };

    // Only save if we have a context and config has been loaded
    if (context) {
      // Debounce save to avoid too many requests
      const timeoutId = setTimeout(saveConfig, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [config, context]);

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const response = await fetch(`/api/check-subscription?context=${context}`);
        const data = await response.json();
        
        // Check if there's an active subscription
        const subscriptions = data.data?.account?.subscriptions?.edges || [];
        const activeSubscription = subscriptions.some(
          (edge: any) => edge.node.status === 'ACTIVE' && 
                        edge.node.product.id === 'bc/account/product/57770'
        );
        
        setHasSubscription(activeSubscription);
      } catch (error) {
        console.error('Failed to check subscription:', error);
      } finally {
        setCheckingSubscription(false);
      }
    };

    if (context) {
      checkSubscription();
    } else {
      setCheckingSubscription(false);
    }
  }, [context]);

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

  const handleConfigChange = (field: keyof ConfigState) => (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSwitchChange = (field: keyof ConfigState) => (event: ChangeEvent<HTMLInputElement>) => {
    setConfig(prev => ({
      ...prev,
      [field]: event.target.checked
    }));
  };

  const handleRadioChange = (field: keyof ConfigState) => (value: string) => {
    setConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSelectChange = (field: keyof ConfigState) => (value?: string) => {
    if (value) {
      setConfig(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleNumberChange = (field: keyof ConfigState) => (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value)) {
      setConfig(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const positionOptions = [
    { value: 'top-left', content: 'Top Left' },
    { value: 'top-right', content: 'Top Right' },
    { value: 'left-center', content: 'Left Center' },
    { value: 'right-center', content: 'Right Center' },
    { value: 'bottom-left', content: 'Bottom Left' },
    { value: 'bottom-center', content: 'Bottom Center' },
    { value: 'bottom-right', content: 'Bottom Right' },
  ];

  const iconPositionOptions = [
    { value: 'none', content: 'None' },
    { value: 'before', content: 'Before' },
    { value: 'after', content: 'After' },
    { value: 'above', content: 'Above' },
    { value: 'below', content: 'Below' },
  ];

  const animationOptions = [
    { value: 'none', content: 'None' },
    { value: 'bounce', content: 'Bounce' },
    { value: 'fade', content: 'Fade' },
    { value: 'flip-x', content: 'Flip X' },
    { value: 'flip-y', content: 'Flip Y' },
    { value: 'scale', content: 'Scale' },
    { value: 'wobble', content: 'Wobble' },
    { value: 'rotate', content: 'Rotate' },
  ];

  const popupAnimationOptions = [
    { value: 'none', content: 'None' },
    { value: 'bounce', content: 'Bounce' },
    { value: 'fade', content: 'Fade' },
    { value: 'flip-x', content: 'Flip X' },
    { value: 'flip-y', content: 'Flip Y' },
    { value: 'scale', content: 'Scale' },
    { value: 'slide-tr', content: 'Slide Top Right' },
    { value: 'slide-tl', content: 'Slide Top Left' },
    { value: 'slide-tt', content: 'Slide Top' },
    { value: 'slide-tb', content: 'Slide Bottom' },
    { value: 'wobble', content: 'Wobble' },
    { value: 'rotate', content: 'Rotate' },
  ];

  const headingTagOptions = [
    { value: 'p', content: 'Paragraph' },
    { value: 'span', content: 'Span' },
    { value: 'h1', content: 'H1' },
    { value: 'h2', content: 'H2' },
    { value: 'h3', content: 'H3' },
    { value: 'h4', content: 'H4' },
    { value: 'h5', content: 'H5' },
    { value: 'h6', content: 'H6' },
  ];

  const languageOptions = [
    { value: 'auto', content: 'Auto Detect' },
    { value: 'ar', content: 'Arabic' },
    { value: 'ast', content: 'Asturian' },
    { value: 'az', content: 'Azerbaijani' },
    { value: 'bg', content: 'Bulgarian' },
    { value: 'nan', content: 'Chinese (Min Nan)' },
    { value: 'bn', content: 'Bengali' },
    { value: 'be', content: 'Belarusian' },
    { value: 'ca', content: 'Catalan' },
    { value: 'cs', content: 'Czech' },
    { value: 'cy', content: 'Welsh' },
    { value: 'da', content: 'Danish' },
    { value: 'de', content: 'German' },
    { value: 'et', content: 'Estonian' },
    { value: 'el', content: 'Greek' },
    { value: 'en', content: 'English' },
    { value: 'es', content: 'Spanish' },
    { value: 'eo', content: 'Esperanto' },
    { value: 'eu', content: 'Basque' },
    { value: 'fa', content: 'Persian' },
    { value: 'fr', content: 'French' },
    { value: 'gl', content: 'Galician' },
    { value: 'hy', content: 'Armenian' },
    { value: 'hi', content: 'Hindi' },
    { value: 'hr', content: 'Croatian' },
    { value: 'id', content: 'Indonesian' },
    { value: 'it', content: 'Italian' },
    { value: 'he', content: 'Hebrew' },
    { value: 'ka', content: 'Georgian' },
    { value: 'la', content: 'Latin' },
    { value: 'lv', content: 'Latvian' },
    { value: 'lt', content: 'Lithuanian' },
    { value: 'hu', content: 'Hungarian' },
    { value: 'mk', content: 'Macedonian' },
    { value: 'arz', content: 'Egyptian Arabic' },
    { value: 'ms', content: 'Malay' },
    { value: 'min', content: 'Minangkabau' },
    { value: 'my', content: 'Burmese' },
    { value: 'nl', content: 'Dutch' },
    { value: 'ja', content: 'Japanese' },
    { value: 'nb', content: 'Norwegian (Bokmål)' },
    { value: 'nn', content: 'Norwegian (Nynorsk)' },
    { value: 'ce', content: 'Chechen' },
    { value: 'uz', content: 'Uzbek' },
    { value: 'pl', content: 'Polish' },
    { value: 'pt', content: 'Portuguese' },
    { value: 'kk', content: 'Kazakh' },
    { value: 'ro', content: 'Romanian' },
    { value: 'ru', content: 'Russian' },
    { value: 'ceb', content: 'Cebuano' },
    { value: 'sk', content: 'Slovak' },
    { value: 'sl', content: 'Slovenian' },
    { value: 'sr', content: 'Serbian' },
    { value: 'sh', content: 'Serbo-Croatian' },
    { value: 'fi', content: 'Finnish' },
    { value: 'sv', content: 'Swedish' },
    { value: 'ta', content: 'Tamil' },
    { value: 'tt', content: 'Tatar' },
    { value: 'th', content: 'Thai' },
    { value: 'tg', content: 'Tajik' },
    { value: 'azb', content: 'South Azerbaijani' },
    { value: 'tr', content: 'Turkish' },
    { value: 'uk', content: 'Ukrainian' },
    { value: 'ur', content: 'Urdu' },
    { value: 'vi', content: 'Vietnamese' },
    { value: 'vo', content: 'Volapük' },
    { value: 'war', content: 'Waray' },
    { value: 'yue', content: 'Cantonese' },
    { value: 'zh', content: 'Chinese' },
    { value: 'ko', content: 'Korean' },
  ];

  const cognitiveReadingFixationOptions = [
    { value: 'low', content: 'Low' },
    { value: 'normal', content: 'Normal' },
    { value: 'strong', content: 'Strong' },
  ];

  const virtualKeyboardLayoutOptions = [
    { value: 'arabic', content: 'Arabic' },
    { value: 'assamese', content: 'Assamese' },
    { value: 'belarusian', content: 'Belarusian' },
    { value: 'bengali', content: 'Bengali' },
    { value: 'burmese', content: 'Burmese' },
    { value: 'chinese', content: 'Chinese' },
    { value: 'czech', content: 'Czech' },
    { value: 'english', content: 'English' },
    { value: 'farsi', content: 'Farsi' },
    { value: 'french', content: 'French' },
    { value: 'georgian', content: 'Georgian' },
    { value: 'german', content: 'German' },
    { value: 'gilaki', content: 'Gilaki' },
    { value: 'greek', content: 'Greek' },
    { value: 'hebrew', content: 'Hebrew' },
    { value: 'hindi', content: 'Hindi' },
    { value: 'italian', content: 'Italian' },
    { value: 'japanese', content: 'Japanese' },
    { value: 'kannada', content: 'Kannada' },
    { value: 'korean', content: 'Korean' },
    { value: 'nigerian', content: 'Nigerian' },
    { value: 'norwegian', content: 'Norwegian' },
    { value: 'polish', content: 'Polish' },
    { value: 'russian', content: 'Russian' },
    { value: 'sindhi', content: 'Sindhi' },
    { value: 'spanish', content: 'Spanish' },
    { value: 'swedish', content: 'Swedish' },
    { value: 'thai', content: 'Thai' },
    { value: 'turkish', content: 'Turkish' },
    { value: 'ukrainian', content: 'Ukrainian' },
    { value: 'urdu', content: 'Urdu' },
    { value: 'uyghur', content: 'Uyghur' },
  ];

  const ttsModeOptions = [
    { value: 'selection', content: 'Selection' },
    { value: 'click', content: 'Click' },
  ];

  const ttsTooltipPositionOptions = [
    { value: 'top', content: 'Top' },
    { value: 'bottom', content: 'Bottom' },
    { value: 'left', content: 'Left' },
    { value: 'right', content: 'Right' },
  ];

  const accessibilityStatementTypeOptions = [
    { value: 'iframe', content: 'IFrame' },
    { value: 'html', content: 'HTML' },
    { value: 'link', content: 'Link' },
  ];

  const tabs = [
    { id: 'base', title: 'Base Options', ariaControls: 'base-content' },
    { id: 'templates', title: 'Templates', ariaControls: 'templates-content' },
    { id: 'button', title: 'Open Button', ariaControls: 'button-content' },
    { id: 'popup', title: 'Popup', ariaControls: 'popup-content' },
    { id: 'profiles', title: 'Accessibility Profiles', ariaControls: 'profiles-content' },
    { id: 'dictionary', title: 'Dictionary', ariaControls: 'dictionary-content' },
    { id: 'readable', title: 'Readable Experience', ariaControls: 'readable-content' },
    { id: 'visual', title: 'Visual Experience', ariaControls: 'visual-content' },
    { id: 'orientation', title: 'Easy Orientation', ariaControls: 'orientation-content' },
    { id: 'reading-mask', title: 'Reading Mask', ariaControls: 'reading-mask-content' },
    { id: 'virtual-keyboard', title: 'Virtual Keyboard', ariaControls: 'virtual-keyboard-content' },
    { id: 'speech', title: 'Speech Synthesis', ariaControls: 'speech-content' },
    { id: 'tts', title: 'Text to Speech', ariaControls: 'tts-content' },
    { id: 'footer', title: 'Footer', ariaControls: 'footer-content' },
    { id: 'hotkeys', title: 'Hot Keys', ariaControls: 'hotkeys-content' },
  ];

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
              isLoading={isUpgrading || checkingSubscription}
              onClick={handleUpgrade}
              variant="primary"
              disabled={hasSubscription}
            >
              {hasSubscription ? 'Premium Subscription Active' : 'Upgrade to Premium'}
            </Button>
          </Flex>
        </Box>

        {/* Configuration Section */}
        <Box marginTop="xxLarge">
          <Panel header="Readable Configuration">
            {isSaving && (
              <Text color="secondary" marginBottom="medium">
                Saving changes...
              </Text>
            )}
            <Box style={{ position: 'relative' }}>
              {!hasSubscription && (
                <Box
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'white',
                    opacity: 0.9,
                    zIndex: 1
                  }}
                >
                  <Flex
                    style={{
                      height: '100%',
                      width: '100%'
                    }}
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Box marginBottom="medium">
                      <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                        <path d="M12 13a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm0 0V8m-1.5-4h3m6.5 4v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </Box>
                    <H2 marginBottom="small">Premium Feature</H2>
                    <Text marginBottom="small" color="secondary">
                      Upgrade to Premium to customize Readable settings and unlock all features.
                    </Text>
                    <Box marginTop="large">
                      <Button variant="primary" onClick={handleUpgrade}>
                        Upgrade Now
                      </Button>
                    </Box>
                  </Flex>
                </Box>
              )}

              <H3>Configuration Settings</H3>
              <Text marginBottom="medium">Customize how Readable works on your store</Text>
              
              <Tabs
                activeTab={activeTab}
                items={tabs}
                onTabClick={setActiveTab}
              />
              
              <Box marginTop="medium">
                {activeTab === 'base' && (
                  <Box id="base-content">
                    <Form>
                      {/* <FormGroup>
                        <Input
                          type="text"
                          label="Script Path"
                          description="Specify the path to the Readable script folder"
                          placeholder="./Readable"
                          value={config.path}
                          onChange={handleConfigChange('path')}
                        />
                      </FormGroup> */}

                      <FormGroup>
                        <Flex alignItems="center">
                          <Switch
                            checked={config.disableOnMobile}
                            onChange={handleSwitchChange('disableOnMobile')}
                          />
                          <Box marginLeft="small">
                            <Text>Disable on Mobile</Text>
                          </Box>
                        </Flex>
                        <Text color="secondary" marginLeft="xxLarge">
                          Disable accessible popup and button on mobile devices
                        </Text>
                      </FormGroup>

                      {/* <FormGroup>
                        <Flex alignItems="center">
                          <Switch
                            checked={config.debug}
                            onChange={handleConfigChange('debug')}
                          />
                          <Box marginLeft="small">
                            <Text>Debug Mode</Text>
                          </Box>
                        </Flex>
                        <Text color="secondary" marginLeft="xxLarge">
                          Enable/Disable debug mode
                        </Text>
                      </FormGroup> */}
                    </Form>
                  </Box>
                )}

                {activeTab === 'templates' && (
                  <Box id="templates-content">
                    <Form>
                      <FormGroup>
                        <Text bold marginBottom="small">Template</Text>
                        <Flex flexDirection="column">
                          <Radio
                            label="Popup"
                            checked={config.template === 'popup'}
                            onChange={() => handleRadioChange('template')('popup')}
                            value="popup"
                            description="Display accessibility window as a popup"
                          />
                          <Radio
                            label="Off-canvas"
                            checked={config.template === 'off-canvas'}
                            onChange={() => handleRadioChange('template')('off-canvas')}
                            value="off-canvas"
                            description="Display accessibility window as an off-canvas panel"
                          />
                          <Radio
                            label="Aside"
                            checked={config.template === 'aside'}
                            onChange={() => handleRadioChange('template')('aside')}
                            value="aside"
                            description="Display accessibility window as an aside panel"
                          />
                        </Flex>
                      </FormGroup>

                      <FormGroup>
                        <Text bold marginBottom="small">Sidebar Alignment</Text>
                        <Text color="secondary" marginBottom="small">
                          Specify the accessibility window alignment. Applied for off-canvas and aside templates.
                        </Text>
                        <Flex>
                          <Radio
                            label="Left"
                            checked={config.sidebarAlign === 'left'}
                            onChange={() => handleRadioChange('sidebarAlign')('left')}
                            value="left"
                          />
                          <Box marginLeft="medium">
                            <Radio
                              label="Right"
                              checked={config.sidebarAlign === 'right'}
                              onChange={() => handleRadioChange('sidebarAlign')('right')}
                              value="right"
                            />
                          </Box>
                        </Flex>
                      </FormGroup>
                    </Form>
                  </Box>
                )}

                {activeTab === 'button' && (
                  <Box id="button-content">
                    <Form>
                      <FormGroup>
                        <Flex alignItems="center">
                          <Switch
                            checked={config.showOpenButton}
                            onChange={handleSwitchChange('showOpenButton')}
                          />
                          <Box marginLeft="small">
                            <Text>Show Open Button</Text>
                          </Box>
                        </Flex>
                        <Text color="secondary" marginLeft="xxLarge">
                          Show/hide the button to open accessibility settings
                        </Text>
                      </FormGroup>

                      <FormGroup>
                        <Input
                          type="number"
                          label="Tabulation Index"
                          description="Indicates element focus order in keyboard navigation (-1: not reachable, 0: source order, 1+: specific order)"
                          value={config.buttonTabulationIndex}
                          onChange={handleNumberChange('buttonTabulationIndex')}
                          min={-1}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Select
                          label="Button Position"
                          options={positionOptions}
                          onOptionChange={handleSelectChange('buttonPosition')}
                          value={config.buttonPosition}
                          description="The display position of the accessibility button"
                        />
                      </FormGroup>

                      <FormGroup>
                        <Input
                          type="text"
                          label="Button Caption"
                          description="Enter text for the button or leave blank to display only an icon"
                          value={config.buttonCaption}
                          onChange={handleConfigChange('buttonCaption')}
                          placeholder="Optional button text"
                        />
                      </FormGroup>

                      <FormGroup>
                        <Input
                          type="text"
                          label="Button Icon"
                          description="Specify an icon for the button (SVG or .jpg/.png image)"
                          value={config.buttonIcon}
                          onChange={handleConfigChange('buttonIcon')}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Select
                          label="Icon Position"
                          options={iconPositionOptions}
                          onOptionChange={handleSelectChange('buttonIconPosition')}
                          value={config.buttonIconPosition}
                          description="The icon position relative to the caption on the button"
                        />
                      </FormGroup>

                      <FormGroup>
                        <Select
                          label="Entrance Animation"
                          options={animationOptions}
                          onOptionChange={handleSelectChange('buttonEntranceAnimation')}
                          value={config.buttonEntranceAnimation}
                          description="The button animation for appearing on the page"
                        />
                      </FormGroup>

                      <FormGroup>
                        <Select
                          label="Hover Animation"
                          options={animationOptions}
                          onOptionChange={handleSelectChange('buttonHoverAnimation')}
                          value={config.buttonHoverAnimation}
                          description="The animation for the button hover"
                        />
                      </FormGroup>
                    </Form>
                  </Box>
                )}

                {activeTab === 'popup' && (
                  <Box id="popup-content">
                    <Form>
                      {/* Behavior Options */}
                      <Box marginBottom="medium">
                        <Text bold marginBottom="small">Behavior</Text>
                        
                        <FormGroup>
                          <Flex alignItems="center">
                            <Switch
                              checked={config.popupOverlay}
                              onChange={handleSwitchChange('popupOverlay')}
                            />
                            <Box marginLeft="small">
                              <Text>Enable Overlay</Text>
                            </Box>
                          </Flex>
                          <Text color="secondary" marginLeft="xxLarge">
                            Enable/disable the overlap layer for site content
                          </Text>
                        </FormGroup>

                        <FormGroup>
                          <Flex alignItems="center">
                            <Switch
                              checked={config.popupScroll}
                              onChange={handleSwitchChange('popupScroll')}
                            />
                            <Box marginLeft="small">
                              <Text>Allow Page Scroll</Text>
                            </Box>
                          </Flex>
                          <Text color="secondary" marginLeft="xxLarge">
                            Enable/disable scrolling on the page while popup is open
                          </Text>
                        </FormGroup>

                        <FormGroup>
                          <Flex alignItems="center">
                            <Switch
                              checked={config.popupDraggable}
                              onChange={handleConfigChange('popupDraggable')}
                            />
                            <Box marginLeft="small">
                              <Text>Draggable Window</Text>
                            </Box>
                          </Flex>
                          <Text color="secondary" marginLeft="xxLarge">
                            Enable/disable dragging the accessibility settings window
                          </Text>
                        </FormGroup>
                      </Box>

                      {/* Close Options */}
                      <Box marginBottom="medium">
                        <Text bold marginBottom="small">Close Options</Text>
                        
                        <FormGroup>
                          <Flex alignItems="center">
                            <Switch
                              checked={config.closeAnywhere}
                              onChange={handleConfigChange('closeAnywhere')}
                            />
                            <Box marginLeft="small">
                              <Text>Click Outside to Close</Text>
                            </Box>
                          </Flex>
                          <Text color="secondary" marginLeft="xxLarge">
                            Enable/disable closing settings by clicking outside the popup
                          </Text>
                        </FormGroup>

                        <FormGroup>
                          <Flex alignItems="center">
                            <Switch
                              checked={config.closeButton}
                              onChange={handleConfigChange('closeButton')}
                            />
                            <Box marginLeft="small">
                              <Text>Show Close Button</Text>
                            </Box>
                          </Flex>
                          <Text color="secondary" marginLeft="xxLarge">
                            Enable/disable the close button in the settings window
                          </Text>
                        </FormGroup>
                      </Box>

                      {/* Appearance Options */}
                      <Box marginBottom="medium">
                        <Text bold marginBottom="small">Appearance</Text>

                        <FormGroup>
                          <Select
                            label="Animation"
                            options={popupAnimationOptions}
                            onOptionChange={handleSelectChange('popupAnimation')}
                            value={config.popupAnimation}
                            description="The popup animation style"
                          />
                        </FormGroup>

                        <FormGroup>
                          <Flex alignItems="center">
                            <Switch
                              checked={config.popupShadow}
                              onChange={handleConfigChange('popupShadow')}
                            />
                            <Box marginLeft="small">
                              <Text>Show Shadow</Text>
                            </Box>
                          </Flex>
                          <Text color="secondary" marginLeft="xxLarge">
                            Enable/disable the popup shadow
                          </Text>
                        </FormGroup>
                      </Box>

                      {/* Heading Options */}
                      <Box marginBottom="medium">
                        <Text bold marginBottom="small">Heading Tags</Text>

                        <FormGroup>
                          <Select
                            label="Title Tag"
                            options={headingTagOptions}
                            onOptionChange={handleSelectChange('headingTag')}
                            value={config.headingTag}
                            description="The HTML tag used for the Title wrapper"
                          />
                        </FormGroup>

                        <FormGroup>
                          <Select
                            label="Subtitle Tag"
                            options={headingTagOptions}
                            onOptionChange={handleSelectChange('subHeadingTag')}
                            value={config.subHeadingTag}
                            description="The HTML tag used for the Subtitle wrapper"
                          />
                        </FormGroup>
                      </Box>
                    </Form>
                  </Box>
                )}

                {activeTab === 'profiles' && (
                  <Box id="profiles-content">
                    <Form>
                      <FormGroup>
                        <Flex alignItems="center">
                          <Switch
                            checked={config.accessibilityProfiles}
                            onChange={handleConfigChange('accessibilityProfiles')}
                          />
                          <Box marginLeft="small">
                            <Text>Enable All Profiles</Text>
                          </Box>
                        </Flex>
                        <Text color="secondary" marginLeft="xxLarge">
                          Enable/disable all preset accessibility modes
                        </Text>
                      </FormGroup>

                      <Box marginTop="large">
                        <FormGroup>
                          <Flex alignItems="center">
                            <Switch
                              checked={config.profileEpilepsy}
                              onChange={handleConfigChange('profileEpilepsy')}
                            />
                            <Box marginLeft="small">
                              <Text>Epilepsy Safe Mode</Text>
                            </Box>
                          </Flex>
                          <Text color="secondary" marginLeft="xxLarge">
                            Eliminates the risk of seizures from flashing animations and risky color combinations
                          </Text>
                        </FormGroup>

                        <FormGroup>
                          <Flex alignItems="center">
                            <Switch
                              checked={config.profileVisuallyImpaired}
                              onChange={handleConfigChange('profileVisuallyImpaired')}
                            />
                            <Box marginLeft="small">
                              <Text>Visually Impaired Mode</Text>
                            </Box>
                          </Flex>
                          <Text color="secondary" marginLeft="xxLarge">
                            Adjusts for users with visual impairments (Degrading Eyesight, Tunnel Vision, Cataract, Glaucoma)
                          </Text>
                        </FormGroup>

                        <FormGroup>
                          <Flex alignItems="center">
                            <Switch
                              checked={config.profileCognitiveDisability}
                              onChange={handleConfigChange('profileCognitiveDisability')}
                            />
                            <Box marginLeft="small">
                              <Text>Cognitive Disability Mode</Text>
                            </Box>
                          </Flex>
                          <Text color="secondary" marginLeft="xxLarge">
                            Assists users with cognitive impairments (Dyslexia, Autism, CVA) to focus on essential elements
                          </Text>
                        </FormGroup>

                        <FormGroup>
                          <Flex alignItems="center">
                            <Switch
                              checked={config.profileAdhdFriendly}
                              onChange={handleConfigChange('profileAdhdFriendly')}
                            />
                            <Box marginLeft="small">
                              <Text>ADHD Friendly Mode</Text>
                            </Box>
                          </Flex>
                          <Text color="secondary" marginLeft="xxLarge">
                            Helps users with ADHD and Neurodevelopmental disorders to focus by reducing distractions
                          </Text>
                        </FormGroup>

                        <FormGroup>
                          <Flex alignItems="center">
                            <Switch
                              checked={config.profileBlindUsers}
                              onChange={handleConfigChange('profileBlindUsers')}
                            />
                            <Box marginLeft="small">
                              <Text>Blindness Mode</Text>
                            </Box>
                          </Flex>
                          <Text color="secondary" marginLeft="xxLarge">
                            Configures compatibility with screen-readers (JAWS, NVDA, VoiceOver, TalkBack)
                          </Text>
                        </FormGroup>
                      </Box>
                    </Form>
                  </Box>
                )}

                {activeTab === 'dictionary' && (
                  <Box id="dictionary-content">
                    <Form>
                      <FormGroup>
                        <Flex alignItems="center">
                          <Switch
                            checked={config.onlineDictionary}
                            onChange={handleConfigChange('onlineDictionary')}
                          />
                          <Box marginLeft="small">
                            <Text>Enable Online Dictionary</Text>
                          </Box>
                        </Flex>
                        <Text color="secondary" marginLeft="xxLarge">
                          Add a search field to look up phrases, abbreviations and concepts
                        </Text>
                      </FormGroup>

                      <FormGroup>
                        <Select
                          label="Dictionary Language"
                          options={languageOptions}
                          onOptionChange={handleSelectChange('language')}
                          value={config.language}
                          description="Specify your site language for the dictionary"
                        />
                      </FormGroup>
                    </Form>
                  </Box>
                )}

                {activeTab === 'readable' && (
                  <Box id="readable-content">
                    <Form>
                      {/* Main Toggle */}
                      <FormGroup>
                        <Flex alignItems="center">
                          <Switch
                            checked={config.readableExperience}
                            onChange={handleConfigChange('readableExperience')}
                          />
                          <Box marginLeft="small">
                            <Text>Enable Readable Experience</Text>
                          </Box>
                        </Flex>
                        <Text color="secondary" marginLeft="xxLarge">
                          Enable/disable block settings of the Readable Experience
                        </Text>
                      </FormGroup>

                      {/* Content Adjustments */}
                      <Box marginTop="large">
                        <Text bold marginBottom="small">Content Adjustments</Text>
                        
                        <FormGroup>
                          <Flex alignItems="center">
                            <Switch
                              checked={config.contentScaling}
                              onChange={handleConfigChange('contentScaling')}
                            />
                            <Box marginLeft="small">
                              <Text>Content Scaling</Text>
                            </Box>
                          </Flex>
                          <Text color="secondary" marginLeft="xxLarge">
                            Enable scaling the website content as a percentage
                          </Text>
                        </FormGroup>

                        <FormGroup>
                          <Flex alignItems="center">
                            <Switch
                              checked={config.textMagnifier}
                              onChange={handleConfigChange('textMagnifier')}
                            />
                            <Box marginLeft="small">
                              <Text>Text Magnifier</Text>
                            </Box>
                          </Flex>
                          <Text color="secondary" marginLeft="xxLarge">
                            Display specific text in the magnifier on hover
                          </Text>
                        </FormGroup>
                      </Box>

                      {/* Font Options */}
                      <Box marginTop="large">
                        <Text bold marginBottom="small">Font Options</Text>
                        
                        <FormGroup>
                          <Flex alignItems="center">
                            <Switch
                              checked={config.readableFont}
                              onChange={handleConfigChange('readableFont')}
                            />
                            <Box marginLeft="small">
                              <Text>Readable Font</Text>
                            </Box>
                          </Flex>
                          <Text color="secondary" marginLeft="xxLarge">
                            Automatically convert text font to a more readable one
                          </Text>
                        </FormGroup>

                        <FormGroup>
                          <Flex alignItems="center">
                            <Switch
                              checked={config.dyslexiaFont}
                              onChange={handleConfigChange('dyslexiaFont')}
                            />
                            <Box marginLeft="small">
                              <Text>Dyslexia Friendly Font</Text>
                            </Box>
                          </Flex>
                          <Text color="secondary" marginLeft="xxLarge">
                            Adapt the font to be more convenient for Dyslexic users
                          </Text>
                        </FormGroup>
                      </Box>

                      {/* Visual Highlights */}
                      <Box marginTop="large">
                        <Text bold marginBottom="small">Visual Highlights</Text>
                        
                        <FormGroup>
                          <Flex alignItems="center">
                            <Switch
                              checked={config.highlightTitles}
                              onChange={handleConfigChange('highlightTitles')}
                            />
                            <Box marginLeft="small">
                              <Text>Highlight Titles</Text>
                            </Box>
                          </Flex>
                          <Text color="secondary" marginLeft="xxLarge">
                            Highlight titles with borders for all site content
                          </Text>
                        </FormGroup>

                        <FormGroup>
                          <Flex alignItems="center">
                            <Switch
                              checked={config.highlightLinks}
                              onChange={handleConfigChange('highlightLinks')}
                            />
                            <Box marginLeft="small">
                              <Text>Highlight Links</Text>
                            </Box>
                          </Flex>
                          <Text color="secondary" marginLeft="xxLarge">
                            Highlight links with borders for all site content
                          </Text>
                        </FormGroup>
                      </Box>

                      {/* Text Adjustments */}
                      <Box marginTop="large">
                        <Text bold marginBottom="small">Text Adjustments</Text>
                        
                        <FormGroup>
                          <Flex alignItems="center">
                            <Switch
                              checked={config.fontSizing}
                              onChange={handleConfigChange('fontSizing')}
                            />
                            <Box marginLeft="small">
                              <Text>Font Sizing</Text>
                            </Box>
                          </Flex>
                          <Text color="secondary" marginLeft="xxLarge">
                            Change the text font size as a percentage
                          </Text>
                        </FormGroup>

                        <FormGroup>
                          <Flex alignItems="center">
                            <Switch
                              checked={config.lineHeight}
                              onChange={handleConfigChange('lineHeight')}
                            />
                            <Box marginLeft="small">
                              <Text>Line Height</Text>
                            </Box>
                          </Flex>
                          <Text color="secondary" marginLeft="xxLarge">
                            Change the font line-height as a percentage
                          </Text>
                        </FormGroup>

                        <FormGroup>
                          <Flex alignItems="center">
                            <Switch
                              checked={config.letterSpacing}
                              onChange={handleConfigChange('letterSpacing')}
                            />
                            <Box marginLeft="small">
                              <Text>Letter Spacing</Text>
                            </Box>
                          </Flex>
                          <Text color="secondary" marginLeft="xxLarge">
                            Change the text letter spacing as a percentage
                          </Text>
                        </FormGroup>
                      </Box>

                      {/* Alignment Options */}
                      <Box marginTop="large">
                        <Text bold marginBottom="small">Content Alignment</Text>
                        
                        <FormGroup>
                          <Flex alignItems="center">
                            <Switch
                              checked={config.alignCenter}
                              onChange={handleConfigChange('alignCenter')}
                            />
                            <Box marginLeft="small">
                              <Text>Center Alignment</Text>
                            </Box>
                          </Flex>
                          <Text color="secondary" marginLeft="xxLarge">
                            Align the website content to the center
                          </Text>
                        </FormGroup>

                        <FormGroup>
                          <Flex alignItems="center">
                            <Switch
                              checked={config.alignLeft}
                              onChange={handleConfigChange('alignLeft')}
                            />
                            <Box marginLeft="small">
                              <Text>Left Alignment</Text>
                            </Box>
                          </Flex>
                          <Text color="secondary" marginLeft="xxLarge">
                            Align the website content to the left
                          </Text>
                        </FormGroup>

                        <FormGroup>
                          <Flex alignItems="center">
                            <Switch
                              checked={config.alignRight}
                              onChange={handleConfigChange('alignRight')}
                            />
                            <Box marginLeft="small">
                              <Text>Right Alignment</Text>
                            </Box>
                          </Flex>
                          <Text color="secondary" marginLeft="xxLarge">
                            Align the website content to the right
                          </Text>
                        </FormGroup>
                      </Box>
                    </Form>
                  </Box>
                )}

                {activeTab === 'visual' && (
                  <Box id="visual-content">
                    <Form>
                      {/* Main Toggle */}
                      <FormGroup>
                        <Flex alignItems="center">
                          <Switch
                            checked={config.visuallyPleasingExperience}
                            onChange={handleConfigChange('visuallyPleasingExperience')}
                          />
                          <Box marginLeft="small">
                            <Text>Enable Visually Pleasing Experience</Text>
                          </Box>
                        </Flex>
                        <Text color="secondary" marginLeft="xxLarge">
                          Enable/disable block settings of the Visually Pleasing Experience
                        </Text>
                      </FormGroup>

                      {/* Contrast Options */}
                      <Box marginTop="large">
                        <Text bold marginBottom="small">Contrast Settings</Text>
                        
                        <FormGroup>
                          <Flex alignItems="center">
                            <Switch
                              checked={config.darkContrast}
                              onChange={handleConfigChange('darkContrast')}
                            />
                            <Box marginLeft="small">
                              <Text>Dark Contrast</Text>
                            </Box>
                          </Flex>
                          <Text color="secondary" marginLeft="xxLarge">
                            Set dark contrast for the content
                          </Text>
                        </FormGroup>

                        <FormGroup>
                          <Flex alignItems="center">
                            <Switch
                              checked={config.lightContrast}
                              onChange={handleConfigChange('lightContrast')}
                            />
                            <Box marginLeft="small">
                              <Text>Light Contrast</Text>
                            </Box>
                          </Flex>
                          <Text color="secondary" marginLeft="xxLarge">
                            Set light contrast for the content
                          </Text>
                        </FormGroup>

                        <FormGroup>
                          <Flex alignItems="center">
                            <Switch
                              checked={config.highContrast}
                              onChange={handleConfigChange('highContrast')}
                            />
                            <Box marginLeft="small">
                              <Text>High Contrast</Text>
                            </Box>
                          </Flex>
                          <Text color="secondary" marginLeft="xxLarge">
                            Increase color contrast for the site content
                          </Text>
                        </FormGroup>
                      </Box>

                      {/* Color Mode Options */}
                      <Box marginTop="large">
                        <Text bold marginBottom="small">Color Modes</Text>
                        
                        <FormGroup>
                          <Flex alignItems="center">
                            <Switch
                              checked={config.monochrome}
                              onChange={handleConfigChange('monochrome')}
                            />
                            <Box marginLeft="small">
                              <Text>Monochrome</Text>
                            </Box>
                          </Flex>
                          <Text color="secondary" marginLeft="xxLarge">
                            Apply a monochrome color scheme for the content
                          </Text>
                        </FormGroup>

                        <FormGroup>
                          <Flex alignItems="center">
                            <Switch
                              checked={config.highSaturation}
                              onChange={handleConfigChange('highSaturation')}
                            />
                            <Box marginLeft="small">
                              <Text>High Saturation</Text>
                            </Box>
                          </Flex>
                          <Text color="secondary" marginLeft="xxLarge">
                            Add color saturation for the site content
                          </Text>
                        </FormGroup>

                        <FormGroup>
                          <Flex alignItems="center">
                            <Switch
                              checked={config.lowSaturation}
                              onChange={handleConfigChange('lowSaturation')}
                            />
                            <Box marginLeft="small">
                              <Text>Low Saturation</Text>
                            </Box>
                          </Flex>
                          <Text color="secondary" marginLeft="xxLarge">
                            Minimize color saturation for the site content
                          </Text>
                        </FormGroup>
                      </Box>

                      {/* Color Picker Options */}
                      <Box marginTop="large">
                        <Text bold marginBottom="small">Color Customization</Text>
                        
                        <FormGroup>
                          <Flex alignItems="center">
                            <Switch
                              checked={config.textColors}
                              onChange={handleConfigChange('textColors')}
                            />
                            <Box marginLeft="small">
                              <Text>Text Colors</Text>
                            </Box>
                          </Flex>
                          <Text color="secondary" marginLeft="xxLarge">
                            Display a color picker to adjust the text color of website content
                          </Text>
                        </FormGroup>

                        <FormGroup>
                          <Flex alignItems="center">
                            <Switch
                              checked={config.titleColors}
                              onChange={handleConfigChange('titleColors')}
                            />
                            <Box marginLeft="small">
                              <Text>Title Colors</Text>
                            </Box>
                          </Flex>
                          <Text color="secondary" marginLeft="xxLarge">
                            Display a color picker to adjust the titles color of website content
                          </Text>
                        </FormGroup>

                        <FormGroup>
                          <Flex alignItems="center">
                            <Switch
                              checked={config.backgroundColors}
                              onChange={handleConfigChange('backgroundColors')}
                            />
                            <Box marginLeft="small">
                              <Text>Background Colors</Text>
                            </Box>
                          </Flex>
                          <Text color="secondary" marginLeft="xxLarge">
                            Display a color picker to adjust the background color of website
                          </Text>
                        </FormGroup>
                      </Box>
                    </Form>
                  </Box>
                )}

                {activeTab === 'orientation' && (
                  <Box id="orientation-content">
                    <Form>
                      {/* Main Toggle */}
                      <FormGroup>
                        <Flex alignItems="center">
                          <Switch
                            checked={config.easyOrientation}
                            onChange={handleConfigChange('easyOrientation')}
                          />
                          <Box marginLeft="small">
                            <Text>Enable Easy Orientation</Text>
                          </Box>
                        </Flex>
                        <Text color="secondary" marginLeft="xxLarge">
                          Enable/disable block settings of the Easy Orientation
                        </Text>
                      </FormGroup>

                      {/* Content Control */}
                      <Box marginTop="large">
                        <Text bold marginBottom="small">Content Control</Text>
                        
                        <FormGroup>
                          <Flex alignItems="center">
                            <Switch
                              checked={config.muteSounds}
                              onChange={handleConfigChange('muteSounds')}
                            />
                            <Box marginLeft="small">
                              <Text>Mute Sounds</Text>
                            </Box>
                          </Flex>
                          <Text color="secondary" marginLeft="xxLarge">
                            Mute all sounds on the page
                          </Text>
                        </FormGroup>

                        <FormGroup>
                          <Flex alignItems="center">
                            <Switch
                              checked={config.hideImages}
                              onChange={handleConfigChange('hideImages')}
                            />
                            <Box marginLeft="small">
                              <Text>Hide Images</Text>
                            </Box>
                          </Flex>
                          <Text color="secondary" marginLeft="xxLarge">
                            Hide all images on the page
                          </Text>
                        </FormGroup>

                        <FormGroup>
                          <Flex alignItems="center">
                            <Switch
                              checked={config.stopAnimations}
                              onChange={handleConfigChange('stopAnimations')}
                            />
                            <Box marginLeft="small">
                              <Text>Stop Animations</Text>
                            </Box>
                          </Flex>
                          <Text color="secondary" marginLeft="xxLarge">
                            Disable animations on the page
                          </Text>
                        </FormGroup>
                      </Box>

                      {/* Reading Aids */}
                      <Box marginTop="large">
                        <Text bold marginBottom="small">Reading Aids</Text>
                        
                        <FormGroup>
                          <Flex alignItems="center">
                            <Switch
                              checked={config.readingGuide}
                              onChange={handleConfigChange('readingGuide')}
                            />
                            <Box marginLeft="small">
                              <Text>Reading Guide</Text>
                            </Box>
                          </Flex>
                          <Text color="secondary" marginLeft="xxLarge">
                            Display a guideline that follows the cursor for focused reading
                          </Text>
                        </FormGroup>

                        <FormGroup>
                          <Flex alignItems="center">
                            <Switch
                              checked={config.readingMask}
                              onChange={handleConfigChange('readingMask')}
                            />
                            <Box marginLeft="small">
                              <Text>Reading Mask</Text>
                            </Box>
                          </Flex>
                          <Text color="secondary" marginLeft="xxLarge">
                            Create a horizontal mask that follows the cursor for focused content selection
                          </Text>
                        </FormGroup>

                        <FormGroup>
                          <Flex alignItems="center">
                            <Switch
                              checked={config.cognitiveReading}
                              onChange={handleConfigChange('cognitiveReading')}
                            />
                            <Box marginLeft="small">
                              <Text>Cognitive Reading</Text>
                            </Box>
                          </Flex>
                          <Text color="secondary" marginLeft="xxLarge">
                            Change the website content to a cognitive format
                          </Text>
                        </FormGroup>

                        <FormGroup>
                          <Flex alignItems="center">
                            <Switch
                              checked={config.cognitiveReadingFocus}
                              onChange={handleConfigChange('cognitiveReadingFocus')}
                            />
                            <Box marginLeft="small">
                              <Text>Cognitive Reading Focus</Text>
                            </Box>
                          </Flex>
                          <Text color="secondary" marginLeft="xxLarge">
                            Change text contrast to increase focus on cognitive reading anchors
                          </Text>
                        </FormGroup>

                        <FormGroup>
                          <Select
                            label="Cognitive Reading Fixation"
                            options={cognitiveReadingFixationOptions}
                            onOptionChange={handleSelectChange('cognitiveReadingFixation')}
                            value={config.cognitiveReadingFixation}
                            description="Change the size of the block allocated for cognitive reading"
                          />
                        </FormGroup>
                      </Box>

                      {/* Navigation Assistance */}
                      <Box marginTop="large">
                        <Text bold marginBottom="small">Navigation Assistance</Text>
                        
                        <FormGroup>
                          <Flex alignItems="center">
                            <Switch
                              checked={config.virtualKeyboard}
                              onChange={handleConfigChange('virtualKeyboard')}
                            />
                            <Box marginLeft="small">
                              <Text>Virtual Keyboard</Text>
                            </Box>
                          </Flex>
                          <Text color="secondary" marginLeft="xxLarge">
                            Enable virtual keyboard for input fields
                          </Text>
                        </FormGroup>

                        <FormGroup>
                          <Flex alignItems="center">
                            <Switch
                              checked={config.usefulLinks}
                              onChange={handleConfigChange('usefulLinks')}
                            />
                            <Box marginLeft="small">
                              <Text>Useful Links</Text>
                            </Box>
                          </Flex>
                          <Text color="secondary" marginLeft="xxLarge">
                            Display a select list of useful site links for quick navigation
                          </Text>
                        </FormGroup>

                        <FormGroup>
                          <Flex alignItems="center">
                            <Switch
                              checked={config.keyboardNavigation}
                              onChange={handleConfigChange('keyboardNavigation')}
                            />
                            <Box marginLeft="small">
                              <Text>Keyboard Navigation</Text>
                            </Box>
                          </Flex>
                          <Text color="secondary" marginLeft="xxLarge">
                            Enable keyboard navigation features
                          </Text>
                        </FormGroup>
                      </Box>

                      {/* Visual Feedback */}
                      <Box marginTop="large">
                        <Text bold marginBottom="small">Visual Feedback</Text>
                        
                        <FormGroup>
                          <Flex alignItems="center">
                            <Switch
                              checked={config.highlightHover}
                              onChange={handleConfigChange('highlightHover')}
                            />
                            <Box marginLeft="small">
                              <Text>Highlight Hover</Text>
                            </Box>
                          </Flex>
                          <Text color="secondary" marginLeft="xxLarge">
                            Highlight the hover area with borders
                          </Text>
                        </FormGroup>

                        <FormGroup>
                          <Flex alignItems="center">
                            <Switch
                              checked={config.highlightFocus}
                              onChange={handleConfigChange('highlightFocus')}
                            />
                            <Box marginLeft="small">
                              <Text>Highlight Focus</Text>
                            </Box>
                          </Flex>
                          <Text color="secondary" marginLeft="xxLarge">
                            Highlight the focus area with borders
                          </Text>
                        </FormGroup>
                      </Box>

                      {/* Cursor Options */}
                      <Box marginTop="large">
                        <Text bold marginBottom="small">Cursor Options</Text>
                        
                        <FormGroup>
                          <Flex alignItems="center">
                            <Switch
                              checked={config.bigBlackCursor}
                              onChange={handleConfigChange('bigBlackCursor')}
                            />
                            <Box marginLeft="small">
                              <Text>Big Black Cursor</Text>
                            </Box>
                          </Flex>
                          <Text color="secondary" marginLeft="xxLarge">
                            Enable a large black cursor
                          </Text>
                        </FormGroup>

                        <FormGroup>
                          <Flex alignItems="center">
                            <Switch
                              checked={config.bigWhiteCursor}
                              onChange={handleConfigChange('bigWhiteCursor')}
                            />
                            <Box marginLeft="small">
                              <Text>Big White Cursor</Text>
                            </Box>
                          </Flex>
                          <Text color="secondary" marginLeft="xxLarge">
                            Enable a large white cursor
                          </Text>
                        </FormGroup>
                      </Box>

                      {/* Voice Features */}
                      <Box marginTop="large">
                        <Text bold marginBottom="small">Voice Features</Text>
                        
                        <FormGroup>
                          <Flex alignItems="center">
                            <Switch
                              checked={config.textToSpeech}
                              onChange={handleConfigChange('textToSpeech')}
                            />
                            <Box marginLeft="small">
                              <Text>Text to Speech</Text>
                            </Box>
                          </Flex>
                          <Text color="secondary" marginLeft="xxLarge">
                            Enable text to speech feature (Not supported in Safari)
                          </Text>
                        </FormGroup>

                        <FormGroup>
                          <Flex alignItems="center">
                            <Switch
                              checked={config.voiceNavigation}
                              onChange={handleConfigChange('voiceNavigation')}
                            />
                            <Box marginLeft="small">
                              <Text>Voice Navigation</Text>
                            </Box>
                          </Flex>
                          <Text color="secondary" marginLeft="xxLarge">
                            Navigate the website using voice commands
                          </Text>
                        </FormGroup>
                      </Box>
                    </Form>
                  </Box>
                )}

                {activeTab === 'reading-mask' && (
                  <Box id="reading-mask-content">
                    <Form>
                      <FormGroup>
                        <Input
                          type="number"
                          label="Reading Mask Height"
                          description="Specify the height of the Reading Mask in pixels"
                          value={config.readingMaskHeight}
                          onChange={handleNumberChange('readingMaskHeight')}
                          min={1}
                        />
                      </FormGroup>
                    </Form>
                  </Box>
                )}

                {activeTab === 'virtual-keyboard' && (
                  <Box id="virtual-keyboard-content">
                    <Form>
                      <FormGroup>
                        <Select
                          label="Keyboard Layout"
                          options={virtualKeyboardLayoutOptions}
                          onOptionChange={handleSelectChange('virtualKeyboardLayout')}
                          value={config.virtualKeyboardLayout}
                          description="Specify a language layout for the virtual keyboard"
                        />
                      </FormGroup>
                    </Form>
                  </Box>
                )}

                {activeTab === 'speech' && (
                  <Box id="speech-content">
                    <Form>
                      <FormGroup>
                        <Input
                          type="text"
                          label="Speech Recognition Language"
                          description="The speech recognition language code"
                          value={config.ttsLang}
                          onChange={handleConfigChange('ttsLang')}
                          placeholder="e.g., en-US"
                        />
                      </FormGroup>

                      <FormGroup>
                        <Input
                          type="number"
                          label="Speaking Pitch"
                          description="Speaking pitch in the range [0 – 2]"
                          value={config.ttsPitch}
                          onChange={handleNumberChange('ttsPitch')}
                          min={0}
                          max={2}
                          step={0.1}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Input
                          type="number"
                          label="Speech Rate"
                          description="Voice playback speed in the range [0.1 – 10]"
                          value={config.ttsRate}
                          onChange={handleNumberChange('ttsRate')}
                          min={0.1}
                          max={10}
                          step={0.1}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Input
                          type="number"
                          label="Voice Volume"
                          description="Voice volume in the range [0 – 1]"
                          value={config.ttsVolume}
                          onChange={handleNumberChange('ttsVolume')}
                          min={0}
                          max={1}
                          step={0.1}
                        />
                      </FormGroup>
                    </Form>
                  </Box>
                )}

                {activeTab === 'tts' && (
                  <Box id="tts-content">
                    <Form>
                      <FormGroup>
                        <Select
                          label="Text to Speech Mode"
                          options={ttsModeOptions}
                          onOptionChange={handleSelectChange('ttsMode')}
                          value={config.ttsMode}
                          description="Mode of the text to speech"
                        />
                      </FormGroup>

                      <FormGroup>
                        <Select
                          label="Tooltip Position"
                          options={ttsTooltipPositionOptions}
                          onOptionChange={handleSelectChange('ttsTooltipPosition')}
                          value={config.ttsTooltipPosition}
                          description="Position of the text to speech tooltip"
                        />
                      </FormGroup>
                    </Form>
                  </Box>
                )}

                {activeTab === 'footer' && (
                  <Box id="footer-content">
                    <Form>
                      {/* Button Controls */}
                      <Box marginBottom="large">
                        <Text bold marginBottom="small">Button Controls</Text>
                        
                        <FormGroup>
                          <Flex alignItems="center">
                            <Switch
                              checked={config.resetButton}
                              onChange={handleConfigChange('resetButton')}
                            />
                            <Box marginLeft="small">
                              <Text>Reset Button</Text>
                            </Box>
                          </Flex>
                          <Text color="secondary" marginLeft="xxLarge">
                            Enable/disable the Reset button in the Accessibility popup window settings
                          </Text>
                        </FormGroup>

                        <FormGroup>
                          <Flex alignItems="center">
                            <Switch
                              checked={config.hideButton}
                              onChange={handleConfigChange('hideButton')}
                            />
                            <Box marginLeft="small">
                              <Text>Hide Button</Text>
                            </Box>
                          </Flex>
                          <Text color="secondary" marginLeft="xxLarge">
                            Enable/disable the Hide button in the Accessibility popup window settings
                          </Text>
                        </FormGroup>
                      </Box>

                      {/* Accessibility Statement */}
                      <Box marginBottom="large">
                        <Text bold marginBottom="small">Accessibility Statement</Text>
                        
                        <FormGroup>
                          <Flex alignItems="center">
                            <Switch
                              checked={config.accessibilityStatement}
                              onChange={handleConfigChange('accessibilityStatement')}
                            />
                            <Box marginLeft="small">
                              <Text>Show Statement Link</Text>
                            </Box>
                          </Flex>
                          <Text color="secondary" marginLeft="xxLarge">
                            Enable/disable the Accessibility Statement link in the popup window settings
                          </Text>
                        </FormGroup>

                        <FormGroup>
                          <Select
                            label="Statement Type"
                            options={accessibilityStatementTypeOptions}
                            onOptionChange={handleSelectChange('accessibilityStatementType')}
                            value={config.accessibilityStatementType}
                            description="Specify the type of Accessibility Statement"
                          />
                        </FormGroup>

                        <FormGroup>
                          <Input
                            type="text"
                            label="Statement Link"
                            description="Specify the Accessibility Statement link (for iframe or link types)"
                            value={config.accessibilityStatementLink}
                            onChange={handleConfigChange('accessibilityStatementLink')}
                            disabled={config.accessibilityStatementType === 'html'}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Input
                            type="text"
                            label="Statement HTML"
                            description="Specify the Accessibility Statement HTML content"
                            value={config.accessibilityStatementHtml}
                            onChange={handleConfigChange('accessibilityStatementHtml')}
                            disabled={config.accessibilityStatementType !== 'html'}
                          />
                        </FormGroup>
                      </Box>

                      {/* Branding */}
                      <Box marginBottom="large">
                        <Text bold marginBottom="small">Branding</Text>
                        
                        <FormGroup>
                          <Flex alignItems="center">
                            <Switch
                              checked={config.poweredBy}
                              onChange={handleConfigChange('poweredBy')}
                            />
                            <Box marginLeft="small">
                              <Text>Show Powered By</Text>
                            </Box>
                          </Flex>
                          <Text color="secondary" marginLeft="xxLarge">
                            Show powered by Readable link
                          </Text>
                        </FormGroup>
                      </Box>
                    </Form>
                  </Box>
                )}

                {activeTab === 'hotkeys' && (
                  <Box id="hotkeys-content">
                    <Form>
                      <FormGroup>
                        <Input
                          type="text"
                          label="Open Interface"
                          description="Hotkey combination to open the Accessibility Interface"
                          value={config.hotKeyOpenInterface}
                          onChange={handleConfigChange('hotKeyOpenInterface')}
                          placeholder="Alt+9"
                        />
                      </FormGroup>

                      <FormGroup>
                        <Input
                          type="text"
                          label="Menu Navigation"
                          description="Hotkey for menus navigation"
                          value={config.hotKeyMenu}
                          onChange={handleConfigChange('hotKeyMenu')}
                          placeholder="M"
                        />
                      </FormGroup>

                      <FormGroup>
                        <Input
                          type="text"
                          label="Headings Navigation"
                          description="Hotkey for headings navigation"
                          value={config.hotKeyHeadings}
                          onChange={handleConfigChange('hotKeyHeadings')}
                          placeholder="H"
                        />
                      </FormGroup>

                      <FormGroup>
                        <Input
                          type="text"
                          label="Forms Navigation"
                          description="Hotkey for forms navigation"
                          value={config.hotKeyForms}
                          onChange={handleConfigChange('hotKeyForms')}
                          placeholder="F"
                        />
                      </FormGroup>

                      <FormGroup>
                        <Input
                          type="text"
                          label="Buttons Navigation"
                          description="Hotkey for buttons navigation"
                          value={config.hotKeyButtons}
                          onChange={handleConfigChange('hotKeyButtons')}
                          placeholder="B"
                        />
                      </FormGroup>

                      <FormGroup>
                        <Input
                          type="text"
                          label="Graphics Navigation"
                          description="Hotkey for graphics navigation"
                          value={config.hotKeyGraphics}
                          onChange={handleConfigChange('hotKeyGraphics')}
                          placeholder="G"
                        />
                      </FormGroup>
                    </Form>
                  </Box>
                )}
            </Box>
            </Box>
          </Panel>
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
