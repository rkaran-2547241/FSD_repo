    const form = document.querySelector("#freelancerForm");
    const output = document.querySelector("#output");

    const radios = document.querySelectorAll(".radio-label");
    const checkboxes = document.querySelectorAll(".checkbox-label");

    radios.forEach(label => {
      label.addEventListener("click", () => {
        radios.forEach(l => l.classList.remove("selected-label"));
        label.classList.add("selected-label");
      });
    });

    checkboxes.forEach(label => {
      const input = label.querySelector("input");
      input.addEventListener("change", () => {
        if (input.checked) {
          label.classList.add("selected-label");
        } else {
          label.classList.remove("selected-label");
        }
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const projectName = document.querySelector("#project_name").value;
      const budget = document.querySelector("input[name='budget']:checked")?.value || "Not selected";

      const contactMethods = [];
      document.querySelectorAll("input[name='contactMethod']:checked").forEach(cb => {
        contactMethods.push(cb.value);
      });

      const projectDetails = document.querySelector("#details").value;

      output.innerHTML = `
        <h3 class="text-lg font-semibold mb-2">Submitted Info:</h3>
        <p><strong>Project Name:</strong> ${projectName}</p>
        <p><strong>Budget:</strong> ${budget}</p>
        <p><strong>Preferred Contact:</strong> ${contactMethods.join(", ") || "None"}</p>
        <p><strong>Details:</strong> ${projectDetails}</p>
      `;
      output.classList.remove("hidden");
    });
