import { Selector } from '../../models';
import { makeStyles } from '../../utils';

interface Props {
  selector: Selector;
}

const SelectorInfo = (props: Props) => {
  const {
    selector: { selectorType, selector, color },
  } = props;

  const styles = useStyles();

  return (
    <div style={styles.root}>
      by {selectorType} - {selector}, color - {color}
      <div style={{ ...styles.color, backgroundColor: color }} />
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
});

export default SelectorInfo;
