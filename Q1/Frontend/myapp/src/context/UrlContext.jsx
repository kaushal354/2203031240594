import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import logger from '../utils/logger';

const UrlContext = createContext();
export const useUrl = () => useContext(UrlContext);

export const UrlProvider = ({ children }) => {
  const [urls, setUrls] = useState([]);

  const addUrl = (longUrl, customCode, validity) => {
    let code = customCode ? customCode : uuidv4().slice(0, 6);
    const createdAt = new Date();
    const expiresAt = new Date(createdAt.getTime() + validity * 60000);

    const isDuplicate = urls.find(url => url.shortCode === code);
    if (isDuplicate) return false;

    const newUrl = {
      longUrl,
      shortCode: code,
      createdAt,
      expiresAt,
      clicks: []
    };

    setUrls(prev => [...prev, newUrl]);
    logger.logInfo('URL shortened:', newUrl);
    return true;
  };

  const logClick = (code, source = 'Unknown', location = 'Unknown') => {
    setUrls(prev => prev.map(url => {
      if (url.shortCode === code) {
        return {
          ...url,
          clicks: [...url.clicks, { timestamp: new Date(), source, location }]
        };
      }
      return url;
    }));
  };

  return (
    <UrlContext.Provider value={{ urls, addUrl, logClick }}>
      {children}
    </UrlContext.Provider>
  );
};