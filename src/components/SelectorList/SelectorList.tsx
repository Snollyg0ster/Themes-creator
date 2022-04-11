import { Selector } from '../../models';
import { makeStyles } from '../../utils';
import SelectorInfo from '../Selector/SelectorInfo';

interface Props {
  selectors: Selector[];
}

const SelectorList = (props: Props) => {
  const { selectors } = props;

  const styles = useStyles();

  return (
    <>
      {selectors.length ? (
        <div style={styles.root}>
          <title style={styles.title}>Selectors</title>
          {selectors.map((selector) => (
            <SelectorInfo selector={selector} />
          ))}
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
});

export default SelectorList;
