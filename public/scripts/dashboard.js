const paths = document.querySelectorAll(".path");
const pathIdContainer = document.querySelector("#pathIdContainer");


function toggleHidden(structure) {
  document
  .querySelector(structure)
  .classList.toggle("hidden");
}


function handlePathClick(event) {
  selectedPathId = event.target.dataset.id;
  pathIdContainer.value = selectedPathId;

  function redirectForPath(selectedPathId) {
    window.location = `/path/${selectedPathId}`;
  }
  
  const clickType = event.target.dataset.type;
  if (clickType !== undefined) {
    switch (clickType) {
      case "C":
        console.log("Complete path");
        break;
      case "D":
        toggleHidden('.deletePath');
        break;
      case "P":
        console.log("Change Priority");
        break;
      default:
        console.log("none");
    }
    return;
  }

  redirectForPath(selectedPathId);
}

for (const path of paths) {
  path.addEventListener("click", handlePathClick);
}