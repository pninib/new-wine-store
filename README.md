# Wine Store Client

A modern React client for an online wine shop, featuring a rich user interface, shopping cart, user management, and advanced forms.

---

## Main Features

- **Beautiful Home Page** with banner, navigation bar, and quick access buttons.
- **Product List (Wines)** with search, pagination, stylish product cards, and detailed wine view.
- **Add to Cart** – Each product can be added to the cart, with smart dialogs for unauthenticated users.
- **Mini Cart Popup** and **Full Cart Page** – Edit, remove, and clear items.
- **Checkout Page** – Shipping details form with validation and a running marquee message about cash payment.
- **User Management** – Registration, login, email verification, and admin user management.
- **Product Management** – Add, update, and delete wines (admin only).
- **Modern Design** – Material UI, RTL support, consistent colors, fully responsive.
- **Redux Toolkit** – Global state management for users, products, and cart.

---

## Project Structure

```
src/
│   App.js, App.css, index.js, home.js ...
│
├── components/
│   ├── order/
│   │   ├── cartPage.js      # Full cart page
│   │   ├── cartPopup.js     # Mini cart popup
│   │   ├── orderSlice.js    # Redux slice for cart
│   │   ├── CheckoutPage.js  # Checkout page
│   ├── user/
│   │   ├── login.js, signup.js, allUser.js, userSlice.js ...
│   ├── wine/
│       ├── card.js, cardList.js, addWine.js, updateWine.js, productSlice.js ...
│
├── images/
│   ├── Grape field.jpg, Grape.jpg
│
└── assets/
```

---

## Main Technologies

- **React 18**
- **Redux Toolkit**
- **React Router**
- **Material UI (MUI)**
- **Framer Motion** (animations)
- **Axios** (API calls)
- **RTL (Right-to-Left)** – Full Hebrew support

---

## Installation & Running

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start development server:
   ```bash
   npm start
   ```
3. Make sure the backend API server is running at `https://wine-store-server.onrender.com`.

---

## Main Routes

- `/` – Home page
- `/wines` – Wine list
- `/wine/:id` – Wine details
- `/cart` – Full cart page
- `/checkout` – Checkout page
- `/login` – Login
- `/signup` – Signup
- `/allUsers` – User management (admin)
- `/addWine` – Add wine (admin)

---

## Contribution

- Feel free to suggest features, bug fixes, and improvements!
- All pull requests are welcome.

---

## Credits

- UI: [Material UI](https://mui.com/)
- Developed by: Wine Store Team

---

Enjoy!