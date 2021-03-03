import profession, { profTypes } from "../rpg/profession";
import { useEntitiReducer } from "../rpg/useEntitiReduce";

import { shallow, configure } from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });

const reactSnapshot = component => expect(shallow(component)).toMatchSnapshot();

test ('create fighter', () => {  
  expect (
    profTypes.fighter
  ).toStrictEqual(
    { profession:'Fighter',      physique: 7, reaction: 4, soul: 2, liaison: 4, stamina: 55, willpower: 45, merry: 40 }
  );
});


test ('create lvl 1 fighter', () => {
  expect (
    profession(1, profTypes.fighter, _ => 42)
  ).toStrictEqual(
    {
        level: 1,
        liaison: 2,
        merry: 6,
        merryState: 6,
        physique: 3,
        profession: "Fighter",
        reaction: 2,
        soul: 2,
        stamina: 8,
        staminaState: 8,
        type: {
          liaison: 4,
          merry: 40,
          physique: 7,
          profession: "Fighter",
          reaction: 4,
          soul: 2,
          stamina: 55,
          willpower: 45,
        },
        uid: 42,
        willpower: 7,
        willpowerState: 7,
      }
  );
});

test ('useEntitiReduce', () => {
  const Unit = () => {
    const [unit, actions] = useEntitiReducer()
    return <pre>{JSON.stringify(unit, null, 2)}</pre>
  }
  
  expect(shallow(<Unit />)).toMatchSnapshot();
});

test ('reactSnapshot test with pipeline operator', () => {
  const Unit = () => {
    const [unit, actions] = useEntitiReducer()
    return <pre>{JSON.stringify(unit, null, 2)}</pre>
  }
  
  <Unit /> |> reactSnapshot;
});

test ('useEntitiReducer simple', () => {
  const Unit = () => {
    const [unit, actions] = useEntitiReducer()
    return <pre>stamina: {unit.stamina}</pre>
  }
  
  expect(shallow(<Unit />)).toMatchSnapshot();
});