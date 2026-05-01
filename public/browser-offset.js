const resizeOps = () => {
  document.documentElement.style.setProperty("--vh", window.innerHeight * 0.01 + "px");
  console.log('offset-working')
};

resizeOps();
window.addEventListener("resize", resizeOps);
  