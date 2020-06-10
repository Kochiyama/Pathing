const paths = document.querySelectorAll(".path");
const inputHidden = document.querySelector("#data");


function handlePathClick(event) {
  const pathID = event.target.dataset.id;

  function redirectForPath(pathID) {
    window.location = `/path/${pathID}`;
  }
  
  const clickType = event.target.dataset.type;
  if (clickType !== undefined) {
    switch (clickType) {
      case "C":
        console.log("Complete path");
        break;
      case "D":
        console.log("Delete Path");
        break;
      case "P":
        console.log("Change Priority");
        break;
      default:
        console.log("none");
    }
    return;
  }

  redirectForPath(pathID);
}

for (const path of paths) {
  path.addEventListener("click", handlePathClick);
}