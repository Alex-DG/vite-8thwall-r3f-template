import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'
import glsl from 'vite-plugin-glsl'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), glsl(), basicSsl()],
  assetExtensions: [
    '**/*.glb',
    '**/*.gltf',
    '**/*.fbx',
    '**/*.mp4',
    '**/*.webp',
    '**/*.png',
    '**/*.jpg',
  ],
})
