/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["vudka-img.s3.eu-north-1.amazonaws.com"],
  },
  env: {
    exchange: "39",
    mongo:
      "mongodb+srv://Michael:5ee1lMLCEgfZ63my@cluster0.zhwvu1m.mongodb.net/",
  },
};

module.exports = nextConfig
