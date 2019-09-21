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
  for(let no in df.sentence){                              // loop by sentense
    let tokens = df.pos_tag[no].map((arr, i) => {          // build tokens
      let type = (df[MOD_COLUMN] || df.pos_tag)[no][i][1]; // find type from done, pos_tag in order
      return {
        text: arr[0],
        type: type,
        default_type: arr[1],
      };
    });
    data.push(tokens);
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

  // bind main-type combobox
  $('.type .main').change((evt) => {
    // gather dom
    let $main = $(evt.target);
    let $sub = $main.next('select');
    let $item = $main.parents('.token');

    // extract val
    let main_type = $main.val();
    let sub_list = TYPE_HASH[main_type] || [];

    // update sub-list
    $sub.html('');
    sub_list.forEach((s) => {
      $sub.append(`<option value='${s}'>${s}</option>`);
    });

    // set bgcolor
    set_color($item, main_type);
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
  });
}
