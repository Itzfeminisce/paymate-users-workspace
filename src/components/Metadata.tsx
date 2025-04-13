import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Helmet from "react-helmet"
import { usePlatformConfig } from '@/context/PlatformConfigContext'

const Slot = React.lazy(() => Promise.resolve({ default: Outlet }))

const Metadata = () => {
    const { getConfig } = usePlatformConfig()
    const seoMetadata = getConfig("seoMetadata");
    return (
        <>
            <Helmet>
                <title>{seoMetadata.title}</title>
                <meta name="description" content={seoMetadata.description} />
                <meta name="keywords" content={seoMetadata.keywords} />
                <meta name="robots" content={seoMetadata.robots} />

                {/* Open Graph */}
                <meta property="og:title" content={seoMetadata.og_title} />
                <meta property="og:description" content={seoMetadata.og_description} />
                <meta property="og:image" content={seoMetadata.og_image} />

                {/* Twitter */}
                <meta name="twitter:card" content={seoMetadata.twitter_card} />
                <meta name="twitter:title" content={seoMetadata.twitter_title} />
                <meta name="twitter:description" content={seoMetadata.twitter_description} />
                <meta name="twitter:image" content={seoMetadata.twitter_image} />

                {/* Canonical */}
                <link rel="canonical" href={seoMetadata.canonical_url} />

                {/* Favicon */}
                <link rel="icon" href={seoMetadata.favicon} />

                {/* Theme Color */}
                <meta name="theme-color" content={seoMetadata.theme_color} />

                {/* Language */}
                <html lang={seoMetadata.language} />
            </Helmet>


            <Suspense fallback={null}>
                <Slot />
            </Suspense>
        </>
    )
}

export default Metadata