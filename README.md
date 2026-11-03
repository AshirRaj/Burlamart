# Burlamart — Multi-Category Commerce & Services Platform Frontend

A production-grade, responsive, component-based frontend for **Burlamart**, built using **Vite, React, and JavaScript (ESM)**.

---

## 🌟 Architecture Overview

Burlamart is a unified multi-category commerce and local services platform consisting of **four distinct applications** connected to a centralized state and API service layer:

1. **Customer Application** (`/`):
   - Category-specific UI rendering (Blinkit-style Grocery, OYO-style Stays, Amazon-style Electronics, Packaged Food BxGy/Combos).
   - Unified one-shop cart, delivery vs store pickup, distance slabs, packaging charges, and EMI calculators.
   - Live 6-stage order tracking with auto-reassignment fallbacks.
   - Shared loyalty wallet and post-payment Spin Wheel reward game.
   - Voice AI search and ordering simulation.
   - Extension modules: Digital Khata / Pay Later, daily subscriptions, society group orders, courier parcels, Rx prescription uploads.

2. **Vendor Dashboard** (`/vendor`):
   - Sales KPIs, order acceptance/rejection, shop own-delivery toggle & custom fees.
   - Catalogue with Admin master templates (spend coins), barcode scanner, bulk CSV upload, and limited-stock flags.
   - Storefront customizer (banners, announcement pop-ups, video embed, auto-scrolling).
   - Offers builder (BxGy deals, combos, smart discounts).
   - WhatsApp and Instagram broadcast campaigns, search demand insights, and GST reports.
   - Monthly platform rent payment interface & Coin wallet ledger.

3. **Rider Application** (`/rider`):
   - Mobile-first delivery fleet interface with Online/Offline duty toggle.
   - Accept/Reject orders with automated fallback reassignment.
   - Turn-by-turn live navigation map with customer and store pins.
   - **Cash on Delivery (COD) split-payment recording** (`₹Cash + ₹UPI = Total`).
   - Earnings & payout metrics calculated by order count and delivery distance.

4. **Admin Panel** (`/admin`):
   - **Category UI Template Manager**: Select any category, choose from ready-made templates (`grocery`, `hotel`, `electronics`, `packaged-food`, `fashion-grid`), view live preview, and immediately apply changes to the customer app.
   - **Vendor Management**: Onboarding approvals queue, default monthly rent, and individual vendor rent overrides.
   - **Master Product Templates**: Create/edit reusable templates, configure required specifications, coin costs, and sponsored slots.
   - **Platform Configuration**: Distance slabs [0-X, X-Y, Y+], weight surcharges, mandatory packaging weight limit $W$, fast delivery radius $R$, ranking weights, and setting change audit logs.
   - **Monetisation Engine**: Commission %, customer Pass membership fees, and broadcast pack pricing.

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- npm >= 9

### Installation
```bash
# Install dependencies
npm install
```

### Run Locally (Development Server)
```bash
npm run dev
```
The application will launch at `http://localhost:5173`.

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

---

## 🗂️ Project Directory Structure

```
c:\Users\ashir\Downloads\Burlamart/
├── public/
│   └── favicon.svg                  # Brand SVG favicon
├── src/
│   ├── assets/                      # Static assets
│   ├── components/
│   │   ├── category-layouts/        # Distinct category template engines
│   │   │   ├── CategoryTemplateRenderer.jsx # Dynamic template switcher
│   │   │   ├── GroceryLayout.jsx            # Blinkit-style 12-min grid
│   │   │   ├── HotelServicesLayout.jsx      # OYO-style dates & slots
│   │   │   ├── ElectronicsLayout.jsx        # Amazon-style specs, compare & EMI
│   │   │   ├── PackagedFoodLayout.jsx       # Snacks, combos & BxGy
│   │   │   └── FashionGridLayout.jsx        # Visual showcase
│   │   ├── common/
│   │   │   ├── RoleSwitcher.jsx             # Quick switcher between 4 apps
│   │   │   ├── ShopConflictModal.jsx        # One-shop cart modal
│   │   │   ├── VoiceOrderModal.jsx          # Voice AI ordering
│   │   │   └── SpinRewardModal.jsx          # Post-payment spin game
│   │   └── customer/
│   │       ├── CustomerHeader.jsx           # Search, location, language, cart
│   │       ├── CustomerFooter.jsx           # Links and trust badges
│   │       └── PersistentCartBar.jsx        # Floating cart reminder
│   ├── context/
│   │   ├── AppContext.jsx           # Global categories, settings, coin wallet
│   │   ├── AuthContext.jsx          # User persona, roles, staff isolation
│   │   └── CartContext.jsx          # One-shop cart & configurable charge calculations
│   ├── layouts/
│   │   ├── CustomerLayout.jsx       # Shell for customer app
│   │   ├── VendorLayout.jsx         # Shell for merchant portal
│   │   ├── RiderLayout.jsx          # Shell for mobile rider app
│   │   └── AdminLayout.jsx          # Shell for admin suite
│   ├── pages/
│   │   ├── customer/                # Customer shopping, checkout & tracking
│   │   ├── vendor/                  # Merchant dashboard, catalogue & orders
│   │   ├── rider/                   # Rider deliveries & COD split recording
│   │   ├── admin/                   # Template management & platform settings
│   │   └── common/NotFound.jsx      # 404 handler
│   ├── services/
│   │   ├── api.js                   # Centralized API service layer
│   │   └── mockData.js              # Complete mock dataset
│   ├── App.jsx                      # React Router configuration
│   ├── main.jsx                     # Application entrypoint
│   └── index.css                    # Tailwind CSS directives
├── .env.example                     # Backend endpoint configuration template
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 🔗 Route Map

| Application | Path | Description |
|---|---|---|
| **Customer** | `/` | Hyperlocal discovery, category tiles, banners, ranking |
| **Customer** | `/category/:categoryId` | Category experience powered by Admin-assigned layout |
| **Customer** | `/storefront/:shopId` | Vendor custom storefront with video, popups & auto-scroll |
| **Customer** | `/search` | Global search with category & price filters |
| **Customer** | `/cart` | One-shop cart, related products, save as My Combo |
| **Customer** | `/checkout` | Delivery vs pickup, GPS location, slab charges, payment |
| **Customer** | `/order-success/:orderId` | Confirmation & post-payment Spin Wheel reward |
| **Customer** | `/orders/:orderId` | Live 6-stage order tracking with reassignments |
| **Customer** | `/account` | Shared rewards wallet, saved combos, order history |
| **Customer** | `/extensions` | Digital Khata, milk subscriptions, parcel courier, Rx |
| **Vendor** | `/vendor` | Sales metrics, active orders, stock alerts, GST reports |
| **Vendor** | `/vendor/catalogue` | Product manager, barcode scanner, master templates |
| **Vendor** | `/vendor/orders` | Accept/reject orders, own delivery fee configuration |
| **Vendor** | `/vendor/storefront` | Banner image, video URL, pop-up notice, auto-scroll |
| **Vendor** | `/vendor/offers` | BxGy deals, combo builder, smart discounts |
| **Vendor** | `/vendor/marketing` | WhatsApp/Instagram broadcast tools, demand insights |
| **Vendor** | `/vendor/account` | Monthly rent payment & coin wallet ledger |
| **Vendor** | `/vendor/extensions` | POS barcode terminal, wholesale restocking, loans |
| **Rider** | `/rider` | Duty toggle, live navigation map, COD split payment |
| **Admin** | `/admin` | Executive KPIs, audit log overview |
| **Admin** | `/admin/templates` | **Category UI template selector & live preview** |
| **Admin** | `/admin/vendors` | Onboarding approvals, base rent & vendor rent overrides |
| **Admin** | `/admin/master-templates`| Master product template builder & coin costs |
| **Admin** | `/admin/settings` | Distance slabs X, Y, W, R, fee rates, coin pricing |
| **Admin** | `/admin/monetisation` | Order commission %, Burlamart Pass fee |

---

## 🛠️ Integration Guide for Backend Developer

1. Set `VITE_ENABLE_MOCK_DATA=false` in `.env`.
2. Configure `VITE_API_BASE_URL` to point to your backend server (e.g., `http://localhost:5000/api`).
3. Implement the REST endpoint contracts documented in `src/services/api.js`:
   - `GET /categories`, `PUT /categories/:id/template`
   - `GET /shops`, `GET /shops/:id`, `PUT /shops/:id/storefront`
   - `GET /products`, `POST /products`, `PUT /products/:id`
   - `GET /templates`, `POST /templates`
   - `GET /orders`, `POST /orders`, `PUT /orders/:id/status`, `POST /orders/:id/split-payment`
   - `GET /admin/settings`, `PUT /admin/settings`

