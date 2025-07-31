#!/bin/bash

# LINE Rich Menu Creator Script
# สร้าง Rich Menu แบบ 2 แท็บพร้อม Alias

# โหลด config
if [ -f "config/config.env" ]; then
    source config/config.env
else
    echo "❌ ไม่พบไฟล์ config/config.env"
    echo "กรุณาคัดลอก config/config.env.example เป็น config/config.env และแก้ไขค่า"
    exit 1
fi

# ตรวจสอบ Channel Access Token
if [ "$CHANNEL_ACCESS_TOKEN" = "your_channel_access_token_here" ]; then
    echo "❌ กรุณาแก้ไข CHANNEL_ACCESS_TOKEN ใน config/config.env"
    exit 1
fi

echo "🚀 เริ่มสร้าง Rich Menu..."

# 1. สร้าง Rich Menu A
echo "📝 สร้าง Rich Menu A..."
RICHMENU_A_RESPONSE=$(curl -s -X POST https://api.line.me/v2/bot/richmenu \
  -H "Authorization: Bearer $CHANNEL_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d @json/richmenu-a.json)

RICHMENU_A_ID=$(echo $RICHMENU_A_RESPONSE | grep -o '"richMenuId":"[^"]*"' | cut -d'"' -f4)

if [ -z "$RICHMENU_A_ID" ]; then
    echo "❌ ไม่สามารถสร้าง Rich Menu A ได้"
    echo "Response: $RICHMENU_A_RESPONSE"
    exit 1
fi

echo "✅ สร้าง Rich Menu A สำเร็จ: $RICHMENU_A_ID"

# 2. สร้าง Rich Menu B
echo "📝 สร้าง Rich Menu B..."
RICHMENU_B_RESPONSE=$(curl -s -X POST https://api.line.me/v2/bot/richmenu \
  -H "Authorization: Bearer $CHANNEL_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d @json/richmenu-b.json)

RICHMENU_B_ID=$(echo $RICHMENU_B_RESPONSE | grep -o '"richMenuId":"[^"]*"' | cut -d'"' -f4)

if [ -z "$RICHMENU_B_ID" ]; then
    echo "❌ ไม่สามารถสร้าง Rich Menu B ได้"
    echo "Response: $RICHMENU_B_RESPONSE"
    exit 1
fi

echo "✅ สร้าง Rich Menu B สำเร็จ: $RICHMENU_B_ID"

# 3. สร้าง Alias สำหรับ Menu A
echo "🏷️ สร้าง Alias สำหรับ Menu A..."
ALIAS_A_RESPONSE=$(curl -s -X POST https://api.line.me/v2/bot/richmenu/alias \
  -H "Authorization: Bearer $CHANNEL_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"richMenuAliasId\": \"$RICHMENU_ALIAS_A\",
    \"richMenuId\": \"$RICHMENU_A_ID\"
  }")

if [ "$ALIAS_A_RESPONSE" != "" ]; then
    echo "❌ ไม่สามารถสร้าง Alias A ได้"
    echo "Response: $ALIAS_A_RESPONSE"
    exit 1
fi

echo "✅ สร้าง Alias A สำเร็จ: $RICHMENU_ALIAS_A"

# 4. สร้าง Alias สำหรับ Menu B
echo "🏷️ สร้าง Alias สำหรับ Menu B..."
ALIAS_B_RESPONSE=$(curl -s -X POST https://api.line.me/v2/bot/richmenu/alias \
  -H "Authorization: Bearer $CHANNEL_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"richMenuAliasId\": \"$RICHMENU_ALIAS_B\",
    \"richMenuId\": \"$RICHMENU_B_ID\"
  }")

if [ "$ALIAS_B_RESPONSE" != "" ]; then
    echo "❌ ไม่สามารถสร้าง Alias B ได้"
    echo "Response: $ALIAS_B_RESPONSE"
    exit 1
fi

echo "✅ สร้าง Alias B สำเร็จ: $RICHMENU_ALIAS_B"

# บันทึก Rich Menu IDs ลงไฟล์
echo "💾 บันทึก Rich Menu IDs..."
cat > config/richmenu-ids.txt << EOF
RICHMENU_A_ID=$RICHMENU_A_ID
RICHMENU_B_ID=$RICHMENU_B_ID
RICHMENU_ALIAS_A=$RICHMENU_ALIAS_A
RICHMENU_ALIAS_B=$RICHMENU_ALIAS_B
EOF

echo ""
echo "🎉 สร้าง Rich Menu สำเร็จ!"
echo "📋 Rich Menu IDs:"
echo "   Menu A: $RICHMENU_A_ID"
echo "   Menu B: $RICHMENU_B_ID"
echo "   Alias A: $RICHMENU_ALIAS_A"
echo "   Alias B: $RICHMENU_ALIAS_B"
echo ""
echo "📁 ข้อมูลถูกบันทึกใน config/richmenu-ids.txt"
echo ""
echo "🔗 ขั้นตอนต่อไป:"
echo "   1. อัปโหลดรูปภาพ: ./scripts/upload-images.sh"
echo "   2. ผูกเมนูให้ User: ./scripts/link-to-user.sh" 