/**
 * สร้าง Rich Menu และ Alias
 * LINE Rich Menu 2-Tab Switcher
 */

const fs = require('fs');
const path = require('path');
const LineAPI = require('../lib/line-api');

// โหลด config
require('dotenv').config({ path: './config/config.env' });

const richMenuA = require('../json/richmenu-a.json');
const richMenuB = require('../json/richmenu-b.json');

// ฟังก์ชัน delay
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function createRichMenus() {
    const lineAPI = new LineAPI();
    
    console.log('🚀 เริ่มสร้าง Rich Menu...\n');
    
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
        
        // รอสักครู่ให้ Rich Menu พร้อมใช้งาน
        console.log('⏳ รอให้ Rich Menu พร้อมใช้งาน...');
        await delay(3000);
        
        // 3. สร้าง Alias สำหรับ Menu A
        console.log('🏷️ สร้าง Alias สำหรับ Menu A...');
        let retryCount = 0;
        while (retryCount < 3) {
            try {
                await lineAPI.createAlias(process.env.RICHMENU_ALIAS_A || 'menu-a', richMenuAId);
                console.log(`✅ สร้าง Alias A สำเร็จ: ${process.env.RICHMENU_ALIAS_A || 'menu-a'}`);
                break;
            } catch (error) {
                retryCount++;
                console.log(`⚠️ ลองสร้าง Alias A อีกครั้ง (${retryCount}/3): ${error.message}`);
                if (retryCount < 3) {
                    await delay(2000);
                } else {
                    throw error;
                }
            }
        }
        
        // 4. สร้าง Alias สำหรับ Menu B
        console.log('🏷️ สร้าง Alias สำหรับ Menu B...');
        retryCount = 0;
        while (retryCount < 3) {
            try {
                await lineAPI.createAlias(process.env.RICHMENU_ALIAS_B || 'menu-b', richMenuBId);
                console.log(`✅ สร้าง Alias B สำเร็จ: ${process.env.RICHMENU_ALIAS_B || 'menu-b'}`);
                break;
            } catch (error) {
                retryCount++;
                console.log(`⚠️ ลองสร้าง Alias B อีกครั้ง (${retryCount}/3): ${error.message}`);
                if (retryCount < 3) {
                    await delay(2000);
                } else {
                    throw error;
                }
            }
        }
        
        // บันทึก Rich Menu IDs ลงไฟล์
        console.log('💾 บันทึก Rich Menu IDs...');
        const configData = {
            RICHMENU_A_ID: richMenuAId,
            RICHMENU_B_ID: richMenuBId,
            RICHMENU_ALIAS_A: process.env.RICHMENU_ALIAS_A || 'menu-a',
            RICHMENU_ALIAS_B: process.env.RICHMENU_ALIAS_B || 'menu-b',
            RICHMENU_NAME_A: process.env.RICHMENU_NAME_A || 'Tab A',
            RICHMENU_NAME_B: process.env.RICHMENU_NAME_B || 'Tab B'
        };
        
        fs.writeFileSync(
            path.join(__dirname, '../config/richmenu-ids.json'),
            JSON.stringify(configData, null, 2)
        );
        
        console.log('\n🎉 สร้าง Rich Menu สำเร็จ!');
        console.log('📋 Rich Menu IDs:');
        console.log(`   Menu A: ${richMenuAId}`);
        console.log(`   Menu B: ${richMenuBId}`);
        console.log(`   Alias A: ${process.env.RICHMENU_ALIAS_A || 'menu-a'}`);
        console.log(`   Alias B: ${process.env.RICHMENU_ALIAS_B || 'menu-b'}`);
        console.log('\n📁 ข้อมูลถูกบันทึกใน config/richmenu-ids.json');
        console.log('\n🔗 ขั้นตอนต่อไป:');
        console.log('   1. อัปโหลดรูปภาพ: npm run upload');
        console.log('   2. ผูกเมนูให้ User: npm run link');
        
        return configData;
        
    } catch (error) {
        console.error('❌ เกิดข้อผิดพลาด:', error.message);
        throw error;
    }
}

// รันฟังก์ชันถ้าเรียกโดยตรง
if (require.main === module) {
    createRichMenus().catch(error => {
        console.error('❌ เกิดข้อผิดพลาด:', error.message);
        process.exit(1);
    });
}

module.exports = { createRichMenus }; 