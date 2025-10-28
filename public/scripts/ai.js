let processedData = null;

async function processImage(base64, apiKey) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`;
  
  const body = {
    contents: [{
      role: "user",
      parts: [
        { 
          text: `Bu Z raporunu analiz et ve aşağıdaki bilgileri JSON formatında çıkar:
          - Tarih ve saat
          - Toplam satış tutarı
          - KDV oranları ve tutarları (örn: %1, %10, %20)
          - Ürün kategorileri ve tutarları
          - Nakit, kredi kartı gibi ödeme yöntemleri
          
          JSON formatı şöyle olmalı:
          {
            "tarih": "DD/MM/YYYY",
            "saat": "HH:MM",
            "toplamSatis": 0,
            "kdvDetay": [
              {"oran": "%20", "matrah": 0, "kdv": 0, "toplam": 0}
            ],
            "odemeler": [
              {"yontem": "Nakit", "tutar": 0}
            ]
          }` 
        },
        { 
          inlineData: { 
            mimeType: "image/jpeg", 
            data: base64 
          } 
        }
      ]
    }],
    generationConfig: {
      temperature: 0.1,
      topK: 32,
      topP: 1,
      maxOutputTokens: 2048,
    }
  };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    throw new Error(`API Hatası: ${response.status}`);
  }

  const result = await response.json();
  
  // Extract text from response
  const text = result.candidates?.[0]?.content?.parts?.[0]?.text || '';
  
  // Try to parse JSON from the response
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      processedData = JSON.parse(jsonMatch[0]);
      return processedData;
    }
  } catch (e) {
    console.error('JSON parse error:', e);
  }
  
  // If JSON parsing fails, return raw text
  processedData = { rawText: text };
  return processedData;
}

function displayResults(data) {
  const resultsDiv = document.getElementById('results');
  
  if (data.rawText) {
    resultsDiv.innerHTML = `<pre>${data.rawText}</pre>`;
    return;
  }

  let html = '<h3>Z Raporu Analiz Sonuçları</h3>';
  
  if (data.tarih || data.saat) {
    html += `<p><strong>Tarih:</strong> ${data.tarih || '-'} ${data.saat || ''}</p>`;
  }
  
  if (data.toplamSatis) {
    html += `<p><strong>Toplam Satış:</strong> ${formatCurrency(data.toplamSatis)}</p>`;
  }

  if (data.kdvDetay && data.kdvDetay.length > 0) {
    html += '<h4>KDV Detayı</h4>';
    html += '<table><thead><tr><th>Oran</th><th>Matrah</th><th>KDV</th><th>Toplam</th></tr></thead><tbody>';
    data.kdvDetay.forEach(kdv => {
      html += `<tr>
        <td>${kdv.oran}</td>
        <td>${formatCurrency(kdv.matrah)}</td>
        <td>${formatCurrency(kdv.kdv)}</td>
        <td>${formatCurrency(kdv.toplam)}</td>
      </tr>`;
    });
    html += '</tbody></table>';
  }

  if (data.odemeler && data.odemeler.length > 0) {
    html += '<h4>Ödeme Yöntemleri</h4>';
    html += '<table><thead><tr><th>Yöntem</th><th>Tutar</th></tr></thead><tbody>';
    data.odemeler.forEach(odeme => {
      html += `<tr>
        <td>${odeme.yontem}</td>
        <td>${formatCurrency(odeme.tutar)}</td>
      </tr>`;
    });
    html += '</tbody></table>';
  }

  resultsDiv.innerHTML = html;
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY'
  }).format(amount);
}
