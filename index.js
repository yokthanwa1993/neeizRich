#!/usr/bin/env node

/**
 * LINE Rich Menu 2-Tab Switcher
 * สร้าง Rich Menu แบบ 2 แท็บด้วย Node.js
 */

const express = require('express');
const { createRichMenus } = require('./scripts/create-richmenus');
const { uploadImages } = require('./scripts/upload-images');
const { linkToUser } = require('./scripts/link-to-user');
const { cleanup } = require('./scripts/cleanup');
const { createSampleImages } = require('./scripts/create-sample-images');
const { createSimpleImages } = require('./scripts/create-simple-images');

async function main() {
    const command = process.argv[2];
    
    // ถ้าเป็น serve command ให้รัน web server
    if (command === 'serve') {
        const app = express();
        const PORT = process.env.PORT || 3000;
        
        app.use(express.json());
        app.use(express.static('public'));
        
        // Health check endpoint
        app.get('/health', (req, res) => {
            res.json({ status: 'OK', timestamp: new Date().toISOString() });
        });
        
        // API endpoints
        app.get('/api/status', (req, res) => {
            res.json({
                name: 'neeizRich',
                version: '1.0.0',
                description: 'LINE Rich Menu 2-tab switcher',
                status: 'running'
            });
        });
        
        app.post('/api/create', async (req, res) => {
            try {
                await createRichMenus();
                res.json({ success: true, message: 'Rich Menu created successfully' });
            } catch (error) {
                res.status(500).json({ success: false, error: error.message });
            }
        });
        
        app.post('/api/deploy', async (req, res) => {
            try {
                await createRichMenus();
                await uploadImages();
                await linkToUser();
                res.json({ success: true, message: 'Deploy completed successfully' });
            } catch (error) {
                res.status(500).json({ success: false, error: error.message });
            }
        });
        
        // Root endpoint
        app.get('/', (req, res) => {
            res.send(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>neeizRich - LINE Rich Menu</title>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <style>
                        body { font-family: Arial, sans-serif; margin: 40px; }
                        .container { max-width: 800px; margin: 0 auto; }
                        .card { background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0; }
                        .btn { background: #007bff; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; }
                        .btn:hover { background: #0056b3; }
                        .status { color: #28a745; }
                        .error { color: #dc3545; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>🚀 neeizRich</h1>
                        <p>LINE Rich Menu 2-tab switcher</p>
                        
                        <div class="card">
                            <h2>📋 Status</h2>
                            <div id="status">Loading...</div>
                        </div>
                        
                        <div class="card">
                            <h2>⚡ Quick Actions</h2>
                            <button class="btn" onclick="deploy()">🚀 Deploy Rich Menu</button>
                            <button class="btn" onclick="checkStatus()">📊 Check Status</button>
                        </div>
                        
                        <div class="card">
                            <h2>📝 API Endpoints</h2>
                            <ul>
                                <li><code>GET /health</code> - Health check</li>
                                <li><code>GET /api/status</code> - App status</li>
                                <li><code>POST /api/create</code> - Create Rich Menu</li>
                                <li><code>POST /api/deploy</code> - Deploy everything</li>
                            </ul>
                        </div>
                    </div>
                    
                    <script>
                        async function checkStatus() {
                            try {
                                const response = await fetch('/api/status');
                                const data = await response.json();
                                document.getElementById('status').innerHTML = 
                                    '<span class="status">✅ Running</span><br>' +
                                    'Name: ' + data.name + '<br>' +
                                    'Version: ' + data.version;
                            } catch (error) {
                                document.getElementById('status').innerHTML = 
                                    '<span class="error">❌ Error: ' + error.message + '</span>';
                            }
                        }
                        
                        async function deploy() {
                            try {
                                document.getElementById('status').innerHTML = '🔄 Deploying...';
                                const response = await fetch('/api/deploy', { method: 'POST' });
                                const data = await response.json();
                                if (data.success) {
                                    document.getElementById('status').innerHTML = 
                                        '<span class="status">✅ ' + data.message + '</span>';
                                } else {
                                    document.getElementById('status').innerHTML = 
                                        '<span class="error">❌ ' + data.error + '</span>';
                                }
                            } catch (error) {
                                document.getElementById('status').innerHTML = 
                                    '<span class="error">❌ Error: ' + error.message + '</span>';
                            }
                        }
                        
                        // Check status on load
                        checkStatus();
                    </script>
                </body>
                </html>
            `);
        });
        
        app.listen(PORT, () => {
            console.log(`🚀 neeizRich server running on port ${PORT}`);
            console.log(`📊 Health check: http://localhost:${PORT}/health`);
            console.log(`🌐 Web interface: http://localhost:${PORT}`);
        });
        
        return;
    }
    
    console.log('🚀 LINE Rich Menu 2-Tab Switcher');
    console.log('=====================================\n');
    
    try {
        switch (command) {
            case 'create':
                console.log('📝 สร้าง Rich Menu และ Alias...');
                await createRichMenus();
                break;
                
            case 'upload':
                console.log('🖼️ อัปโหลดรูปภาพ...');
                await uploadImages();
                break;
                
            case 'link':
                console.log('🔗 ผูก Rich Menu ให้ User...');
                await linkToUser();
                break;
                
            case 'cleanup':
                console.log('🗑️ ลบ Rich Menu และ Alias...');
                await cleanup();
                break;
                
            case 'deploy':
                console.log('🚀 Deploy ทั้งหมด...');
                await createRichMenus();
                await uploadImages();
                await linkToUser();
                console.log('\n🎉 Deploy สำเร็จ!');
                break;
                
            case 'samples':
                console.log('🎨 สร้างรูปภาพตัวอย่าง...');
                await createSampleImages();
                break;
                
            case 'simple':
                console.log('🎨 สร้างรูปภาพง่ายๆ...');
                await createSimpleImages();
                break;
                
            default:
                console.log('📋 คำสั่งที่ใช้งานได้:');
                console.log('  npm run create   - สร้าง Rich Menu และ Alias');
                console.log('  npm run upload   - อัปโหลดรูปภาพ');
                console.log('  npm run link     - ผูกเมนูให้ User');
                console.log('  npm run cleanup  - ลบ Rich Menu และ Alias');
                console.log('  npm run deploy   - Deploy ทั้งหมด');
                console.log('  npm run test     - ทดสอบ Rich Menu');
                console.log('  npm run samples  - สร้างรูปภาพตัวอย่าง');
                console.log('  npm run simple   - สร้างรูปภาพง่ายๆ');
                console.log('  npm start        - รัน web server');
                console.log('\n📝 ตัวอย่าง: node index.js create');
                console.log('\n🚀 Quick Start:');
                console.log('   1. แก้ไข config/config.env');
                console.log('   2. npm run simple (สร้างรูปภาพ)');
                console.log('   3. npm run deploy (Deploy ทั้งหมด)');
                console.log('   4. npm start (รัน web server)');
                break;
        }
    } catch (error) {
        console.error('❌ เกิดข้อผิดพลาด:', error.message);
        process.exit(1);
    }
}

if (require.main === module) {
    main();
}

module.exports = { main }; 