document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const navLinks = document.querySelectorAll("nav ul li a");
  const sections = document.querySelectorAll(".portfolio-section");

  const menuIcon = document.querySelector('.menu-icon');
  const navlist = document.querySelector('.navlist');
  const overlay = document.querySelector('.overlay');

  function toggleMenu() {
      navlist.classList.toggle('open');
      menuIcon.classList.toggle('active');
      overlay.classList.toggle('open');
  }

  if (menuIcon && navlist && overlay) {
      menuIcon.addEventListener('click', toggleMenu);
      overlay.addEventListener('click', toggleMenu);
  }

  const texts = [
      "DEVELOPER",
      "DESIGNER",
      "PROGRAMMER",
  ];

  const typingSpeed = 100;
  const erasingSpeed = 50;
  const delayBeforeErase = 1000;
  const delayBeforeTypingNext = 500;

  const textElements = document.querySelector('.typewriter-text');

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
      if (!textElements) return;

      const currentText = texts[textIndex];

      if (!isDeleting) {
          if (charIndex < currentText.length) {
              textElements.innerHTML += currentText.charAt(charIndex);
              charIndex++;
              setTimeout(typeEffect, typingSpeed);
          } else {
              setTimeout(() => {
                  isDeleting = true;
                  typeEffect();
              }, delayBeforeErase);
          }
      } else {
          if (charIndex > 1) {
              textElements.innerHTML = currentText.substring(0, charIndex - 1);
              charIndex--;
              setTimeout(typeEffect, erasingSpeed);
          } else {
              isDeleting = false;
              textIndex = (textIndex + 1) % texts.length;
              const nextText = texts[textIndex];

              textElements.innerHTML = nextText.charAt(0);
              charIndex = 1;

              setTimeout(typeEffect, delayBeforeTypingNext);
          }
      }
  }

  if (textElements) {
      textElements.innerHTML = texts[textIndex].charAt(0);
      charIndex = 1;
      typeEffect();
  }


  const allSections = document.querySelectorAll('section');

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    let current = '';
    allSections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 100 && pageYOffset < sectionTop + sectionHeight - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
  });

  navLinks.forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
        });
      }
      if (navlist.classList.contains('open')) {
          toggleMenu();
      }
    });
  });

  const sectionObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("is-visible");
          }, 20);
        } else {
          if (entry.target.classList.contains("is-visible")) {
            entry.target.classList.remove("is-visible");
          }
        }
      });
    },
    {
      root: null,
      threshold: 0.2,
    }
  );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });

  const projectsGrid = document.querySelector(".projects-grid");
  const prevButton = document.getElementById("prev-project");
  const nextButton = document.getElementById("next-project");

  if (projectsGrid) {
    const updateButtons = () => {
      const scrollLeft = projectsGrid.scrollLeft;
      const scrollWidth = projectsGrid.scrollWidth;
      const clientWidth = projectsGrid.clientWidth;

      prevButton.disabled = scrollLeft <= 0;
      nextButton.disabled = scrollLeft + clientWidth >= scrollWidth - 1;
    };

    nextButton.addEventListener("click", () => {
      const firstProject = projectsGrid.querySelector(".project-item");
      const projectWidth = firstProject.offsetWidth;
      const gap = parseInt(window.getComputedStyle(projectsGrid).gap);
      projectsGrid.scrollLeft += projectWidth + gap;
    });

    prevButton.addEventListener("click", () => {
      const firstProject = projectsGrid.querySelector(".project-item");
      const projectWidth = firstProject.offsetWidth;
      const gap = parseInt(window.getComputedStyle(projectsGrid).gap);
      projectsGrid.scrollLeft -= projectWidth + gap;
    });

    projectsGrid.addEventListener("scroll", updateButtons);

    updateButtons();
  }
});
