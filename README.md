# Appointly 🧡

**Book anything. Run everything.**
Appointly is a multi-industry appointment booking platform. Customers find and book services in seconds. Businesses manage every appointment, from every channel, in one place. **Capi** 🦫🍊, a friendly capybara assistant, helps both sides.

🔗 **Live demo:** https://sgayye-6612.github.io/appointly/

![Appointly home](screenshots/home.png)

> This is a **front-end prototype**. It runs entirely in the browser with no server or database. Data is saved in the browser's `localStorage`, so every visitor gets their own sandbox with demo data.

---

## ✨ Features

### 👤 Client portal
- **Smart search** in plain words: *"dentist in Kondapur tomorrow evening"* or *"AC repair under 500"*
- **Explore** by category → subcategory → business, with filters for area, rating, price and availability
- **Business pages**: services and prices, staff, hours, map, reviews, offers and live free slots
- **Booking** with an instant booking ID (`APX-XXXXXX`), reminders and notifications
- **My bookings calendar**: important dates are highlighted with coloured borders (today, upcoming, rescheduled, needs reply, cancelled)
- **Two-way reschedule**: accept or decline a new time the business proposes, or request your own
- **Cancelled by the business?** Rebook in one tap at another time, or at a similar business nearby
- Profile with favourites, reviews, payments and settings

### 🏢 Business portal
- **Dashboard**: today's appointments, pending requests, revenue, cancellations and insights
- **Appointments**: accept, reject, reschedule (the customer must approve) and cancel with a reason
- **Calendar**: day, week and month views, colour-coded by status
- **Reminders**: call, send a reminder, mark as contacted and add notes
- **Services & slots, staff, customers, offers, analytics, settings**
- **Website integration**: booking link, embeddable widget code and QR code
- **7-step registration** for new businesses, including creating a new category
- **Ask Capi** about your live data: *"How many clients today?"*, *"Who's next?"*, *"Revenue this month"*, *"Free slots tomorrow"*

### 🛡️ Admin portal
Businesses, clients, categories and subcategories, verification, booking monitoring, reports, subscriptions and settings.

---

## 🔑 Demo logins

| Role | Login | Password / OTP |
|---|---|---|
| Client | Name **Ananya Rao**, mobile **98765 43210** | OTP **123456** |
| Business | `demo.<subcategory>@appointly.demo`, for example `demo.dental@appointly.demo` | **Appointly@123** |
| Admin | — | **Appointly@Admin**, code **123456** |

The business login page lists all 25 demo accounts. Each has a one-click **Log in** button.

**Good accounts to try:** SmileCare Dental (`demo.dental`), PhysioPlus Centre (`demo.physio`), CityCare Clinic (`demo.hospitals`), Celebration Halls (`demo.banquet`).

> To reset all demo data: open DevTools (F12) → **Application** → **Local storage** → **Clear**, then reload.

---

## 📸 Screenshots

| Client home | Client calendar |
|---|---|
| ![](screenshots/client-home.png) | ![](screenshots/client-calendar.png) |
| **Explore** | **Business dashboard** |
| ![](screenshots/explore.png) | ![](screenshots/business-dashboard.png) |
| **Business calendar** | **Ask Capi (business)** |
| ![](screenshots/business-calendar.png) | ![](screenshots/capi-business.png) |

<img src="screenshots/mobile.png" width="260" alt="Mobile view">

---

## 🗂️ Project structure

```
appointly/
├── index.html          # Page shell: loads the fonts, CSS and JS
├── css/
│   └── styles.css      # Theme colours, layout, components, dark mode
├── js/
│   └── app.js          # Data, availability engine, views, router, actions, Capi
├── assets/
│   └── favicon.svg
├── screenshots/        # Images used in this README
└── README.md
```

## ▶️ Run it locally

No install is needed.

1. Download or clone this repo.
2. Open the folder in **VS Code**.
3. Install the **Live Server** extension, right-click `index.html` and choose **Open with Live Server**.
   (Or just double-click `index.html` to open it in your browser.)

## 🧰 Tech

- Plain **HTML, CSS and JavaScript**, with no framework or build step
- Hash-based routing (`#c-home`, `#explore`, `#dashboard`, …)
- `localStorage` acts as a simulated database
- One shared availability engine for all booking channels, so slots are never double-booked
- Capi is a hand-built inline SVG mascot with animated moods

## 🛣️ Roadmap

- [ ] Rebuild in **Next.js** + **Supabase** (Postgres, Auth, Realtime) and deploy on **Vercel**
- [ ] Real OTP and email verification, hashed passwords, role-based access
- [ ] Real LLM for Capi (multilingual, with human handover)
- [ ] WhatsApp/SMS reminders and online payments
- [ ] Separate demo and production environments

---

Made with 🧡 by **REDDY**
