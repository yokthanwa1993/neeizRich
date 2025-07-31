#!/bin/bash

# LINE Rich Menu Cleanup Script
# ลบ Rich Menu และ Alias ทั้งหมด

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
    echo "ไม่มี Rich Menu ที่จะลบ"
    exit 1
fi

# ตรวจสอบ Channel Access Token
if [ "$CHANNEL_ACCESS_TOKEN" = "your_channel_access_token_here" ]; then
    echo "❌ กรุณาแก้ไข CHANNEL_ACCESS_TOKEN ใน config/config.env"
    exit 1
fi

echo "🗑️ เริ่มลบ Rich Menu และ Alias..."

# 1. ยกเลิกการผูก Rich Menu จาก User
if [ ! -z "$USER_ID" ] && [ "$USER_ID" != "your_user_id_here" ]; then
    echo "🔗 ยกเลิกการผูก Rich Menu จาก User..."
    UNLINK_RESPONSE=$(curl -s -X DELETE https://api.line.me/v2/bot/user/$USER_ID/richmenu \
      -H "Authorization: Bearer $CHANNEL_ACCESS_TOKEN")
    
    if [ "$UNLINK_RESPONSE" = "" ]; then
        echo "✅ ยกเลิกการผูก Rich Menu สำเร็จ"
    else
        echo "⚠️ ไม่สามารถยกเลิกการผูกได้: $UNLINK_RESPONSE"
    fi
fi

# 2. ลบ Alias B
echo "🏷️ ลบ Alias B..."
DELETE_ALIAS_B_RESPONSE=$(curl -s -X DELETE https://api.line.me/v2/bot/richmenu/alias/$RICHMENU_ALIAS_B \
  -H "Authorization: Bearer $CHANNEL_ACCESS_TOKEN")

if [ "$DELETE_ALIAS_B_RESPONSE" = "" ]; then
    echo "✅ ลบ Alias B สำเร็จ"
else
    echo "⚠️ ไม่สามารถลบ Alias B ได้: $DELETE_ALIAS_B_RESPONSE"
fi

# 3. ลบ Alias A
echo "🏷️ ลบ Alias A..."
DELETE_ALIAS_A_RESPONSE=$(curl -s -X DELETE https://api.line.me/v2/bot/richmenu/alias/$RICHMENU_ALIAS_A \
  -H "Authorization: Bearer $CHANNEL_ACCESS_TOKEN")

if [ "$DELETE_ALIAS_A_RESPONSE" = "" ]; then
    echo "✅ ลบ Alias A สำเร็จ"
else
    echo "⚠️ ไม่สามารถลบ Alias A ได้: $DELETE_ALIAS_A_RESPONSE"
fi

# 4. ลบ Rich Menu B
echo "🗑️ ลบ Rich Menu B..."
DELETE_MENU_B_RESPONSE=$(curl -s -X DELETE https://api.line.me/v2/bot/richmenu/$RICHMENU_B_ID \
  -H "Authorization: Bearer $CHANNEL_ACCESS_TOKEN")

if [ "$DELETE_MENU_B_RESPONSE" = "" ]; then
    echo "✅ ลบ Rich Menu B สำเร็จ"
else
    echo "⚠️ ไม่สามารถลบ Rich Menu B ได้: $DELETE_MENU_B_RESPONSE"
fi

# 5. ลบ Rich Menu A
echo "🗑️ ลบ Rich Menu A..."
DELETE_MENU_A_RESPONSE=$(curl -s -X DELETE https://api.line.me/v2/bot/richmenu/$RICHMENU_A_ID \
  -H "Authorization: Bearer $CHANNEL_ACCESS_TOKEN")

if [ "$DELETE_MENU_A_RESPONSE" = "" ]; then
    echo "✅ ลบ Rich Menu A สำเร็จ"
else
    echo "⚠️ ไม่สามารถลบ Rich Menu A ได้: $DELETE_MENU_A_RESPONSE"
fi

# 6. ลบไฟล์ config
echo "📁 ลบไฟล์ config..."
rm -f config/richmenu-ids.txt

echo ""
echo "🎉 ลบ Rich Menu และ Alias สำเร็จ!"
echo "📋 สิ่งที่ถูกลบ:"
echo "   - Rich Menu A: $RICHMENU_A_ID"
echo "   - Rich Menu B: $RICHMENU_B_ID"
echo "   - Alias A: $RICHMENU_ALIAS_A"
echo "   - Alias B: $RICHMENU_ALIAS_B"
echo "   - ไฟล์ config/richmenu-ids.txt" 