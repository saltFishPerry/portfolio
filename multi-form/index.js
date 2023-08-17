const arcadePlanMonthly = 9;
const advancedPlanMonthly = 12;
const proPlanMonthly = 15;
const yearlyPeriodMultiplier = 10;
const addOnsPrices = {
  "Online service": 1,
  "Larger storage": 2,
  "Customizable profile": 2,
};

const nextStepButtons = document.querySelectorAll(".next-step");
const goBackButtons = document.querySelectorAll(".go-back");
const formTabContainers = document.querySelectorAll("fieldset");
const sidebarIcons = document.querySelectorAll(
  ".sidebar-container > div > p:first-child"
);
const changePlanLink = document.querySelector("#change-plan-link");
const addOns = document.querySelectorAll(".add-ons-container input");
const form = document.querySelector("form");

// Change add-ons label border color and background color on change.
addOns.forEach((input) => {
  input.addEventListener("change", (e) => {
    if (input.checked) {
      input.parentElement.classList.add("highlight");
    } else {
      input.parentElement.classList.remove("highlight");
    }
  });
});

// Changes current active tab. Positive changeBy goes forward by n steps,
// negative changeBy goes back by n steps.
const changeTabs = (currentTabIndex, changeBy = 1) => {
  formTabContainers[currentTabIndex].classList.remove("active-tab");
  formTabContainers[currentTabIndex + changeBy].classList.add("active-tab");
  console.log(currentTabIndex);
  // Prevents changing sidebar icon for summary tab to after confirm tab transition.
  if (!(currentTabIndex === formTabContainers.length - 2 && changeBy > 0)) {
    sidebarIcons[currentTabIndex].classList.remove("active-tab-number");
    sidebarIcons[currentTabIndex + changeBy].classList.add("active-tab-number");
  }
};

const emailCheck = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const phoneNumberCheck = (tel) => {
  return /^\+(\s)?\d{1,3}(\s)?\d{3}(\s)?\d{3}(\s)?\d{3}$/.test(tel);
};

// Checks if all Personal data are filled and returns true/false, adds .missing-input to according labels
// if not valid.
const personalDataValid = (e) => {
  const nameSection = document.querySelector("#user-name");
  const emailSection = document.querySelector("#email");
  const phoneNumberSection = document.querySelector("#tel");
  let isDataValid = true;

  // Remove any error message classes that could already be set.
  nameSection.classList.remove("missing-input");
  emailSection.classList.remove("missing-input");
  phoneNumberSection.classList.remove("missing-input");

  // Check inputs and apply error message class if it doesn't pass.
  if (!document.querySelector("input[name='name']").value) {
    nameSection.classList.add("missing-input");
    isDataValid = false;
  }
  if (!emailCheck(document.querySelector("input[name='email']").value)) {
    emailSection.classList.add("missing-input");
    isDataValid = false;
  }
  if (!phoneNumberCheck(document.querySelector("input[name='tel']").value)) {
    phoneNumberSection.classList.add("missing-input");
    isDataValid = false;
  }

  return isDataValid;
};

// Step 2 items.
const billingPeriodCheckbox = document.querySelector("#billing-period");
const arcadePrice = document.querySelector("#arcade-price");
const advancedPrice = document.querySelector("#advanced-price");
const proPrice = document.querySelector("#pro-price");
const discountMsgContainers = document.querySelectorAll(".discount-message");

// Toggles step 2 discount messages.
const showDiscountMsg = (show) => {
  if (show) {
    discountMsgContainers.forEach((msg) => {
      msg.setAttribute("style", "display: inline");
    });
  } else {
    discountMsgContainers.forEach((msg) => {
      msg.setAttribute("style", "display: none");
    });
  }
};

// Step 3 items.
const onlineServicePrice = document.querySelector("#online-service-price");
const largerStoragePrice = document.querySelector("#larger-storage-price");
const customizableProfilePrice = document.querySelector(
  "#customizable-profile-price"
);

// Updates data on billing period checkbox change.
billingPeriodCheckbox.addEventListener("change", (e) => {
  arcadePrice.textContent = formatPrice(arcadePlanMonthly);
  advancedPrice.textContent = formatPrice(advancedPlanMonthly);
  proPrice.textContent = formatPrice(proPlanMonthly);
  onlineServicePrice.textContent =
    "+" + formatPrice(addOnsPrices["Online service"]);
  largerStoragePrice.textContent =
    "+" + formatPrice(addOnsPrices["Larger storage"]);
  customizableProfilePrice.textContent =
    "+" + formatPrice(addOnsPrices["Customizable profile"]);
  showDiscountMsg(e.target.checked);
});

// First Next Step button, validates data for text fields.
nextStepButtons[0].addEventListener("click", (e) => {
  e.preventDefault();
  if (personalDataValid()) {
    changeTabs(0);
  }
});

// Second Next Step button.
nextStepButtons[1].addEventListener("click", (e) => {
  e.preventDefault();
  changeTabs(1);
});

// Third Next Step button, updates summary data.
nextStepButtons[2].addEventListener("click", (e) => {
  e.preventDefault();
  updateData();
  changeTabs(2);
});

// Events on Go Back buttons, first Go Back is on tab at index 1.
for (let i = 0; i < goBackButtons.length; i++) {
  goBackButtons[i].addEventListener("click", (e) => {
    e.preventDefault();
    changeTabs(i + 1, -1);
  });
}

// Change plan link event.
changePlanLink.addEventListener("click", (e) => {
  e.preventDefault();
  changeTabs(formTabContainers.length - 2, -2);
});

// Form submit event.
form.addEventListener("submit", (e) => {
  e.preventDefault();
  changeTabs(3);
});

// Summary tab items.
const summaryTable = document.querySelector(".summary-table");
const summaryPlan = document.querySelector("#summary-plan");
const summaryPeriod = document.querySelector("#summary-period");
const summaryPlanPrice = document.querySelector("#summary-plan-price");
const summaryTotal = document.querySelector("#total-cost");
const summaryPaymentFrequency = document.querySelector("#payment-frequency");

// Format price to selected period and currency.
const formatPrice = (a) => {
  if (form["billing-period"].checked) {
    a *= yearlyPeriodMultiplier;
    a = `$${a}/yr`;
  } else {
    a = `$${a}/mo`;
  }

  return a;
};

// Returns plan monthly cost.
const planPrice = (planName) => {
  let planPrice = 0;

  switch (planName) {
    case "Arcade":
      planPrice = arcadePlanMonthly;
      break;
    case "Advanced":
      planPrice = advancedPlanMonthly;
      break;
    case "Pro":
      planPrice = proPlanMonthly;
      break;
    default:
      alert(`Error (planTotalPrice()). Missing case for plan: ${planName}.`);
      break;
  }

  return planPrice;
};

// Creates Add Ons section and returns their monthly price.
const constructAddOnsSummary = () => {
  let total = 0;

  addOns.forEach((item, i) => {
    let container = document.querySelector(`#container${i}`);
    if (container) {
      container.remove();
    }

    if (item.checked) {
      const itemContainer = document.createElement("div");
      itemContainer.setAttribute("id", `container${i}`);
      const addOnNameTag = document.createElement("p");
      const addOnPriceTag = document.createElement("p");
      addOnPriceTag.classList.add("add-on-price");

      let addOnTotal = addOnsPrices[item.value];
      total += addOnTotal;

      addOnNameTag.textContent = item.value;
      addOnPriceTag.textContent = "+" + formatPrice(addOnTotal);

      itemContainer.appendChild(addOnNameTag);
      itemContainer.appendChild(addOnPriceTag);
      summaryTable.appendChild(itemContainer);
    }
  });

  return total;
};

// Updates elements in summary tab.
const updateData = () => {
  const planName = form["plan-selection"].value;
  const planMonthly = planPrice(planName);
  const addOnsMonthly = constructAddOnsSummary();

  summaryPlan.textContent = planName;
  summaryPlanPrice.textContent = formatPrice(planMonthly);
  summaryTotal.textContent = "+" + formatPrice(planMonthly + addOnsMonthly);

  if (form["billing-period"].checked) {
    summaryPeriod.textContent = "Yearly";
    summaryPaymentFrequency.textContent = "year";
  } else {
    summaryPeriod.textContent = "Monthly";
    summaryPaymentFrequency.textContent = "month";
  }
};

// Reset checkboxes on reload to default state.
window.onload = () => {
  let inputs = document.querySelectorAll("input");

  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].type == "checkbox") {
      inputs[i].checked = false;
    }
  }
};
