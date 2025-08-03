# LINE Rich Menu with Webhook

LINE Bot with Rich Menu switching functionality using Node.js and Express.

## Features

- 🎨 Rich Menu with image switching
- 🔄 Rich Menu switching between main and delivery menus
- 🚀 Webhook server for handling postback events
- 📱 Quick Reply buttons for navigation
- 🐳 Docker support for CapRover deployment

## Setup

### 1. Environment Variables

Copy `.env.example` to `.env` and fill in your LINE credentials:

```bash
cp .env.example .env
```

```env
CHANNEL_ACCESS_TOKEN=your_channel_access_token_here
CHANNEL_SECRET=your_channel_secret_here
USER_ID=your_user_id_here
PORT=3000
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Upload Rich Menus

```bash
npm run upload-menus
```

### 4. Start Webhook Server

```bash
npm start
```

## Rich Menu Structure

- **Main Menu** (`menu.png`): Borcelle Coffee menu with 3 sections
- **Delivery Menu** (`menu2.jpg`): Delivery options menu

## Deployment

### CapRover

1. Push to GitHub repository
2. Connect to CapRover
3. Set environment variables in CapRover dashboard
4. Deploy using `captain-definition`

### Manual Docker

```bash
docker build -t line-richmenu .
docker run -p 3000:3000 --env-file .env line-richmenu
```

## Scripts

- `npm start` - Start webhook server
- `npm run upload-menus` - Upload both rich menus
- `npm run clear-all` - Clear all rich menus
- `npm run dev` - Start with nodemon for development

## Files Structure

```
├── webhook-server.js       # Main webhook server
├── line-api.js            # LINE API client
├── richmenu.json          # Main rich menu config
├── richmenu-delivery.json # Delivery rich menu config
├── menu.png               # Main menu image
├── menu2.jpg              # Delivery menu image
├── scripts/               # Utility scripts
├── Dockerfile             # Docker configuration
└── captain-definition     # CapRover deployment config
```

## Rich Menu Actions

### Main Menu
- **สะสมแต้ม**: Postback "points"
- **โปรโมชั่น**: Postback "promotion"  
- **เดลิเวอรี่**: Switch to delivery rich menu

### Delivery Menu
- **Back Button**: Switch back to main menu
- **Foodpanda**: Open Foodpanda URL
- **Grab**: Open Grab URL

## Webhook Events

The webhook handles:
- `postback` events for rich menu interactions
- `switch-to-delivery` triggers Quick Reply buttons
- Rich menu switching via `richmenuswitch` actions