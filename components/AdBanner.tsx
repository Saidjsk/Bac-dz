import React, { useEffect } from 'react';

// This allows us to access the adsbygoogle property on the window object
declare global {
  interface Window {
    adsbygoogle: { [key: string]: unknown }[];
  }
}

interface AdBannerProps {
  'data-ad-client': string;
  'data-ad-slot': string;
  className?: string;
  style?: React.CSSProperties;
}

const AdBanner: React.FC<AdBannerProps> = ({
  'data-ad-client': dataAdClient,
  'data-ad-slot': dataAdSlot,
  className,
  style,
}) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  return (
    <div className={className} style={{ ...style, overflow: 'hidden', textAlign: 'center' }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={dataAdClient}
        data-ad-slot={dataAdSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdBanner;
