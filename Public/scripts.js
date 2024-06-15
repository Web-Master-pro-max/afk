document.getElementById('uploadForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const files = document.getElementById('fileInput').files;
    const statusDiv = document.getElementById('uploadStatus');
    
    if (files.length === 0) {
        statusDiv.textContent = 'Please select a file.';
        return;
    }
    
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
    }

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            statusDiv.textContent = 'Files uploaded successfully!';
        } else {
            statusDiv.textContent = 'Failed to upload files.';
        }
    } catch (error) {
        statusDiv.textContent = 'An error occurred: ' + error.message;
    }
});
