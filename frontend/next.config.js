/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/quizzes',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;