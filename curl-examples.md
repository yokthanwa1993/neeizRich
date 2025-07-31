# LINE Rich Menu - CURL Examples

ตัวอย่างคำสั่ง curl สำหรับสร้างและจัดการ Rich Menu แบบ 2 แท็บ

## 🔧 การตั้งค่า

แทนที่ค่าต่างๆ ด้วยข้อมูลจริง:
- `{CHANNEL_ACCESS_TOKEN}` = Channel Access Token จาก LINE Developers Console
- `{USER_ID}` = User ID ที่ต้องการผูก Rich Menu
- `{RICHMENU_A_ID}` = Rich Menu ID ของ Menu A (ได้จากการสร้าง)
- `{RICHMENU_B_ID}` = Rich Menu ID ของ Menu B (ได้จากการสร้าง)

## 📝 1. สร้าง Rich Menu A

```bash
curl -X POST https://api.line.me/v2/bot/richmenu \
-H 'Authorization: Bearer {CHANNEL_ACCESS_TOKEN}' \
-H 'Content-Type: application/json' \
-d '{
  "size": { "width": 2500, "height": 843 },
  "selected": false,
  "name": "Tab A",
  "chatBarText": "เมนู A",
  "areas": [
    {
      "bounds": { "x": 0, "y": 0, "width": 1250, "height": 843 },
      "action": {
        "type": "richmenuswitch",
        "richMenuAliasId": "menu-a",
        "data": "switch-to-a"
      }
    },
    {
      "bounds": { "x": 1250, "y": 0, "width": 1250, "height": 843 },
      "action": {
        "type": "richmenuswitch",
        "richMenuAliasId": "menu-b",
        "data": "switch-to-b"
      }
    }
  ]
}'
```

## 📝 2. สร้าง Rich Menu B

```bash
curl -X POST https://api.line.me/v2/bot/richmenu \
-H 'Authorization: Bearer {CHANNEL_ACCESS_TOKEN}' \
-H 'Content-Type: application/json' \
-d '{
  "size": { "width": 2500, "height": 843 },
  "selected": false,
  "name": "Tab B",
  "chatBarText": "เมนู B",
  "areas": [
    {
      "bounds": { "x": 0, "y": 0, "width": 1250, "height": 843 },
      "action": {
        "type": "richmenuswitch",
        "richMenuAliasId": "menu-a",
        "data": "switch-to-a"
      }
    },
    {
      "bounds": { "x": 1250, "y": 0, "width": 1250, "height": 843 },
      "action": {
        "type": "richmenuswitch",
        "richMenuAliasId": "menu-b",
        "data": "switch-to-b"
      }
    }
  ]
}'
```

## 🏷️ 3. สร้าง Alias สำหรับ Menu A

```bash
curl -X POST https://api.line.me/v2/bot/richmenu/alias \
-H 'Authorization: Bearer {CHANNEL_ACCESS_TOKEN}' \
-H 'Content-Type: application/json' \
-d '{
  "richMenuAliasId": "menu-a",
  "richMenuId": "{RICHMENU_A_ID}"
}'
```

## 🏷️ 4. สร้าง Alias สำหรับ Menu B

```bash
curl -X POST https://api.line.me/v2/bot/richmenu/alias \
-H 'Authorization: Bearer {CHANNEL_ACCESS_TOKEN}' \
-H 'Content-Type: application/json' \
-d '{
  "richMenuAliasId": "menu-b",
  "richMenuId": "{RICHMENU_B_ID}"
}'
```

## 🔗 5. ผูก Rich Menu A ให้กับ User

```bash
curl -X POST https://api.line.me/v2/bot/user/{USER_ID}/richmenu/{RICHMENU_A_ID} \
-H 'Authorization: Bearer {CHANNEL_ACCESS_TOKEN}'
```

## 🖼️ 6. อัปโหลดรูปภาพสำหรับ Menu A

```bash
curl -v -X POST https://api-data.line.me/v2/bot/richmenu/{RICHMENU_A_ID}/content \
-H "Authorization: Bearer {CHANNEL_ACCESS_TOKEN}" \
-H "Content-Type: image/png" \
--data-binary "@/path/to/menu-a.png"
```

## 🖼️ 7. อัปโหลดรูปภาพสำหรับ Menu B

```bash
curl -v -X POST https://api-data.line.me/v2/bot/richmenu/{RICHMENU_B_ID}/content \
-H "Authorization: Bearer {CHANNEL_ACCESS_TOKEN}" \
-H "Content-Type: image/png" \
--data-binary "@/path/to/menu-b.png"
```

## 📋 คำสั่งเพิ่มเติม

### ดู Rich Menu ทั้งหมด
```bash
curl -H 'Authorization: Bearer {CHANNEL_ACCESS_TOKEN}' \
https://api.line.me/v2/bot/richmenu/list
```

### ดู Rich Menu ที่ผูกกับ User
```bash
curl -H 'Authorization: Bearer {CHANNEL_ACCESS_TOKEN}' \
https://api.line.me/v2/bot/user/{USER_ID}/richmenu
```

### ลบ Rich Menu
```bash
curl -X DELETE -H 'Authorization: Bearer {CHANNEL_ACCESS_TOKEN}' \
https://api.line.me/v2/bot/richmenu/{RICHMENU_ID}
```

### ลบ Alias
```bash
curl -X DELETE -H 'Authorization: Bearer {CHANNEL_ACCESS_TOKEN}' \
https://api.line.me/v2/bot/richmenu/alias/{ALIAS_ID}
```

### ยกเลิกการผูก Rich Menu จาก User
```bash
curl -X DELETE -H 'Authorization: Bearer {CHANNEL_ACCESS_TOKEN}' \
https://api.line.me/v2/bot/user/{USER_ID}/richmenu
```

## 🎯 การทำงาน

1. **สร้าง Rich Menu A และ B** - ใช้ `richmenuswitch` action
2. **สร้าง Alias** - เพื่อให้สามารถสลับระหว่างเมนูได้
3. **ผูกเมนูให้ User** - เริ่มต้นด้วย Menu A
4. **อัปโหลดรูปภาพ** - ขนาด 2500x843px (PNG)

เมื่อ User กดปุ่มใน Rich Menu จะสลับไปยังเมนูอื่นทันทีโดยไม่ต้องมี backend! 