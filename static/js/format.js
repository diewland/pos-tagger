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

function to_df_format(data){
  // prepare df output
  let pos_tag_data = {};
  let sentence_data = {};
  let token_data = {};
  let mod_data = {};

  data.forEach((tokens, i) => {
    // prepare field
    pos_tag_data[i] = [];
    sentence_data[i] = '';
    token_data[i] = [];
    mod_data[i] = [];

    // gather data
    tokens.forEach((token) => {
      pos_tag_data[i].push([token.text, token.default_type]);
      sentence_data[i] += token.text;
      token_data[i].push(token.text);
      mod_data[i].push([token.text, token.type]);
    });
  });

  // pack together
  let df_data = {
    pos_tag: pos_tag_data,
    sentence: sentence_data,
    token: token_data,
  };
  df_data[MOD_COLUMN] = mod_data;
  return df_data;
}

function get_df_data(){
  return to_df_format(DATA);
}
