import { Flex, H3, Panel, ProgressCircle } from '@bigcommerce/big-design';

const Loading = () => (
    // <Panel>
        <Flex justifyContent="center" alignItems="center">
            <ProgressCircle size="large" />
        </Flex>
    // </Panel>
);

export default Loading;
