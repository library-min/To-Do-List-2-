// vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    css: {
        postcss: './postcss.config.cjs',
    },
    base: './', // 깃허브 페이지 배포를 위해 추가
    build: {
        outDir: 'docs' // 💡 빌드 폴더 이름을 'build'로 설정
    }
});