document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear().toString();

  const whatsappButton = document.getElementById("whatsapp-cta");
  const form = document.getElementById("order-form");

  function buildWhatsAppLink(fields) {
    const targetPhone = (form?.dataset?.whatsapp || "213555555555").replace(/\D/g, "");
    const msg =
      `??????? ???? ??? ?????? ??????:\n` +
      `?????: ${fields.name}\n` +
      `??????: ${fields.phone}\n` +
      `???????: ${fields.wilaya}\n` +
      `???????: ${fields.address}\n` +
      `?????: 3500 ?? ? ??????? ?????`;
    const encoded = encodeURIComponent(msg);
    return `https://wa.me/${targetPhone}?text=${encoded}`;
  }

  if (whatsappButton) {
    whatsappButton.addEventListener("click", (e) => {
      e.preventDefault();
      const name = document.getElementById("name")?.value || "";
      const phone = document.getElementById("phone")?.value || "";
      const wilaya = document.getElementById("wilaya")?.value || "";
      const address = document.getElementById("address")?.value || "";
      const url = buildWhatsAppLink({ name, phone, wilaya, address });
      window.open(url, "_blank");
    });
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const fields = {
        name: String(data.get("name") || ""),
        phone: String(data.get("phone") || ""),
        wilaya: String(data.get("wilaya") || ""),
        address: String(data.get("address") || ""),
      };

      // Show success and offer WhatsApp follow-up
      const success = document.getElementById("form-success");
      if (success) success.hidden = false;

      // Optional: open WhatsApp with prefilled message
      const wa = buildWhatsAppLink(fields);
      window.open(wa, "_blank");

      // Clear fields for UX
      Array.from(form.querySelectorAll("input")).forEach((i) => (i.value = ""));
    });
  }
});

