function render_from_df(df){
  window.DF = df;
  window.DATA = to_simple_format(df);
  render(DATA);
}

// bind load json button
let JSON_FILENAME = null;
$('#file_json').change((evt) => {
  let files = evt.target.files;
  if(files.length == 1){
    let fileReader = new FileReader();
    fileReader.onload = function(ev){
      let result = ev.target.result;
      eval('var df = ' + result + ';');
      render_from_df(df);
    };
    fileReader.readAsText(files[0], "UTF-8");

    // update loaded filename
    JSON_FILENAME = files[0].name;
  }
});
