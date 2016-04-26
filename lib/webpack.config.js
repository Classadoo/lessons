// must be run from root

module.exports = {
  entry: {    
    websites: "./lessons/websites",
    websites_2: "./lessons/websites_2",
    websites_3: "./lessons/websites_3",
    fh_3: "./lessons/fh_3"
  },
  output: {
     filename: '[name].js' // Template based on keys in entry above
  },  
  resolve: {
    // you can now require('file') instead of require('file.coffee')
    extensions: ['', '.js', '.json', '.coffee']    
  }
};