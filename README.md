# neeizRich - LINE Rich Menu 2-Tab Switcher

โปรเจค Rich Menu แบบ 2 แท็บสำหรับ LINE Messaging API ที่ใช้ `richmenuswitch` + `alias` เพื่อสลับระหว่างแท็บ A และ B

## 🎯 คุณสมบัติ

- ✅ Rich Menu แบบ 2 แท็บ (A/B)
- ✅ สลับแท็บด้วย `richmenuswitch` action
- ✅ ใช้ alias `menu-a` และ `menu-b`
- ✅ ไม่ต้องมี backend/webhook
- ✅ ใช้งานได้ทันที
- ✅ **Node.js Version** - พร้อมสคริปต์ครบชุด
- ✅ **CapRover Ready** - พร้อม Deploy บน CapRover

## ⚡ Quick Start (3 ขั้นตอน)

### 1️⃣ ตั้งค่า LINE Bot
1. ไปที่ [LINE Developers Console](https://developers.line.biz/console/)
2. สร้าง Channel หรือใช้ Channel ที่มีอยู่
3. คัดลอก **Channel Access Token**
4. เปิด LINE App และหา **User ID** ของตัวเอง

### 2️⃣ แก้ไข Config
```bash
# เปิดไฟล์ config/config.env
nano config/config.env
```

แก้ไขค่าต่างๆ:
```env
CHANNEL_ACCESS_TOKEN=your_actual_channel_access_token_here
USER_ID=your_actual_user_id_here
```

### 3️⃣ Deploy
```bash
# สร้างรูปภาพตัวอย่าง
npm run simple

# Deploy ทั้งหมดในครั้งเดียว
npm run deploy
```

## 📁 โครงสร้างไฟล์

```
neeizRich/
├── README.md                    # คู่มือการใช้งาน
├── QUICK_START.md              # คู่มือเริ่มต้นอย่างรวดเร็ว
├── package.json                 # Node.js dependencies
├── index.js                     # Entry point หลัก + Web Server
├── Dockerfile                   # สำหรับ CapRover
├── captain-definition           # CapRover config
├── .gitignore                   # Git ignore rules
├── lib/
│   └── line-api.js             # LINE API Client Library
├── scripts/
│   ├── create-richmenus.js     # สร้าง Rich Menu + Alias
│   ├── upload-images.js         # อัปโหลดรูปภาพ
│   ├── link-to-user.js          # ผูกเมนูให้ User
│   ├── cleanup.js               # ลบ Rich Menu + Alias
│   ├── test-richmenu.js         # ทดสอบ Rich Menu
│   ├── create-sample-images.js  # สร้างรูปภาพตัวอย่าง
│   └── create-simple-images.js  # สร้างรูปภาพง่ายๆ
├── config/
│   └── config.env.example       # ไฟล์ config ตัวอย่าง
├── json/
│   ├── richmenu-a.json          # JSON สำหรับ Menu A
│   └── richmenu-b.json          # JSON สำหรับ Menu B
└── images/
    ├── menu-a.svg               # รูปภาพตัวอย่าง Menu A
    ├── menu-b.svg               # รูปภาพตัวอย่าง Menu B
    └── README.md                # คู่มือการสร้างรูปภาพ
```

## 🚀 วิธีใช้งาน (Node.js)

### 1. ติดตั้ง Dependencies
```bash
npm install
```

### 2. ตั้งค่า Environment Variables
```bash
cp config/config.env.example config/config.env
# แก้ไข CHANNEL_ACCESS_TOKEN และ USER_ID ใน config/config.env
```

### 3. สร้างรูปภาพตัวอย่าง
```bash
npm run simple
# สร้าง SVG files ใน images/
```

### 4. แปลงรูปภาพเป็น PNG
```bash
# ใช้ online converter หรือ tools
# แปลง menu-a.svg และ menu-b.svg เป็น PNG
# วางไฟล์ menu-a.png และ menu-b.png ใน images/
```

### 5. Deploy ทั้งหมด
```bash
npm run deploy
# หรือ
node index.js deploy
```

### 6. รัน Web Server (สำหรับ CapRover)
```bash
npm start
# หรือ
node index.js serve
```

## 📋 คำสั่งที่ใช้งานได้

| คำสั่ง | ฟังก์ชัน |
|--------|----------|
| `npm run create` | สร้าง Rich Menu และ Alias |
| `npm run upload` | อัปโหลดรูปภาพ |
| `npm run link` | ผูกเมนูให้ User |
| `npm run cleanup` | ลบ Rich Menu และ Alias |
| `npm run deploy` | Deploy ทั้งหมด |
| `npm run test` | ทดสอบ Rich Menu |
| `npm run samples` | สร้างรูปภาพตัวอย่าง |
| `npm run simple` | สร้างรูปภาพง่ายๆ |
| `npm start` | รัน web server |

## 🐳 CapRover Deployment

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/neeizRich.git
git push -u origin main
```

### 2. Deploy on CapRover
1. เปิด CapRover Dashboard
2. คลิก "One-Click Apps"
3. เลือก "Custom App"
4. ใส่ GitHub URL: `https://github.com/yourusername/neeizRich`
5. คลิก "Deploy"

### 3. ตั้งค่า Environment Variables
ใน CapRover Dashboard:
- `CHANNEL_ACCESS_TOKEN` = your_line_token
- `USER_ID` = your_user_id

### 4. Web Interface
หลังจาก Deploy สำเร็จ จะมี:
- **Health Check**: `https://your-app.caprover.com/health`
- **Web Interface**: `https://your-app.caprover.com/`
- **API Endpoints**: `/api/status`, `/api/deploy`

## 🎨 Rich Menu Layout

### Tab A
- พื้นที่ซ้าย: สลับไป Tab A (แสดงสถานะปัจจุบัน)
- พื้นที่ขวา: สลับไป Tab B

### Tab B  
- พื้นที่ซ้าย: สลับไป Tab A
- พื้นที่ขวา: สลับไป Tab B (แสดงสถานะปัจจุบัน)

## 🔧 การปรับแต่ง

### แก้ไข Rich Menu JSON
```bash
# แก้ไข json/richmenu-a.json และ json/richmenu-b.json
# ปรับขนาด, ชื่อ, หรือ action areas
```

### แก้ไข Config
```bash
# แก้ไข config/config.env
# เปลี่ยน alias, ชื่อ, หรือ chat bar text
```

### สร้างรูปภาพใหม่
```bash
# ใช้ npm run simple เพื่อสร้าง SVG ตัวอย่าง
# แปลงเป็น PNG และวางใน images/
```

## 📋 API Endpoints ที่ใช้

- `POST /v2/bot/richmenu` - สร้าง Rich Menu
- `POST /v2/bot/richmenu/alias` - สร้าง Alias
- `POST /v2/bot/user/{userId}/richmenu/{richMenuId}` - ผูกเมนูให้ User
- `POST /v2/bot/richmenu/{richMenuId}/content` - อัปโหลดรูปภาพ
- `GET /v2/bot/richmenu/list` - ดู Rich Menu ทั้งหมด
- `DELETE /v2/bot/richmenu/{richMenuId}` - ลบ Rich Menu

## 🛠️ Dependencies

- **axios** - HTTP client สำหรับเรียก LINE API
- **dotenv** - โหลด environment variables  
- **form-data** - อัปโหลดรูปภาพ
- **express** - Web server สำหรับ CapRover

## 🔥 ข้อดีของ Node.js Version

- **Error Handling** - จัดการ error อย่างสมบูรณ์
- **Async/Await** - โค้ดอ่านง่ายและ maintainable
- **Modular Design** - แยกฟังก์ชันเป็น modules
- **Type Safety** - ใช้ JSDoc comments
- **Easy Testing** - ทดสอบได้ง่าย
- **Production Ready** - พร้อมใช้งานจริง
- **CapRover Ready** - Deploy ได้ทันที

## 📝 ตัวอย่างการใช้งาน

```javascript
const { createRichMenus, uploadImages, linkToUser } = require('./scripts');

// สร้าง Rich Menu
await createRichMenus();

// อัปโหลดรูปภาพ
await uploadImages();

// ผูกเมนูให้ User
await linkToUser();
```

## 🎯 การทำงาน

1. **สร้าง Rich Menu A และ B** - ใช้ `richmenuswitch` action
2. **สร้าง Alias** - เพื่อให้สามารถสลับระหว่างเมนูได้
3. **ผูกเมนูให้ User** - เริ่มต้นด้วย Menu A
4. **อัปโหลดรูปภาพ** - ขนาด 1080x1080px (PNG)

เมื่อ User กดปุ่มใน Rich Menu จะสลับไปยังเมนูอื่นทันทีโดยไม่ต้องมี backend!

## 🎉 เสร็จแล้ว!

เปิด LINE App และทดสอบ Rich Menu ได้เลย! 🎉 