$('#btn_save_as').click(() => {
  let fname = JSON_FILENAME || 'output.json';
  let df_data = JSON.stringify(get_df_data());
  let blob = new Blob([ df_data ], {type: "application/json"});
  let saveAs = window.saveAs;
  saveAs(blob, fname);
});
