import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
	plugins: [
		sveltekit(),
		purgeCss(),
		VitePWA({
			registerType: 'autoUpdate',
			manifest: {
				name: 'Dinder',
				short_name: 'Dinder',
				description: 'Your App Description',
				theme_color: '#ffffff',
				background_color: '#ffffff',
				display: 'standalone',
				scope: '/',
				start_url: '/'
				// Icons can be added here when available
				// icons: [
				//   {
				//     src: '/icons/android-chrome-192x192.png',
				//     sizes: '192x192',
				//     type: 'image/png',
				//   },
				//   {
				//     src: '/icons/android-chrome-512x512.png',
				//     sizes: '512x512',
				//     type: 'image/png',
				//   },
				// ],
			},
			workbox: {
				runtimeCaching: [
					{
						urlPattern: /^https:\/\/your\.api\/.*$/,
						handler: 'NetworkFirst',
						options: {
							cacheName: 'api-cache',
							networkTimeoutSeconds: 10,
							expiration: {
								maxEntries: 50,
								maxAgeSeconds: 5 * 60 // 5 minutes
							},
							cacheableResponse: {
								statuses: [0, 200]
							}
						}
					}
				]
			}
		})
	]
});
