// script.js

function showTool(tool) { const main = document.getElementById("tools"); main.innerHTML = ""; switch (tool) { case "text": loadTextToPDF(main); break; case "image": loadImageToPDF(main); break; case "merge": loadMergePDF(main); break; case "compress": loadCompressPDF(main); break; case "protect": loadProtectPDF(main); break; case "view": loadViewPDF(main); break; case "edit": loadEditPDF(main); break; case "files": loadMyFiles(main); break; default: main.innerHTML = <div class="tool-section"><p>Tool not found.</p></div>; } }

function downloadBlob(blob, filename) { const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = filename; a.click(); URL.revokeObjectURL(url); }

function loadTextToPDF(container) { container.innerHTML =  <div class="tool-section"> <h2>Text to PDF</h2> <textarea id="textInput" rows="10" placeholder="Enter your text here..."></textarea> <button class="primary" onclick="generateTextPDF()">Create PDF</button> </div>; }

function generateTextPDF() { const text = document.getElementById("textInput").value; const doc = new jspdf.jsPDF(); doc.text(text, 10, 10); const blob = doc.output("blob"); downloadBlob(blob, "TextPDF.pdf"); saveFile("TextPDF.pdf"); }

function loadImageToPDF(container) { container.innerHTML =  <div class="tool-section"> <h2>Image to PDF</h2> <input type="file" id="imgInput" multiple accept="image/*" /> <button class="primary" onclick="generateImagePDF()">Convert</button> </div>; }

function generateImagePDF() { const files = document.getElementById("imgInput").files; if (!files.length) return alert("Select image files first."); const doc = new jspdf.jsPDF(); let count = 0; Array.from(files).forEach((file, i) => { const reader = new FileReader(); reader.onload = function (e) { const img = new Image(); img.onload = function () { const ratio = img.width / img.height; const width = 180; const height = width / ratio; if (i !== 0) doc.addPage(); doc.addImage(img, "JPEG", 15, 20, width, height); count++; if (count === files.length) { const blob = doc.output("blob"); downloadBlob(blob, "ImagePDF.pdf"); saveFile("ImagePDF.pdf"); } }; img.src = e.target.result; }; reader.readAsDataURL(file); }); }

function loadMergePDF(container) { container.innerHTML =  <div class="tool-section"> <h2>Merge PDFs</h2> <input type="file" id="mergeInput" multiple accept="application/pdf" /> <button class="primary" onclick="mergePDFs()">Merge</button> </div>; }

async function mergePDFs() { const input = document.getElementById("mergeInput").files; if (input.length < 2) return alert("Select at least 2 PDFs."); const { PDFDocument } = PDFLib; const mergedPdf = await PDFDocument.create(); for (const file of input) { const bytes = await file.arrayBuffer(); const pdf = await PDFDocument.load(bytes); const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices()); pages.forEach((page) => mergedPdf.addPage(page)); } const blob = new Blob([await mergedPdf.save()], { type: "application/pdf" }); downloadBlob(blob, "MergedPDF.pdf"); saveFile("MergedPDF.pdf"); }

function loadCompressPDF(container) { container.innerHTML =  <div class="tool-section"> <h2>Compress PDF</h2> <input type="file" id="compressInput" accept="application/pdf" /> <button class="primary" onclick="alert('Coming Soon')">Compress</button> </div>; }

function loadProtectPDF(container) { container.innerHTML =  <div class="tool-section"> <h2>Password Protect PDF</h2> <input type="file" id="protectInput" accept="application/pdf" /> <input type="password" id="pdfPassword" placeholder="Enter Password" /> <button class="primary" onclick="alert('Feature coming soon')">Encrypt PDF</button> </div>; }

function loadViewPDF(container) { container.innerHTML =  <div class="tool-section"> <h2>View PDF</h2> <input type="file" accept="application/pdf" onchange="viewPDF(event)" /> <iframe id="pdfViewer" style="width:100%; height:600px; margin-top:15px;"></iframe> </div>; }

function viewPDF(e) { const file = e.target.files[0]; const url = URL.createObjectURL(file); document.getElementById("pdfViewer").src = url; }

function loadEditPDF(container) { container.innerHTML =  <div class="tool-section"> <h2>Edit PDF (Coming Soon)</h2> <p>Feature like remove/reorder pages will be added in next version.</p> </div>; }

function loadMyFiles(container) { const files = JSON.parse(localStorage.getItem("pdfToolkitFiles") || "[]"); const html = files.length ? <ul>${files.map((f) => <li>📄 ${f}</li>).join("")}</ul> : "<p>No files yet.</p>"; container.innerHTML =  <div class="tool-section"> <h2>My Files</h2> ${html} </div>; }

function saveFile(name) { let files = JSON.parse(localStorage.getItem("pdfToolkitFiles") || "[]"); files.unshift(name); localStorage.setItem("pdfToolkitFiles", JSON.stringify(files.slice(0, 20))); }

document.addEventListener("DOMContentLoaded", () => showTool("text"));

  
