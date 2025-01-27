// Path to your PDF file
const pdfUrl = '../RyanAustin_Resume.pdf'; // Ensure the path is correct

// Get the container where the PDF will be rendered
const pdfContainer = document.getElementById('pdf-container');

// Initialize PDF.js and load the document
pdfjsLib.getDocument(pdfUrl).promise.then(function(pdf) {
    console.log('PDF loaded');
    
    // Fetch the first page of the PDF
    pdf.getPage(1).then(function(page) {
        const scale = 1.5;  // Adjust this value for zooming in or out
        const viewport = page.getViewport({ scale: scale });

        // Create a canvas element to render the PDF page
        const canvas = document.createElement('canvas');
        pdfContainer.appendChild(canvas);  // Append the canvas to the container
        const context = canvas.getContext('2d');

        // Set the canvas dimensions to match the page's viewport
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        // Render the page on the canvas
        page.render({
            canvasContext: context,
            viewport: viewport
        });
    });
}).catch(function(error) {
    console.error('Error loading PDF: ' + error);
});
