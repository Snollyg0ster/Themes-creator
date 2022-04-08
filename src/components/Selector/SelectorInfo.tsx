import { Selector } from "../../models";
import { makeStyles } from "../../utils";

interface Props {
  selector: Selector;
}

const SelectorInfo = (props: Props) => {
  const { selector: {selectorType, selector, color} } = props;

  const styles = useStyles();

  return (
    <div style={styles.root}>by {selectorType} - {selector}, color - {color}</div>
  )
}

const useStyles = makeStyles({
  root: {
    padding: '5px',
    borderRadius: 5,
    border: '1px solid #aaaaaaff',
    marginBottom: 7,
  }
})

export default SelectorInfo;