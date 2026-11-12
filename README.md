# GBT Cleaning Services website

Pages: index, about, services, gallery, pricing, areas, faq, contact, booking. Open index.html in a browser, or upload the whole folder to any host.

## 1. Swap the photos
- Gallery before/after pairs live in images/. Replace placeholder-1..4 (before/after) with your photos (keep names, or edit gallery.html). The oven and cooktop pairs are the real photos you sent.
- Add Gracie's portrait where the "replace" blocks appear (index.html, about.html) and real reviews in the testimonial section of index.html.
- The flyers are saved in images/ for reference. Add the logo file and replace the GBT text logo in the header if you want the exact artwork.

## 2. Turn on booking emails (client + owner copy)
1. Create a free account at emailjs.com and connect your email service.
2. Create ONE template. Set "To email" to {{to_email}}. Subject: Your GBT Cleaning quote. Body can use: {{to_name}}, {{service}}, {{frequency}}, {{quote}}, {{date}}, {{time}}, {{address}}, {{client_phone}}, {{client_email}}, {{bedrooms}}, {{bathrooms}}, {{size}}, {{condition}}, {{addons}}, {{notes}}, {{copy_for}}, {{phone}}.
3. Open js/config.js and fill in ownerEmail, publicKey, serviceId, templateId.
Each booking sends two emails: one to the client, one to the owner. Until configured, the form falls back to a prefilled email.
Also replace OWNER_EMAIL@example.com in contact.html.

## 3. Edit prices
Prices are in js/main.js (base, add-ons in booking.html data-p values).
