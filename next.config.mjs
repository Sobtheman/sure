/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/producto/camiseta-dissidencia", destination: "/producto/camiseta-disidencia", permanent: true },
      { source: "/producto/hoodie-dissidencia", destination: "/producto/hoodie-disidencia", permanent: true },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [390, 640, 828, 1080, 1280, 1640, 2048],
  },
};

export default nextConfig;
