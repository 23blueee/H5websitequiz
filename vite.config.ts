import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // 代理API请求到后端服务器
      '/api': {
        target: 'https://b.test.yuqi-tech.cn',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  // 添加错误处理配置
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        // 忽略 isDragging 重复声明的警告
        if (warning.code === 'CIRCULAR_DEPENDENCY' || 
            warning.message.includes('isDragging')) {
          return;
        }
        warn(warning);
      },
    },
  },
})
