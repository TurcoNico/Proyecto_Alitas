// Seleccionar todos los elementos de la lista
let appContainerItems = document.querySelectorAll('.app-container__item');
let appContainerItemIcons = document.querySelectorAll('.app-container__item-icon');

// Iterar sobre cada elemento y aplicar el fondo difuminado
appContainerItems.forEach((item, index) => {
    let appContainerBackground = document.createElement("img");
    appContainerBackground.classList.add('app-container__background');
    
    // Asignar la misma imagen del icono como fondo
    appContainerBackground.src = appContainerItemIcons[index].src;
    
    // Insertar el fondo antes del icono
    item.prepend(appContainerBackground);
});
