import useSWR from 'swr';
import { useSession } from '../context/session';
import { ErrorProps } from '../types';

async function fetcher(url: string, query: string) {
    const res = await fetch(`${url}?${query}`);

    // If the status code is not in the range 200-299, throw an error
    if (!res.ok) {
        const { message } = await res.json();
        const error: ErrorProps = new Error(message || 'An error occurred while fetching the data.');
        error.status = res.status; // e.g. 500
        throw error;
    }

    return res.json();
}

export function useScripts() {
    const { context } = useSession();
    const params = new URLSearchParams({ context }).toString();
    const { data: scripts, error, mutate } = useSWR(context ? ['/api/scripts', params] : null, fetcher);

    const toggleScript = async (scriptId: string | undefined, enabled: boolean) => {
        try {
            const response = await fetch(`/api/scripts?${params}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ scriptId, enabled }),
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to toggle script');
            }
            
            await mutate(); // Refresh the scripts data
        } catch (error) {
            console.error('Error toggling script:', error);
            throw error;
        }
    };

    return {
        scripts,
        isLoading: !scripts && !error,
        error,
        toggleScript,
    };
}
