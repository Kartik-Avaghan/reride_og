let currentStep = 1;
const formData = {};

// Vehicle data
const vehicleData = {
  TVS: [
    "Apache RTR 160",
    "Apache RTR 200",
    "Jupiter",
    "Ntorq 125",
    "Star City Plus",
  ],
  Bajaj: [
    "Aspire 100",
    "Avenger 200",
    "Avenger Cruise 220",
    "Avenger Street 150",
    "Avenger Street 160",
    "Dominar 400",
    "Platina 100",
    "Pulsar 150",
    "Pulsar 180",
    "Pulsar 200",
    "Pulsar 220F",
    "Pulsar NS200",
  ],
  Hero: [
    "Glamour",
    "HF Deluxe",
    "Honda Activa 6G",
    "Passion Pro",
    "Splendor Plus",
    "Super Splendor",
  ],
  Honda: [
    "Activa 6G",
    "CB Shine",
    "CB Unicorn",
    "Dio",
    "Grazia",
    "Hornet 2.0",
    "SP 125",
    "X-Blade",
  ],
  Yamaha: [
    "FZ-S",
    "FZ Version 3.0",
    "MT-15",
    "R15 V4",
    "Ray ZR",
    "Saluto RX",
    "YZF R15",
  ],
  "Royal Enfield": [
    "Bullet 350",
    "Classic 350",
    "Himalayan",
    "Interceptor 650",
    "Meteor 350",
    "Thunderbird 350",
  ],
  Suzuki: [
    "Access 125",
    "Burgman Street",
    "Gixxer",
    "Gixxer SF",
    "Intruder 150",
    "Let's",
  ],
  Jawa: ["Jawa", "Jawa 42", "Jawa Perak"],
  KTM: [
    "125 Duke",
    "200 Duke",
    "250 Duke",
    "390 Duke",
    "RC 125",
    "RC 200",
    "RC 390",
  ],
  Kawasaki: [
    "Ninja 300",
    "Ninja 400",
    "Ninja 650",
    "Z650",
    "Z900",
    "Versys 650",
  ],
  OLA: ["S1", "S1 Pro", "S1 Air"],
  Vespa: ["Elegante 150", "SXL 150", "VXL 150", "ZX 125"],
};

// Main function to select option and move to next step
function selectOption(type, value, stepNumber) {
  formData[type] = value;

  // Highlight selected option
  const currentStepElement = document.getElementById(`step${stepNumber}`);
  const options = currentStepElement.querySelectorAll(
    ".option-card, .model-item, .rto-item"
  );
  options.forEach((opt) => opt.classList.remove("selected"));

  // Find and highlight the clicked option
  event.target
    .closest(".option-card, .model-item, .rto-item")
    .classList.add("selected");

  // Auto advance to next step after a short delay
  setTimeout(() => {
    nextStep(stepNumber);
  }, 300);
}

function nextStep(step) {
  if (step < 9) {
    document.getElementById(`step${step}`).classList.remove("active");
    currentStep = step + 1;
    document.getElementById(`step${currentStep}`).classList.add("active");
    document.getElementById("stepCounter").textContent = `${currentStep}/9`;
    updateTabs();
    document.getElementById("backBtn").style.display =
      currentStep > 1 ? "block" : "none";
    loadStepContent();
  }
}

function previousStep() {
  if (currentStep > 1) {
    document.getElementById(`step${currentStep}`).classList.remove("active");
    currentStep--;
    document.getElementById(`step${currentStep}`).classList.add("active");
    document.getElementById("stepCounter").textContent = `${currentStep}/9`;
    updateTabs();
    document.getElementById("backBtn").style.display =
      currentStep > 1 ? "block" : "none";
  }
}

function updateTabs() {
  const tabs = document.querySelectorAll(".step-tab");
  tabs.forEach((tab, index) => {
    tab.classList.remove("active", "completed");
    if (index + 1 === currentStep) {
      tab.classList.add("active");
    } else if (index + 1 < currentStep) {
      tab.classList.add("completed");
    }
  });
}

function loadStepContent() {
  switch (currentStep) {
    case 2: // After brand
      loadModels();
      break;
    case 3: // After model
      loadYears();
      break;
    case 4: // Vehicle colour
      loadColors();
      break;
    case 5: // Purchase details
      loadPurchaseDetails();
      break;
    case 6: // Owner details
      loadOwnerDetails();
      break;
    case 7: // Registration + image
      loadRegistrationUpload();
      break;
    case 8: // Inspection date + location
      loadInspectionDetails();
      break;
    case 9: // Contact
      break;
  }
}

function loadModels() {
  const selectedBrand = formData.brand;
  const modelList = document.getElementById("modelList");
  const models = vehicleData[selectedBrand] || [];

  modelList.innerHTML = "";
  models.forEach((model) => {
    const modelItem = document.createElement("div");
    modelItem.className = "model-item";
    modelItem.textContent = model;
    modelItem.onclick = () => selectOption("model", model, 2);
    modelList.appendChild(modelItem);
  });
}

function loadVariants() {
  const selectedModel = formData.model;
  const variantList = document.getElementById("variantList");

  // Sample variants based on model
  const variants = [
    `${selectedModel} Standard`,
    `${selectedModel} Deluxe`,
    `${selectedModel} Special Edition`,
    `${selectedModel} CBS`,
    `${selectedModel} ABS`,
  ];

  variantList.innerHTML = "";
  variants.forEach((variant) => {
    const variantItem = document.createElement("div");
    variantItem.className = "model-item";
    variantItem.textContent = variant;
    variantItem.onclick = () => selectOption("variant", variant, 3);
    variantList.appendChild(variantItem);
  });
}

function loadYears() {
  const yearGrid = document.getElementById("yearGrid");
  const currentYear = new Date().getFullYear();
  const years = [];

  for (let year = currentYear; year >= currentYear - 20; year--) {
    years.push(year);
  }

  yearGrid.innerHTML = "";
  years.forEach((year) => {
    const yearItem = document.createElement("div");
    yearItem.className = "rto-item";
    yearItem.textContent = year;
    yearItem.onclick = () => selectOption("year", year, 3);
    yearGrid.appendChild(yearItem);
  });
}

function loadColors() {
  const colorList = [
    "Red",
    "Black",
    "White",
    "Blue",
    "Grey",
    "Silver",
    "Green",
    "Yellow",
  ];
  const colorGrid = document.getElementById("colorGrid");
  colorGrid.innerHTML = "";
  colorList.forEach((color) => {
    const colorItem = document.createElement("div");
    colorItem.className = "model-item";
    colorItem.textContent = color;
    colorItem.onclick = () => selectOption("color", color, 4);
    colorGrid.appendChild(colorItem);
  });
}

function loadPurchaseDetails() {
  const purchaseYearInput = document.getElementById("purchaseYear");
  const purchaseAmountInput = document.getElementById("purchaseAmount");
  const PurchaseButton = document.getElementById("purchase-btn");

  // Hide the button initially
  PurchaseButton.style.display = "none";

  function checkPurchaseDetails() {
    const year = purchaseYearInput.value;
    const amount = parseFloat(purchaseAmountInput.value);

    if (year !== "" && !isNaN(amount) && amount > 0) {
      PurchaseButton.style.display = "block";
    } else {
      PurchaseButton.style.display = "none";
    }
  }

  purchaseYearInput.addEventListener("change", (e) => {
    formData.purchaseDate = e.target.value;
    checkPurchaseDetails();
  });

  purchaseAmountInput.addEventListener("input", (e) => {
    formData.purchaseAmount = e.target.value;
    checkPurchaseDetails();
  });
}

function loadOwnerDetails() {
  //   document.getElementById("ownerName").addEventListener("input", (e) => {
  //     formData.ownerName = e.target.value;
  //   });
}

function loadRegistrationUpload() {
  const registrationNumberInput = document.getElementById("registrationNumber");
  const registrationImageInput = document.getElementById("photoInput");
  const registrationButton = document.getElementById("registration-btn");
  const imagePreviewDiv = document.getElementById("photoPreview");

  registrationButton.style.display = "none";
  imagePreviewDiv.innerHTML = "";

  if (!formData.vehicleImages || !Array.isArray(formData.vehicleImages)) {
    formData.vehicleImages = [];
  }

  function checkRegistrationDetails() {
    const regNumber = registrationNumberInput.value.trim();
    const regImages = registrationImageInput.files;

    if (regNumber !== "" && regImages.length > 0) {
      registrationButton.style.display = "block";
    } else {
      registrationButton.style.display = "none";
    }

    if (regImages.length > 0) {
      // Show file count
      const countText = document.createElement("p");
      countText.textContent = `${regImages.length} image(s) selected:`;
      countText.style.marginBottom = "10px";
      imagePreviewDiv.appendChild(countText);

      // Show thumbnails
      Array.from(regImages).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = document.createElement("img");
          img.src = e.target.result;
          img.style.width = "60px";
          img.style.height = "60px";
          img.style.objectFit = "cover";
          img.style.marginRight = "10px";
          img.style.borderRadius = "4px";
          imagePreviewDiv.appendChild(img);
        };
        reader.readAsDataURL(file);

      });
    }
  }

  // Update formData and check for completeness
  registrationNumberInput.addEventListener("input", (e) => {
    formData.registrationNumber = e.target.value;
    checkRegistrationDetails();
  });

  registrationImageInput.addEventListener("change", (e) => {
    const newFiles = Array.from(e.target.files);

    // Allow only as many images as needed to reach 5
    const availableSlots = 5 - formData.vehicleImages.length;
    if (availableSlots <= 0) {
      alert("You have already selected the maximum of 5 images.");
      registrationImageInput.value = ""; // reset input
      return;
    }

    const filesToAdd = newFiles.slice(0, availableSlots); // only take up to available slots
    if (newFiles.length > availableSlots) {
      alert(`You can only add ${availableSlots} more image(s).`);
      return;
    }

    formData.vehicleImages = formData.vehicleImages.concat(filesToAdd);
    checkRegistrationDetails();
    registrationImageInput.value = "";
  });
}

function loadInspectionDetails() {
  const inspectionDateInput = document.getElementById("inspectionDate");
  const inspectionLocationInput = document.getElementById("inspectionLocation");
  const inspectionButton = document.getElementById("inspection-btn");

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Format to YYYY-MM-DD
  const minDate = tomorrow.toISOString().split("T")[0];
  inspectionDateInput.setAttribute("min", minDate);

  if (!inspectionDateInput || !inspectionLocationInput || !inspectionButton)
    return;

  inspectionButton.style.display = "none";

  function checkInspectionDetails() {
    const date = inspectionDateInput.value.trim();
    const location = inspectionLocationInput.value.trim();

    if (date !== "" && location !== "") {
      inspectionButton.style.display = "block";
    } else {
      inspectionButton.style.display = "none";
    }
  }

  inspectionDateInput.addEventListener("change", (e) => {
    formData.inspectionDate = e.target.value;
    checkInspectionDetails();
  });

  inspectionLocationInput.addEventListener("change", (e) => {
    formData.inspectionLocation = e.target.value;
    checkInspectionDetails();
  });
}

// Filter functions
function filterModels() {
  const searchTerm = document.getElementById("modelSearch").value.toLowerCase();
  const models = document.querySelectorAll("#modelList .model-item");

  models.forEach((model) => {
    const text = model.textContent.toLowerCase();
    model.style.display = text.includes(searchTerm) ? "block" : "none";
  });
}

function loadContactDetails() {
  const fullName = document.getElementById("fullName");
  const mobileNumber = document.getElementById("mobileNumber");
  const emailAddress = document.getElementById("emailAddress");
  const contactBtn = document.getElementById("contact-btn");

  function checkContactFields() {
    if (
      fullName.value.trim() !== "" &&
      mobileNumber.value.trim() !== "" &&
      emailAddress.value.trim() !== ""
    ) {
      contactBtn.style.display = "block";
    } else {
      contactBtn.style.display = "none";
    }
  }

  // Update formData on input
  fullName.addEventListener("input", (e) => {
    formData.fullName = e.target.value;
    checkContactFields();
  });
  mobileNumber.addEventListener("input", (e) => {
    formData.mobileNumber = e.target.value;
    checkContactFields();
  });
  emailAddress.addEventListener("input", (e) => {
    formData.emailAddress = e.target.value;
    checkContactFields();
  });
}

// Call this function after DOM loads
loadContactDetails();

// Submit form function
function submitForm() {
  // Log form data (in real app, send to server)
  //   console.log("Form Data:", formData);

  // Validate required fields again
  if (!formData.fullName || !formData.mobileNumber || !formData.emailAddress) {
    alert("Please fill in all required fields");
    return;
  }

  let formPayload = new FormData();

  formPayload.append(
    "data",

    new Blob(
      [
        JSON.stringify({
          vehicleBrand: formData.brand,
          vehicleModel: formData.model,
          vehicleModelYear: formData.year,
          vehicleColour: formData.color,
          vehiclePurchasedDate: formData.purchaseDate,
          vehiclePurchasedAmount: formData.purchaseAmount,
          vehicleOwnerType: formData.owner,
          vehicleRegisterNumber: formData.registrationNumber,
          vehicleInspectionBranch: formData.inspectionLocation,
          vehicleInspectionDate: formData.inspectionDate,
          userName: formData.fullName,
          userPhoneNo: formData.mobileNumber,
          userEmail: formData.emailAddress,
        }),
      ],
      { type: "application/json" }
    )
  );

  for (let file of formData.vehicleImages || []) {
    formPayload.append("documents", file);
  }

  for (let [key, value] of formPayload.entries()) {
    if (value instanceof Blob && value.type === "application/json") {
      // Read the JSON blob content
      value.text().then((text) => {
        console.log(`${key}:`, JSON.parse(text));
      });
    } else if (value instanceof File) {
      console.log(`${key}: File -> ${value.name}, size: ${value.size} bytes`);
    } else {
      console.log(`${key}:`, value);
    }
  }

  fetch("http://localhost:8080/vehicle/request", {
    method: "POST",
    body: formPayload,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      alert(
        "Thank you! Your vehicle details have been submitted successfully. Our team will contact you soon."
      );
    })
    .catch((error) => console.log(error));
}

// Initialize the form
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("stepCounter").textContent = `${currentStep}/9`;
  updateTabs();
});
