document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('fileInput');
    const outputFormat = document.getElementById('outputFormat');
    const convertBtn = document.getElementById('convertBtn');
    const resultContainer = document.getElementById('resultContainer');
    const downloadLink = document.getElementById('downloadLink');
    const fileNameElement = document.getElementById('fileName');
    const fileTypeElement = document.getElementById('fileType');
    const fileSizeElement = document.getElementById('fileSize');
    const statusMessage = document.getElementById('statusMessage');
    const progressBar = document.querySelector('.progress-bar');
    const progressFill = document.getElementById('progressFill');
    
    let selectedFile = null;
    
    // Handle file selection
    fileInput.addEventListener('change', function(e) {
        if (this.files && this.files[0]) {
            selectedFile = this.files[0];
            updateFileInfo(selectedFile);
        }
    });
    
    // Update file info display
    function updateFileInfo(file) {
        fileNameElement.textContent = file.name;
        fileTypeElement.textContent = file.type || 'Unknown type';
        fileSizeElement.textContent = formatFileSize(file.size);
    }
    
    // Format file size for display
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    // Handle conversion
    convertBtn.addEventListener('click', function() {
        if (!selectedFile) {
            alert('Please select a file first');
            return;
        }
        
        if (!outputFormat.value) {
            alert('Please select an output format');
            return;
        }
        
        // Start conversion process
        startConversion();
    });
    
    // Simulate conversion process
    function startConversion() {
        // Reset UI
        resultContainer.style.display = 'none';
        statusMessage.textContent = 'Starting conversion...';
        progressBar.style.display = 'block';
        progressFill.style.width = '0%';
        
        // Simulate progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                finishConversion();
            }
            progressFill.style.width = progress + '%';
            
            // Update status messages
            if (progress < 30) {
                statusMessage.textContent = 'Reading file...';
            } else if (progress < 60) {
                statusMessage.textContent = 'Processing data...';
            } else if (progress < 90) {
                statusMessage.textContent = 'Generating output...';
            } else {
                statusMessage.textContent = 'Finalizing...';
            }
        }, 200);
    }
    
    // Finish conversion
    function finishConversion() {
        statusMessage.textContent = 'Conversion complete!';
        
        // Create mock converted file for demonstration
        const fileName = selectedFile.name.split('.')[0];
        const extension = outputFormat.value;
        const convertedFileName = `${fileName}.${extension}`;
        
        // Create a mock blob with conversion details
        const mockContent = `Converted file: ${convertedFileName}\n\nOriginal file: ${selectedFile.name}\n\nFormat changed from ${getFileExtension(selectedFile.name)} to ${extension}\n\nFile size: ${formatFileSize(selectedFile.size)}\n\nConversion completed at: ${new Date().toLocaleString()}`;
        const blob = new Blob([mockContent], {type: 'text/plain'});
        
        // Set up download link
        const url = URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = convertedFileName;
        
        // Show result
        resultContainer.style.display = 'block';
        progressBar.style.display = 'none';
    }
    
    // Helper function to get file extension
    function getFileExtension(filename) {
        return filename.split('.').pop().toUpperCase();
    }
});
