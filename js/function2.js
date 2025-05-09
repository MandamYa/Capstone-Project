document.getElementById('leftColumnColor').addEventListener('input', function () {
  document.querySelector('.left-column').style.backgroundColor = this.value;
});

document.getElementById('rightColumnColor').addEventListener('input', function () {
  document.querySelector('.right-column').style.backgroundColor = this.value;
});

document.getElementById('headerColor').addEventListener('input', function () {
  document.querySelector('.header').style.backgroundColor = this.value;
});

document.getElementById('a4containerColor').addEventListener('input', function () {
  document.querySelector('.a4-container').style.backgroundColor = this.value;
});

document.getElementById('sectionH3Color').addEventListener('input', function () {
  document.querySelectorAll('.section h3').forEach(el => {
    el.style.borderBottomColor = this.value;
  });
});

    // Warna teks kolom kiri
document.getElementById('left-text-color').addEventListener('input', function () {
  document.querySelectorAll('.left-column, .left-column *').forEach(el => {
    el.style.color = this.value;
  });
});

// Warna teks kolom kanan
document.getElementById('right-text-color').addEventListener('input', function () {
  document.querySelectorAll('.right-column, .right-column *').forEach(el => {
    el.style.color = this.value;
  });
});
    function resetColors() {
      document.querySelector('.left-column').style.backgroundColor = '';
      document.querySelector('.right-column').style.backgroundColor = '';
      document.querySelector('.header').style.backgroundColor = '';
      document.querySelectorAll('.section h3').forEach(el => el.style.borderBottomColor = '');
      document.querySelectorAll('.left-column, .left-column *').forEach(el => el.style.color = '');
      document.querySelectorAll('.right-column, .right-column *').forEach(el => el.style.color = '');

      document.getElementById('leftColumnColor').value = '#ffffff';
      document.getElementById('rightColumnColor').value = '#ffffff';
      document.getElementById('headerColor').value = '#3c3c3c';
      document.getElementById('sectionH3Color').value = '#000000';
      document.getElementById('a4containerColor').value = '#ffffff';
      document.getElementById('left-text-color').value = '#000000';
      document.getElementById('right-text-color').value = '#000000';
    }

    window.addEventListener('DOMContentLoaded', () => {
      const data = JSON.parse(localStorage.getItem('resumeData'));
      if (!data) return;

      document.getElementById('resume-name1').textContent = data.name || '';
      document.getElementById('resume-phone').textContent = data.phone || '';
      document.getElementById('resume-email').textContent = data.email || '';
      document.getElementById('resume-address').textContent = data.address || '';
      document.getElementById('resume-about').textContent = data.about || '';
      document.getElementById('resume-ttl').textContent = data.dob || '';
      document.getElementById('resume-gender').textContent = data.gender || '';
      document.getElementById('resume-religion').textContent = data.religion || '';
      document.getElementById('resume-nationality').textContent = data.nationality || '';

      if (data.photo && data.photo.startsWith('data:image/')) {
        document.getElementById('resume-photo').src = data.photo;
      }

      if (Array.isArray(data.skills)) {
        const skillsList = document.getElementById('resume-skills');
        data.skills.forEach(skill => {
          const li = document.createElement('li');
          li.textContent = skill;
          skillsList.appendChild(li);
        });
      }

      if (Array.isArray(data.experience)) {
        const experienceList = document.getElementById('resume-experience');
        data.experience.forEach(exp => {
          const li = document.createElement('li');
          li.textContent = `${exp.position} di ${exp.company} (${exp.start} - ${exp.end})`;
          experienceList.appendChild(li);
        });
      }

      if (Array.isArray(data.education)) {
        const educationList = document.getElementById('resume-education');
        data.education.forEach(edu => {
          const li = document.createElement('li');
          li.textContent = `${edu.name} (${edu.start} - ${edu.end})`;
          educationList.appendChild(li);
        });
      }
    });