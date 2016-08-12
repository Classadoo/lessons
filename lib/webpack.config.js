// must be run from root

module.exports = {
  entry: {    
    websites: "./lessons/websites",
    websites_2: "./lessons/websites_2",
    websites_3: "./lessons/websites_3",
    websites_4: "./lessons/websites_4",
    websites_5: "./lessons/websites_5",
    fh_3: "./lessons/fh_3",
    fh_4: "./lessons/fh_4",
    fh_5: "./lessons/fh_5",
    ces_1: "./lessons/ces_1",
    pilot_1: "./lessons/pilot_1",
  },
  output: {
     filename: '[name].js' // Template based on keys in entry above
  },  
  resolve: {
    // you can now require('file') instead of require('file.coffee')
    extensions: ['', '.js', '.json', '.coffee']    
  }
};