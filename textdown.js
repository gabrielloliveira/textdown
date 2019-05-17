document.addEventListener("DOMContentLoaded", function(event) {
  const content_editor_element = document.querySelector('[contenteditable]');
  let result_markdown_element = document.getElementById('md-result')
  content_editor_element.addEventListener('input', function(){
    result_markdown_element.textContent = content_editor_element.innerHTML
  })
})