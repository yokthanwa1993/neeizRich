# 🚀 Quick Start - LINE Rich Menu 2-Tab Switcher

## ⚡ เริ่มใช้งานใน 3 ขั้นตอน

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
# Deploy ทั้งหมดในครั้งเดียว
npm run deploy
```

## 🎯 ผลลัพธ์

✅ Rich Menu แบบ 2 แท็บพร้อมใช้งาน  
✅ สลับแท็บได้ทันทีโดยไม่ต้องมี backend  
✅ ใช้งานได้บน LINE App ทันที  

## 📋 คำสั่งที่ใช้งานได้

```bash
npm run create    # สร้าง Rich Menu
npm run upload    # อัปโหลดรูปภาพ
npm run link      # ผูกเมนูให้ User
npm run deploy    # Deploy ทั้งหมด
npm run test      # ทดสอบ Rich Menu
npm run cleanup   # ลบ Rich Menu
```

## 🔧 การแก้ไขปัญหา

### ❌ "กรุณาตั้งค่า CHANNEL_ACCESS_TOKEN"
- ตรวจสอบว่าได้แก้ไข `config/config.env` แล้ว
- ตรวจสอบ Channel Access Token ว่าถูกต้อง

### ❌ "ไม่พบไฟล์ images/menu-a.png"
- เพิ่มรูปภาพขนาด 2500x843px ในโฟลเดอร์ `images/`
- ใช้ชื่อ `menu-a.png` และ `menu-b.png`

### ❌ "ไม่สามารถสร้าง Rich Menu ได้"
- ตรวจสอบ Channel Access Token
- ตรวจสอบสิทธิ์ของ Bot (ต้องมี Messaging API)

## 📞 วิธีหา User ID

### วิธีที่ 1: ใช้ LINE Bot
1. ส่งข้อความหา Bot
2. Bot จะได้รับ User ID ใน webhook

### วิธีที่ 2: ใช้ LINE Login
1. ใช้ LINE Login SDK
2. ได้ User ID จาก profile

### วิธีที่ 3: ใช้ LINE Notify
1. สร้าง LINE Notify Token
2. ได้ User ID จาก API

## 🎨 การสร้างรูปภาพ

### ขนาดที่แนะนำ
- **ขนาด**: 2500 x 843 pixels
- **รูปแบบ**: PNG
- **ขนาดไฟล์**: ไม่เกิน 1MB

### ตัวอย่าง Layout
```
┌─────────────┬─────────────┐
│   Tab A     │   Tab B     │
│  (Active)   │  (Switch)   │
└─────────────┴─────────────┘
```

## 🚀 ตัวอย่างการใช้งาน

```bash
# 1. ติดตั้ง dependencies
npm install

# 2. แก้ไข config
nano config/config.env

# 3. เพิ่มรูปภาพ
# เพิ่ม menu-a.png และ menu-b.png ใน images/

# 4. Deploy
npm run deploy

# 5. ทดสอบ
npm run test
```

## 🎉 เสร็จแล้ว!

เปิด LINE App และทดสอบ Rich Menu ได้เลย! 🎉 