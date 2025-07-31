/**
 * LINE Webhook Server
 * รับ webhook events จาก LINE และแสดง User ID
 */

const express = require('express');
const crypto = require('crypto');
require('dotenv').config({ path: './config/config.env' });

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json({ verify: (req, res, buf) => {
    req.rawBody = buf;
}}));

// ตรวจสอบ signature จาก LINE
function verifySignature(req) {
    const signature = req.headers['x-line-signature'];
    const channelSecret = process.env.CHANNEL_SECRET || 'your_channel_secret_here';
    const hash = crypto.createHmac('SHA256', channelSecret)
        .update(req.rawBody)
        .digest('base64');
    return signature === hash;
}

// Webhook endpoint
app.post('/webhook', (req, res) => {
    console.log('📨 ได้รับ webhook event...');
    
    // ตรวจสอบ signature
    if (!verifySignature(req)) {
        console.log('❌ Invalid signature');
        return res.status(401).send('Unauthorized');
    }
    
    const events = req.body.events;
    
    events.forEach(event => {
        if (event.type === 'message') {
            const userId = event.source.userId;
            const message = event.message.text;
            
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
            
            fs.writeFileSync('./user-id.json', JSON.stringify(userData, null, 2));
            console.log('💾 บันทึก User ID ลงไฟล์ user-id.json แล้ว');
            
            // ส่งข้อความตอบกลับ
            replyMessage(event.replyToken, `ได้รับข้อความของคุณแล้ว! User ID: ${userId}`);
        }
    });
    
    res.status(200).send('OK');
});

// ส่งข้อความตอบกลับ
async function replyMessage(replyToken, message) {
    const axios = require('axios');
    const token = process.env.CHANNEL_ACCESS_TOKEN;
    
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
        console.error('❌ ไม่สามารถส่งข้อความตอบกลับได้:', error.message);
    }
}

// Health check endpoint
app.get('/', (req, res) => {
    res.send(`
        <h1>LINE Webhook Server</h1>
        <p>Server กำลังทำงานอยู่</p>
        <p>ส่งข้อความหา Bot เพื่อหา User ID</p>
        <p>User ID จะถูกบันทึกในไฟล์ user-id.json</p>
    `);
});

// เริ่ม server
app.listen(PORT, () => {
    console.log(`🚀 Webhook Server เริ่มทำงานที่ port ${PORT}`);
    console.log(`📡 Webhook URL: http://localhost:${PORT}/webhook`);
    console.log('\n📝 วิธีใช้งาน:');
    console.log('1. เปิด LINE App');
    console.log('2. ส่งข้อความหา Bot ของคุณ');
    console.log('3. ดู User ID ที่แสดงในคอนโซล');
    console.log('4. หรือดูในไฟล์ user-id.json');
    console.log('\n💡 หมายเหตุ:');
    console.log('- ต้องตั้งค่า webhook URL ใน LINE Developers Console');
    console.log('- ต้องมี CHANNEL_SECRET ใน config.env');
});

module.exports = app; 