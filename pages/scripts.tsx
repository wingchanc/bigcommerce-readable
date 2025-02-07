import { Box, Flex, H1, Panel, Switch, Text } from '@bigcommerce/big-design';
import { useScripts } from '../lib/hooks';
import ErrorMessage from '../components/error';
import Loading from '../components/loading';

const Scripts = () => {
    const { scripts, isLoading, error, toggleScript } = useScripts();
    const readableScript = scripts?.find(script => script.name === 'Readable');

    if (isLoading) return <Loading />;
    if (error) return <ErrorMessage error={error} />;

    const handleToggle = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (readableScript) {
            await toggleScript(readableScript.uuid, event.target.checked);
        }
    };

    return (
        <Panel header="Readable: WCAG Accessibility">
            <Box marginBottom="medium">
                <H1>Readable: WCAG Accessibility</H1>
                <Text>Enable or disable the Readable script on your storefront.</Text>
            </Box>
            
            <Flex alignItems="center" justifyContent="space-between">
                <Box>
                    <Text>Readable</Text>
                    <Text color="secondary">Controls the Readable accessibility feature on your storefront</Text>
                </Box>
                <Switch
                    checked={readableScript?.enabled ?? false}
                    onChange={handleToggle}
                />
            </Flex>
        </Panel>
    );
};

export default Scripts; 