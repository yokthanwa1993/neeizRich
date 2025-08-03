/**
 * LINE Messaging API Client
 * ไลบรารีสำหรับเรียก LINE API
 */

const axios = require('axios');
require('dotenv').config();

class LineAPI {
    constructor() {
        this.baseURL = 'https://api.line.me/v2/bot';
        this.dataURL = 'https://api-data.line.me/v2/bot';
        this.token = process.env.CHANNEL_ACCESS_TOKEN;
        
        if (!this.token || this.token === 'your_channel_access_token_here') {
            throw new Error('กรุณาตั้งค่า CHANNEL_ACCESS_TOKEN ใน .env');
        }
        
        this.client = axios.create({
            baseURL: this.baseURL,
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json'
            }
        });
        
        this.dataClient = axios.create({
            baseURL: this.dataURL,
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        });
    }
    
    /**
     * สร้าง Rich Menu
     */
    async createRichMenu(richMenuData) {
        try {
            const response = await this.client.post('/richmenu', richMenuData);
            return response.data;
        } catch (error) {
            throw new Error(`ไม่สามารถสร้าง Rich Menu ได้: ${error.response?.data?.message || error.message}`);
        }
    }
    
    /**
     * สร้าง Rich Menu Alias
     */
    async createAlias(aliasId, richMenuId) {
        try {
            const response = await this.client.post('/richmenu/alias', {
                richMenuAliasId: aliasId,
                richMenuId: richMenuId
            });
            return response.data;
        } catch (error) {
            throw new Error(`ไม่สามารถสร้าง Alias ได้: ${error.response?.data?.message || error.message}`);
        }
    }
    
    /**
     * ผูก Rich Menu ให้กับ User
     */
    async linkRichMenuToUser(userId, richMenuId) {
        try {
            const response = await this.client.post(`/user/${userId}/richmenu/${richMenuId}`);
            return response.data;
        } catch (error) {
            throw new Error(`ไม่สามารถผูก Rich Menu ได้: ${error.response?.data?.message || error.message}`);
        }
    }
    
    /**
     * อัปโหลดรูปภาพ Rich Menu
     */
    async uploadRichMenuImage(richMenuId, imagePath) {
        try {
            const fs = require('fs');
            
            const imageBuffer = fs.readFileSync(imagePath);
            
            const response = await this.dataClient.post(`/richmenu/${richMenuId}/content`, imageBuffer, {
                headers: {
                    'Content-Type': 'image/png'
                }
            });
            
            return response.data;
        } catch (error) {
            throw new Error(`ไม่สามารถอัปโหลดรูปภาพได้: ${error.response?.data?.message || error.message}`);
        }
    }
    
    /**
     * ลบ Rich Menu
     */
    async deleteRichMenu(richMenuId) {
        try {
            const response = await this.client.delete(`/richmenu/${richMenuId}`);
            return response.data;
        } catch (error) {
            throw new Error(`ไม่สามารถลบ Rich Menu ได้: ${error.response?.data?.message || error.message}`);
        }
    }
    
    /**
     * ลบ Rich Menu Alias
     */
    async deleteAlias(aliasId) {
        try {
            const response = await this.client.delete(`/richmenu/alias/${aliasId}`);
            return response.data;
        } catch (error) {
            throw new Error(`ไม่สามารถลบ Alias ได้: ${error.response?.data?.message || error.message}`);
        }
    }
    
    /**
     * ยกเลิกการผูก Rich Menu จาก User
     */
    async unlinkRichMenuFromUser(userId) {
        try {
            const response = await this.client.delete(`/user/${userId}/richmenu`);
            return response.data;
        } catch (error) {
            throw new Error(`ไม่สามารถยกเลิกการผูก Rich Menu ได้: ${error.response?.data?.message || error.message}`);
        }
    }
    
    /**
     * ดู Rich Menu ทั้งหมด
     */
    async getRichMenuList() {
        try {
            const response = await this.client.get('/richmenu/list');
            return response.data;
        } catch (error) {
            throw new Error(`ไม่สามารถดู Rich Menu List ได้: ${error.response?.data?.message || error.message}`);
        }
    }
    
    /**
     * ดู Rich Menu ที่ผูกกับ User
     */
    async getUserRichMenu(userId) {
        try {
            const response = await this.client.get(`/user/${userId}/richmenu`);
            return response.data;
        } catch (error) {
            throw new Error(`ไม่สามารถดู User Rich Menu ได้: ${error.response?.data?.message || error.message}`);
        }
    }
}

module.exports = LineAPI; 