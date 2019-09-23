function set_color($item, main_type){
  let color = TYPE_COLOR[main_type] || '#AAA';
  $item.css('background-color', color);
  $item.find('.type').css('background-color', color);
}

function render_row(i, row){
  let row_html = '';
  row.forEach((token, j) => {
    row_html += `
      <div id='item_${i}_${j}' class='token'>
        <div class='text'></div>
        <div class='type'>
          <select class='main'>${MAIN_TYPE_CMB}</select>
          <select class='sub'></select>
        </div>
      </div>
    `;
  });
  return row_html;
}

function update_row(i, row){
  row.forEach((token, j) => {
    // get current item
    $item = $(`div#item_${i}_${j}`);
    // update text
    $item.find('.text').html(token.text);
    // update type
    let sub_type = token.type;
    let tt = find_type(sub_type);
    if(tt){
      // update main type
      $item.find('.main').val(tt[0]);
      // build sub type combobox
      tt[1].forEach((s) => {
        $item.find('.sub').append(`<option value='${s}'>${s}</option>`);
      })
      // update sub type
      $item.find('.sub').val(sub_type);
      // set type color
      set_color($item, tt[0]);
      // show mod token
      if(token.type != token.default_type){
        $item.addClass('mod');
      }
    }
  });
}

function check_mod(token_data, $item){
  if(token_data.type == token_data.default_type){
    $item.removeClass('mod');
  }
  else {
    $item.addClass('mod');
  }
}

function render(rows){
  // reset screen
  $('.output').html('');

  // render template
  rows.forEach((row, i) => {
    let html = render_row(i, row);
    let no = i+1;
    $('.output').append(`
      <div class='no'><a name='${no}' href='#${no}'>#${no}</a></div>
      <div class='sentense'>${html}</div>
      <div class='clearfix'></div>
    `);
  });

  // update data
  rows.forEach((row, i) => {
    update_row(i, row);
  });

  // bind main-type combobox
  $('.type .main').change((evt) => {
    // gather dom
    let $main = $(evt.target);
    let $sub = $main.next('select');
    let $item = $main.parents('.token');

    // find row, col
    let rc = $item.attr('id').split('_');
    let row = rc[1]*1;
    let col = rc[2]*1;

    // extract val
    let main_type = $main.val();
    let sub_list = TYPE_HASH[main_type] || [];

    // set bgcolor
    set_color($item, main_type);

    // update sub-list
    $sub.html('');
    sub_list.forEach((s) => {
      $sub.append(`<option value='${s}'>${s}</option>`);
    });

    // update sub-type
    DATA[row][col].type = sub_list[0];

    // show-hide mod token
    check_mod(DATA[row][col], $item);
  });

  // bind sub-type combobox
  $('.type .sub').change((evt) => {
    // gather dom
    let $sub = $(evt.target);
    let $item = $sub.parents('.token');

    // find row, col
    let rc = $item.attr('id').split('_');
    let row = rc[1]*1;
    let col = rc[2]*1;

    // update sub-type
    let sub_type = $sub.val();
    DATA[row][col].type = sub_type;

    // show-hide mod token
    check_mod(DATA[row][col], $item);
  });
}
