import { useEffect, useState } from 'react';
import { fetchApi } from '../utils/api';
import { DEFAULT_DATA } from '../data/siteData';

export default function useSiteData() {
  const [data, setData] = useState(() => structuredClone(DEFAULT_DATA));

  useEffect(() => {
    const loadData = () => {
      fetchApi('/site')
        .then((fetchedData) => setData((currentData) => ({
          ...currentData,
          ...fetchedData,
          hero: { ...currentData.hero, ...fetchedData.hero },
          intro: { ...currentData.intro, ...fetchedData.intro },
          about: { ...currentData.about, ...fetchedData.about },
          contact: { ...currentData.contact, ...fetchedData.contact },
          social: { ...currentData.social, ...fetchedData.social },
          wings: fetchedData.wings?.length ? fetchedData.wings : currentData.wings,
          resources: fetchedData.resources || currentData.resources,
          gallery: fetchedData.gallery || currentData.gallery,
        })))
        .catch((error) => console.error('Failed to load site data', error));
    };

    loadData();
    window.addEventListener('site-data-updated', loadData);
    return () => window.removeEventListener('site-data-updated', loadData);
  }, []);

  return data;
}
