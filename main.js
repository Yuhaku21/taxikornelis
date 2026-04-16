  let currentLang = localStorage.getItem("lang") || "id";

        // Ambil element yang mau di translate
       const elements = document.querySelectorAll("h1, p, .nav-link, .btn-orange");

        // Simpan teks asli
        const originalTexts = [];
        elements.forEach(el => {
            originalTexts.push(el.innerText);
        });

        // API translate
        async function translateText(text, targetLang) {
            const res = await fetch(
                `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`
            );
            const data = await res.json();
            return data[0][0][0];
        }

        // Translate halaman
        async function translatePage(lang) {
            for (let i = 0; i < elements.length; i++) {
                if (lang === "id") {
                    elements[i].innerText = originalTexts[i];
                } else {
                    let translated = await translateText(originalTexts[i], "en");
                    elements[i].innerText = translated;
                }
            }

            localStorage.setItem("lang", lang);
            updateButton();
        }

        // Update tombol
        function updateButton() {
            const btn = document.getElementById("translateBtn");
            const btnMobile = document.getElementById("translateBtnMobile");

            if (btn) btn.textContent = currentLang === "id" ? "🌐 EN" : "🌐 ID";
            if (btnMobile) btnMobile.textContent = currentLang === "id" ? "🌐 English" : "🌐 Indonesia";
        }

        // Event
        document.getElementById("translateBtn").addEventListener("click", toggleLang);
        document.getElementById("translateBtnMobile").addEventListener("click", toggleLang);

        function toggleLang() {
            currentLang = currentLang === "id" ? "en" : "id";
            translatePage(currentLang);
        }

        // Init
        updateButton();

        if (currentLang === "en") {
            translatePage("en");
        }