document.addEventListener("DOMContentLoaded", function(event) {
  const content_editor_element = document.querySelector('[contenteditable]');
  const options_buttons = document.getElementsByClassName('text-option-button')
  let result_markdown_element = document.getElementById('md-result')
  content_editor_element.addEventListener('click', function(){
    if(content_editor_element.hasAttribute("first-time")){
      content_editor_element.removeAttribute('first-time')
      content_editor_element.textContent = ''
    }
  })
  content_editor_element.addEventListener('input', function(){
    let md = htmlToMD(content_editor_element.innerHTML)
    result_markdown_element.innerHTML = md
  })
  for(let i = 0; i < options_buttons.length; i++){
    options_buttons[i].addEventListener('click', function(){
      options_buttons[i].classList.toggle('is-link')
    })
  }
})

function htmlToMD(text){
  let parser = text.split(/[<>]/);
  text = tagConversion(parser)
  return text
}

function tagConversion(parser){
  parser.forEach(function(element, index, parser){
    switch(element){
      case 'div':
        parser[index] = ''
        break
      case '/div':
        parser[index] = '<br>'
        break
      case 'br':
        parser[index] = "<br>"
        break
      }
  })
  return parser.join('')
}