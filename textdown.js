document.addEventListener("DOMContentLoaded", function(event) {
  const content_editor_element = document.querySelector('[contenteditable]');
  let result_markdown_element = document.getElementById('md-result')
  content_editor_element.addEventListener('input', function(){
    let md = htmlToMD(content_editor_element.innerHTML)
    result_markdown_element.innerHTML = md
  })
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