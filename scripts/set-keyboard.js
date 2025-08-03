const LineAPI = require('../line-api.js');

async function setKeyboard() {
  try {
    const lineAPI = new LineAPI();
    const userId = process.env.USER_ID;
    
    // ลองใช้ Keyboard Template
    const keyboardData = {
      to: userId,
      messages: [
        {
          type: "template",
          altText: "เมนูเดลิเวอรี่",
          template: {
            type: "buttons",
            text: "เลือกบริการเดลิเวอรี่",
            actions: [
              {
                type: "richmenuswitch",
                richMenuAliasId: "main-menu",
                data: "back-to-main",
                label: "🔙 กลับหน้าหลัก"
              }
            ]
          }
        }
      ]
    };
    
    await lineAPI.client.post('/message/push', keyboardData);
    console.log('✅ ส่ง Keyboard สำเร็จ');
    
  } catch (error) {
    console.error('❌ เกิดข้อผิดพลาด:', error.response?.data || error.message);
  }
}

setKeyboard();