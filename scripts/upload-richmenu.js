const LineAPI = require('../line-api.js');
const fs = require('fs');
const path = require('path');

async function uploadRichMenu() {
  try {
    const lineAPI = new LineAPI();
    
    // ล้างค่าเก่า
    console.log('🗑️ ล้างค่าเก่า...');
    const menuList = await lineAPI.getRichMenuList();
    for (const menu of menuList.richmenus) {
      await lineAPI.deleteRichMenu(menu.richMenuId).catch(() => {});
    }
    
    // สร้าง Rich Menu ใหม่
    console.log('📝 สร้าง Rich Menu...');
    const menuConfig = JSON.parse(fs.readFileSync(path.join(__dirname, '../richmenu.json'), 'utf8'));
    const result = await lineAPI.createRichMenu(menuConfig);
    const richMenuId = result.richMenuId;
    
    // อัปโหลดรูป menu.png
    console.log('🖼️ อัปโหลดรูป...');
    const imagePath = path.join(__dirname, '../menu.png');
    await lineAPI.uploadRichMenuImage(richMenuId, imagePath);
    
    // ผูกกับ User
    console.log('🔗 ผูกกับ User...');
    const userId = process.env.USER_ID;
    await lineAPI.linkRichMenuToUser(userId, richMenuId);
    
    console.log('✅ เสร็จสิ้น!');
    console.log(`Rich Menu ID: ${richMenuId}`);
    
  } catch (error) {
    console.error('❌ เกิดข้อผิดพลาด:', error.message);
  }
}

uploadRichMenu();