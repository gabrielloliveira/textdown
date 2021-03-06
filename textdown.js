document.addEventListener("DOMContentLoaded", function(event) {
  const content_editor_element = document.querySelector('[contenteditable]')
  const options_buttons = document.getElementsByClassName('text-option-button')
  let result_markdown_element = document.getElementById('md-result')
  
  content_editor_element.addEventListener('focus', function(){
    if(content_editor_element.hasAttribute("first-time")){
      content_editor_element.removeAttribute('first-time')
      content_editor_element.textContent = ''
    }
    activateCommands()
  })
  
  for(let i = 0; i < options_buttons.length; i++){
    options_buttons[i].addEventListener('click', function(){
      if(!(options_buttons[i].getAttribute('exec-command') === 'blockquote'))
        options_buttons[i].classList.toggle('is-link')
      
      if(options_buttons[i].classList.contains('is-link')){
        content_editor_element.focus()
        if(!(options_buttons[i].getAttribute('exec-command') === 'h2'))
          document.execCommand(options_buttons[i].getAttribute('exec-command'), false, '')
        else
          document.execCommand('formatblock', false, 'h2')
      }else{
        document.execCommand('removeFormat', false, '')        
      }
    })
  }  
  
  content_editor_element.addEventListener('input', function(){
    if (content_editor_element.textContent == '')
      activateCommands()

    let md = htmlToMD(content_editor_element.innerHTML)
    result_markdown_element.innerHTML = md
  })
})

function activateCommands(){
  const options_buttons_active = document.getElementsByClassName('text-option-button is-link')
  for(let i = 0; i < options_buttons_active.length; i++){
    if(options_buttons_active[i].getAttribute('exec-command') === 'blockquote')
      document.execCommand('formatblock', false, 'blockquote')
    else
      document.execCommand(options_buttons_active[i].getAttribute('exec-command'), false, '')
  }
}

function isFirstTime(){
  if(document.querySelector('[contenteditable]').hasAttribute("first-time"))
    return 1
  return 0
}

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
      case 'b':
        parser[index] = '**'
        break
      case '/b':
        parser[index] = '**'
        break
      case 'i':
        parser[index] = '*'
        break
      case '/i':
        parser[index] = '*'
        break
      case 'strike':
        parser[index] = '~~'
        break
      case '/strike':
        parser[index] = '~~'
        break
      case 'ul':
        parser[index] = ''
        break
      case '/ul':
        parser[index] = ''
        break
      case 'li':
        parser[index] = '- '
        break
      case '/li':
        parser[index] = '<br>'
        break
      case 'blockquote':
        parser[index] = '> '
        break
      case '/blockquote':
        parser[index] = '<br>'
        break
      case 'h2':
        parser[index] = '## '
        break
      case '/h2':
        parser[index] = '<br>'
        break
      }
  })
  return parser.join('')
}