let qrImg = document.querySelector(".img-qr"),
  qrText = document.querySelector(".text-qr"),
  qrGenerator = document.querySelector(".btn-qr"),
  downloadButton = document.querySelector(".download-qr");

qrGenerator.addEventListener("click", async () => {
  if (qrText.value.length > 0) {
    let URL = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrText.value)}`;
    qrImg.src = URL;
    qrImg.classList.add("active");

    // Enable the download button
    downloadButton.classList.remove("disabled");

    // Update download button URL when clicked
    downloadButton.href = URL;
    downloadButton.download = "qr_code.png";
  } else {
    qrText.classList.add("error");
    setTimeout(() => {
      qrText.classList.remove("error");
    }, 600);
  }
});

// Add click event listener to the download button
downloadButton.addEventListener("click", async (event) => {
  event.preventDefault();

  // If the button is not disabled and has a valid href
  if (!downloadButton.classList.contains("disabled") && downloadButton.href) {
    try {
      // Fetch the QR code image
      let response = await fetch(downloadButton.href);
      let blob = await response.blob();

      // Create a downloadable link for the Blob
      let blobURL = URL.createObjectURL(blob);
      let tempLink = document.createElement("a");
      tempLink.href = blobURL;
      tempLink.download = "qr_code.png";
      tempLink.click();

      // Clean up resources
      URL.revokeObjectURL(blobURL);
    } catch (error) {
      console.error("Error downloading QR code:", error);
    }
  }
});
