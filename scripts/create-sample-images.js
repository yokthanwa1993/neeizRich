/**
 * สร้างรูปภาพตัวอย่างสำหรับ Rich Menu
 * LINE Rich Menu 2-Tab Switcher
 */

const fs = require('fs');
const path = require('path');

async function createSampleImages() {
    console.log('🎨 สร้างรูปภาพตัวอย่าง...\n');
    
    try {
        const imagesDir = path.join(__dirname, '../images');
        
        // สร้างโฟลเดอร์ images ถ้ายังไม่มี
        if (!fs.existsSync(imagesDir)) {
            fs.mkdirSync(imagesDir, { recursive: true });
        }
        
        // สร้าง SVG สำหรับ Menu A
        const svgA = `
<svg width="2500" height="843" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#4CAF50;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#45a049;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#f0f0f0;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#e0e0e0;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- พื้นหลังทั้งหมด -->
  <rect width="2500" height="843" fill="#ffffff"/>
  
  <!-- Tab A (Active) -->
  <rect x="0" y="0" width="1250" height="843" fill="url(#grad1)"/>
  <text x="625" y="400" font-family="Arial, sans-serif" font-size="48" font-weight="bold" text-anchor="middle" fill="white">TAB A</text>
  <text x="625" y="460" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="white">(Active)</text>
  
  <!-- Tab B (Switch) -->
  <rect x="1250" y="0" width="1250" height="843" fill="url(#grad2)"/>
  <text x="1875" y="400" font-family="Arial, sans-serif" font-size="48" font-weight="bold" text-anchor="middle" fill="#666666">TAB B</text>
  <text x="1875" y="460" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="#666666">(Switch)</text>
  
  <!-- ลูกศร -->
  <polygon points="1200,400 1180,380 1180,420" fill="#ffffff"/>
  <polygon points="1300,400 1320,380 1320,420" fill="#666666"/>
</svg>`;
        
        // สร้าง SVG สำหรับ Menu B
        const svgB = `
<svg width="2500" height="843" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#f0f0f0;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#e0e0e0;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#4CAF50;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#45a049;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- พื้นหลังทั้งหมด -->
  <rect width="2500" height="843" fill="#ffffff"/>
  
  <!-- Tab A (Switch) -->
  <rect x="0" y="0" width="1250" height="843" fill="url(#grad1)"/>
  <text x="625" y="400" font-family="Arial, sans-serif" font-size="48" font-weight="bold" text-anchor="middle" fill="#666666">TAB A</text>
  <text x="625" y="460" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="#666666">(Switch)</text>
  
  <!-- Tab B (Active) -->
  <rect x="1250" y="0" width="1250" height="843" fill="url(#grad2)"/>
  <text x="1875" y="400" font-family="Arial, sans-serif" font-size="48" font-weight="bold" text-anchor="middle" fill="white">TAB B</text>
  <text x="1875" y="460" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="white">(Active)</text>
  
  <!-- ลูกศร -->
  <polygon points="1200,400 1180,380 1180,420" fill="#666666"/>
  <polygon points="1300,400 1320,380 1320,420" fill="white"/>
</svg>`;
        
        // บันทึก SVG files
        fs.writeFileSync(path.join(imagesDir, 'menu-a.svg'), svgA);
        fs.writeFileSync(path.join(imagesDir, 'menu-b.svg'), svgB);
        
        console.log('✅ สร้างรูปภาพตัวอย่างสำเร็จ!');
        console.log('📁 ไฟล์ที่สร้าง:');
        console.log('   - images/menu-a.svg');
        console.log('   - images/menu-b.svg');
        console.log('\n📝 หมายเหตุ:');
        console.log('   - ไฟล์เป็น SVG format');
        console.log('   - ต้องแปลงเป็น PNG ก่อนใช้งาน');
        console.log('   - ใช้ online converter หรือ tools เช่น Inkscape');
        console.log('\n🔗 แนะนำ:');
        console.log('   - ใช้ https://convertio.co/svg-png/');
        console.log('   - หรือใช้ Inkscape: inkscape menu-a.svg --export-filename=menu-a.png');
        
    } catch (error) {
        console.error('❌ เกิดข้อผิดพลาด:', error.message);
        throw error;
    }
}

// รันฟังก์ชันถ้าเรียกโดยตรง
if (require.main === module) {
    createSampleImages().catch(error => {
        console.error('❌ เกิดข้อผิดพลาด:', error.message);
        process.exit(1);
    });
}

module.exports = { createSampleImages }; 