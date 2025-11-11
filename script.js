const form = document.getElementById("resume-form");
form.addEventListener("input", updatePreview);

function updatePreview() {
  document.getElementById("prev-name").textContent =
    document.getElementById("name").value || "John Doe";

  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  document.getElementById("prev-contact").textContent =
    `${email || "john.doe@example.com"} | ${phone || "+1 123 456 7890"}`;

  document.getElementById("prev-summary").textContent =
    document.getElementById("summary").value ||
    "Your professional summary will appear here.";

  updateList("#education input", "#prev-education");
  updateList("#skill input", "#prev-skills");
  updateList("#experience input", "#prev-experience");
}

function updateList(inputSelector, listSelector) {
  const inputs = document.querySelectorAll(inputSelector);
  const list = document.querySelector(listSelector);
  list.innerHTML = "";
  inputs.forEach((input) => {
    if (input.value.trim()) {
      const li = document.createElement("li");
      li.textContent = input.value;
      list.appendChild(li);
    }
  });
}

function addEducation() {
  addInput("education", "Another Education");
}
function addSkill() {
  addInput("skill", "Another Skill");
}
function addExperience() {
  addInput("experience", "Another Experience");
}

function addInput(containerId, placeholderText) {
  const container = document.getElementById(containerId);
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = placeholderText;
  input.addEventListener("input", updatePreview);
  container.appendChild(input);
}

document.getElementById("clear-btn").addEventListener("click", () => {
  form.reset();
  updatePreview();
});

const { jsPDF } = window.jspdf;
document.getElementById("download-pdf-btn").addEventListener("click", () => {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  let y = 40;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text(document.getElementById("prev-name").textContent, 40, y);
  y += 20;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text(document.getElementById("prev-contact").textContent, 40, y);
  y += 30;

  y = addSection(doc, "Professional Summary", document.getElementById("prev-summary").textContent, y);
  y = addList(doc, "Education", "#prev-education", y);
  y = addList(doc, "Skills", "#prev-skills", y);
  y = addList(doc, "Experience", "#prev-experience", y);

  doc.save("Modern_Resume.pdf");
});

function addSection(doc, title, text, y) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text(title, 40, y);
  y += 15;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  const lines = doc.splitTextToSize(text, 500);
  doc.text(lines, 40, y);
  return y + lines.length * 14 + 10;
}

function addList(doc, title, selector, y) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text(title, 40, y);
  y += 15;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  document.querySelectorAll(`${selector} li`).forEach((li) => {
    doc.text(`• ${li.textContent}`, 50, y);
    y += 14;
  });
  return y + 10;
}
