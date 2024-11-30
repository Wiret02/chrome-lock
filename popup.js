const passwordInput = document.getElementById("password");
const submitButton = document.getElementById("submit");
const errorText = document.getElementById("error");

const oldPasswordInput = document.getElementById("old-password");
const newPasswordInput = document.getElementById("new-password");
const confirmPasswordInput = document.getElementById("confirm-password");
const changePasswordButton = document.getElementById("change-password");
const changeErrorText = document.getElementById("change-error");
const changeSuccessText = document.getElementById("change-success");

// Вхід у систему
submitButton.addEventListener("click", () => {
  const enteredPassword = passwordInput.value;
  chrome.storage.local.get("password", (data) => {
    const savedPassword = data.password || "1234"; // Стандартний пароль за замовчуванням
    if (enteredPassword === savedPassword) {
      chrome.storage.local.set({ unlocked: true }, () => {
        window.close();
      });
    } else {
      errorText.style.display = "block";
    }
  });
});

// Зміна пароля
changePasswordButton.addEventListener("click", () => {
  const oldPassword = oldPasswordInput.value;
  const newPassword = newPasswordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  chrome.storage.local.get("password", (data) => {
    const savedPassword = data.password || "1234";

    // Перевірка старого пароля
    if (oldPassword !== savedPassword) {
      changeErrorText.textContent = "Incorrect old password!";
      changeErrorText.style.display = "block";
      changeSuccessText.style.display = "none";
      return;
    }

    // Перевірка підтвердження нового пароля
    if (newPassword !== confirmPassword) {
      changeErrorText.textContent = "New passwords do not match!";
      changeErrorText.style.display = "block";
      changeSuccessText.style.display = "none";
      return;
    }

    // Збереження нового пароля
    chrome.storage.local.set({ password: newPassword }, () => {
      changeErrorText.style.display = "none";
      changeSuccessText.style.display = "block";

      // Очищення полів
      oldPasswordInput.value = "";
      newPasswordInput.value = "";
      confirmPasswordInput.value = "";
    });
  });
});