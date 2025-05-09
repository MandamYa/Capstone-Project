function downloadImage() {
      const element = document.getElementById("capture");
      html2canvas(element, {
        scale: 3,
        backgroundColor: "#ffffff",
        useCORS: true,
        allowTaint: true,
      }).then(canvas => {
        const link = document.createElement("a");
        link.download = "resume_with_border.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      });
    }