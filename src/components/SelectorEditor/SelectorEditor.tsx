import { ChangeEvent, useMemo, useState } from "react";
import { Selector } from "../../models";
import { makeStyles } from '../../utils';

const selectorTypes: string[] = ['id', 'class' ]

interface Props {
  addSelector: (selector: Selector) => void
}

const SelectorEditor = (props: Props) => {
  const { addSelector } = props;
  const [selectorType, setSelectorType] = useState<string>('default');
  const [selector, setSelector] = useState('');
  const [color, setColor] = useState('');

  const isSelectorType = useMemo(() => selectorType !== 'default', [selectorType])

  const isDisabled = useMemo(() => !selector || !color || !isSelectorType, [selector, color, isSelectorType])

  const handleSelectorType = (event: ChangeEvent<HTMLSelectElement>) => setSelectorType(event.target.value)

  const handleSelector = (event: ChangeEvent<HTMLInputElement>) => setSelector(event.target.value)

  const handleColor = (event: ChangeEvent<HTMLInputElement>) => setColor(event.target.value)

  const handleNewSelector = () => addSelector({color, selector, selectorType})

  const styles = useStyles();

  return (
    <div style={styles.root}>
      <title style={styles.title}>Add selector</title>
      <select value={selectorType} onChange={handleSelectorType} style={{...styles.select, color: isSelectorType ? 'black' : 'gray'}}>
        {selectorTypes.map(selector => <option value={selector}>{selector}</option>)}
        <option value={'default'} disabled hidden>select by</option>
      </select>
      <div style={styles.editCont}>
        <input value={selector} onChange={handleSelector} placeholder="selector" style={styles.selectorInput}/>
        <input value={color} onChange={handleColor} placeholder="color" style={styles.colorInput}/>
        <button style={styles.button} disabled={isDisabled} onClick={handleNewSelector}>+</button>
      </div>
    </div>
  )
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
    position: 'relative'
  },
  title: {
    position: 'absolute',
    top: -10,
    color: 'black',
    display: 'inline',
    backgroundColor: 'white',
    padding: '0 3px'
  },
  select: {
    marginBottom: 10,
  },
  editCont: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  selectorInput: {
    marginRight: 5,
    width: 90,
  },
  colorInput: {
    marginRight: 5,
    width: 50,
  },
  button: {
    width: 50,
  },
});

export default SelectorEditor;