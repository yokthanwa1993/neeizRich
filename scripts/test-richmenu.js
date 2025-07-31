/**
 * ทดสอบ Rich Menu
 * LINE Rich Menu 2-Tab Switcher
 */

const fs = require('fs');
const path = require('path');
const LineAPI = require('../lib/line-api');

// โหลด config
require('dotenv').config({ path: './config/config.env' });

async function testRichMenu() {
    const lineAPI = new LineAPI();
    
    console.log('🧪 ทดสอบ Rich Menu...\n');
    
    try {
        // 1. ดู Rich Menu ทั้งหมด
        console.log('📋 Rich Menu ทั้งหมด:');
        const richMenuList = await lineAPI.getRichMenuList();
        console.log(`   จำนวน Rich Menu: ${richMenuList.richmenus.length}`);
        
        richMenuList.richmenus.forEach((menu, index) => {
            console.log(`   ${index + 1}. ${menu.name} (${menu.richMenuId})`);
        });
        
        // 2. ดู Rich Menu ที่ผูกกับ User
        const userId = process.env.USER_ID;
        if (userId && userId !== 'your_user_id_here') {
            console.log('\n👤 Rich Menu ที่ผูกกับ User:');
            try {
                const userRichMenu = await lineAPI.getUserRichMenu(userId);
                console.log(`   User ID: ${userId}`);
                console.log(`   Rich Menu ID: ${userRichMenu.richMenuId}`);
            } catch (error) {
                console.log(`   ไม่มี Rich Menu ที่ผูกกับ User: ${error.message}`);
            }
        }
        
        // 3. ตรวจสอบไฟล์ config
        const configPath = path.join(__dirname, '../config/richmenu-ids.json');
        if (fs.existsSync(configPath)) {
            console.log('\n📁 ข้อมูล Rich Menu ในไฟล์ config:');
            const configData = JSON.parse(fs.readFileSync(configPath, 'utf8'));
            console.log(`   Menu A: ${configData.RICHMENU_A_ID}`);
            console.log(`   Menu B: ${configData.RICHMENU_B_ID}`);
            console.log(`   Alias A: ${configData.RICHMENU_ALIAS_A}`);
            console.log(`   Alias B: ${configData.RICHMENU_ALIAS_B}`);
        } else {
            console.log('\n📁 ไม่พบไฟล์ config/richmenu-ids.json');
        }
        
        // 4. ตรวจสอบรูปภาพ
        console.log('\n🖼️ ตรวจสอบรูปภาพ:');
        const imageAPath = path.join(__dirname, '../images/menu-a.png');
        const imageBPath = path.join(__dirname, '../images/menu-b.png');
        
        if (fs.existsSync(imageAPath)) {
            const stats = fs.statSync(imageAPath);
            console.log(`   ✅ menu-a.png (${(stats.size / 1024).toFixed(2)} KB)`);
        } else {
            console.log('   ❌ menu-a.png (ไม่พบ)');
        }
        
        if (fs.existsSync(imageBPath)) {
            const stats = fs.statSync(imageBPath);
            console.log(`   ✅ menu-b.png (${(stats.size / 1024).toFixed(2)} KB)`);
        } else {
            console.log('   ❌ menu-b.png (ไม่พบ)');
        }
        
        console.log('\n🎉 การทดสอบเสร็จสิ้น!');
        console.log('\n📝 คำสั่งเพิ่มเติม:');
        console.log('   - สร้าง Rich Menu: npm run create');
        console.log('   - อัปโหลดรูปภาพ: npm run upload');
        console.log('   - ผูกเมนูให้ User: npm run link');
        console.log('   - ลบ Rich Menu: npm run cleanup');
        
    } catch (error) {
        console.error('❌ เกิดข้อผิดพลาด:', error.message);
        throw error;
    }
}

// รันฟังก์ชันถ้าเรียกโดยตรง
if (require.main === module) {
    testRichMenu().catch(error => {
        console.error('❌ เกิดข้อผิดพลาด:', error.message);
        process.exit(1);
    });
}

module.exports = { testRichMenu }; 