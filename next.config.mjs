import { build } from "velite";
import createNextIntlPlugin from "next-intl/plugin";

// Ajusta la configuración para que withNextIntl envuelva toda la configuración de Next.js
const withNextIntl = createNextIntlPlugin("./app/i18n.ts");

// Define tu plugin de webpack personalizado
class VeliteWebpackPlugin {
  static started = false;
  apply(/** @type {import('webpack').Compiler} */ compiler) {
    // Ejecutado tres veces en Next.js
    // Dos veces para el servidor (runtime de nodejs / edge) y una vez para el cliente
    compiler.hooks.beforeCompile.tapPromise("VeliteWebpackPlugin", async () => {
      if (VeliteWebpackPlugin.started) return;
      VeliteWebpackPlugin.started = true;
      const dev = compiler.options.mode === "development";
      await build({ watch: dev, clean: !dev });
    });
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Otros ajustes de Next.js aquí...
  webpack: (config) => {
    config.plugins.push(new VeliteWebpackPlugin());
    return config;
  },
};

// Exporta la configuración envuelta con withNextIntl
export default withNextIntl(nextConfig);
