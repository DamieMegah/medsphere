document.addEventListener('DOMContentLoaded', () => {
const medsphereHomepage = "https://medspherehealthcare.com";
const shortcut = document.querySelector(".quoter");

shortcut.addEventListener("click", () => {
    window.location.href = medsphereHomepage;
});

   // --- Elements ---
const form = document.querySelector("#newsletterForm"); // Target the form, not the button
const messageInput = document.querySelector("#message");
const submitButton = document.querySelector("#Subscribe-btn");
const defaultText = "Wants to subscribe to Medsphere Healthcare LTD newsletter.";
const messageArea = document.querySelector(".newsletter-message-area");

// --- Event Listener ---
form.addEventListener("submit", async function(event) {
    event.preventDefault(); 
    
    submitButton.disabled = true;
    submitButton.textContent = "Subscribing...";

    messageInput.value = defaultText;

    const data = new FormData(event.target);
    
    try {
        const response = await fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            messageArea.innerHTML = '<p style="color: green;">✅ Thank you for subscribing!</p>';
            form.reset();
        } else {
            messageArea.innerHTML = '<p style="color: red;">❌ Submission error. Please try again.</p>';
        }

    } catch (error) {
        messageArea.innerHTML = '<p style="color: red;">❌ Network error. Check your connection.</p>';
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Subscribe Now";

        setTimeout(() => messageArea.innerHTML = '', 5000);
    }
});

      document.querySelector("#newsletter-logo").addEventListener("click", function() {

        window.location.href = "/index.html";
    });

        //share fnction
        const shareButton = document.getElementById('shareButton');
        const messageBox = document.getElementById('messageBox');
        
        // Function to display a temporary message
        function displayMessage(message) {
            messageBox.textContent = message;
            setTimeout(() => {
                messageBox.textContent = '';
            }, 3000);
        }

        // Fallback function for copying text to clipboard
        function copyLinkToClipboard(textToCopy) {
            try {
                // Create a temporary input element
                const tempInput = document.createElement('textarea');
                tempInput.value = textToCopy;
                document.body.appendChild(tempInput);
                
                // Select and copy the text
                tempInput.select();
                // document.execCommand('copy') is used as navigator.clipboard.writeText may not work in iframes
                document.execCommand('copy');
                
                // Clean up the temporary element
                document.body.removeChild(tempInput);
                
                displayMessage('Link copied to clipboard!');
            } catch (err) {
                console.error('Could not copy text: ', err);
                displayMessage('Failed to copy link. Please copy manually: ' + textToCopy);
            }
        }

        // The core logic now attempts to use the native Web Share API
        shareButton.addEventListener('click', async () => {
            const currentUrl = window.location.href;
            
            // Data to share via the native dialog
            const shareData = {
                title: 'Medical Equipment Budgeting Guide',
                text: 'Read this guide on budgeting for essential medical equipment and operational costs.',
                url: currentUrl,
            };


            if (navigator.share) {
                // Use the native share dialog if available
                try {
                    await navigator.share(shareData);
                    // The native UI handles success/cancellation feedback
                } catch (err) {
                    if (err.name !== 'AbortError') {
                        // Handle actual sharing errors (not user cancellation)
                        console.error('Error sharing:', err);
                        displayMessage('Sharing failed. Copying link instead.');
                        copyLinkToClipboard(currentUrl);
                    }
                }
            } else {
                // Fallback: Copy the link to the clipboard if native sharing is unavailable
                copyLinkToClipboard(currentUrl);
            }
        });
    });

   
  