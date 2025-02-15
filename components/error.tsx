import { H3, Panel } from '@bigcommerce/big-design';
import { ErrorMessageProps, ErrorProps } from '../types';
import Loading from './loading';

const ErrorContent = ({ message }: Pick<ErrorProps, 'message'>) => (
    <Loading />
);

const ErrorMessage = ({ error, renderPanel = true }: ErrorMessageProps) => {
    return <Loading />;
};

export default ErrorMessage;
