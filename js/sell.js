let currentStep = 1;
const formData = {};

// Vehicle data
const vehicleData = {
    'TVS': ['Apache RTR 160', 'Apache RTR 200', 'Jupiter', 'Ntorq 125', 'Star City Plus'],
    'Bajaj': ['Aspire 100', 'Avenger 200', 'Avenger Cruise 220', 'Avenger Street 150', 'Avenger Street 160', 'Dominar 400', 'Platina 100', 'Pulsar 150', 'Pulsar 180', 'Pulsar 200', 'Pulsar 220F', 'Pulsar NS200'],
    'Hero': ['Glamour', 'HF Deluxe', 'Honda Activa 6G', 'Passion Pro', 'Splendor Plus', 'Super Splendor'],
    'Honda': ['Activa 6G', 'CB Shine', 'CB Unicorn', 'Dio', 'Grazia', 'Hornet 2.0', 'SP 125', 'X-Blade'],
    'Yamaha': ['FZ-S', 'FZ Version 3.0', 'MT-15', 'R15 V4', 'Ray ZR', 'Saluto RX', 'YZF R15'],
    'Royal Enfield': ['Bullet 350', 'Classic 350', 'Himalayan', 'Interceptor 650', 'Meteor 350', 'Thunderbird 350'],
    'Suzuki': ['Access 125', 'Burgman Street', 'Gixxer', 'Gixxer SF', 'Intruder 150', 'Let\'s'],
    'Jawa': ['Jawa', 'Jawa 42', 'Jawa Perak'],
    'KTM': ['125 Duke', '200 Duke', '250 Duke', '390 Duke', 'RC 125', 'RC 200', 'RC 390'],
    'Kawasaki': ['Ninja 300', 'Ninja 400', 'Ninja 650', 'Z650', 'Z900', 'Versys 650'],
    'OLA': ['S1', 'S1 Pro', 'S1 Air'],
    'Vespa': ['Elegante 150', 'SXL 150', 'VXL 150', 'ZX 125']
};

const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 
    'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 
    'Uttarakhand', 'West Bengal', 'Delhi', 'Puducherry', 'Chandigarh', 'Dadra and Nagar Haveli', 
    'Daman and Diu', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Andaman and Nicobar Islands'
];

const rtoData = {
    'Tamil Nadu': ['TN1', 'TN2', 'TN9', 'TN01', 'TN02', 'TN03', 'TN04', 'TN05', 'TN06', 'TN07', 'TN08', 'TN09', 'TN10', 'TN11', 'TN12', 'TN13', 'TN14', 'TN15', 'TN15Z', 'TN16', 'TN16Z', 'TN17', 'TN18', 'TN18Y'],
    'Delhi': ['DL1A', 'DL1B', 'DL1C', 'DL2C', 'DL3C', 'DL4C', 'DL5C', 'DL6C', 'DL7C', 'DL8C', 'DL9C', 'DL10C'],
    'Maharashtra': ['MH1', 'MH2', 'MH3', 'MH4', 'MH5', 'MH6', 'MH7', 'MH8', 'MH9', 'MH10', 'MH11', 'MH12', 'MH13', 'MH14'],
    'Karnataka': ['KA1', 'KA2', 'KA3', 'KA4', 'KA5', 'KA6', 'KA7', 'KA8', 'KA9', 'KA10', 'KA11', 'KA12', 'KA13', 'KA14'],
    'Gujarat': ['GJ1', 'GJ2', 'GJ3', 'GJ4', 'GJ5', 'GJ6', 'GJ7', 'GJ8', 'GJ9', 'GJ10', 'GJ11', 'GJ12', 'GJ13', 'GJ14'],
    'Uttar Pradesh': ['UP1', 'UP2', 'UP3', 'UP4', 'UP5', 'UP6', 'UP7', 'UP8', 'UP9', 'UP10', 'UP11', 'UP12', 'UP13', 'UP14']
};

// Main function to select option and move to next step
function selectOption(type, value, stepNumber) {
    formData[type] = value;
    
    // Highlight selected option
    const currentStepElement = document.getElementById(`step${stepNumber}`);
    const options = currentStepElement.querySelectorAll('.option-card, .model-item, .rto-item');
    options.forEach(opt => opt.classList.remove('selected'));
    
    // Find and highlight the clicked option
    event.target.closest('.option-card, .model-item, .rto-item').classList.add('selected');
    
    // Auto advance to next step after a short delay
    setTimeout(() => {
        nextStep(stepNumber);
    }, 500);
}

function nextStep(step) {
    if (step < 13) {
        // Hide current step
        document.getElementById(`step${step}`).classList.remove('active');
        
        // Show next step
        currentStep = step + 1;
        document.getElementById(`step${currentStep}`).classList.add('active');
        
        // Update step counter
        document.getElementById('stepCounter').textContent = `${currentStep}/13`;
        
        // Update tabs
        updateTabs();
        
        // Show back button after first step
        document.getElementById('backBtn').style.display = currentStep > 1 ? 'block' : 'none';
        
        // Load content for specific steps
        loadStepContent();
    }
}

function previousStep() {
    if (currentStep > 1) {
        // Hide current step
        document.getElementById(`step${currentStep}`).classList.remove('active');
        
        // Show previous step
        currentStep--;
        document.getElementById(`step${currentStep}`).classList.add('active');
        
        // Update step counter
        document.getElementById('stepCounter').textContent = `${currentStep}/13`;
        
        // Update tabs
        updateTabs();
        
        // Hide back button on first step
        document.getElementById('backBtn').style.display = currentStep > 1 ? 'block' : 'none';
    }
}

function updateTabs() {
    const tabs = document.querySelectorAll('.step-tab');
    tabs.forEach((tab, index) => {
        tab.classList.remove('active', 'completed');
        if (index + 1 === currentStep) {
            tab.classList.add('active');
        } else if (index + 1 < currentStep) {
            tab.classList.add('completed');
        }
    });
}

function loadStepContent() {
    switch(currentStep) {
        case 2:
            loadModels();
            break;
        case 3:
            loadVariants();
            break;
        case 4:
            loadYears();
            break;
        case 5:
            loadStates();
            break;
        case 6:
            loadRTO();
            break;
    }
}

function loadModels() {
    const selectedBrand = formData.brand;
    const modelList = document.getElementById('modelList');
    const models = vehicleData[selectedBrand] || [];
    
    modelList.innerHTML = '';
    models.forEach(model => {
        const modelItem = document.createElement('div');
        modelItem.className = 'model-item';
        modelItem.textContent = model;
        modelItem.onclick = () => selectOption('model', model, 2);
        modelList.appendChild(modelItem);
    });
}

function loadVariants() {
    const selectedModel = formData.model;
    const variantList = document.getElementById('variantList');
    
    // Sample variants based on model
    const variants = [
        `${selectedModel} Standard`,
        `${selectedModel} Deluxe`,
        `${selectedModel} Special Edition`,
        `${selectedModel} CBS`,
        `${selectedModel} ABS`
    ];
    
    variantList.innerHTML = '';
    variants.forEach(variant => {
        const variantItem = document.createElement('div');
        variantItem.className = 'model-item';
        variantItem.textContent = variant;
        variantItem.onclick = () => selectOption('variant', variant, 3);
        variantList.appendChild(variantItem);
    });
}

function loadYears() {
    const yearGrid = document.getElementById('yearGrid');
    const currentYear = new Date().getFullYear();
    const years = [];
    
    for (let year = currentYear; year >= currentYear - 20; year--) {
        years.push(year);
    }
    
    yearGrid.innerHTML = '';
    years.forEach(year => {
        const yearItem = document.createElement('div');
        yearItem.className = 'rto-item';
        yearItem.textContent = year;
        yearItem.onclick = () => selectOption('year', year, 4);
        yearGrid.appendChild(yearItem);
    });
}

function loadStates() {
    const stateGrid = document.getElementById('stateGrid');
    
    stateGrid.innerHTML = '';
    indianStates.forEach(state => {
        const stateItem = document.createElement('div');
        stateItem.className = 'model-item';
        stateItem.textContent = state;
        stateItem.onclick = () => selectOption('state', state, 5);
        stateGrid.appendChild(stateItem);
    });
}

function loadRTO() {
    const selectedState = formData.state;
    const rtoGrid = document.getElementById('rtoGrid');
    const rtos = rtoData[selectedState] || ['RTO1', 'RTO2', 'RTO3', 'RTO4'];
    
    rtoGrid.innerHTML = '';
    rtos.forEach(rto => {
        const rtoItem = document.createElement('div');
        rtoItem.className = 'rto-item';
        rtoItem.textContent = rto;
        rtoItem.onclick = () => selectOption('rto', rto, 6);
        rtoGrid.appendChild(rtoItem);
    });
}

// Filter functions
function filterModels() {
    const searchTerm = document.getElementById('modelSearch').value.toLowerCase();
    const models = document.querySelectorAll('#modelList .model-item');
    
    models.forEach(model => {
        const text = model.textContent.toLowerCase();
        model.style.display = text.includes(searchTerm) ? 'block' : 'none';
    });
}

function filterVariants() {
    const searchTerm = document.getElementById('variantSearch').value.toLowerCase();
    const variants = document.querySelectorAll('#variantList .model-item');
    
    variants.forEach(variant => {
        const text = variant.textContent.toLowerCase();
        variant.style.display = text.includes(searchTerm) ? 'block' : 'none';
    });
}

function filterStates() {
    const searchTerm = document.getElementById('stateSearch').value.toLowerCase();
    const states = document.querySelectorAll('#stateGrid .model-item');
    
    states.forEach(state => {
        const text = state.textContent.toLowerCase();
        state.style.display = text.includes(searchTerm) ? 'block' : 'none';
    });
}

function filterRTO() {
    const searchTerm = document.getElementById('rtoSearch').value.toLowerCase();
    const rtos = document.querySelectorAll('#rtoGrid .rto-item');
    
    rtos.forEach(rto => {
        const text = rto.textContent.toLowerCase();
        rto.style.display = text.includes(searchTerm) ? 'block' : 'none';
    });
}

function validateKms() {
    const kmsInput = document.getElementById('kmsDriven');
    const kmsBtn = document.getElementById('kmsBtn');
    
    if (kmsInput.value && kmsInput.value > 0) {
        formData.kmsDriven = kmsInput.value;
        kmsBtn.style.display = 'block';
        
        // Auto advance after 2 seconds of no typing
        clearTimeout(window.kmsTimer);
        window.kmsTimer = setTimeout(() => {
            nextStep(8);
        }, 2000);
    } else {
        kmsBtn.style.display = 'none';
    }
}

function handlePhotos() {
    const photoInput = document.getElementById('photoInput');
    const photoPreview = document.getElementById('photoPreview');
    const photosBtn = document.getElementById('photosBtn');
    
    if (photoInput.files.length > 0) {
        formData.photos = photoInput.files;
        photoPreview.innerHTML = `<p style="color: var(--primary-color); font-weight: 600;">${photoInput.files.length} photo(s) selected</p>`;
        photosBtn.style.display = 'block';
        
        // Auto advance after photo selection
        setTimeout(() => {
            nextStep(12);
        }, 1500);
    }
}

function submitForm() {
    // Collect contact information
    formData.fullName = document.getElementById('fullName').value;
    formData.mobileNumber = document.getElementById('mobileNumber').value;
    formData.emailAddress = document.getElementById('emailAddress').value;
    formData.cityName = document.getElementById('cityName').value;
    
    // Validate required fields
    if (!formData.fullName || !formData.mobileNumber) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Show success message
    alert('Thank you! Your vehicle details have been submitted successfully. Our team will contact you soon.');
    
    // Log form data (in real application, send to server)
    console.log('Form Data:', formData);
}

// Initialize the form
document.addEventListener('DOMContentLoaded', function() {
    updateTabs();
});