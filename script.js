document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("charge-btn");

  btn.addEventListener("click", () => {
    alert("🚀 سيتم توجيهك قريبًا إلى نظام اشحنلي برو لبدء عملية الشحن!");
    window.location.href = "login.html";
  });
});
