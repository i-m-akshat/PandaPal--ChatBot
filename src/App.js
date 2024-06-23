import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import chatbotLogo from '../src/img/chatbotlogo.png';
import chatbotLogoModified from '../src/img/chatbotlogoresizepng.png';
import './FontAwesome/css/all.min.css';
import axios from 'axios';

function App() {
  const [count, setCount] = useState(0);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [askedQuestion,setAskedQuestion]=useState("");
  const containerStyle = { height: "100vh" };
  const cardStyle = { borderStyle: 'none', height: "80vh", display: 'flex', flexDirection: 'column', position: 'relative' };
  const cardBodyStyle = { flex: 1, overflowY: 'auto', paddingBottom: '4rem' }; // Added paddingBottom for spacing
  const inputAreaStyle = { position: 'absolute', bottom: '0', left: '50%', transform: 'translateX(-50%)', width: '100%' };
  const imgStyle = { height: "200px", width: "200px" };
  const preStyle = { borderStyle: 'none', backgroundColor: 'white', whiteSpace: 'pre-wrap', wordWrap: 'break-word' }; // Ensured text wrapping
  const generateAnswers = async () => {
    if(!question){
      alert('Please ask any question');
    }else{
      setAskedQuestion(question);
      setAnswer("Loading.......")
      const res = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.REACT_APP_API_KEY}`,
        method: "POST",
        data: {
          contents: [{
            parts: [{
              text: `${question}`
            }]
          }
  
          ]
        }
      });
      if (res) {
        setAnswer(res.data.candidates[0].content.parts[0].text)
        setQuestion("");
      }
    }
    
    // console.log(res.data.candidates[0].content.parts[0].text);
  }
  const handleInputChange = (e) => {
    setQuestion(e.target.value);
    console.log(e.target.value);
  }
  return (
    <div className="container-fluid" style={containerStyle}>
    <div className='row justify-content-center align-items-center d-flex'>
      <div className='col-md-12'>
        <div className='row justify-content-center align-items-center d-flex'>
          <div className='col-md-6'>
            <img src={chatbotLogo} className='d-flex' style={{ height: "100px", width: "100px" }} alt="Chatbot logo"/>
          </div>
          <div className='col-md-6'>
            <h5 className='text-center float-end'>ChatBot</h5>
          </div>
        </div>
        <div className='card px-3' style={cardStyle}>
          <div className='card-body' style={cardBodyStyle}>
            <div className='col-md-12'>
              <div className='row justify-content-center align-items-center'>
                {answer ? (
                  <div className='row align-items-center justify-content-center'>
                    <img src={chatbotLogoModified} style={imgStyle} alt="Chatbot modified logo"/>
                    <p className='text-start text-bold text-black-50'><b>Q.</b>&nbsp;{askedQuestion}</p>
                    <pre type='text' className='form-control form-control-sm' style={preStyle}><b>Ans.</b>&nbsp;{answer}</pre>
                  </div>
                ) : (
                  <img src={chatbotLogo} className='img-fluid d-flex' style={{ height: "300px", width: "300px" }} alt="Chatbot placeholder"/>
                )}
              </div>
            </div>
          </div>
          <div className='col-md-12' style={inputAreaStyle}>
            <div className='row justify-content-center align-items-center'>
              <div className='col-md-10'>
                <div className='row justify-content-center align-items-center'>
                  <div className='col-md-9'>
                    <textarea type='text' className='form-control form-control-sm' onChange={handleInputChange} value={question} placeholder='Please ask me any questions'></textarea>
                  </div>
                  <div className='col-md-2'>
                    <center><a className='btn btn-outline-dark' type='button' onClick={generateAnswers}><i class="fa-regular fa-paper-plane"></i></a></center>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default App;
