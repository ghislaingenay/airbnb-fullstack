const changePicture = (event) => {
  let currentPicture = document.querySelector(".firstpicture");
  let img= event.src
   currentPicture.src = img
}
