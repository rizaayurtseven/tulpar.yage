import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/proje', destination: '/#proje', permanent: true },
      { source: '/yol-haritasi', destination: '/#yol-haritasi', permanent: true },
      { source: '/ekip', destination: '/#ekip', permanent: true },
      { source: '/galeri', destination: '/#galeri', permanent: true },
      { source: '/sponsorluk', destination: '/#paydaslar', permanent: true },
      { source: '/aramizda-katilin', destination: '/#paydaslar', permanent: true },
      { source: '/iletisim', destination: '/#iletisim', permanent: true },
    ];
  },
};

export default nextConfig;
