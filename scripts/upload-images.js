/**
 * อัปโหลดรูปภาพ Rich Menu
 * LINE Rich Menu 2-Tab Switcher
 */

const fs = require('fs');
const path = require('path');
const LineAPI = require('../lib/line-api');

// โหลด config
require('dotenv').config({ path: './config/config.env' });

async function uploadImages() {
    const lineAPI = new LineAPI();
    
    console.log('🖼️ เริ่มอัปโหลดรูปภาพ Rich Menu (2 แท็บ)...\n');
    
    try {
        // โหลด Rich Menu IDs
        const configPath = path.join(__dirname, '../config/richmenu-ids.json');
        if (!fs.existsSync(configPath)) {
            throw new Error('ไม่พบไฟล์ config/richmenu-ids.json กรุณารัน npm run create ก่อน');
        }
        
        const configData = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        const { RICHMENU_A_ID, RICHMENU_B_ID } = configData;
        
        // ตรวจสอบไฟล์รูปภาพ
        const imageAPath = path.join(__dirname, '../images/menu-a.png');
        const imageBPath = path.join(__dirname, '../images/menu-b.png');
        
        if (!fs.existsSync(imageAPath)) {
            throw new Error('ไม่พบไฟล์ images/menu-a.png กรุณาเพิ่มรูปภาพขนาด 2500x843px');
        }
        
        if (!fs.existsSync(imageBPath)) {
            throw new Error('ไม่พบไฟล์ images/menu-b.png กรุณาเพิ่มรูปภาพขนาด 2500x843px');
        }
        
        // 1. อัปโหลดรูปภาพสำหรับ Menu A
        console.log('📤 อัปโหลดรูปภาพสำหรับ Menu A...');
        await lineAPI.uploadRichMenuImage(RICHMENU_A_ID, imageAPath);
        console.log('✅ อัปโหลดรูปภาพ Menu A สำเร็จ');
        
        // 2. อัปโหลดรูปภาพสำหรับ Menu B
        console.log('📤 อัปโหลดรูปภาพสำหรับ Menu B...');
        await lineAPI.uploadRichMenuImage(RICHMENU_B_ID, imageBPath);
        console.log('✅ อัปโหลดรูปภาพ Menu B สำเร็จ');
        
        console.log('\n🎉 อัปโหลดรูปภาพสำเร็จ!');
        console.log('📋 รูปภาพที่อัปโหลด:');
        console.log('   Menu A: images/menu-a.png');
        console.log('   Menu B: images/menu-b.png');
        console.log('\n🔗 ขั้นตอนต่อไป:');
        console.log('   ผูกเมนูให้ User: npm run link');
        
    } catch (error) {
        console.error('❌ เกิดข้อผิดพลาด:', error.message);
        throw error;
    }
}

// รันฟังก์ชันถ้าเรียกโดยตรง
if (require.main === module) {
    uploadImages().catch(error => {
        console.error('❌ เกิดข้อผิดพลาด:', error.message);
        process.exit(1);
    });
}

module.exports = { uploadImages }; 