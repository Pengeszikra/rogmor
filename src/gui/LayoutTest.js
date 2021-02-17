import styler from './scss/styler';
import asset from './scss/asset';
import Leveling from './Leveling';
import Battle from './Battle';
import Adventure from './Adventure';

const [ModalWindow, Page, FaceSprite, FaceGallery, ItemSprite] = styler
      ('modal-window', 'page', 'face-sprite', 'face-gallery', 'item-sprite');

const [LoginWindow, FaceWindow, ChatWindow, DarkPanel, InfoPanel, RogmorLogo] = styler
      ('gui gui-loginw', 'gui gui-storyw', 'gui gui-chatWindow', 'gui gui-transPanelDark', 'gui gui-infow', 'gui gui-rogmor_198x63');


export default props => (
  <Page>  
    <img src={asset + 'img/splashTop.png'} />

    <Adventure />

    <div style={{position:'relative', height:800, width:900, margin:'0 auto'}}>
      <img src={asset + 'img/norebo.jpg'} style={{position:'absolute', top:80, left:65, zIndex:0}}/>
      <img src={asset + 'img/border.png'} style={{position:'absolute', top:0, left:0, zIndex:30, pointerEvents:'none'}}/>
      <FaceSprite data-face={13} style={{position:'absolute', top:118, left:105, zIndex:11}} />
      <FaceSprite data-face={35} style={{position:'absolute', top:118 + 40, left:105 + 40, zIndex:11}} />
      <RogmorLogo style={{position:'absolute', top:23, left:185, zIndex:50}}/>
    </div>
    
    <Leveling changeRoute={_=>{}} style={{zIndex:200}}/>  

    <Battle changeRoute={_=>{}} />

    <h1>the Roll Play Game sketch</h1>
    <p>Good question is why I would like to create this type of game?</p>
    <LoginWindow />
    <FaceWindow />
    <ChatWindow />
    <DarkPanel />
    <InfoPanel />
    <ModalWindow>
      <h1>Hero faces ::</h1>
      <FaceGallery>
        {Array.from({length: 100}, (_, face) => <FaceSprite key={face} data-face={face} />)}
      </FaceGallery>
      <h1>Item sets ::</h1>
      <FaceGallery>
        {Array.from({length: 45}, (_, item) => <ItemSprite key={item} data-item={item} />)}
      </FaceGallery>
    </ModalWindow>
    
  </Page>
);