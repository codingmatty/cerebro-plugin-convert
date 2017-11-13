import icon from './icon.png';


export const fn = ({ term, display }) => {
  const args = term.split(/\s+/);

  if (!'convert'.startsWith(args[0])) {
    return;
  }

  if (args.length === 1) {
    display({
      title: 'To Convert, You Must Enter one or more valid numbers',
      subtitle: 'For non-decimal numbers, please provide a proper prefix.'
    });
    return;
  }

  const displays = [
    generateDisplayItem('Decimal', args.slice(1).map(valueToString(10)).join(' ')),
    generateDisplayItem('Hexidecimal', args.slice(1).map(valueToString(16)).join(' ')),
    generateDisplayItem('Octal', args.slice(1).map(valueToString(8)).join(' ')),
    generateDisplayItem('Binary', args.slice(1).map(valueToString(2)).join(' ')),
    generateDisplayItem('ASCII', args.slice(1).map(valueToString('ascii')).join(' ')),
  ];

  display(displays);
}

export const keyword = 'convert';
export const name = 'Convert a value to a different base';


function generateDisplayItem(title, subtitle) {
  return {
    icon,
    title,
    subtitle
  };
}

function valueToString(base) {
  return (value) => {
    if (base === 'ascii') {
      return isNaN(value) ? 'N/A' : String.fromCharCode(value);
    }
    let prefix = '';
    switch(base) {
      case 2: prefix = '0b'; break;
      case 8: prefix = '0o'; break;
      case 16: prefix = '0x'; break;
    }
    return isNaN(value) ? 'X' : `${prefix}${Number(value).toString(base)}`;
  }
}
