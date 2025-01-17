const addButton = document.getElementById("addButton");
const addActivityModal = document.getElementById("addActivityModal");
const closeModal = document.getElementById("closeModal");
const activityCards = document.getElementById("activityCards");
const message = document.getElementById("message");
const addActivityForm = document.getElementById("addActivityForm");
const activityPopup = document.getElementById("activityPopup");
const popupClose = document.getElementById("popupClose");
const popupDelete = document.getElementById("popupDelete");
const popupTitle = document.getElementById("popupTitle");
const popupDate = document.getElementById("popupDate");
const popupStreak = document.getElementById("popupStreak");

let activities = [];

addButton.addEventListener("click", () => {
  addActivityModal.style.display = "flex";
});

closeModal.addEventListener("click", () => {
  addActivityModal.style.display = "none";
});

addActivityForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const taskName = document.getElementById("taskName").value;
  const taskImage = document.getElementById("taskImage").value;
  const startDate = document.getElementById("startDate").value;

  const activity = {
    id: new Date().toISOString(),
    name: taskName,
    image: taskImage,
    startDate,
    streak: 0,
  };

  activities.push(activity);
  displayActivities();
  showMessage("Activity added!");
  addActivityModal.style.display = "none";
});

function displayActivities() {
  activityCards.innerHTML = "";
  activities.forEach((activity, index) => {
    const card = document.createElement("div");
    card.className = "activity-card";
    card.innerHTML = `
      <img src="${activity.image}" alt="${activity.name}">
      <p>${activity.startDate}</p>
      <h3>${activity.name}</h3>
    `;

    card.addEventListener("click", () => viewActivity(index));

    activityCards.appendChild(card);
  });

  if (activities.length > 0) {
    message.style.display = "none";
  } else {
    message.style.display = "block";
  }
}

function showMessage(msg) {
  message.innerHTML = msg;
  setTimeout(() => {
    message.innerHTML = "No Activities Added Yet";
  }, 5000);
}

function viewActivity(index) {
  const activity = activities[index];

  popupTitle.textContent = activity.name;
  popupDate.textContent = `Start Date: ${activity.startDate}`;
  popupStreak.textContent = `Streak: ${activity.streak} days`;

  const popupImage = document.createElement("img");
  popupImage.src = activity.image;
  popupImage.alt = activity.name;
  popupImage.style.width = "100px";
  popupImage.style.height = "100px";
  popupImage.style.objectFit = "cover";

  const popupContent = document.querySelector(".popup-content");
  popupContent.insertBefore(popupImage, popupTitle);

  activityPopup.style.display = "flex";

  popupDelete.onclick = () => {
    deleteActivity(index);
  };
}

function deleteActivity(index) {
  activities.splice(index, 1);
  displayActivities();
  activityPopup.style.display = "none";
}

popupClose.addEventListener("click", () => {
  activityPopup.style.display = "none";
});
