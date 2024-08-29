// createEmotionCache.js
import createCache from '@emotion/cache';

export default function createEmotionCache() {
  return createCache({
    key: 'css',
    prepend: true,
    nonce: '12341234', // Replace this with an actual nonce
  });
}