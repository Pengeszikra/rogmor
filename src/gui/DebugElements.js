import styler from './scss/styler';
import asset from './scss/asset';

const [Wireframe, Hero, Valami] = styler('wireframe', 'hero', 'valami');

const heroStyle = face => ({
  backgroundImage : `url(${asset}faces/face${("0000" + face).slice(-4)}.png)`
});

const Fazon = ({face}) => (
  <Hero style={heroStyle(face)}>
    <span>fazon</span>
  </Hero>
);

export default props => (
  <Wireframe>
    <h1>RPG again</h1>    
    <Valami>
      {Array.from({length:15}, (_, face) => <Fazon face={face} key={face} />)}
    </Valami>
    <img src={asset + 'img/border.png'} />
    <img src={asset + 'img/buttonb.png'} />
    <img src={asset + 'img/buttonb2.png'} />
    <img src={asset + 'img/buttonb3.png'} />
    <img src={asset + 'img/infow.png'} />
    <img src={asset + 'img/loginw.png'} />
    <img src={asset + 'img/norebo.jpg'} />
    <img src={asset + 'img/registerw.png'} />
    <img src={asset + 'img/rogmor_198x63.png'} />
    <img src={asset + 'img/shortButton.png'} />
    <img src={asset + 'img/splashTop.png'} />
    <img src={asset + 'img/storyw.png'} />
    <img src={asset + 'img/terep001.png'} />
    <img src={asset + 'img/transPanel.png'} />
    <img src={asset + 'img/transPanelDark.png'} />
    <img src={asset + 'img/xButton.png'} />
    <pre>
    {`
    `}
    </pre>
  </Wireframe>
);