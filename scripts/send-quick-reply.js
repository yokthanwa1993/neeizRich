const LineAPI = require('../line-api.js');

async function sendQuickReply() {
  try {
    const lineAPI = new LineAPI();
    const userId = process.env.USER_ID;
    
    const message = {
      to: userId,
      messages: [
        {
          type: "text",
          text: "เลือกบริการเดลิเวอรี่",
          quickReply: {
            items: [
              {
                type: "action",
                action: {
                  type: "richmenuswitch",
                  richMenuAliasId: "main-menu",
                  data: "back-to-main",
                  label: "กลับหน้าหลัก"
                }
              },
              {
                type: "action",
                action: {
                  type: "uri",
                  uri: "https://foodpanda.co.th",
                  label: "Foodpanda"
                }
              },
              {
                type: "action",
                action: {
                  type: "uri",
                  uri: "https://grab.com/th",
                  label: "Grab"
                }
              }
            ]
          }
        }
      ]
    };
    
    await lineAPI.client.post('/message/push', message);
    console.log('✅ ส่ง Quick Reply สำเร็จ');
    
  } catch (error) {
    console.error('❌ เกิดข้อผิดพลาด:', error.message);
  }
}

sendQuickReply();