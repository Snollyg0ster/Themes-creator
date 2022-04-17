import { ChangeEvent, useEffect, useMemo, useState } from 'react';

import { Selector } from '../../models';
import { colorToHex } from '../../pages/ThemeEditor/utils';
import { makeStyles } from '../../utils';
import Aim from './components/Aim';
import done from '../../assets/img/done.png';

const selectorTypes: string[] = ['id', 'class', 'tag'];

interface Props {
  addSelector: (selector: Selector) => void;
  editedSelector: Selector | undefined;
}

const SelectorEditor = (props: Props) => {
  const { addSelector, editedSelector } = props;
  const [selectorType, setSelectorType] = useState<string>('default');
  const [selector, setSelector] = useState('');
  const [color, setColor] = useState('');

  const isSelectorType = useMemo(
    () => selectorType !== 'default',
    [selectorType]
  );

  useEffect(() => {
    if (editedSelector) {
      const { color, selectorType, selector } = editedSelector;
      setSelector(selector);
      setSelectorType(selectorType);
      setColor(color);
    }
  }, [editedSelector]);

  const isDisabled = useMemo(
    () => !selector || !color || !isSelectorType,
    [selector, color, isSelectorType]
  );

  const handleSelectorType = (event: ChangeEvent<HTMLSelectElement>) =>
    setSelectorType(event.target.value);

  const handleSelector = (event: ChangeEvent<HTMLInputElement>) =>
    setSelector(event.target.value);

  const handleColor = (event: ChangeEvent<HTMLInputElement>) =>
    setColor(event.target.value);

  const handleNewSelector = () => {
    addSelector({ color, selector, selectorType });
    setSelectorType('default');
    setSelector('');
    setColor('');
  };

  const styles = useStyles();

  return (
    <div style={styles.root}>
      <title style={styles.title}>Add selector</title>
      <div style={styles.editCont}>
        <select
          value={selectorType}
          onChange={handleSelectorType}
          style={{ ...styles.select, color: isSelectorType ? 'black' : 'gray' }}
        >
          {selectorTypes.map((selector) => (
            <option value={selector}>{selector}</option>
          ))}
          <option value={'default'} disabled hidden>
            select by
          </option>
        </select>
        <Aim />
      </div>
      <div style={styles.editCont}>
        <input
          value={selector}
          onChange={handleSelector}
          placeholder="selector"
          style={styles.selectorInput}
        />
        <input
          value={color}
          onChange={handleColor}
          placeholder="color"
          style={styles.colorInput}
        />
        <input
          value={colorToHex(color)}
          onChange={handleColor}
          placeholder="color"
          style={styles.colorSelector}
          type="color"
        />
        <button
          style={styles.done}
          disabled={isDisabled}
          onClick={handleNewSelector}
        >
          <img alt="add" src={done} style={styles.img} />
        </button>
      </div>
    </div>
  );
};

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    height: 60,
    width: '100%',
    padding: '10px 7px',
    borderRadius: 7,
    border: '1px solid #aaaaaaff',
    position: 'relative',
  },
  title: {
    position: 'absolute',
    top: -10,
    color: 'black',
    display: 'inline',
    backgroundColor: 'white',
    padding: '0 3px',
  },
  select: {
    minWidth: 0,
    marginBottom: 10,
    marginRight: 5,
    height: 23,
    flex: 8,
  },
  editCont: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
  },
  selectorInput: {
    minWidth: 0,
    marginRight: 5,
    flex: 3,
  },
  colorInput: {
    minWidth: 0,
    marginRight: 5,
    flex: 3,
  },
  colorSelector: {
    flex: 1,
    marginRight: 5,
  },
  done: {
    flex: 1,
  },
  img: {
    height: 15,
    width: 15,
  },
});

export default SelectorEditor;
