/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images:{
    domains:[
      'avatars.githubusercontens.com',
      'lh3.googleusercontent.com'
    ]
  }
}

module.exports = nextConfig
