// vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    css: {
        postcss: './postcss.config.cjs',
    },
    base: '/To_Do_List_2/', // GitHub Pages 저장소명에 맞춘 base path
    build: {
        outDir: 'docs' // 💡 빌드 폴더 이름을 'build'로 설정
    }
});