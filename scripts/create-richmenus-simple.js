/**
 * สร้าง Rich Menu แบบง่ายๆ (ไม่ใช้ Alias)
 * LINE Rich Menu 3-Tab Switcher
 */

const fs = require('fs');
const path = require('path');
const LineAPI = require('../lib/line-api');

// โหลด config
require('dotenv').config({ path: './config/config.env' });

const richMenuA = require('../json/richmenu-a.json');
const richMenuB = require('../json/richmenu-b.json');
const richMenuC = require('../json/richmenu-c.json');

async function createRichMenusSimple() {
    const lineAPI = new LineAPI();
    
    console.log('🚀 เริ่มสร้าง Rich Menu แบบง่ายๆ (3 แท็บ)...\n');
    
    try {
        // 1. สร้าง Rich Menu A
        console.log('📝 สร้าง Rich Menu A...');
        const richMenuAResponse = await lineAPI.createRichMenu(richMenuA);
        const richMenuAId = richMenuAResponse.richMenuId;
        console.log(`✅ สร้าง Rich Menu A สำเร็จ: ${richMenuAId}`);
        
        // 2. สร้าง Rich Menu B
        console.log('📝 สร้าง Rich Menu B...');
        const richMenuBResponse = await lineAPI.createRichMenu(richMenuB);
        const richMenuBId = richMenuBResponse.richMenuId;
        console.log(`✅ สร้าง Rich Menu B สำเร็จ: ${richMenuBId}`);
        
        // 3. สร้าง Rich Menu C
        console.log('📝 สร้าง Rich Menu C...');
        const richMenuCResponse = await lineAPI.createRichMenu(richMenuC);
        const richMenuCId = richMenuCResponse.richMenuId;
        console.log(`✅ สร้าง Rich Menu C สำเร็จ: ${richMenuCId}`);
        
        // บันทึก Rich Menu IDs ลงไฟล์
        console.log('💾 บันทึก Rich Menu IDs...');
        const configData = {
            RICHMENU_A_ID: richMenuAId,
            RICHMENU_B_ID: richMenuBId,
            RICHMENU_C_ID: richMenuCId,
            RICHMENU_NAME_A: process.env.RICHMENU_NAME_A || 'Tab A',
            RICHMENU_NAME_B: process.env.RICHMENU_NAME_B || 'Tab B',
            RICHMENU_NAME_C: process.env.RICHMENU_NAME_C || 'Tab C'
        };
        
        fs.writeFileSync(
            path.join(__dirname, '../config/richmenu-ids.json'),
            JSON.stringify(configData, null, 2)
        );
        
        console.log('\n🎉 สร้าง Rich Menu สำเร็จ!');
        console.log('📋 Rich Menu IDs:');
        console.log(`   Menu A: ${richMenuAId}`);
        console.log(`   Menu B: ${richMenuBId}`);
        console.log(`   Menu C: ${richMenuCId}`);
        console.log('\n📁 ข้อมูลถูกบันทึกใน config/richmenu-ids.json');
        console.log('\n🔗 ขั้นตอนต่อไป:');
        console.log('   1. อัปโหลดรูปภาพ: npm run upload');
        console.log('   2. ผูกเมนูให้ User: npm run link');
        console.log('\n⚠️ หมายเหตุ: ไม่ได้สร้าง Alias (ใช้ Rich Menu ID โดยตรง)');
        
        return configData;
        
    } catch (error) {
        console.error('❌ เกิดข้อผิดพลาด:', error.message);
        throw error;
    }
}

// รันฟังก์ชันถ้าเรียกโดยตรง
if (require.main === module) {
    createRichMenusSimple().catch(error => {
        console.error('❌ เกิดข้อผิดพลาด:', error.message);
        process.exit(1);
    });
}

module.exports = { createRichMenusSimple }; 