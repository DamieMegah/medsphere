// hamburger


 const toggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    let hamburger = document.querySelector('.ham-menu');
    

    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
    });

    let control = document.querySelectorAll('.navs');
     control.forEach(nav => {
      nav.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
      });
    });

     window.onscroll = function(){
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
       
     }
function filterProducts() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const products = document.querySelectorAll(".product-card");
  let anyMatch = false;

  products.forEach(product => {
    const name = product.querySelector(".product-name").textContent.toLowerCase();
    if (name.includes(input)) {
      product.style.display = "block"; //can be "flex" or "block"
      anyMatch = true;
    } else {
      product.style.display = "none";
    }
  });

  // If user has typed at least 1 character, scroll to the products
  if (input.length > 0 && anyMatch) {
    document.getElementById("product").scrollIntoView({ behavior: "smooth" });
  }
}




     
  //  PRODUCT
function product() {
  document.getElementById("product").scrollIntoView({ behavior: "smooth" });
}

   


 // Service Slider variables (ensure these are global or within a closure)
const slider = document.getElementById('slider');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
let autoSlide = true;
let slideInterval; // ADD THIS LINE to hold the interval ID

function startAutoSlide() {
    // Clear any existing interval before starting a new one
    if (slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(() => {
        if (autoSlide) {
            currentSlide = (currentSlide + 1) % 3;
            updateSlider();
        }
    }, 5000);
}

function stopAutoSlide() {
    clearInterval(slideInterval);
}

function updateSlider() {
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentSlide].classList.add('active');
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
    autoSlide = false;
    // Reset timer on manual interaction
    stopAutoSlide();
    setTimeout(() => autoSlide = true, 5000); // Resume auto-slide after a pause
    startAutoSlide(); // Re-start the timer
    
    document.querySelector('.about-container').scrollIntoView({ behavior: 'smooth' });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % 3;
    updateSlider();
    autoSlide = false;
    // Reset timer on manual interaction
    stopAutoSlide();
    setTimeout(() => autoSlide = true, 5000);
    startAutoSlide();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + 3) % 3;
    updateSlider();
    autoSlide = false;
    // Reset timer on manual interaction
    stopAutoSlide();
    setTimeout(() => autoSlide = true, 5000);
    startAutoSlide();
}

// Initial start of auto-slide
startAutoSlide();

    

 
  
  
  // Scroll to Top Button
   window.addEventListener('scroll', () => {
  const btn = document.getElementById('scroll-Up');
  if (document.documentElement.scrollTop > 10) {
    btn.style.opacity = '1';
    btn.style.pointerEvents = 'auto';
  } else {
    btn.style.opacity = '0';
    btn.style.pointerEvents = 'none'; 
  }
});


document.getElementById('scroll-Up').addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
 


// Smooth scroll to sections
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });





// WhatsApp Chat Confirmation

  let chatReady = false;

  function toggleChatConfirm() {
    const confirmBox = document.getElementById('chatConfirm');

    if (!chatReady) {
      confirmBox.style.display = 'block';
      chatReady = true;

      // Hide on scroll
      window.addEventListener('scroll', () => {
        confirmBox.style.display = 'none';
        chatReady = false;
      });

      // Reset after 5 seconds
      setTimeout(() => {
        confirmBox.style.display = 'none';
        chatReady = false;
      }, 5000);
    } else {
      // OPTIONAL: get user's name from input (if you have one)
      const nameInput = document.getElementById('userNameInput');
      const userName = nameInput ? nameInput.value.trim() : '';

      // OPTIONAL: get device name dynamically (if you have such an element)
      const deviceElement = document.getElementById('deviceName');
      const deviceName = deviceElement ? deviceElement.innerText.trim() : 'a device';

      const message = `Hello, my name is ${userName || 'YOUR NAME'}, I want more information on "${deviceName}"`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappURL = `https://wa.me/2347049413802?text=${encodedMessage}`;

      window.open(whatsappURL, '_blank');
    }
  }

  

  // Request Pop Up Form
 function openRequestPopup(productName) {
    // Show popup
    document.getElementById('requestPopup').style.display = 'block';

    // Show product name to user
    document.getElementById('productNameDisplay').textContent = productName;

    // Pass product name to form input for submission
    document.getElementById('productNameInput').value = productName;
  }

  function closeRequestPopup() {
    document.getElementById('requestPopup').style.display = 'none';

  }
  
   document.addEventListener('DOMContentLoaded', () => {
            const slider = document.getElementById('blogSlider');
            const dotsContainer = document.getElementById('sliderDots');
            const cardWrappers = slider.querySelectorAll('.blog-card-wrapper');
            const numCards = cardWrappers.length;
            let currentIndex = 0;
            let autoSlideInterval;
            const slideDuration = 4000; // 4 seconds

            // --- 1. Dot Generation ---
            function createDots() {
                for (let i = 0; i < numCards; i++) {
                    const dot = document.createElement('span');
                    dot.classList.add('dot');
                    dot.setAttribute('data-index', i);
                    dot.title = `Go to article ${i + 1}`;
                    dot.addEventListener('click', () => {
                        jumpToSlide(i);
                        pauseAutoSlide(3000); // Pause for a moment after manual jump
                    });
                    dotsContainer.appendChild(dot);
                }
            }

            // --- 2. Sliding Functionality ---
            function showSlide(index) {
                // Ensure index is within bounds (looping)
                if (index >= numCards) {
                    index = 0;
                } else if (index < 0) {
                    index = numCards - 1;
                }
                currentIndex = index;

                // Calculate the scroll position
                // Get the left position of the target card relative to the slider container
                const targetCard = cardWrappers[currentIndex];
                const scrollLeftPosition = targetCard.offsetLeft - slider.offsetLeft;

                // Scroll the slider container to the target position
                slider.scrollLeft = scrollLeftPosition;

                updateDots(currentIndex);
            }

            function jumpToSlide(index) {
                // Manually set the slide and clear the auto-slide timer
                showSlide(index);
            }

            function nextSlide() {
                showSlide(currentIndex + 1);
            }

            // --- 3. Dot Synchronization ---
            function updateDots(index) {
                const dots = dotsContainer.querySelectorAll('.dot');
                dots.forEach(dot => dot.classList.remove('active'));
                if (dots[index]) {
                    dots[index].classList.add('active');
                }
            }

            // --- 4. Auto-Slide and Interaction Management ---
            function startAutoSlide() {
                if (autoSlideInterval) clearInterval(autoSlideInterval);
                autoSlideInterval = setInterval(nextSlide, slideDuration);
            }

            function stopAutoSlide() {
                clearInterval(autoSlideInterval);
            }

            // Temporary pause function for user interaction
            function pauseAutoSlide(duration = 5000) {
                stopAutoSlide();
                setTimeout(startAutoSlide, duration);
            }

            // Initial setup
            createDots();
            showSlide(currentIndex);
            startAutoSlide();

            // Pause on mouse interaction (hover)
            slider.addEventListener('mouseover', stopAutoSlide);
            slider.addEventListener('mouseout', startAutoSlide);

            // Pause on keyboard interaction (focus for accessibility)
            cardWrappers.forEach(wrapper => {
                const link = wrapper.querySelector('a');
                if (link) {
                    link.addEventListener('focus', stopAutoSlide);
                    link.addEventListener('blur', startAutoSlide);
                }
            });

            // Re-evaluate current slide on manual scroll (e.g., using trackpad or swipe)
            slider.addEventListener('scroll', () => {
                const scrollPos = slider.scrollLeft;
                const cardWidth = cardWrappers[0].offsetWidth;
                const gap = 32; // 2rem in pixels (based on CSS gap)
                
                // Calculate the index based on scroll position + half of card width
                // The scroll position should be close to the start of a card
                let newIndex = Math.round(scrollPos / (cardWidth + gap));
                
                if (newIndex !== currentIndex) {
                    currentIndex = newIndex;
                    updateDots(currentIndex);
                    // Temporarily pause auto-slide to respect the user's manual scroll
                    pauseAutoSlide(2500); 
                }
            });
        });