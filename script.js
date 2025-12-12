window.PoppyUI = {
  openModal: function (id) {
    const m = document.getElementById(id);
    if (m) m.classList.add("show");
  },

  closeModal: function (id) {
    const m = document.getElementById(id);
    if (m) m.classList.remove("show");
  },

  showWelcomeToast: function (name, onClose) {
    const toast = document.getElementById("welcomeToast");
    const hey = document.getElementById("toastHeyText");
    const closeBtn = document.getElementById("toastCloseBtn");

    if (!toast || !hey || !closeBtn) return;

    hey.textContent = `Hey ${name}`;
    toast.classList.add("show");

    const handler = () => {
      toast.classList.remove("show");
      closeBtn.removeEventListener("click", handler);
      if (typeof onClose === "function") onClose();
    };

    closeBtn.addEventListener("click", handler);
  }
};

document.addEventListener("DOMContentLoaded", function () {

  // Close any modal with data-close-modal
  document.querySelectorAll("[data-close-modal]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-close-modal");
      window.PoppyUI.closeModal(id);
    });
  });

  // Footer popups (Index)
  const linkToModal = [
    ["footerTemplatesLink", "templatesModal"],
    ["footerFaqLink", "faqModal"],
    ["footerTimeTipsLink", "timeTipsModal"],
    ["footerStudyGuidesLink", "studyGuidesModal"]
  ];

  linkToModal.forEach(([linkId, modalId]) => {
    const link = document.getElementById(linkId);
    if (!link) return;

    link.addEventListener("click", (e) => {
      e.preventDefault();
      window.PoppyUI.openModal(modalId);
    });
  });

  // Pricing selection
  const pricingTable = document.getElementById("pricingTable");
  if (pricingTable) {
    let selectedRow = null;

    pricingTable.addEventListener("click", (e) => {
      const btn = e.target.closest(".plan-choose-btn");
      if (!btn) return;

      const row = btn.closest("tr");
      if (!row) return;

      const isSame = selectedRow === row;

      pricingTable.querySelectorAll("tr").forEach((r) => {
        r.classList.remove("plan-selected");
        const b = r.querySelector(".plan-choose-btn");
        if (b) {
          b.classList.remove("choose-selected");
          b.textContent = "Choose";
        }
      });

      if (isSame) {
        selectedRow = null;
        return;
      }

      selectedRow = row;
      row.classList.add("plan-selected");
      btn.classList.add("choose-selected");
      btn.textContent = "Selected";

      const plan = row.getAttribute("data-plan");
      const price = row.getAttribute("data-price");
      const features = row.getAttribute("data-features");

      const title = document.getElementById("planDetailsTitle");
      const priceEl = document.getElementById("planDetailsPrice");
      const featuresEl = document.getElementById("planDetailsFeatures");

      if (title) title.textContent = `${plan} Plan`;
      if (priceEl) priceEl.textContent = `Price: ${price}`;
      if (featuresEl) featuresEl.textContent = `Includes: ${features}`;

      window.PoppyUI.openModal("planDetailsModal");
    });

    const removeBtn = document.getElementById("removePlanBtn");
    if (removeBtn) {
      removeBtn.addEventListener("click", () => {
        if (!selectedRow) return;

        const btn = selectedRow.querySelector(".plan-choose-btn");
        selectedRow.classList.remove("plan-selected");

        if (btn) {
          btn.classList.remove("choose-selected");
          btn.textContent = "Choose";
        }

        selectedRow = null;
        window.PoppyUI.closeModal("planDetailsModal");
      });
    }

    const checkoutBtn = document.getElementById("checkoutPlanBtn");
    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", () => {
        alert("Checkout demo: This would continue to payment in a real app.");
        window.PoppyUI.closeModal("planDetailsModal");
      });
    }
  }

  // Feedback form submit
  const feedbackForm = document.querySelector('form[data-feedback-form="true"]');
  if (feedbackForm) {
    feedbackForm.addEventListener("submit", function (event) {
      event.preventDefault();
      alert("Thank you! Your message was submitted.");
      feedbackForm.reset();
    });
  }
});
