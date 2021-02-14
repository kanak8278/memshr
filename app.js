
backend_host = "https://memshr.herokuapp.com/memes"
// backend_host = "http://localhost:8081/memes"
const getMemes = (callback)=>{
    const request = new XMLHttpRequest();
    request.addEventListener('readystatechange', ()=>{
        if(request.readyState === 4 && request.status === 200){
            const data = JSON.parse(request.responseText);
            data.forEach(element => {
                addMeme(element);
            });
            callback(undefined, data)
        }
        else if(request.readyState == 4){
            callback();
        }
    });
    request.open('GET', backend_host); 
    request.send("Error: Could not fetch data!", undefined);
};

getMemes((err, data) => {
    if(data){
        // console.log();
    }else{
        console.log(err);
        document.body.innerHTML ="<h1>404 Not Found</h1>";
    }
});


addMeme = (element) =>{
    Div = document.getElementById("img-div");


    imageDiv = document.createElement("div");
    imageDiv.classList = "card mt-4";
    childDiv = document.createElement("div");
    childDiv.classList = "card-body";
    
    var x  = document.createElement("img");
    x.classList= "img-fluid img-thumbnail mt-5";
    x.id = "meme-img";
    x.src = element.url;

    var caption = document.createElement("figcaption");
    caption.classList = "figure-caption mt-2";
    caption.innerText =element.caption;

    // var date = document.createElement("div");
    // date.className = "card-subtitle text-muted mb-2";
    // date.innerText = element.updatedAt;
    

    var writer = document.createElement("div");
    writer.className = "card-subtitle mb-2";
    writer.innerText = element.name;

    // childDiv.appendChild(date);
    childDiv.appendChild(writer);
    childDiv.appendChild(x);
    childDiv.appendChild(caption);
    imageDiv.appendChild(childDiv);


    Div.appendChild(imageDiv);
};



// Form Submission
document.addEventListener('DOMContentLoaded', () => {
    document
      .getElementById('myForm')
      .addEventListener('submit', handleForm);
  });

function handleForm(ev) {
    ev.preventDefault(); //stop the page reloading
    
    let myForm = ev.target;
    let fd = new FormData(myForm);


    
    // for (let key of fd.keys()) {
    //   console.log(key, fd.get(key));
    // }
    let json = convertFD2JSON(fd);

    //send the request with the formdata
    let url = backend_host;
    let h = new Headers();
    h.append('Content-type', 'application/json');

    let req = new Request(url, {
      headers: h,
      body: json,
      method: 'POST',
    });
    //console.log(req);
    fetch(req)
      .then((res) => {
        res.json();
        location.reload()})
      .catch((err)=>{
        console.log("Error:  ",err);
      });
};

  function convertFD2JSON(formData) {
    let obj = {};
    for (let key of formData.keys()) {
      obj[key] = formData.get(key);
    }
    return JSON.stringify(obj);
  }