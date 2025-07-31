/**
 * ลบ Rich Menu และ Alias
 * LINE Rich Menu 2-Tab Switcher
 */

const fs = require('fs');
const path = require('path');
const LineAPI = require('../lib/line-api');

// โหลด config
require('dotenv').config({ path: './config/config.env' });

async function cleanup() {
    const lineAPI = new LineAPI();
    
    console.log('🗑️ เริ่มลบ Rich Menu และ Alias...\n');
    
    try {
        // โหลด Rich Menu IDs
        const configPath = path.join(__dirname, '../config/richmenu-ids.json');
        if (!fs.existsSync(configPath)) {
            console.log('❌ ไม่พบไฟล์ config/richmenu-ids.json');
            console.log('ไม่มี Rich Menu ที่จะลบ');
            return;
        }
        
        const configData = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        const { 
            RICHMENU_A_ID, 
            RICHMENU_B_ID, 
            RICHMENU_ALIAS_A, 
            RICHMENU_ALIAS_B 
        } = configData;
        
        // 1. ยกเลิกการผูก Rich Menu จาก User
        const userId = process.env.USER_ID;
        if (userId && userId !== 'your_user_id_here') {
            console.log('🔗 ยกเลิกการผูก Rich Menu จาก User...');
            try {
                await lineAPI.unlinkRichMenuFromUser(userId);
                console.log('✅ ยกเลิกการผูก Rich Menu สำเร็จ');
            } catch (error) {
                console.log(`⚠️ ไม่สามารถยกเลิกการผูกได้: ${error.message}`);
            }
        }
        
        // 2. ลบ Alias B
        console.log('🏷️ ลบ Alias B...');
        try {
            await lineAPI.deleteAlias(RICHMENU_ALIAS_B);
            console.log('✅ ลบ Alias B สำเร็จ');
        } catch (error) {
            console.log(`⚠️ ไม่สามารถลบ Alias B ได้: ${error.message}`);
        }
        
        // 3. ลบ Alias A
        console.log('🏷️ ลบ Alias A...');
        try {
            await lineAPI.deleteAlias(RICHMENU_ALIAS_A);
            console.log('✅ ลบ Alias A สำเร็จ');
        } catch (error) {
            console.log(`⚠️ ไม่สามารถลบ Alias A ได้: ${error.message}`);
        }
        
        // 4. ลบ Rich Menu B
        console.log('🗑️ ลบ Rich Menu B...');
        try {
            await lineAPI.deleteRichMenu(RICHMENU_B_ID);
            console.log('✅ ลบ Rich Menu B สำเร็จ');
        } catch (error) {
            console.log(`⚠️ ไม่สามารถลบ Rich Menu B ได้: ${error.message}`);
        }
        
        // 5. ลบ Rich Menu A
        console.log('🗑️ ลบ Rich Menu A...');
        try {
            await lineAPI.deleteRichMenu(RICHMENU_A_ID);
            console.log('✅ ลบ Rich Menu A สำเร็จ');
        } catch (error) {
            console.log(`⚠️ ไม่สามารถลบ Rich Menu A ได้: ${error.message}`);
        }
        
        // 6. ลบไฟล์ config
        console.log('📁 ลบไฟล์ config...');
        try {
            fs.unlinkSync(configPath);
            console.log('✅ ลบไฟล์ config/richmenu-ids.json สำเร็จ');
        } catch (error) {
            console.log(`⚠️ ไม่สามารถลบไฟล์ config ได้: ${error.message}`);
        }
        
        console.log('\n🎉 ลบ Rich Menu และ Alias สำเร็จ!');
        console.log('📋 สิ่งที่ถูกลบ:');
        console.log(`   - Rich Menu A: ${RICHMENU_A_ID}`);
        console.log(`   - Rich Menu B: ${RICHMENU_B_ID}`);
        console.log(`   - Alias A: ${RICHMENU_ALIAS_A}`);
        console.log(`   - Alias B: ${RICHMENU_ALIAS_B}`);
        console.log('   - ไฟล์ config/richmenu-ids.json');
        
    } catch (error) {
        console.error('❌ เกิดข้อผิดพลาด:', error.message);
        throw error;
    }
}

// รันฟังก์ชันถ้าเรียกโดยตรง
if (require.main === module) {
    cleanup().catch(error => {
        console.error('❌ เกิดข้อผิดพลาด:', error.message);
        process.exit(1);
    });
}

module.exports = { cleanup }; 