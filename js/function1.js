    function saveColorSetting(key, value) {
      localStorage.setItem(key, value);
    }

    function applySavedColors() {
      const leftColBg = localStorage.getItem('leftColBgColor');
      const rightColBg = localStorage.getItem('rightColBgColor');
      const leftTextColor = localStorage.getItem('leftTextColor');
      const rightTextColor = localStorage.getItem('rightTextColor');
      const badgeColor = localStorage.getItem('badgeColor');

      if (leftColBg) {
        document.querySelector('.left-column').style.backgroundColor = leftColBg;
        document.getElementById('left-col-bg-color').value = leftColBg;
      }

      if (rightColBg) {
        document.querySelector('.right-column').style.backgroundColor = rightColBg;
        document.getElementById('right-col-bg-color').value = rightColBg;
      }

      if (leftTextColor) {
        document.querySelector('.left-column').style.color = leftTextColor;
        document.getElementById('left-text-color').value = leftTextColor;
      }

      if (rightTextColor) {
        document.querySelector('.right-column').style.color = rightTextColor;
        document.getElementById('right-text-color').value = rightTextColor;
      }

      if (badgeColor) {
        document.querySelectorAll('.badge').forEach(b => b.style.backgroundColor = badgeColor);
        document.getElementById('badge-color').value = badgeColor;
      }
    }

    function resetColors() {
      const keys = ['leftColBgColor', 'rightColBgColor', 'leftTextColor', 'rightTextColor', 'badgeColor'];
      keys.forEach(key => localStorage.removeItem(key));
      location.reload();
    }

    document.getElementById('left-col-bg-color').addEventListener('input', function () {
      const value = this.value;
      document.querySelector('.left-column').style.backgroundColor = value;
      saveColorSetting('leftColBgColor', value);
    });

    document.getElementById('right-col-bg-color').addEventListener('input', function () {
      const value = this.value;
      document.querySelector('.right-column').style.backgroundColor = value;
      saveColorSetting('rightColBgColor', value);
    });

    document.getElementById('left-text-color').addEventListener('input', function () {
      const value = this.value;
      document.querySelector('.left-column').style.color = value;
      saveColorSetting('leftTextColor', value);
    });

    document.getElementById('right-text-color').addEventListener('input', function () {
      const value = this.value;
      document.querySelector('.right-column').style.color = value;
      saveColorSetting('rightTextColor', value);
    });

    document.getElementById('badge-color').addEventListener('input', function () {
      const value = this.value;
      document.querySelectorAll('.badge').forEach(b => b.style.backgroundColor = value);
      saveColorSetting('badgeColor', value);
    });

    window.addEventListener('DOMContentLoaded', () => {
      applySavedColors();

      const data = JSON.parse(localStorage.getItem('resumeData'));
      if (data) {
        document.getElementById('resume-name').textContent = data.name;
        document.getElementById('resume-nameh1').textContent = data.name;
        document.getElementById('resume-phone').textContent = data.phone;
        document.getElementById('resume-email').textContent = data.email;
        document.getElementById('resume-address').textContent = data.address;
        document.getElementById('resume-about').textContent = data.about;
        document.getElementById('resume-ttl').textContent = data.dob;
        document.getElementById('resume-gender').textContent = data.gender;
        document.getElementById('resume-religion').textContent = data.religion;
        document.getElementById('resume-nationality').textContent = data.nationality;
        document.getElementById('resume-photo').src = data.photo || 'default.jpg';

        const skillsList = document.getElementById('resume-skills');
        data.skills.forEach(skill => {
          const li = document.createElement('li');
          li.textContent = skill;
          skillsList.appendChild(li);
        });

        const experienceList = document.getElementById('resume-experience');
        data.experience.forEach(exp => {
          const expItem = document.createElement('li');
          const positionText = document.createTextNode(`${exp.position} di ${exp.company} `);
          const startBadge = document.createElement('span');
          startBadge.className = 'badge';
          startBadge.textContent = exp.start;
          const separator = document.createTextNode(' - ');
          const endBadge = document.createElement('span');
          endBadge.className = 'badge';
          endBadge.textContent = exp.end;
          expItem.appendChild(positionText);
          expItem.appendChild(startBadge);
          expItem.appendChild(separator);
          expItem.appendChild(endBadge);
          experienceList.appendChild(expItem);
        });

        const educationList = document.getElementById('resume-education');
        data.education.forEach(edu => {
          const eduItem = document.createElement('li');
          const positionText = document.createTextNode(`${edu.name} `);
          const startBadge = document.createElement('span');
          startBadge.className = 'badge';
          startBadge.textContent = edu.start;
          const separator = document.createTextNode(' - ');
          const endBadge = document.createElement('span');
          endBadge.className = 'badge';
          endBadge.textContent = edu.end;
          eduItem.appendChild(positionText);
          eduItem.appendChild(startBadge);
          eduItem.appendChild(separator);
          eduItem.appendChild(endBadge);
          educationList.appendChild(eduItem);
        });
      }
    });