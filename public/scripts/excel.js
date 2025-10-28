// Excel download handler
const downloadExcelBtn = document.getElementById('downloadExcel');
if (downloadExcelBtn) {
  downloadExcelBtn.addEventListener('click', () => {
    if (!processedData) {
      alert('İşlenmiş veri bulunamadı!');
      return;
    }

    // Create CSV content
    let csvContent = 'KolayTara Z Raporu Analizi\n\n';
    
    if (processedData.tarih) {
      csvContent += `Tarih,${processedData.tarih}\n`;
    }
    if (processedData.saat) {
      csvContent += `Saat,${processedData.saat}\n`;
    }
    if (processedData.toplamSatis) {
      csvContent += `Toplam Satış,${processedData.toplamSatis}\n`;
    }
    
    csvContent += '\n';

    // KDV Details
    if (processedData.kdvDetay && processedData.kdvDetay.length > 0) {
      csvContent += 'KDV Detayı\n';
      csvContent += 'Oran,Matrah,KDV,Toplam\n';
      processedData.kdvDetay.forEach(kdv => {
        csvContent += `${kdv.oran},${kdv.matrah},${kdv.kdv},${kdv.toplam}\n`;
      });
      csvContent += '\n';
    }

    // Payment Methods
    if (processedData.odemeler && processedData.odemeler.length > 0) {
      csvContent += 'Ödeme Yöntemleri\n';
      csvContent += 'Yöntem,Tutar\n';
      processedData.odemeler.forEach(odeme => {
        csvContent += `${odeme.yontem},${odeme.tutar}\n`;
      });
    }

    // If only raw text available
    if (processedData.rawText) {
      csvContent = 'Z Raporu Analizi\n\n' + processedData.rawText;
    }

    // Create blob and download
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    const timestamp = new Date().toISOString().slice(0, 10);
    link.setAttribute('href', url);
    link.setAttribute('download', `z_raporu_${timestamp}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}
