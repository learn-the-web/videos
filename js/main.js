(function () {
  "use strict";

  document.querySelectorAll("main article").forEach((vid, i) => {
    if (i == 0) {
      return;
    }
    vid.hidden = true;
    vid.setAttribute("aria-hidden", true);
  });

  document.querySelectorAll("main article video").forEach((vid) => {
    vid.addEventListener("ended", (e) => {
      try {
        const linkTag = document.querySelector(
          `nav a[href="#${vid.parentNode.id}"]`
        );
        linkTag.parentNode.nextElementSibling.querySelector("a").click();
      } catch {
        // Do nothing — end of playlist
      }
    });
    vid.addEventListener("play", (e) => {
      try {
        const embedH2 = e.currentTarget.parentNode.querySelector("h2");
        const embedNav = document.querySelector(".embedded nav");
        if (embedH2.matches(".embedded h2")) {
          embedH2.style.opacity = 0;
          embedH2.style.pointerEvents = "none";
        }
        embedNav.style.opacity = 0;
        embedNav.style.pointerEvents = "none";
      } catch {
        // Do nothing — not embedded
      }
    });
    vid.addEventListener("pause", (e) => {
      try {
        const embedH2 = e.currentTarget.parentNode.querySelector("h2");
        const embedNav = document.querySelector(".embedded nav");
        if (embedH2.matches(".embedded h2")) {
          embedH2.style.opacity = 1;
          embedH2.style.pointerEvents = "auto";
        }
        embedNav.style.opacity = 1;
        embedNav.style.pointerEvents = "auto";
      } catch {
        // Do nothing — not embedded
      }
    });
  });

  document.querySelectorAll("nav a").forEach((link, i) => {
    if (i == 0) {
      link.setAttribute("aria-selected", true);
    }
    link.addEventListener("click", (e) => {
      const vid = document.getElementById(
        e.currentTarget.getAttribute("href").replace("#", "")
      );
      const vidTag = vid.querySelector("video");
      const oldLink = document.querySelector("nav a[aria-selected]");
      const oldVid = document.getElementById(
        oldLink.getAttribute("href").replace("#", "")
      );
      const oldVidTag = oldVid.querySelector("video");
      oldLink.removeAttribute("aria-selected");
      e.currentTarget.setAttribute("aria-selected", true);
      oldVidTag.pause();
      oldVid.hidden = true;
      oldVid.setAttribute("aria-hidden", true);
      vid.hidden = false;
      vid.removeAttribute("aria-hidden");
      vidTag.play();
      vidTag.currentTime = 0;
    });
  });

  if (window.location.hash) {
    try {
      const link = document.querySelector(
        `nav a[href="${window.location.hash}"]`
      );
      link.click();
    } catch {
      // Do nothing — hash doesn’t match playlist URL
    }
  }
})();
