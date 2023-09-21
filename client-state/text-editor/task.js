document.addEventListener('DOMContentLoaded', () => {
    const editor = document.getElementById('editor');
    const savedText = localStorage.getItem('editorText');
    if (savedText) {
      editor.value = savedText;
    }
  
    editor.addEventListener('input', () => {
      const text = editor.value;
      localStorage.setItem('editorText', text);
    });
  });
  