#!/bin/bash

# LINE Rich Menu User Linker Script
# ผูก Rich Menu ให้กับ User

# โหลด config
if [ -f "config/config.env" ]; then
    source config/config.env
else
    echo "❌ ไม่พบไฟล์ config/config.env"
    exit 1
fi

# โหลด Rich Menu IDs
if [ -f "config/richmenu-ids.txt" ]; then
    source config/richmenu-ids.txt
else
    echo "❌ ไม่พบไฟล์ config/richmenu-ids.txt"
    echo "กรุณารัน ./scripts/create-richmenus.sh ก่อน"
    exit 1
fi

# ตรวจสอบ Channel Access Token
if [ "$CHANNEL_ACCESS_TOKEN" = "your_channel_access_token_here" ]; then
    echo "❌ กรุณาแก้ไข CHANNEL_ACCESS_TOKEN ใน config/config.env"
    exit 1
fi

# ตรวจสอบ User ID
if [ "$USER_ID" = "your_user_id_here" ]; then
    echo "❌ กรุณาแก้ไข USER_ID ใน config/config.env"
    exit 1
fi

echo "🔗 เริ่มผูก Rich Menu ให้กับ User..."

# ผูก Rich Menu A ให้กับ User (เริ่มต้นด้วย Menu A)
echo "📎 ผูก Rich Menu A ให้กับ User..."
LINK_RESPONSE=$(curl -s -X POST https://api.line.me/v2/bot/user/$USER_ID/richmenu/$RICHMENU_A_ID \
  -H "Authorization: Bearer $CHANNEL_ACCESS_TOKEN")

if [ "$LINK_RESPONSE" != "" ]; then
    echo "❌ ไม่สามารถผูก Rich Menu ได้"
    echo "Response: $LINK_RESPONSE"
    exit 1
fi

echo "✅ ผูก Rich Menu A สำเร็จ"

echo ""
echo "🎉 ผูก Rich Menu สำเร็จ!"
echo "📋 ข้อมูลการผูก:"
echo "   User ID: $USER_ID"
echo "   Rich Menu ID: $RICHMENU_A_ID"
echo "   Rich Menu Name: $RICHMENU_NAME_A"
echo ""
echo "🔗 ขั้นตอนต่อไป:"
echo "   1. เปิด LINE และทดสอบ Rich Menu"
echo "   2. กดปุ่มเพื่อสลับระหว่างแท็บ A และ B"
echo ""
echo "📝 คำสั่งเพิ่มเติม:"
echo "   - ดู Rich Menu ทั้งหมด: curl -H 'Authorization: Bearer $CHANNEL_ACCESS_TOKEN' https://api.line.me/v2/bot/richmenu/list"
echo "   - ลบ Rich Menu: curl -X DELETE -H 'Authorization: Bearer $CHANNEL_ACCESS_TOKEN' https://api.line.me/v2/bot/richmenu/{richMenuId}"
echo "   - ยกเลิกการผูก: curl -X DELETE -H 'Authorization: Bearer $CHANNEL_ACCESS_TOKEN' https://api.line.me/v2/bot/user/$USER_ID/richmenu" 