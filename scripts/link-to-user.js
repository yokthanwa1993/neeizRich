/**
 * ผูก Rich Menu ให้กับ User
 * LINE Rich Menu 2-Tab Switcher
 */

const fs = require('fs');
const path = require('path');
const LineAPI = require('../lib/line-api');

// โหลด config
require('dotenv').config({ path: './config/config.env' });

async function linkToUser() {
    const lineAPI = new LineAPI();
    
    console.log('🔗 เริ่มผูก Rich Menu ให้กับ User...\n');
    
    try {
        // ตรวจสอบ User ID
        const userId = process.env.USER_ID;
        if (!userId || userId === 'your_user_id_here') {
            throw new Error('กรุณาตั้งค่า USER_ID ใน config/config.env');
        }
        
        // โหลด Rich Menu IDs
        const configPath = path.join(__dirname, '../config/richmenu-ids.json');
        if (!fs.existsSync(configPath)) {
            throw new Error('ไม่พบไฟล์ config/richmenu-ids.json กรุณารัน npm run create ก่อน');
        }
        
        const configData = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        const { RICHMENU_A_ID, RICHMENU_NAME_A } = configData;
        
        // ผูก Rich Menu A ให้กับ User (เริ่มต้นด้วย Menu A)
        console.log('📎 ผูก Rich Menu A ให้กับ User...');
        await lineAPI.linkRichMenuToUser(userId, RICHMENU_A_ID);
        console.log('✅ ผูก Rich Menu A สำเร็จ');
        
        console.log('\n🎉 ผูก Rich Menu สำเร็จ!');
        console.log('📋 ข้อมูลการผูก:');
        console.log(`   User ID: ${userId}`);
        console.log(`   Rich Menu ID: ${RICHMENU_A_ID}`);
        console.log(`   Rich Menu Name: ${RICHMENU_NAME_A}`);
        console.log('\n🔗 ขั้นตอนต่อไป:');
        console.log('   1. เปิด LINE และทดสอบ Rich Menu');
        console.log('   2. กดปุ่มเพื่อสลับระหว่างแท็บ A และ B');
        console.log('\n📝 คำสั่งเพิ่มเติม:');
        console.log('   - ดู Rich Menu ทั้งหมด: npm run test');
        console.log('   - ลบ Rich Menu: npm run cleanup');
        
    } catch (error) {
        console.error('❌ เกิดข้อผิดพลาด:', error.message);
        throw error;
    }
}

// รันฟังก์ชันถ้าเรียกโดยตรง
if (require.main === module) {
    linkToUser().catch(error => {
        console.error('❌ เกิดข้อผิดพลาด:', error.message);
        process.exit(1);
    });
}

module.exports = { linkToUser }; 