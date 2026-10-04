import { useEffect, useState } from 'react';
import { getData } from '../data/siteData';

export default function useSiteData() {
    const [data, setData] = useState(getData);
    useEffect(() => {
        const fn = () => setData(getData());
        window.addEventListener('site-data-updated', fn); return () => window.removeEventListener('site-data-updated', fn)
    }, []); return data
}
