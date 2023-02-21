import { ConfigTypes } from '@/types/ConfigType';
import useSWR from 'swr';

type UseDataTypes = {
    data: Array<ConfigTypes>,
    isLoading: boolean,
    error: {}
}

const useData = () : UseDataTypes => {
    const fetcher = () => fetch('/api/userData').then(async res => JSON.parse(await res.json()))
    const { data , isLoading, error } = useSWR('graph-data', fetcher);
    return {
        data,
        isLoading,
        error
    }
}

export default useData;