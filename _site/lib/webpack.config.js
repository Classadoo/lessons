// must be run from root

module.exports = {
  entry: {
    Lesson_1: './lessons/Lesson_1',
    this_is_the_internet: "./lessons/this_is_the_internet"
  },
  output: {
     filename: '[name].js' // Template based on keys in entry above
  },  
  resolve: {
    // you can now require('file') instead of require('file.coffee')
    extensions: ['', '.js', '.json', '.coffee']    
  }
};