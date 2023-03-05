function popupEntry() {
    let popupWindow = document.getElementById('beginGameEntry');
    let charSelect = document.getElementById('classSelection');
    charSelect.style.opacity = '0';
    charSelect.style.visibility = 'hidden';
    popupWindow.style.visibility = 'visible';
    popupWindow.style.opacity = '1';
  }
  
  function fadeAll() {
    let content = document.getElementById('content');
    let popupWindow = document.getElementById('beginGameEntry');
    popupWindow.style.visibility = 'hidden';
    popupWindow.style.opacity = '0';
    content.style.opacity = '0';
    content.style.visibility = 'hidden';
  }

  function toggleBegin(){
    if(document.getElementById("inputName").value!==""){
      window.location.href='starmap.html'
    }
    else{
      alert("You must choose a name!")
    }
  }

  const el = document.querySelector("#module");
  el.addEventListener("mousemove", (e) => {
    el.style.backgroundPositionX = -0.005*e.offsetX + "px";
    el.style.backgroundPositionY = -0.005*e.offsetY + "px";
  });