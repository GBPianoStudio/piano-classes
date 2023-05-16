import React, { useEffect } from 'react';
import '../index.css';

const Play = () => {

  const addClass = (e) => {
    const audio = document.querySelector(`audio[data-key='${e.keyCode}']`);
    const key = document.querySelector(`.key[data-key='${e.keyCode}']`);
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
    key.classList.add("playing");
  }

  const removeClass = (e) => {
    if (e.propertyName !== "transform") return;
    e.target.classList.remove("playing");
  }

  useEffect(() => {
    const keys = document.querySelectorAll(".key");
    keys.forEach(key => key.addEventListener("transitionend", removeClass));
    window.addEventListener("keydown", addClass);

    return () => {
      keys.forEach(key => key.removeEventListener("transitionend", removeClass));
      window.removeEventListener("keydown", addClass);
    }
  }, []);

  const clickPlay = (e) => {
    var dataKey = e.target.getAttribute("data-key");
    const audio2 = document.querySelector(`audio[data-key="${dataKey}"]`);
    audio2.currentTime = 0;
    audio2.play();

    e.target.classList.add("playing");
  }

  return (
    <div id="play">
      <div id="piano-container">
        <li>                
          <button className="key white" data-key="65" onClick={clickPlay}>            
          </button>
          <button className="key black" data-key="87" onClick={clickPlay}>
          </button>    
        </li> 
        <li>                
          <button className="key white" data-key="83" onClick={clickPlay}>                         
          </button>
          <button className="key black" data-key="69" onClick={clickPlay}>
          </button>   
        </li> 
        <li>                
          <button className="key white" data-key="68" onClick={clickPlay}>                            
          </button>
        </li> 
        <li>                
          <button className="key white" data-key="70" onClick={clickPlay}>                      
          </button>
          <button className="key black" data-key="84" onClick={clickPlay}>
          </button>      
        </li> 
        <li>                
          <button className="key white" data-key="71" onClick={clickPlay}>                            
          </button>
          <button className="key black" data-key="89" onClick={clickPlay}>
          </button>
        </li> 
        <li>                
          <button className="key white" data-key="72" onClick={clickPlay}>                        
          </button>
          <button className="key black" data-key="85" onClick={clickPlay}>
          </button>    
        </li> 
        <li>                
          <button className="key white" data-key="74" onClick={clickPlay}>                          
          </button>
        </li>                     
      </div>

  <audio data-key="65" src="https://raw.githubusercontent.com/pffy/wav-piano-sound/master/wav/c1.wav"></audio>
  <audio data-key="87" src="https://raw.githubusercontent.com/pffy/wav-piano-sound/master/wav/c1s.wav"></audio>
  <audio data-key="83" src="https://raw.githubusercontent.com/pffy/wav-piano-sound/master/wav/d1.wav"></audio>
  <audio data-key="69" src="https://raw.githubusercontent.com/pffy/wav-piano-sound/master/wav/d1s.wav"></audio>
  <audio data-key="68" src="https://raw.githubusercontent.com/pffy/wav-piano-sound/master/wav/e1.wav"></audio>
  <audio data-key="70" src="https://raw.githubusercontent.com/pffy/wav-piano-sound/master/wav/f1.wav"></audio>
  <audio data-key="84" src="https://raw.githubusercontent.com/pffy/wav-piano-sound/master/wav/f1s.wav"></audio>
  <audio data-key="71" src="https://raw.githubusercontent.com/pffy/wav-piano-sound/master/wav/g1.wav"></audio>
  <audio data-key="89" src="https://raw.githubusercontent.com/pffy/wav-piano-sound/master/wav/g1s.wav"></audio>
  <audio data-key="72" src="https://raw.githubusercontent.com/pffy/wav-piano-sound/master/wav/a1.wav"></audio>
  <audio data-key="85" src="https://raw.githubusercontent.com/pffy/wav-piano-sound/master/wav/a1s.wav"></audio>
  <audio data-key="74" src="https://raw.githubusercontent.com/pffy/wav-piano-sound/master/wav/b1.wav"></audio>
  </div>
)};
export default Play;