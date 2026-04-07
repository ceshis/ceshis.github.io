(function () {
  const input = document.getElementById("q");
  const empty = document.getElementById("empty");
  const categories = document.querySelectorAll(".category");

  function normalize(s) {
    return (s || "").toLowerCase().trim();
  }

  function cardText(card) {
    const kw = card.getAttribute("data-keywords") || "";
    return normalize(card.textContent + " " + kw);
  }

  function filter() {
    const q = normalize(input.value);
    let anyVisible = false;

    categories.forEach((section) => {
      const items = section.querySelectorAll(".card-list li");
      let sectionVisible = false;

      items.forEach((li) => {
        const link = li.querySelector("a.card");
        if (!link) return;
        const match = !q || cardText(link).includes(q);
        li.classList.toggle("hidden", !match);
        if (match) {
          sectionVisible = true;
          anyVisible = true;
        }
      });

      section.classList.toggle("hidden", !sectionVisible);
    });

    empty.hidden = anyVisible;
  }

  input.addEventListener("input", filter);
  filter();
})();
