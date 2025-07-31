/**
 * สคริปต์เพื่อหา User ID
 * ส่งข้อความหา Bot เพื่อหา User ID
 */

const LineAPI = require('../lib/line-api');
require('dotenv').config({ path: './config/config.env' });

async function getUserID() {
    const lineAPI = new LineAPI();
    
    console.log('🔍 วิธีหา User ID:');
    console.log('1. ส่งข้อความหา Bot ของคุณ');
    console.log('2. ดูใน webhook หรือ log ของ Bot');
    console.log('3. User ID จะมีรูปแบบ: U1234567890abcdef');
    console.log('\n📝 ตัวอย่าง User ID ที่ถูกต้อง:');
    console.log('   U1234567890abcdef1234567890abcdef');
    console.log('   Uabcdef1234567890abcdef1234567890');
    console.log('\n❌ ตัวอย่าง User ID ที่ผิด:');
    console.log('   @288soqth (ไม่ใช่ User ID)');
    console.log('   U288soqth (สั้นเกินไป)');
    console.log('\n💡 เคล็ดลับ:');
    console.log('   - User ID ต้องขึ้นต้นด้วย U');
    console.log('   - ตามด้วยตัวอักษรและตัวเลข 33 ตัว');
    console.log('   - รวมทั้งหมด 34 ตัวอักษร');
}

// รันฟังก์ชันถ้าเรียกโดยตรง
if (require.main === module) {
    getUserID().catch(error => {
        console.error('❌ เกิดข้อผิดพลาด:', error.message);
        process.exit(1);
    });
}

module.exports = { getUserID }; 