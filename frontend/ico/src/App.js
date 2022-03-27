
import styled from 'styled-components';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">

      <Background className='Background' />
      {/* Header */}
      <Header />
      {/* Main */}


      <Main accountAddress="" currentPhaseNumber="2" unitCost="1" unit="3000" current="2500000" target="12500000" sale="1,233,943.453689" totalSale="3,733,943.453689" max="5" />
      {/* Footer */}
      <Footer />

    </div >
  );
}

export default App;

const Background = styled.div`
  display:inline-block;
  position:absolute;
  z-index:-999;
  width:100%;
  height:100%;
  border-radius:50%;
  /* background: transparent radial-gradient(ellipse at top, #202020 40%, #006400 100%, #39FF14 100%); */
  /* background: transparent radial-gradient(closest-side at 50% 50%, #202020 0%, #202020BC 18%, #82DB563C 100%, #83DC563B 100%) 0% 0% no-repeat padding-box; */
  /* background: rgb(255,255,255);

  background: -moz-linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(241,244,254,1) 100%, rgba(0,0,0,1) 100%);
  background: -webkit-linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(241,244,254,1) 100%, rgba(0,0,0,1) 100%);
  background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(241,244,254,1) 100%, rgba(0,0,0,1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ffffff",endColorstr="#000000",GradientType=1); */
/*   
  background: rgb(255,255,255);
background: -moz-linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 59%, rgba(241,244,254,1) 100%);
background: -webkit-linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 59%, rgba(241,244,254,1) 100%);
background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 59%, rgba(241,244,254,1) 100%);
filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ffffff",endColorstr="#f1f4fe",GradientType=1); */

background: rgb(255,255,255);
background: -moz-linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 50%, rgba(241,244,254,1) 100%);
background: -webkit-linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 50%, rgba(241,244,254,1) 100%);
background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 50%, rgba(241,244,254,1) 100%);
filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ffffff",endColorstr="#f1f4fe",GradientType=1);

  transform: translate(0,-100px);

`
