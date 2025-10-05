
			/** @type {import('next').NextConfig} */
			const nextConfig = {
				images: {
						remotePatterns: [
							{ protocol: 'https', hostname: 'www.infoescola.com' },
							{ protocol: 'https', hostname: 'image.tuasaude.com' },
							{ protocol: 'https', hostname: 's2-ge.glbimg.com' },
							{ protocol: 'https', hostname: 'p2.trrsf.com' },
							{ protocol: 'https', hostname: 'totalpass.com' },
							{ protocol: 'https', hostname: 'encrypted-tbn0.gstatic.com' },
							{ protocol: 'https', hostname: 'encrypted-tbn1.gstatic.com' },
							{ protocol: 'https', hostname: 'encrypted-tbn2.gstatic.com' },
							{ protocol: 'https', hostname: 'encrypted-tbn3.gstatic.com' },
							{ protocol: 'https', hostname: 'belaflorplantas.com.br' },
							{ protocol: 'https', hostname: 'www.correiobraziliense.com.br' },
							{ protocol: 'https', hostname: 'admin.cnnbrasil.com.br' },
							{ protocol: 'https', hostname: 'www.picturethisai.com' },
							{ protocol: 'https', hostname: 'www.oficinadeervas.com.br' },
						],
				},
			};

			export default nextConfig;
