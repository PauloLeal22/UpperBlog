if(document.querySelector('div.hamburguer')){
    const areaHamburguer = document.querySelector('div.area-hamburguer')
    const hamburguer = document.querySelector('div.hamburguer')
    const nav = document.querySelector('ul.navbarAdmin')

    hamburguer.addEventListener('click', showNav)

    function showNav(){
        if(nav.style.display == 'block'){
            nav.setAttribute('style', 'display: none')
            areaHamburguer.setAttribute('style', 'background-color: transparent')
        }else{
            areaHamburguer.setAttribute('style', 'background-color: #1a1a1a')
            nav.setAttribute('style', 'display: block')
        }
    }
}