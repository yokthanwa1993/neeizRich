const LineAPI = require('../line-api.js');
const fs = require('fs');
const path = require('path');

async function uploadBothMenus() {
  try {
    const lineAPI = new LineAPI();
    
    // ล้างค่าเก่า
    console.log('🗑️ ล้างค่าเก่า...');
    const menuList = await lineAPI.getRichMenuList();
    for (const menu of menuList.richmenus) {
      await lineAPI.deleteRichMenu(menu.richMenuId).catch(() => {});
    }
    
    // ลบ alias เก่า
    const aliases = ['main-menu', 'delivery-menu'];
    for (const alias of aliases) {
      await lineAPI.deleteAlias(alias).catch(() => {});
    }
    
    // สร้าง Rich Menu หลัก
    console.log('📝 สร้าง Rich Menu หลัก...');
    const mainConfig = JSON.parse(fs.readFileSync(path.join(__dirname, '../richmenu.json'), 'utf8'));
    const mainResult = await lineAPI.createRichMenu(mainConfig);
    const mainMenuId = mainResult.richMenuId;
    
    // อัปโหลดรูปหลัก
    console.log('🖼️ อัปโหลดรูปหลัก...');
    const mainImagePath = path.join(__dirname, '../menu.png');
    await lineAPI.uploadRichMenuImage(mainMenuId, mainImagePath);
    
    // สร้าง Rich Menu เดลิเวอรี่
    console.log('📝 สร้าง Rich Menu เดลิเวอรี่...');
    const deliveryConfig = JSON.parse(fs.readFileSync(path.join(__dirname, '../richmenu-delivery.json'), 'utf8'));
    const deliveryResult = await lineAPI.createRichMenu(deliveryConfig);
    const deliveryMenuId = deliveryResult.richMenuId;
    
    // อัปโหลดรูปเดลิเวอรี่
    console.log('🖼️ อัปโหลดรูปเดลิเวอรี่...');
    const deliveryImagePng = path.join(__dirname, '../menu2.png');
    const deliveryImageJpg = path.join(__dirname, '../menu2.jpg');
    
    let deliveryImagePath;
    if (fs.existsSync(deliveryImageJpg)) {
      deliveryImagePath = deliveryImageJpg;
      console.log('✅ ใช้รูป menu2.jpg สำหรับเดลิเวอรี่');
    } else if (fs.existsSync(deliveryImagePng)) {
      deliveryImagePath = deliveryImagePng;
      console.log('✅ ใช้รูป menu2.png สำหรับเดลิเวอรี่');
    } else {
      deliveryImagePath = mainImagePath;
      console.log('⚠️ ไม่พบ menu2 ใช้รูปเดียวกับหลัก');
    }
    
    await lineAPI.uploadRichMenuImage(deliveryMenuId, deliveryImagePath);
    
    // สร้าง Alias
    console.log('🏷️ สร้าง Alias...');
    await lineAPI.createAlias('main-menu', mainMenuId);
    await lineAPI.createAlias('delivery-menu', deliveryMenuId);
    
    // ผูกกับ User
    console.log('🔗 ผูกกับ User...');
    const userId = process.env.USER_ID;
    await lineAPI.linkRichMenuToUser(userId, mainMenuId);
    
    console.log('✅ เสร็จสิ้น!');
    console.log(`Main Rich Menu ID: ${mainMenuId}`);
    console.log(`Delivery Rich Menu ID: ${deliveryMenuId}`);
    console.log('คลิกที่เดลิเวอรี่เพื่อเปลี่ยน Rich Menu');
    
  } catch (error) {
    console.error('❌ เกิดข้อผิดพลาด:', error.message);
  }
}

uploadBothMenus();