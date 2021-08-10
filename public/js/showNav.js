if(document.querySelector('div.hamburguer')){
    const areaHamburguer = document.querySelector('div.area-hamburguer')
    const hamburguer = document.querySelector('div.hamburguer')
    const nav = document.querySelector('ul.navbar')
    const dropdownButton = document.querySelector('button.dropbtn')
    const dropdownDiv = document.querySelector('div.dropdown-content')
    const iconDropdownButton = document.querySelector('i#iconButton')

    hamburguer.addEventListener('click', showNav)
    dropdownButton.addEventListener('click', showCategories)

    function showNav(){
        if(nav.style.display == 'block'){
            nav.setAttribute('style', 'display: none')
            areaHamburguer.setAttribute('style', 'background-color: transparent')
        }else{
            areaHamburguer.setAttribute('style', 'background-color: #1a1a1a')
            nav.setAttribute('style', 'display: block')
        }
    }

    function showCategories(){
        if(dropdownDiv.style.display == 'block'){
            dropdownDiv.setAttribute('style', 'display: none')
            iconDropdownButton.setAttribute('class', '	fa fa-sort-down')
        }else{
            dropdownDiv.setAttribute('style', 'display: block')
            iconDropdownButton.setAttribute('class', '	fa fa-sort-up')
        }
    }
}