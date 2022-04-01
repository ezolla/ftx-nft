const moduleExports = {
  env: {
    ENVIRONMNET: process.env.ENVIRONMNET,
    API_URL: process.env.API_URL,
  },
  images: {
    domains: [
      'i.imgur.com',
      'static.ftx.com',
      'arweave.net',
      'lh3.googleusercontent.com',
    ],
  },
  compiler: {
    styledComponents: true,
  },
  experimental: { images: { layoutRaw: true } },
}

module.exports = moduleExports
