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

        app.use(express.json({
            verify: (req, res, buf) => {
                req.rawBody = buf;
            }
        }));
        app.use(express.static('public'));

        // Health check endpoint
        app.get('/health', (req, res) => {
            res.json({ status: 'OK', timestamp: new Date().toISOString() });
        });

        // Webhook endpoint
        app.post('/webhook', (req, res) => {
            console.log('📨 ได้รับ webhook event...');

            // ปิด signature verification ชั่วคราวเพื่อทดสอบ
            console.log('🔍 Webhook received:', JSON.stringify(req.body, null, 2));

            const events = req.body.events || [];

            events.forEach(async (event) => {
                if (event.type === 'message') {
                    const userId = event.source.userId;
                    const message = event.message.text;
                    const replyToken = event.replyToken;

                    console.log('\n🎯 ข้อมูลที่ได้รับ:');
                    console.log('📱 User ID:', userId);
                    console.log('💬 Message:', message);
                    console.log('📅 Timestamp:', new Date(event.timestamp).toLocaleString());

                    // บันทึก User ID ลงไฟล์
                    const fs = require('fs');
                    const userData = {
                        userId: userId,
                        message: message,
                        timestamp: new Date(event.timestamp).toISOString()
                    };

                    try {
                        fs.writeFileSync('./user-id.json', JSON.stringify(userData, null, 2));
                        console.log('💾 บันทึก User ID ลงไฟล์ user-id.json แล้ว');
                    } catch (error) {
                        console.error('❌ ไม่สามารถบันทึกไฟล์ได้:', error.message);
                    }

                    // ส่งข้อความตอบกลับพร้อม User ID
                    await replyMessage(replyToken, `🎯 User ID ของคุณคือ:\n${userId}\n\n📝 ข้อความ: ${message}\n⏰ เวลา: ${new Date().toLocaleString('th-TH')}`);
                }
            });

            res.status(200).send('OK');
        });

        // ฟังก์ชันส่งข้อความตอบกลับ
        async function replyMessage(replyToken, message) {
            const axios = require('axios');
            require('dotenv').config({ path: './config/config.env' });
            const token = process.env.CHANNEL_ACCESS_TOKEN;

            if (!token || token === 'your_channel_access_token_here') {
                console.error('❌ ไม่พบ CHANNEL_ACCESS_TOKEN');
                return;
            }

            try {
                await axios.post('https://api.line.me/v2/bot/message/reply', {
                    replyToken: replyToken,
                    messages: [{
                        type: 'text',
                        text: message
                    }]
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                console.log('✅ ส่งข้อความตอบกลับสำเร็จ');
            } catch (error) {
                console.error('❌ ไม่สามารถส่งข้อความตอบกลับได้:', error.response?.data || error.message);
            }
        }

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