import { Selector } from '../../models';
import { makeStyles } from '../../utils';
import SelectorInfo from '../Selector/SelectorInfo';

interface Props {
  selectors: Selector[];
  deleteSelector: (selector: Selector) => void;
  setEditedSelector: (selector: Selector | undefined) => void;
}

const SelectorList = (props: Props) => {
  const { selectors, deleteSelector, setEditedSelector } = props;

  const styles = useStyles();

  return (
    <>
      {selectors.length ? (
        <div style={styles.root} id="selectorList">
          <title style={styles.title}>Selectors</title>
          {selectors.map((selector) => (
            <SelectorInfo
              selector={selector}
              key={selector.selector + selector.selectorType}
              deleteSelector={deleteSelector}
              setEditedSelector={setEditedSelector}
            />
          ))}
          <h5 id="editNote" style={styles.editNote}>
            double click to edit
          </h5>
        </div>
      ) : null}
    </>
  );
};

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: '10px 7px 0 7px',
    borderRadius: 7,
    border: '1px solid #aaaaaaff',
    position: 'relative',
    margin: '5px 0 20px 0',
  },
  title: {
    position: 'absolute',
    top: -8,
    color: 'black',
    display: 'inline',
    backgroundColor: 'white',
    padding: '0 3px',
  },
  editNote: {
    color: 'gray',
    marginBlock: 0,
    marginLeft: 4,
    marginTop: -7,
    opacity: 0,
    fontWeight: 400,
    fontSize: 9.5,
    transition: 'opacity 1s',
  },
});

export default SelectorList;
