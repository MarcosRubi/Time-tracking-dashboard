// OBTENIENDO LOS DATOS DEL .json
const requesURL = "./data.json";
const request = new XMLHttpRequest();
request.open("GET", requesURL);
request.responseType = "json";
request.send();

request.onload = () => {
    const data = request.response;
    //AGREGANDO LOS TITULOS
    const titles = document.querySelectorAll(".content h2");

    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        titles[i].innerHTML = element.title;
    }
};

//AGREGAR CLASE ACTIVA AL MENU
const menuItems = document.querySelectorAll("nav li");

menuItems.forEach((menuItem) => {
    menuItem.addEventListener("click", (e) => {
        document.querySelector("li.active").classList.remove("active");
        e.target.classList.add("active");
    });
});


//CAMBIAR LAS HORAS
const current = document.querySelectorAll(".content span.current");
const previous = document.querySelectorAll(".content span.previous");
const last = document.querySelectorAll(".content .time");

function selectTime(time) {
    const data = request.response;
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        switch (time) {
            case "daily":
                current[i].innerHTML = element.timeframes.daily.current;
                previous[i].innerHTML = element.timeframes.daily.previous;
                last[i].innerHTML = "Day";
                break;
            case "monthly":
                current[i].innerHTML = element.timeframes.monthly.current;
                previous[i].innerHTML = element.timeframes.monthly.previous;
                last[i].innerHTML = "Month";
                break;

            default:
                current[i].innerHTML = element.timeframes.weekly.current;
                previous[i].innerHTML = element.timeframes.weekly.previous;
                last[i].innerHTML = "Week";
                break;
        }
    }
}



window.onload = () => {

    //ANIMACIONES
    const sections = document.querySelectorAll("section");
    const userInfo = document.querySelector(".user__info");
    const nav = document.querySelector("nav");
    const attribution = document.querySelector(".attribution");

    const startAnimation = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    };
    const observer = new IntersectionObserver(startAnimation, {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
    });

    sections.forEach((section) => {
        observer.observe(section);
    });
    observer.observe(userInfo);
    observer.observe(nav);
    observer.observe(attribution);
};
