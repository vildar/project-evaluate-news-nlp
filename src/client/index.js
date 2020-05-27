import { isValidUrl } from "./js/checkUrl";
import { handleSubmit } from "./js/formHandler";

import "./styles/mainStyleSheet.scss";

const form = document.querySelector("#main-form");
const url = document.querySelector("#url");
const submit = document.querySelector("#main-form input[type=submit]");


form.addEventListener("submit", event => {
  event.preventDefault();
  const urlValue = url.value;
  if (isValidUrl(urlValue)) {
    submit.value = "Loading.......";
    handleSubmit(urlValue, submit);
  }
});

const error = document.querySelector("#main-form .error");

url.addEventListener("keyup", event => {
  if (isValidUrl(event.target.value)) error.classList.add("hidden");
  else error.classList.remove("hidden");
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(registration => {
        console.log("SW registered: ", registration);
      })
      .catch(registrationError => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}