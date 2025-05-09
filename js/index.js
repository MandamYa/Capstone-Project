let imageBase64 = "";
    let experienceIndex = 0;
    let educationIndex = 0;
    let skillIndex = 0;
  
    document.getElementById("preview1Btn").addEventListener("click", function () {
      if (validateForm()) {
        saveAndRedirect("preview1.html");
      }
    });
  
    document.getElementById("preview2Btn").addEventListener("click", function () {
      if (validateForm()) {
        saveAndRedirect("preview2.html");
      }
    });
  
    function validateForm() {
  const form = document.getElementById("cvForm");
  const inputs = form.querySelectorAll("input, select, textarea");
  let valid = true;

  const emailField = document.getElementById("email");
  const phoneField = document.getElementById("phone");

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^\+?\d+$/;

  inputs.forEach((input) => {
    if (input.hasAttribute("required") && !input.value.trim()) {
      input.style.borderColor = "red";
      valid = false;
    } else {
      input.style.borderColor = "#ccc";
    }
  });

  // Validasi email
  if (emailField && !emailPattern.test(emailField.value.trim())) {
    emailField.style.borderColor = "red";
    alert("Format email tidak valid.");
    valid = false;
  }

  // Validasi nomor HP
  if (phoneField && !phonePattern.test(phoneField.value.trim())) {
    phoneField.style.borderColor = "red";
    alert("Nomor HP hanya boleh angka (boleh diawali dengan +).");
    valid = false;
  }

  if (!valid) {
    if (!emailPattern.test(emailField.value.trim()) || !phonePattern.test(phoneField.value.trim())) {
      // Alert khusus sudah ditangani di atas
    } else {
      alert("Harap lengkapi semua kolom yang wajib diisi.");
    }
  }

  return valid;
}
const phoneInput = document.getElementById("phone");

// Hanya izinkan angka saat mengetik
phoneInput.addEventListener("keypress", function (e) {
  if (!/[0-9]/.test(e.key)) {
    e.preventDefault();
  }
});

// Saat input berubah (misal paste), hapus semua karakter non-angka
phoneInput.addEventListener("input", function () {
  phoneInput.value = phoneInput.value.replace(/\D/g, '');
});

// Validasi saat blur
phoneInput.addEventListener("blur", function () {
  const number = phoneInput.value.trim();
  const phonePattern = /^[0-9]{9,15}$/;

  if (number && !phonePattern.test(number)) {
    phoneInput.style.borderColor = "red";
    showInlineError(phoneInput, "Nomor HP harus terdiri dari 9–15 digit angka.");
  } else {
    phoneInput.style.borderColor = "#ccc";
    removeInlineError(phoneInput);
  }
});

function showInlineError(inputElem, message) {
  removeInlineError(inputElem);
  const errorMsg = document.createElement("small");
  errorMsg.className = "inline-error";
  errorMsg.style.color = "red";
  errorMsg.textContent = message;
  inputElem.insertAdjacentElement("afterend", errorMsg);
}

function removeInlineError(inputElem) {
  const next = inputElem.nextElementSibling;
  if (next && next.classList.contains("inline-error")) {
    next.remove();
  }
}
  
    function addSkill() {
      const container = document.getElementById("skillsContainer");
      container.style.display = "block";
  
      const group = document.createElement("div");
      group.className = "skill-group";
      group.id = `skill-group-${skillIndex}`;
      group.style.display = "flex";
      group.style.gap = "10px";
      group.style.alignItems = "center";
  
      const input = document.createElement("input");
      input.type = "text";
      input.name = `skill_${skillIndex}`;
      input.placeholder = "Keahlian";
      input.style.flex = "1";
  
      const button = document.createElement("button");
      button.type = "button";
      button.className = "delete-btn";
      button.innerHTML = '<i class="fas fa-trash"></i>';
      const currentIndex = skillIndex;
      button.onclick = function () {
        deleteSkill(currentIndex);
      };
  
      group.appendChild(input);
      group.appendChild(button);
      container.appendChild(group);
      skillIndex++;
    }
  
    function deleteSkill(index) {
      const group = document.getElementById(`skill-group-${index}`);
      if (group) group.remove();
    };
  
const educationPlaceholders = [
  "Masukkan nama SD",
  "Masukkan nama SMP",
  "Masukkan nama SMA",
  "Masukkan nama Universitas",
  "Masukkan nama Pendidikan Lainnya"
];

function addEducation() {
  const container = document.getElementById("educationContainer");
  container.style.display = "block";

  const placeholder = educationPlaceholders[educationIndex] || "Masukkan nama Institusi";

  const group = document.createElement("div");
  group.className = "edu-group";
  group.id = `edu-group-${educationIndex}`;
  group.style.display = "flex";
  group.style.flexDirection = "column";
  group.style.gap = "10px";
  group.style.marginBottom = "20px";

  group.innerHTML = `
    <div style="display:flex; align-items:center; gap:10px;">
      <input type="text" name="edu_name_${educationIndex}" placeholder="${placeholder}" style="flex:1;" />
      <button type="button" class="delete-btn" onclick="deleteEducation(${educationIndex})">
        <i class="fas fa-trash"></i>
      </button>
    </div>
    <div class="year-group">
      <input type="number" name="edu_start_${educationIndex}" placeholder="Tahun Masuk" />
      <input type="number" name="edu_end_${educationIndex}" placeholder="Tahun Lulus" />
    </div>
  `;

  container.appendChild(group);
  educationIndex++;
}

  
    function deleteEducation(index) {
      const group = document.getElementById(`edu-group-${index}`);
      if (group) group.remove();
    }
  
    function addExperience() {
      const container = document.getElementById("experienceContainer");
      container.style.display = "block";
  
      const group = document.createElement("div");
      group.className = "exp-group";
      group.id = `exp-group-${experienceIndex}`;
      group.style.display = "flex";
      group.style.flexDirection = "column";
      group.style.gap = "10px";
      group.style.marginBottom = "20px";
  
      group.innerHTML = `
        <div style="display:flex; align-items:center; gap:10px;">
          <input type="text" name="company_${experienceIndex}" placeholder="Nama Perusahaan" style="flex:1;" />
          <button type="button" class="delete-btn" onclick="deleteExperience(${experienceIndex})">
            <i class="fas fa-trash"></i>
          </button>
        </div>
        <input type="text" name="position_${experienceIndex}" placeholder="Jabatan" />
        <div class="year-group">
          <input type="number" name="exp_start_${experienceIndex}" placeholder="Tahun Masuk" />
          <input type="text" name="exp_end_${experienceIndex}" placeholder="Contoh: 2024 atau Sekarang" />
        </div>
      `;
      container.appendChild(group);
      experienceIndex++;
    }
  
    function deleteExperience(index) {
      const group = document.getElementById(`exp-group-${index}`);
      if (group) group.remove();
    }
  
    document.getElementById("photo").addEventListener("change", handleImageUpload);
  
    function handleImageUpload() {
      const file = document.getElementById("photo").files[0];
      const progressBar = document.getElementById("progressBar");
      const statusMessage = document.getElementById("statusMessage");
      const progressContainer = document.getElementById("progressContainer");
  
      if (file) {
        const allowed = ['image/jpeg', 'image/png'];
        if (!allowed.includes(file.type)) {
          statusMessage.textContent = "Format gambar tidak didukung.";
          statusMessage.className = "error";
          return;
        }
  
        progressContainer.style.display = "block";
        progressBar.style.width = "0%";
  
        new Compressor(file, {
          quality: 0.6,
          success(result) {
            const reader = new FileReader();
            reader.onprogress = (e) => {
              if (e.lengthComputable) {
                const percent = (e.loaded / e.total) * 100;
                progressBar.style.width = percent + "%";
              }
            };
            reader.onloadend = () => {
              imageBase64 = reader.result;
              progressBar.style.width = "100%";
              statusMessage.textContent = "Gambar berhasil diunggah!";
              statusMessage.className = "success";
            };
            reader.onerror = () => {
              statusMessage.textContent = "Gagal mengunggah gambar.";
              statusMessage.className = "error";
            };
            reader.readAsDataURL(result);
          },
          error() {
            statusMessage.textContent = "Gagal memproses gambar.";
            statusMessage.className = "error";
          }
        });
      }
    }
  
    function saveAndRedirect(targetFile) {
      const skillList = [];
      const experienceList = [];
      const educationList = [];
  
      for (let i = 0; i < skillIndex; i++) {
        const skill = document.querySelector(`[name="skill_${i}"]`);
        if (skill && skill.value.trim()) skillList.push(skill.value.trim());
      }
  
      for (let i = 0; i < experienceIndex; i++) {
        const company = document.querySelector(`[name="company_${i}"]`);
        const position = document.querySelector(`[name="position_${i}"]`);
        const start = document.querySelector(`[name="exp_start_${i}"]`);
        const end = document.querySelector(`[name="exp_end_${i}"]`);
        if (company && position && start && end) {
          experienceList.push({
            company: company.value,
            position: position.value,
            start: start.value,
            end: end.value
          });
        }
      }
  
      for (let i = 0; i < educationIndex; i++) {
        const name = document.querySelector(`[name="edu_name_${i}"]`);
        const start = document.querySelector(`[name="edu_start_${i}"]`);
        const end = document.querySelector(`[name="edu_end_${i}"]`);
        if (name && start && end) {
          educationList.push({
            name: name.value,
            start: start.value,
            end: end.value
          });
        }
      }
  
      const data = {
        name: document.getElementById("name").value,
        dob: document.getElementById("dob").value,
        gender: document.getElementById("gender").value,
        religion: document.getElementById("religion").value,
        nationality: document.getElementById("nationality").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value,
        about: document.getElementById("about").value,
        skills: skillList,
        education: educationList,
        experience: experienceList,
        photo: imageBase64
      };
  
      localStorage.setItem("resumeData", JSON.stringify(data));
      window.location.href = targetFile;
    }
  
    window.addEventListener("DOMContentLoaded", () => {
      const saved = localStorage.getItem("resumeData");
      if (!saved) return;
      const data = JSON.parse(saved);
  
      document.getElementById("name").value = data.name || "";
      document.getElementById("dob").value = data.dob || "";
      document.getElementById("gender").value = data.gender || "";
      document.getElementById("religion").value = data.religion || "";
      document.getElementById("nationality").value = data.nationality || "";
      document.getElementById("email").value = data.email || "";
      document.getElementById("phone").value = data.phone || "";
      document.getElementById("address").value = data.address || "";
      document.getElementById("about").value = data.about || "";
      imageBase64 = data.photo || "";
  
      if (data.education?.length) {
        data.education.forEach((edu) => {
          addEducation();
          const idx = educationIndex - 1;
          document.querySelector(`[name="edu_name_${idx}"]`).value = edu.name;
          document.querySelector(`[name="edu_start_${idx}"]`).value = edu.start;
          document.querySelector(`[name="edu_end_${idx}"]`).value = edu.end;
        });
      }
  
      if (data.experience?.length) {
        data.experience.forEach((exp) => {
          addExperience();
          const idx = experienceIndex - 1;
          document.querySelector(`[name="company_${idx}"]`).value = exp.company;
          document.querySelector(`[name="position_${idx}"]`).value = exp.position;
          document.querySelector(`[name="exp_start_${idx}"]`).value = exp.start;
          document.querySelector(`[name="exp_end_${idx}"]`).value = exp.end;
        });
      }
  
      if (data.skills?.length) {
        data.skills.forEach((skill) => {
          addSkill();
          const idx = skillIndex - 1;
          document.querySelector(`[name="skill_${idx}"]`).value = skill;
        });
      }
    });