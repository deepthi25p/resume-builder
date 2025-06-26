const form = document.getElementById('resume-form');
form.addEventListener('input', updatePreview);

function updatePreview() {
    document.getElementById('prev-name').textContent = document.getElementById('name').value || 'Full Name';
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    document.getElementById('prev-contact').textContent = `${email}|${phone}`;

    document.getElementById('prev-summary').textContent = document.getElementById('summary').value || 'Summary';

    
    const eduInp = document.querySelectorAll('#education input');
    const eduList = document.getElementById('prev-education');
    eduList.innerHTML = '';
    eduInp.forEach(input => {
        if (input.value.trim()) {
            const li = document.createElement('li');
            li.textContent = input.value;
            eduList.appendChild(li);
        }
    });

    
    const skillInp = document.querySelectorAll('#skill input');
    const skillList = document.getElementById('prev-skills');
    skillList.innerHTML = '';
    skillInp.forEach(input => {
        if (input.value.trim()) {
            const li = document.createElement('li');
            li.textContent = input.value;
            skillList.appendChild(li);
        }
    });

    
    const expInp = document.querySelectorAll('#experience input');
    const expList = document.getElementById('prev-experience');
    expList.innerHTML = '';
    expInp.forEach(input => {
        if (input.value.trim()) {
            const li = document.createElement('li');
            li.textContent = input.value;
            expList.appendChild(li);
        }
    });
}


function addEducation() {
    const container = document.getElementById('education');
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Another Education';
    input.addEventListener('input', updatePreview);
    container.appendChild(input);
}

function addSkill() {
    const container = document.getElementById('skill');
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Another Skill';
    input.addEventListener('input', updatePreview);
    container.appendChild(input);
}

function addExperience() {
    const container = document.getElementById('experience');
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Another Experience';
    input.addEventListener('input', updatePreview);
    container.appendChild(input);
}

document.getElementById('clear-btn').addEventListener('click', function () {
    form.reset();
    updatePreview();
});

const { jsPDF } = window.jspdf;  
document.getElementById('download-pdf-btn').addEventListener('click', function() {
    const doc = new jsPDF();

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('Resume', 20, 20);
    doc.setFontSize(16);
    const name = document.getElementById('prev-name').textContent || 'Full Name';
    const contact = document.getElementById('prev-contact').textContent || 'Email | Phone';
    doc.text(name, 20, 30);
    doc.setFontSize(12);
    doc.text(contact, 20, 40);
    doc.setFontSize(16);
    doc.text('Profile Summary', 20, 50);
    const summary = document.getElementById('prev-summary').textContent || 'Summary';
    doc.setFontSize(12);
    doc.text(summary, 20, 60);
    doc.setFontSize(16);
    doc.text('Education', 20, 80);
    const educationList = document.getElementById('prev-education').getElementsByTagName('li');
    let educationY = 90;
    for (let i = 0; i < educationList.length; i++) {
        doc.setFontSize(12);
        doc.text(educationList[i].textContent, 20, educationY);
        educationY += 10;
    }

    doc.setFontSize(16);
    doc.text('Skills', 20, educationY + 10);
    const skillsList = document.getElementById('prev-skills').getElementsByTagName('li');
    let skillsY = educationY + 20;
    for (let i = 0; i < skillsList.length; i++) {
        doc.setFontSize(12);
        doc.text(skillsList[i].textContent, 20, skillsY);
        skillsY += 10;
    }

    doc.setFontSize(16);
    doc.text('Experience', 20, skillsY + 10);
    const experienceList = document.getElementById('prev-experience').getElementsByTagName('li');
    let experienceY = skillsY + 20;
    for (let i = 0; i < experienceList.length; i++) {
        doc.setFontSize(12);
        doc.text(experienceList[i].textContent, 20, experienceY);
        experienceY += 10;
    }

    doc.save('resume.pdf');
});
