import styler from './scss/styler';

export const [ModalWindow, Page, FaceSprite, FaceGallery, ItemSprite, BaseOfAdventure] = styler (
  'modal-window',
  'page',
  'face-sprite adventure--hero',
  'face-gallery',
  'item-sprite adventure--item',
  'mobil-page'
);

export const [LoginWindow, FaceWindow, ChatWindow, DarkPanel, InfoPanel, RogmorLogo] = styler(
  'gui gui-loginw',
  'gui gui-storyw',
  'gui gui-chatWindow',
  'gui gui-transPanelDark z300',
  'gui gui-infow',
  'gui gui-rogmor_198x63'
);

export const [NoreboMap] = styler(
  'norebo-map-r-90',
);

export const [Button] = styler(
  'gui button-9-slice',
  'gui gui-buttonb3',
);