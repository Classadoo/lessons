// must be run from root

module.exports = {
  entry: {
    Lesson_1: './lessons/Lesson_1',
    websites: "./lessons/websites"
  },
  output: {
     filename: '[name].js' // Template based on keys in entry above
  },  
  resolve: {
    // you can now require('file') instead of require('file.coffee')
    extensions: ['', '.js', '.json', '.coffee']    
  }
};