import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

const SEO = ({ 
  title = "Next Store Quest - Premium Online Shopping",
  description = "Discover amazing products at unbeatable prices. Shop the latest trends in fashion, electronics, and more with fast shipping and excellent customer service.",
  keywords = "online shopping, ecommerce, fashion, electronics, deals, premium products",
  image = "/og-image.png",
  url = "/"
}: SEOProps) => {
  const fullTitle = title.includes("Next Store Quest") ? title : `${title} | Next Store Quest`;
  const fullUrl = `${window.location.origin}${url}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content="website" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
    </Helmet>
  );
};

export default SEO;