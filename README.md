export const metadata: Metadata = {
  metadataBase: new URL('https:akountinprofessional.co.uk'),

  title: {
    default: "Akountinprofessionals Website | Professional accounting Services in Hatfield, UK",
    template: "%s | Akountinprofessionals",
  },
  description: "Expert accounting services for UK businesses in Hatfield, Hertfordshire. Tax returns, bookkeeping, payroll, and business advisory. HMRC compliant. Call today!",
  keywords: [
    'accountant Hatfield',
    'accounting services UK',
    'tax preparation Hatfield',
    'bookkeeping services UK',
    'payroll services Hatfield',
    'payroll services UK',
    'business advisory UK',
    'HMRC compliance Hatfield',
    'small business accountant UK',
    'corporate tax services Hatfield',
    'Making Tax digital'
  ],
  authors: [{ name: "Akountinprofessionals", url: "https://akountinprofessional.co.uk" }],
  openGraph: {
    title: "Akountinprofessionals Website | Professional accounting Services in Hatfield, UK",
    description: "Expert accounting services for UK businesses in Hatfield, Hertfordshire. Tax returns, bookkeeping, payroll, and business advisory. HMRC compliant. Call today!",
    url: "https://akountinprofessional.co.uk",
    siteName: "Akountinprofessionals",
    images: [
      {
        url: "https://akountinprofessional.co.uk/og-image.jpg",
        width: 800,
        height: 600,
      }
    ],
    locale: "en_GB",
    type: "website",
  },
robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};