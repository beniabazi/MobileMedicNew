// Get all icons and modals
const icons = document.querySelectorAll(".icon");
const overlays = document.querySelectorAll(".overlay");
const closeButtons = document.querySelectorAll(".close");

// Add event listeners to icons to open modals
icons.forEach((icon) => {
  icon.addEventListener("click", function () {
    const targetModal = document.getElementById(
      this.getAttribute("data-target")
    );
    if (targetModal) {
      targetModal.style.display = "block";
    }
  });
});

// Add event listeners to close buttons
closeButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const overlay = this.closest(".overlay");
    overlay.style.display = "none"; // Close the closest overlay
  });
});

// Close modal if user clicks outside of modal content
window.onclick = function (event) {
  overlays.forEach((overlay) => {
    if (event.target === overlay) {
      overlay.style.display = "none"; // Close overlay if clicked outside of content
    }
  });
};

/* ================================PRICING FUNCTION======================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const brandSelect = document.getElementById("brandSelect");
  const modelSelect = document.getElementById("modelSelect");
  const generationSelect = document.getElementById("generationSelect");
  const repairSelect = document.getElementById("repairSelect");
  const priceDisplay = document.getElementById("priceDisplay");

  // Fetch the JSON data
  fetch("json/repairData.json")
    .then((response) => response.json())
    .then((data) => {
      // Populate the brand dropdown
      Object.keys(data).forEach((brand) => {
        const option = document.createElement("option");
        option.value = brand;
        option.textContent = brand;
        brandSelect.appendChild(option);
      });
    });

  // Event listener for brand selection
  brandSelect.addEventListener("change", () => {
    const selectedBrand = brandSelect.value;

    // Reset all subsequent dropdowns
    modelSelect.innerHTML = '<option value="">-- Select a model --</option>';
    generationSelect.innerHTML =
      '<option value="">-- Select a generation --</option>';
    repairSelect.innerHTML =
      '<option value="">-- Select a repair service --</option>';
    priceDisplay.textContent = "Price: ";

    if (selectedBrand) {
      modelSelect.disabled = false;
      fetch("json/repairData.json")
        .then((response) => response.json())
        .then((data) => {
          const models = data[selectedBrand];
          Object.keys(models).forEach((model) => {
            const option = document.createElement("option");
            option.value = model;
            option.textContent = model;
            modelSelect.appendChild(option);
          });
        });
    } else {
      modelSelect.disabled = true;
      generationSelect.disabled = true;
      repairSelect.disabled = true;
    }
  });

  // Event listener for model selection
  modelSelect.addEventListener("change", () => {
    const selectedBrand = brandSelect.value;
    const selectedModel = modelSelect.value;

    // Reset the generation and repair service dropdowns
    generationSelect.innerHTML =
      '<option value="">-- Select a generation --</option>';
    repairSelect.innerHTML =
      '<option value="">-- Select a repair service --</option>';
    priceDisplay.textContent = "Price: ";

    if (selectedModel) {
      generationSelect.disabled = false;
      fetch("json/repairData.json")
        .then((response) => response.json())
        .then((data) => {
          const generations = data[selectedBrand][selectedModel];
          Object.keys(generations).forEach((generation) => {
            const option = document.createElement("option");
            option.value = generation;
            option.textContent = generation;
            generationSelect.appendChild(option);
          });
        });
    } else {
      generationSelect.disabled = true;
      repairSelect.disabled = true;
    }
  });

  // Event listener for generation selection
  generationSelect.addEventListener("change", () => {
    const selectedBrand = brandSelect.value;
    const selectedModel = modelSelect.value;
    const selectedGeneration = generationSelect.value;

    // Reset the repair service dropdown and price display
    repairSelect.innerHTML =
      '<option value="">-- Select a repair service --</option>';
    priceDisplay.textContent = "Price: ";

    if (selectedGeneration) {
      repairSelect.disabled = false;
      fetch("json/repairData.json")
        .then((response) => response.json())
        .then((data) => {
          const repairs =
            data[selectedBrand][selectedModel][selectedGeneration];
          Object.keys(repairs).forEach((repair) => {
            const option = document.createElement("option");
            option.value = repair;
            option.textContent = repair;
            repairSelect.appendChild(option);
          });
        });
    } else {
      repairSelect.disabled = true;
    }
  });

  // Event listener for repair selection
  repairSelect.addEventListener("change", () => {
    const selectedBrand = brandSelect.value;
    const selectedModel = modelSelect.value;
    const selectedGeneration = generationSelect.value;
    const selectedRepair = repairSelect.value;

    if (selectedRepair) {
      fetch("json/repairData.json")
        .then((response) => response.json())
        .then((data) => {
          const price =
            data[selectedBrand][selectedModel][selectedGeneration][
              selectedRepair
            ];
          priceDisplay.textContent = `Price: ${price}`;
        });
    } else {
      priceDisplay.textContent = "Price: ";
    }
  });
});

/* ===============================DROPDOWN FUNCTION==================================== */
// Function to toggle dropdown visibility
function toggleDropdown(button) {
  const content = button.nextElementSibling;
  if (content.style.display === "block") {
    content.style.display = "none";
    button.classList.remove("active");
  } else {
    content.style.display = "block";
    button.classList.add("active");
  }
}

/* ===============================OVERLAY FUNCTION==================================== */
// These functions are now managed by event listeners, so no need to call them manually.
// You can still use the below function in specific cases if needed.
function openOverlay(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.style.display = "block";
  }
}

function closeOverlay(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.style.display = "none";
  }
}

// Close the modal when the user clicks outside of it
window.onclick = function (event) {
  overlays.forEach((overlay) => {
    if (event.target === overlay) {
      overlay.style.display = "none";
    }
  });
};

/* ===============================BOOKING AND MAIL IN POP UP FUNCTION==================================== */

function openPopup(url, title) {
  const width = 600;
  const height = 2000;
  const left = screen.width / 2 - width / 2;
  const top = screen.height / 2 - height / 2;
  window.open(
    url,
    title,
    `width=${width}, height=${height}, top=${top}, left=${left}`
  );
}

function bookRepair() {
  openPopup("book_repair.html", "Book Repair");
}

function mailInRepair() {
  openPopup("mail_in_service.html", "Mail-In Repair");
}
