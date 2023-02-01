import localFont from '@next/font/local'

export const fontSpoqa = localFont({
  variable: '--font-spoqa',
  src: [
    {
      path: '../assets/fonts/SpoqaHanSansNeo-Thin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../assets/fonts/SpoqaHanSansNeo-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../assets/fonts/SpoqaHanSansNeo-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/SpoqaHanSansNeo-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/SpoqaHanSansNeo-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
})
