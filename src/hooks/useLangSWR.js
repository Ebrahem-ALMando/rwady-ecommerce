import useSWR from 'swr';
import Cookies from 'js-cookie';

export default function useLangSWR(key, fetcher,option) {
    const lang = Cookies.get('language') || 'ar';
    return useSWR([key, lang], fetcher,{
        ...option
    });
}
