import { Selector } from '../../models';
import { makeStyles } from '../../utils';
import trash from '../../assets/img/trash.png';
import { MouseEvent } from 'react';

interface Props {
  selector: Selector;
  deleteSelector: (selector: Selector) => void;
  setEditedSelector: (selector: Selector | undefined) => void;
}

const SelectorInfo = (props: Props) => {
  const {
    selector: { selectorType, selector, color },
    deleteSelector,
    setEditedSelector,
  } = props;

  const styles = useStyles();

  const del = () => deleteSelector({ selectorType, selector, color });

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.detail !== 2) return;
    setEditedSelector({ selectorType, selector, color });
  };

  const isRandom = color.includes('random');

  return (
    <div style={styles.root} id="selectorInfo" onClick={handleClick}>
      <div style={styles.text}>
        <div>
          by <code>{selectorType}</code> - <code>{selector}</code>
        </div>
        <div>
          color -{' '}
          {isRandom ? (
            <>
              <code className="rainbow">random</code>
              <div style={{ width: 5, display: 'inline-block' }} />
              <code>{color.slice(7)}</code>
            </>
          ) : (
            <code>{color}</code>
          )}
        </div>
      </div>
      <div style={{ ...styles.color, backgroundColor: color }} />
      <button onClick={del} style={styles.trash} id="selectorInfo_trash">
        <img alt="trash" src={trash} style={styles.trashIcon} />
      </button>
    </div>
  );
};

const useStyles = makeStyles({
  root: {
    padding: '5px',
    borderRadius: 5,
    border: '1px solid #aaaaaaff',
    marginBottom: 7,
    position: 'relative',
  },
  text: {
    width: 'calc(100% - 20px)',
    wordWrap: 'break-word',
  },
  color: {
    width: 4,
    height: '100%',
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: -1,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
  },
  trash: {
    opacity: 0,
    background: 'transparent',
    borderWidth: 0,
    position: 'absolute',
    right: 3,
    top: 3,
    padding: 3,
    margin: '0 3px 0 3px',
    transition: 'opacity 0.4s',
    borderRadius: 2,
  },
  trashIcon: {
    height: 12,
    width: 12,
  },
});

export default SelectorInfo;
