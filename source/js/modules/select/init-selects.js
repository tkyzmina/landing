window.initSimpleSelects = () => {
  const customSelects = document.querySelectorAll(
    ".js-select:not(.is-initialized)"
  );
  const allActiveElement = document.querySelectorAll(
    "input, checkbox, a, button, textarea, radio, select, option"
  );

  const closeAllLists = () => {
    customSelects.forEach((el) => {
      el.classList.remove("active");
    });
  };

  const documentClickHandler = ({ target }) => {
    if (!target.closest(".js-select")) {
      closeAllLists();
      document.removeEventListener("click", documentClickHandler);
    }
  };

  const documentTabAction = () => {
    allActiveElement.forEach((el) => {
      el.addEventListener("focus", () => {
        if (
          !el.closest(".js-select") ||
          (el.closest(".js-select") &&
            !el.closest(".js-select").classList.contains("active"))
        ) {
          closeAllLists();
        }
      });
    });
  };

  const removeAllActiveClass = (items) => {
    items.forEach((el) => {
      el.classList.remove("active");
    });
  };

  const selectItemsAction = (items) => {
    items.forEach((el) => {
      const selectsHandler = () => {
        const parent = el.closest(".js-select");
        const input = parent.querySelector("input");
        const hiddenInput = parent.querySelector("input[data-hidden-input]");
        input.value = el.innerText;
        const idValue = el.dataset.value;
        if (idValue) {
          hiddenInput.value = idValue;
        } else {
          hiddenInput.value = "";
        }
        closeAllLists();
        removeAllActiveClass(items);
        el.classList.add("active");
        const changeEv = new CustomEvent("change");
        const inputEv = new CustomEvent("input");
        input.dispatchEvent(changeEv);
        input.dispatchEvent(inputEv);
        const form = el.closest("form");
        if (form) {
          const formChangeEv = new CustomEvent("change");
          const formInputEv = new CustomEvent("input");
          form.dispatchEvent(formChangeEv);
          form.dispatchEvent(formInputEv);
        }
      };
      el.addEventListener("click", selectsHandler);
      el.addEventListener("keydown", (e) => {
        const isEnter = e.key === "Enter";
        if (isEnter) {
          selectsHandler();
        }
      });
    });
  };

  const onSelectInputClick = ({ target }) => {
    const parent = target.closest(".js-select");

    document.addEventListener("click", documentClickHandler);

    if (parent.classList.contains("active")) {
      closeAllLists();
    } else {
      parent.classList.add("active");
    }
  };

  const onSelectInputKeydown = (e) => {
    const parent = e.target.closest(".js-select");
    const isEnter = e.key === "Enter";

    document.addEventListener("click", documentClickHandler);

    if (isEnter) {
      e.preventDefault();
      if (parent.classList.contains("active")) {
        closeAllLists();
      } else {
        parent.classList.add("active");
      }
    }
  };

  const getDefaultSelect = (arr) => {
    let currentValue = false;

    arr.forEach((item) => {
      if (item.classList.contains("active")) {
        if (item.dataset.value) {
          currentValue = item.dataset.value;
        } else {
          currentValue = item.textContent;
        }
      }
    });

    return currentValue;
  };

  const initSelect = (select) => {
    select.classList.add("is-initialized");
    const selectInput = select.querySelector("label input");
    const selectItems = select.querySelectorAll("li");
    const hiddenInput = document.createElement("input");
    const hiddenInputName = selectInput.dataset.selectName;
    const defaultValue = getDefaultSelect(selectItems);
    hiddenInput.setAttribute("type", "text");
    hiddenInput.setAttribute("name", hiddenInputName);
    hiddenInput.setAttribute("data-hidden-input", "");

    if (defaultValue) {
      hiddenInput.setAttribute("value", defaultValue);
    } else {
      hiddenInput.setAttribute("value", "");
    }

    hiddenInput.style.display = "none";
    select.appendChild(hiddenInput);

    selectInput.addEventListener("click", onSelectInputClick);
    selectInput.addEventListener("keydown", onSelectInputKeydown);

    selectItemsAction(selectItems);
  };

  if (customSelects.length) {
    customSelects.forEach((select) => initSelect(select));
    documentTabAction();
  }
};

const initSelects = () => {
  window.initSimpleSelects();
};

export { initSelects };
