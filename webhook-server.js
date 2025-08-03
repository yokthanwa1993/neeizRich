const express = require('express');
const crypto = require('crypto');
const LineAPI = require('./line-api.js');

const app = express();
app.use(express.json());

const lineAPI = new LineAPI();

// Webhook handler
app.post('/webhook', async (req, res) => {
  try {
    const events = req.body.events;
    
    for (const event of events) {
      if (event.type === 'postback') {
        await handlePostback(event);
      }
    }
    
    res.status(200).send('OK');
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).send('Error');
  }
});

async function handlePostback(event) {
  const userId = event.source.userId;
  const data = event.postback.data;
  
  console.log(`Postback: ${data} from user: ${userId}`);
  
  if (data === 'switch-to-delivery') {
    // 1. สลับไป Rich Menu ของเดลิเวอรี่
    await lineAPI.linkRichMenuToUser(userId, 'delivery-menu');
    
    // 2. ส่ง Quick Reply เมื่อเปลี่ยนไป delivery menu
    const quickReplyMessage = {
      to: userId,
      messages: [
        {
          type: "text",
          text: "🚚 เลือกบริการเดลิเวอรี่",
          quickReply: {
            items: [
              {
                type: "action",
                action: {
                  type: "richmenuswitch",
                  richMenuAliasId: "main-menu",
                  data: "back-to-main",
                  label: "🔙 กลับหน้าหลัก"
                }
              },
              {
                type: "action",
                action: {
                  type: "uri",
                  uri: "https://foodpanda.co.th",
                  label: "🍕 Foodpanda"
                }
              },
              {
                type: "action",
                action: {
                  type: "uri", 
                  uri: "https://grab.com/th",
                  label: "🚗 Grab"
                }
              }
            ]
          }
        }
      ]
    };
    
    await lineAPI.client.post('/message/push', quickReplyMessage);
  }
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Webhook server running on port ${PORT}`);
  console.log(`📡 Webhook URL: http://localhost:${PORT}/webhook`);
});