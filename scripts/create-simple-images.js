/**
 * สร้างรูปภาพง่ายๆ สำหรับ Rich Menu
 * LINE Rich Menu 2-Tab Switcher
 */

const fs = require('fs');
const path = require('path');

async function createSimpleImages() {
    console.log('🎨 สร้างรูปภาพง่ายๆ...\n');
    
    try {
        const imagesDir = path.join(__dirname, '../images');
        
        // สร้างโฟลเดอร์ images ถ้ายังไม่มี
        if (!fs.existsSync(imagesDir)) {
            fs.mkdirSync(imagesDir, { recursive: true });
        }
        
        // สร้าง SVG สำหรับ Menu A (1080x1080)
        const svgA = `
<svg width="1080" height="1080" xmlns="http://www.w3.org/2000/svg">
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
  <rect width="1080" height="1080" fill="#ffffff"/>
  
  <!-- Tab A (Active) -->
  <rect x="0" y="0" width="540" height="1080" fill="url(#grad1)"/>
  <text x="270" y="500" font-family="Arial, sans-serif" font-size="120" font-weight="bold" text-anchor="middle" fill="white">A</text>
  <text x="270" y="600" font-family="Arial, sans-serif" font-size="60" text-anchor="middle" fill="white">(Active)</text>
  
  <!-- Tab B (Switch) -->
  <rect x="540" y="0" width="540" height="1080" fill="url(#grad2)"/>
  <text x="810" y="500" font-family="Arial, sans-serif" font-size="120" font-weight="bold" text-anchor="middle" fill="#666666">B</text>
  <text x="810" y="600" font-family="Arial, sans-serif" font-size="60" text-anchor="middle" fill="#666666">(Switch)</text>
  
  <!-- ลูกศร -->
  <polygon points="520,500 500,480 500,520" fill="#ffffff"/>
  <polygon points="560,500 580,480 580,520" fill="#666666"/>
</svg>`;
        
        // สร้าง SVG สำหรับ Menu B (1080x1080)
        const svgB = `
<svg width="1080" height="1080" xmlns="http://www.w3.org/2000/svg">
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
  <rect width="1080" height="1080" fill="#ffffff"/>
  
  <!-- Tab A (Switch) -->
  <rect x="0" y="0" width="540" height="1080" fill="url(#grad1)"/>
  <text x="270" y="500" font-family="Arial, sans-serif" font-size="120" font-weight="bold" text-anchor="middle" fill="#666666">A</text>
  <text x="270" y="600" font-family="Arial, sans-serif" font-size="60" text-anchor="middle" fill="#666666">(Switch)</text>
  
  <!-- Tab B (Active) -->
  <rect x="540" y="0" width="540" height="1080" fill="url(#grad2)"/>
  <text x="810" y="500" font-family="Arial, sans-serif" font-size="120" font-weight="bold" text-anchor="middle" fill="white">B</text>
  <text x="810" y="600" font-family="Arial, sans-serif" font-size="60" text-anchor="middle" fill="white">(Active)</text>
  
  <!-- ลูกศร -->
  <polygon points="520,500 500,480 500,520" fill="#666666"/>
  <polygon points="560,500 580,480 580,520" fill="white"/>
</svg>`;
        
        // บันทึก SVG files
        fs.writeFileSync(path.join(imagesDir, 'menu-a.svg'), svgA);
        fs.writeFileSync(path.join(imagesDir, 'menu-b.svg'), svgB);
        
        console.log('✅ สร้างรูปภาพง่ายๆ สำเร็จ!');
        console.log('📁 ไฟล์ที่สร้าง:');
        console.log('   - images/menu-a.svg (1080x1080)');
        console.log('   - images/menu-b.svg (1080x1080)');
        console.log('\n📝 Layout:');
        console.log('   ┌─────────┬─────────┐');
        console.log('   │    A    │    B    │');
        console.log('   │ (Active)│(Switch) │');
        console.log('   └─────────┴─────────┘');
        console.log('\n🔗 ขั้นตอนต่อไป:');
        console.log('   1. แปลง SVG เป็น PNG (1080x1080)');
        console.log('   2. วางไฟล์ menu-a.png และ menu-b.png ใน images/');
        console.log('   3. รัน npm run deploy');
        
    } catch (error) {
        console.error('❌ เกิดข้อผิดพลาด:', error.message);
        throw error;
    }
}

// รันฟังก์ชันถ้าเรียกโดยตรง
if (require.main === module) {
    createSimpleImages().catch(error => {
        console.error('❌ เกิดข้อผิดพลาด:', error.message);
        process.exit(1);
    });
}

module.exports = { createSimpleImages }; 