// phone mask
const elements = document.querySelectorAll('input-selector');
const maskOptions = {
  mask: '+{7}(000)000-00-00',
};
elements.forEach((element) => {
  const mask = IMask(element, maskOptions);
});
