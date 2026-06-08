📌 Overview

This project is the official website for Medsphere Healthcare Ltd, a Lagos-based medical equipment supplier offering sales, servicing, installation, and consultation.
The website is built for performance, SEO visibility, and easy navigation of products and services.

🚀 Features

Fully responsive layout (mobile, tablet, desktop)

SEO-optimized with meta tags, Open Graph, and Twitter Cards

Google Analytics (GA4) integrated

JSON-LD schema for Organization, Website, and WebPage

Dynamic product filtering

Multi-level dropdown navigation for product categories

Hero slider with optimized images

AOS animations

Swiper (future use) preloaded

Lazy loading and preload optimization for performance

/
│── index.html → Main landing page  
│── style.css → Main stylesheet  
│── script.js → Main JavaScript (filtering, nav,interactions)  
│
│── /images → Product images, hero images, company logo  
│
│── cbs-50.html → Individual product page  
│── dr-accu.html  
│── se1.html  
│── sg1.html  
│── smt-30.html  
│── smt-50.html  
│── smt-70.html  
│── smt-120.html  
│── ua-201.html  
│
│── /blogs → Blog pages (current + future articles)  
│ │── article-1.html  
│ │── article-2.html  
│ │── article-3.html  
│ │── article-4.html  
│ │── article-5.html  
│ │── article-6.html  
│ │── article-7.html  
│ │── article-8.html  
│ │── article-9.html  
│ │── article-10.html  
│
│── /css → Separate CSS for blogs & product pages  
│ │── productStyle.css → Detailed product page styling  
│ │── blog.css → Blog article page styling

🔧 Technologies Used

HTML5, CSS3, JavaScript

Google Fonts (Inter)

AOS (Animate On Scroll)

FontAwesome Icons

Swiper.js (prepared for upcoming sliders)

JSON-LD structured data

Google Analytics (G-CRK43LMR9P)

📌 SEO Setup Included

The page has:

Title, description, keywords

Canonical tag

Open Graph for Facebook

Twitter Card

Robots meta

Schema Markup (Organization, Website, WebPage)

Preload for key hero image

This ensures strong visibility on search engines and better click-through for the brand.

🖼️ Performance Optimization

Lazy-loading on images

Preloaded hero image

Compressed AVIF images

Reduced JS dependencies

Mobile-first layout

📱 Responsive Layout Guide

Mobile view: Single-column, slide-down menu

Tablet: Adjusted hero height and responsive nav

Desktop: Full-width hero with side image gallery

⚙️ How to Edit & Deploy

Edit files normally in your code editor.

Compress all images in /images before uploading.

Upload the updated site to hosting via cPanel or FTP.

Clear cache or add ?v=2 version strings during updates.

🔍 Search Function

filterProducts() is used to filter product names both in the nav and on the product page.
SearchAction schema supports autocomplete indexing by Google.

🧩 Navigation Structure

Services dropdown: Servicing, Consultation, Installation, Maintenance
Products dropdown: Hematology, Chemistry, Electrolyte, Blood Gas, FIA, Urine Analyzer, Consumables
Company, Blog, and Contact links included.

📬 Contact

Medsphere Healthcare Ltd
14, Salvation Avenue, Off Lucas Street, Obawole, Ifako Ijaiye, Lagos
📞 +234 704 941 3802
