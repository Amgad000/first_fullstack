let btn = document.querySelector(".delete");
let btnId = btn.getAttribute("data-id");

btn.addEventListener("click", function (e) {
  fetch(`/all-articles/${btnId}`, {method: "DELETE"})
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      location.href = data.homeUrl;
    })
    .catch((err) => console.log(err));
});
