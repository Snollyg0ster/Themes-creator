import { useState } from 'react';

import { makeStyles, useStorageSync } from '../../../../utils';
import aim from '../../../../assets/img/aim.png';

const pickElement = (_: any, isPicking: boolean = true) => {};

const Aim = () => {
  const [aimIndicator, setAimIndicator] = useState<boolean>();

  const onSync = (value: boolean | undefined) => setAimIndicator(value);

  useStorageSync('aimIndicator', aimIndicator, setAimIndicator, {
    onSync,
    defaultValue: false,
  });

  const isDisabled = aimIndicator === undefined;

  const styles = useStyles();

  return (
    <button onClick={pickElement} disabled={isDisabled} style={styles.button}>
      <img alt="aim picker" src={aim} style={styles.img} />
    </button>
  );
};

const useStyles = makeStyles({
  button: {
    height: 23,
    flex: 1,
  },
  img: {
    height: 15,
    width: 15,
  },
});

export default Aim;
