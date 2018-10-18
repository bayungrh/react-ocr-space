import React, { Component } from 'react';
import axios from 'axios';
import SimpleAppBar from './components/navbar';
import Paper from './components/paper';

class App extends Component {
   state = {
      selectedFile: null,
      api_key: '43a1c6d81f88957',
      imageURL: null,
      textfield:null
   }

   fileChangedHandler = (event) => {
     this.setState({selectedFile: event.target.files[0]})
   }
   componentWillMount () {
      // axios.create({baseURL:'http://slim.bayyu.net/files/upload'});
   }
   imgocr = () => {
      var self = this;
      console.log(self.state.imageURL);
      axios.get(`https://api.ocr.space/parse/imageurl?apikey=${self.state.api_key}&url=${self.state.imageURL}`).then(function(response) {
         let res = response.data;
         console.log(res.ParsedResults[0].ParsedText);
         self.setState({text: res.ParsedResults[0].ParsedText});
      }).catch(function (error) {
         console.log(error);
      });
   }
   uploadHandler = () => {
      var self = this;
      var formData = new FormData()
      formData.append('myFile', this.state.selectedFile)
     // let baseurl = ;
     axios({
       method: 'post',
       url: 'https://slim.bayyu.net/files/upload',
       data: formData,
       config: {
          headers: {'Content-Type': 'multipart/form-data' },
          onUploadProgress: (progressEvent) => {
            console.log(progressEvent.loaded / progressEvent.total)
          }
       }
     }).then(function (response) {
        //handle success
        let res = response.data;
        console.log(res);
        self.setState({imageURL: res.url});
        if(res.success) {
           self.imgocr();
        } else {
           console.log(res.message);
        }

     }).catch(function (response) {
        //handle error
        // console.log(response);
     });
   }
  render() {
    return (
      <div className="App">
        <SimpleAppBar />
        <Paper
           onChange={this.fileChangedHandler}
           btnClick={this.uploadHandler}
           textfield={this.state.text}
           imageURL={this.state.imageURL}
           btnLabel="Upload &amp; OCR"
        />
      </div>
    );
  }
}

export default App;
