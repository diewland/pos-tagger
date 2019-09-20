// ##### AUTO-GEN CONFIG ##### 
let TYPE_HASH = {};
let TYPE_COLOR = {};
let MAIN_TYPE_CMB = '';
TYPE_LIST.forEach((t) => {
  TYPE_HASH[t.name] = t.sub;
  TYPE_COLOR[t.name] = t.color;
  MAIN_TYPE_CMB += `<option value='${t.name}'>${t.name}</option>`;
});

// ##### FORMAT ##### 

function to_simple_format(df){
  let data = [];
  for(let i in df.sentence){
    data.push({
      sentence: df.sentence[i],
      token:    df.token[i],
      pos_tag:  df.pos_tag[i],
    });
  }
  return data;
}

// ##### TOOL ##### 

function find_type(sub_type){
  for(let i=0; i<TYPE_LIST.length; i++){
    let cur = TYPE_LIST[i];
    if(cur.sub.includes(sub_type)){
      return [ cur.name, cur.sub ];
    }
  }
  return null;
}

// ##### RENDER #####

function set_color($item, main_type){
  let color = TYPE_COLOR[main_type] || '#AAA';
  $item.css('background-color', color);
  $item.find('.type').css('background-color', color);
}

function render_row(i, row){
  let row_html = '';
  row.pos_tag.forEach((token, j) => {
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
  row.pos_tag.forEach((token, j) => {
    // get current item
    $item = $(`div#item_${i}_${j}`);
    // update text
    $item.find('.text').html(token[0]);
    // update type
    let sub_type = token[1];
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
    }
  });
}

function render(rows){
  // reset screen
  $('.output').html('');

  // render template
  rows.forEach((row, i) => {
    let html = render_row(i, row);
    $('.output').append(`
      ${html}
      <div class='clearfix'></div>
    `);
  });

  // update data
  rows.forEach((row, i) => {
    update_row(i, row);
  });

  // bind main type cmb
  $('.type .main').change((evt) => {
    let $main = $(evt.target);
    let main_type = $main.val();
    let $sub = $main.next('select');
    let sub_list = TYPE_HASH[main_type] || [];
    $sub.html('');
    sub_list.forEach((s) => {
      $sub.append(`<option value='${s}'>${s}</option>`);
    });
    set_color($main.parents('.token'), main_type);
  });
}
