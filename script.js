// รอให้หน้าเว็บโหลดโครงสร้าง HTML เสร็จทั้งหมดก่อนเริ่มทำงาน
document.addEventListener("DOMContentLoaded", () => {
    
    // --- ลูกเล่นที่ 1: เอฟเฟกต์พิมพ์ชื่อตัวหนังสือทีละตัว (Typewriter Effect) ---
    const titleElement = document.querySelector("h1");
    if (titleElement) {
        const originalText = titleElement.innerText;
        titleElement.innerText = ""; // ล้างตัวหนังสือออกก่อนเพื่อทำเอฟเฟกต์
        let index = 0;

        function typeWriter() {
            if (index < originalText.length) {
                titleElement.innerText += originalText.charAt(index);
                index++;
                setTimeout(typeWriter, 100); // ความเร็วในการพิมพ์ (100 มิลลิวินาทีต่อตัวอักษร)
            }
        }
        typeWriter(); // เริ่มทำงานฟังก์ชันพิมพ์
    }

    // --- ลูกเล่นที่ 2: ดักจับการคลิกที่ลิงก์หัวข้อทั้งหมด ---
    const profileLinks = document.querySelectorAll(".section-link");

    profileLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            // ดึงข้อความในลิงก์มาใช้ (เช่น "1. ประวัติ")
            const linkName = link.innerText; 
            
            // เก็บและนับสถิติการคลิกลงในเครื่องคอมพิวเตอร์ของผู้ใช้ (Local Storage)
            let clickCount = localStorage.getItem(linkName) || 0;
            clickCount++;
            localStorage.setItem(linkName, clickCount);
            console.log(`หัวข้อ "${linkName}" ถูกคลิกไปแล้ว ${clickCount} ครั้ง`);

            // --- ลูกเล่นที่ 3: แสดงกล่องข้อความยืนยันก่อนเปิดลิงก์ภายนอก ---
            // หากระบบจำลอง (example.com) ให้ข้ามหน้าต่างเตือนนี้ไปได้เลย
            if (!link.href.includes("example.com")) {
                const leaveSite = confirm(`คุณต้องการเปิดลิงก์เพื่อไปยังหน้าเว็บของ "${linkName}" ใช่หรือไม่?`);
                if (!leaveSite) {
                    event.preventDefault(); // ถ้ายกเลิก จะไม่เปิดหน้าเว็บใหม่
                }
            }
        });
    });

});
