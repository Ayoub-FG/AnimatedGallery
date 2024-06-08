const imageTrack = document.querySelector("#image-track");

window.onmousedown = (e) => {
  imageTrack.dataset.mouseDownAt = e.clientX;
};

window.onmousemove = (e) => {
  if (imageTrack.dataset.mouseDownAt === "0") return;
  const delta = e.clientX - parseFloat(imageTrack.dataset.mouseDownAt);
  const maxDelta = window.innerWidth / 2;

  const percentage =
    Math.floor((delta / maxDelta) * 100) +
    parseFloat(imageTrack.dataset.prevPercentage);

  const realPercentage = Math.min(Math.max(percentage, -100), 0);
  imageTrack.dataset.percentage = realPercentage;

  // imageTrack.style.transform = `translate(${realPercentage}%, -50%)`;
  imageTrack.animate(
    {
      transform: `translate(${realPercentage}%, -50%)`,
    },
    {
      fill: "forwards",
      duration: 5000,
    }
  );

  [...imageTrack.querySelectorAll(".image")].forEach((img) => {
    img.animate(
      {
        objectPosition: `${100 + realPercentage}% center`,
      },
      {
        duration: 5000,
        fill: "forwards",
      }
    );
  });
};

window.onmouseup = (e) => {
  imageTrack.dataset.mouseDownAt = "0";
  imageTrack.dataset.prevPercentage = imageTrack.dataset.percentage;
};
