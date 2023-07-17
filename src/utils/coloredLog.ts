type Color = 'yellow' | 'red' | 'green' | 'teal' | 'white';

const coloredLog = (str: string, color?: Color) => {
  let colorCode = '\x1b[33;1m';

  if (color === 'yellow') {
    colorCode = '\x1b[33m';
  } else if (color === 'red') {
    colorCode = '\x1b[31;1m';
  } else if (color === 'green') {
    colorCode = '\x1b[32m';
  } else if (color === 'teal') {
    colorCode = '\x1b[36m';
  } else if (color === 'white') {
    colorCode = '\x1b[37m';
  }
  console.log(`${colorCode}${str}\x1b[0m`);
};

export default coloredLog;
