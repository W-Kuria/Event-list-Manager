const form = document.getElementById('guest-form');
const input = document.getElementById('guest-name');
const list = document.getElementById('guest-list');
const categorySelect = document.getElementById('guest-category');

let guests = [];

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (guests.length >= 10) {
    alert('Guest limit reached! Only 10 guests allowed.');
    return;
  }

  const name = input.value.trim();
  const category = categorySelect.value;

  if (!name) return;

  const guest = {
    id: Date.now(),
    name,
    category,
    attending: true
  };

  guests.push(guest);
  input.value = '';
  renderGuests();
});

function renderGuests() {
  list.innerHTML = '';

  guests.forEach(guest => {
    const li = document.createElement('li');

    const nameSpan = document.createElement('span');
    nameSpan.textContent = guest.name;
    nameSpan.contentEditable = false;
    nameSpan.className = 'name';

    const tag = document.createElement('span');
    tag.className = `category ${guest.category}`;
    tag.textContent = guest.category;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Remove';
    deleteBtn.onclick = () => {
      guests = guests.filter(g => g.id !== guest.id);
      renderGuests();
    };

    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = guest.attending ? 'Mark Not Attending' : 'Mark Attending';
    toggleBtn.onclick = () => {
      guest.attending = !guest.attending;
      renderGuests();
    };

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.onclick = () => {
      if (editBtn.textContent === 'Edit') {
        nameSpan.contentEditable = true;
        nameSpan.focus();
        editBtn.textContent = 'Save';
      } else {
        nameSpan.contentEditable = false;
        guest.name = nameSpan.textContent.trim();
        editBtn.textContent = 'Edit';
      }
    };

    const leftSide = document.createElement('div');
    leftSide.appendChild(nameSpan);
    leftSide.appendChild(tag);

    const rightSide = document.createElement('div');
    rightSide.appendChild(toggleBtn);
    rightSide.appendChild(editBtn);
    rightSide.appendChild(deleteBtn);

    li.appendChild(leftSide);
    li.appendChild(rightSide);

    li.style.backgroundColor = guest.attending ? '#e0ffe0' : '#ffe0e0';

    list.appendChild(li);
  });
}
