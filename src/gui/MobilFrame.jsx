
import GothicWindow from './GothicWindow.jsx';

export const MobilFrame = ({children}) => (
  <GothicWindow style={{filter:'brightness(.7)'}}>
    <section className="mobil-font-setup">
      {children}
    </section>
  </GothicWindow>
);