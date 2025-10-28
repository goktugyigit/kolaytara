let selectedFile = null;

// File selection
const uploadInput = document.getElementById('uploadInput');
const selectFileBtn = document.getElementById('selectFileBtn');
const fileName = document.getElementById('fileName');

if (selectFileBtn) {
  selectFileBtn.addEventListener('click', () => {
    uploadInput.click();
  });
}

if (uploadInput) {
  uploadInput.addEventListener('change', (e) => {
    selectedFile = e.target.files[0];
    if (selectedFile) {
      fileName.textContent = `Seçilen dosya: ${selectedFile.name}`;
    }
  });
}

// Process button handler
const processBtn = document.getElementById('processBtn');
if (processBtn) {
  processBtn.addEventListener('click', async () => {
    const apiKey = document.getElementById('apiKey').value.trim();
    
    if (!selectedFile) {
      alert('Lütfen bir görsel seçin!');
      return;
    }
    
    if (!apiKey) {
      alert('Lütfen API anahtarınızı girin!');
      return;
    }

    // Show loading
    document.getElementById('loading').style.display = 'block';
    document.getElementById('results').innerHTML = '';
    document.getElementById('downloadExcel').style.display = 'none';

    try {
      // Read file as base64
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = e.target.result.split(',')[1];
        
        // Process with AI
        const result = await processImage(base64, apiKey);
        
        // Hide loading
        document.getElementById('loading').style.display = 'none';
        
        // Display results
        displayResults(result);
        document.getElementById('downloadExcel').style.display = 'block';
      };
      
      reader.readAsDataURL(selectedFile);
    } catch (error) {
      document.getElementById('loading').style.display = 'none';
      alert('Hata oluştu: ' + error.message);
    }
  });
}
