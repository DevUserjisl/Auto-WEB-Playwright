import reporter from 'multiple-cucumber-html-reporter';
import { config } from 'dotenv';
import os from 'os';
config();

const navegador = (process.env.NAVEGADOR || 'CHROMIUM').toLowerCase();

// Detecta el OS automáticamente
const platform = os.platform(); // 'win32', 'linux', 'darwin'
const platformNames = {
    win32: 'Windows',
    linux: 'Linux',
    darwin: 'MacOS'
};

reporter.generate({
    jsonDir: 'reports/',
    reportPath: 'reports/html/',
    metadata: {
        browser: { name: navegador, version: 'latest' },
        device: process.env.CI ? 'Jenkins/Kubernetes' : 'Local',
        platform: { 
            name: platformNames[platform] || platform,
            version: os.release()  // versión real del OS
        }
    },
    customData: {
        title: 'Reporte de Ejecución',
        data: [
            { label: 'Proyecto', value: 'auto-web' },
            { label: 'Release', value: '1.0.0' },
            { label: 'Ambiente', value: process.env.URL || 'URL1' },
            { label: 'Entorno', value: process.env.CI ? 'CI/CD' : 'Local' },
            { label: 'Ejecutado por', value: process.env.BUILD_USER || 'DevUser' },
            { label: 'Build', value: process.env.BUILD_NUMBER || 'N/A' },
        ]
    }
});