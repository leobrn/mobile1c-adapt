'use strict'
let footerMenuJSON = `
[{"id":"home","href":"/","icon":"home","active":true},{"id":"bag","href":"/","icon":"bag","active":false},{"id":"cart","href":"/","icon":"cart","active":false},{"id":"user","href":"/","icon":"user","active":false}]`

const itemsMenu = JSON.parse(footerMenuJSON)

let PATH = '',
  textHTML = ''

const getTitle = () => {
  return `<div class="title">${PATH}</div>`
}

const getMenuFooter = () => {
  const items = itemsMenu.map(item => {
    let classFocus = item.active ? 'footer__item--focus' : ''
    PATH = item.active ? item.id : PATH
    return `
        <a href="${item.href}" class="footer__item ${classFocus}" onclick="updatePage('${item.id}')">
            <img class="footer__icon" src="img/${item.icon}.png" id="${item.id}">
        </a>`
  })
  return items.join('')
}

const updateItemsMenu = id => {
  const activeItem = itemsMenu.find(item => item.active === true),
    currentItem = itemsMenu.find(item => item.id === id)

  if (activeItem && currentItem) {
    activeItem.active = false
    currentItem.active = true
  }
}

const updateTitle = () => {
  const title = document.querySelector('.title')
  if (!title) {
    return
  }
  title.innerHTML = getTitle()
}

const updatePage = id => {
  event.preventDefault()
  const footerInner = document.querySelector('.footer__inner')

  updateItemsMenu(id)
  footerInner.innerHTML = getMenuFooter()
  updateTitle()
}

const generateMain = () => {
  textHTML = `
  <main class="main">
    <div class="container">
        ${getTitle()}
    </div>
    </main>`
  document.body.insertAdjacentHTML('afterbegin', textHTML)
}

const generateFooter = () => {
  textHTML = `
    <footer class="footer">
        <div class="container">
            <div class="footer__inner">
                ${getMenuFooter()}
            </div>
        </div>
    </footer>`
  document.body.insertAdjacentHTML('beforeend', textHTML)
  updateTitle()
}

generateMain()
generateFooter()
