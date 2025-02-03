import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Change this to match your repo name
export default defineConfig({
  base: '/MERN-CRUD-todo/', // Replace with your GitHub repository name
  plugins: [react()],
});
