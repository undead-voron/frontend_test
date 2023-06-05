import path from 'path';

import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: { '~': path.resolve(__dirname) },
  },
  plugins: [vue()],
});
