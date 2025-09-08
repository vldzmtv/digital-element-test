const modal = document.getElementById("modal");
const modalOverlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");
const talkButton = document.querySelector(".work__button");

talkButton.addEventListener("click", () => {
  modal.style.display = "block";
  document.body.classList.add("body--no-scroll");
});

modalClose.addEventListener("click", () => {
  modal.style.display = "none";
  document.body.classList.remove("body--no-scroll");
});

modalOverlay.addEventListener("click", () => {
  modal.style.display = "none";
  document.body.classList.remove("body--no-scroll");
});
const modalForm = document.querySelector(".modal__form");

function validateForm(formData) {
  const errors = {};

  if (!formData.get("name") || formData.get("name").trim().length < 2) {
    errors.name = "Введите корректное имя";
  }

  const email = formData.get("email");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailPattern.test(email)) {
    errors.email = "Введите корректный email";
  }

  if (!formData.get("message") || formData.get("message").trim().length < 5) {
    errors.message = "Введите сообщение";
  }

  return errors;
}

modalForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(modalForm);
  const errors = validateForm(formData);

  modalForm.querySelectorAll(".modal__input, .modal__textarea").forEach((input) => {
    input.style.borderColor = "rgba(53, 110, 173, 0.4)";
  });

  if (Object.keys(errors).length > 0) {
    for (const [ key ] of Object.entries(errors)) {
      const input = modalForm.querySelector(`[name="${key}"]`);
      if (input) {
        input.style.borderColor = "red"; 
      }
    }
    return;
  }

  try {
    await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json())
      .then((data) => console.debug("Отправлено на сервер:", data));

    modal.style.display = "none";
    document.body.classList.remove("body--no-scroll");

    modalForm.reset();
  } catch (error) {
    console.error("Ошибка при отправке формы:", error);
  }
});
