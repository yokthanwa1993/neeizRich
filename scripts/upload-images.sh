#!/bin/bash

# LINE Rich Menu Image Uploader Script
# อัปโหลดรูปภาพสำหรับ Rich Menu

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

echo "🖼️ เริ่มอัปโหลดรูปภาพ Rich Menu..."

# ตรวจสอบไฟล์รูปภาพ
if [ ! -f "images/menu-a.png" ]; then
    echo "❌ ไม่พบไฟล์ images/menu-a.png"
    echo "กรุณาเพิ่มรูปภาพขนาด 2500x843px ใน images/menu-a.png"
    exit 1
fi

if [ ! -f "images/menu-b.png" ]; then
    echo "❌ ไม่พบไฟล์ images/menu-b.png"
    echo "กรุณาเพิ่มรูปภาพขนาด 2500x843px ใน images/menu-b.png"
    exit 1
fi

# 1. อัปโหลดรูปภาพสำหรับ Menu A
echo "📤 อัปโหลดรูปภาพสำหรับ Menu A..."
UPLOAD_A_RESPONSE=$(curl -s -X POST https://api-data.line.me/v2/bot/richmenu/$RICHMENU_A_ID/content \
  -H "Authorization: Bearer $CHANNEL_ACCESS_TOKEN" \
  -H "Content-Type: image/png" \
  --data-binary @images/menu-a.png)

if [ "$UPLOAD_A_RESPONSE" != "" ]; then
    echo "❌ ไม่สามารถอัปโหลดรูปภาพ Menu A ได้"
    echo "Response: $UPLOAD_A_RESPONSE"
    exit 1
fi

echo "✅ อัปโหลดรูปภาพ Menu A สำเร็จ"

# 2. อัปโหลดรูปภาพสำหรับ Menu B
echo "📤 อัปโหลดรูปภาพสำหรับ Menu B..."
UPLOAD_B_RESPONSE=$(curl -s -X POST https://api-data.line.me/v2/bot/richmenu/$RICHMENU_B_ID/content \
  -H "Authorization: Bearer $CHANNEL_ACCESS_TOKEN" \
  -H "Content-Type: image/png" \
  --data-binary @images/menu-b.png)

if [ "$UPLOAD_B_RESPONSE" != "" ]; then
    echo "❌ ไม่สามารถอัปโหลดรูปภาพ Menu B ได้"
    echo "Response: $UPLOAD_B_RESPONSE"
    exit 1
fi

echo "✅ อัปโหลดรูปภาพ Menu B สำเร็จ"

echo ""
echo "🎉 อัปโหลดรูปภาพสำเร็จ!"
echo "📋 รูปภาพที่อัปโหลด:"
echo "   Menu A: images/menu-a.png"
echo "   Menu B: images/menu-b.png"
echo ""
echo "🔗 ขั้นตอนต่อไป:"
echo "   ผูกเมนูให้ User: ./scripts/link-to-user.sh" 