const LineAPI = require('../line-api.js');

async function clearAll() {
  try {
    const lineAPI = new LineAPI();
    
    console.log('🗑️ ล้าง Rich Menu ทั้งหมด...');
    const menuList = await lineAPI.getRichMenuList();
    
    for (const menu of menuList.richmenus) {
      try {
        await lineAPI.deleteRichMenu(menu.richMenuId);
        console.log(`✅ ลบ ${menu.richMenuId} สำเร็จ`);
      } catch (error) {
        console.log(`⚠️ ไม่สามารถลบ ${menu.richMenuId}`);
      }
    }
    
    console.log('🗑️ ล้าง Alias ทั้งหมด...');
    const aliases = ['menu-a', 'menu-b'];
    for (const alias of aliases) {
      try {
        await lineAPI.deleteAlias(alias);
        console.log(`✅ ลบ alias ${alias} สำเร็จ`);
      } catch (error) {
        console.log(`⚠️ ไม่มี alias ${alias}`);
      }
    }
    
    console.log('🗑️ ยกเลิกการผูกกับ User...');
    const userId = process.env.USER_ID;
    try {
      await lineAPI.unlinkRichMenuFromUser(userId);
      console.log('✅ ยกเลิกการผูกสำเร็จ');
    } catch (error) {
      console.log('⚠️ ไม่มีการผูกอยู่');
    }
    
    console.log('🎉 ล้างค่าทั้งหมดเสร็จสิ้น!');
    
  } catch (error) {
    console.error('❌ เกิดข้อผิดพลาด:', error.message);
  }
}

clearAll();