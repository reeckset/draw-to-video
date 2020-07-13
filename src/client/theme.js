import { createMuiTheme } from '@material-ui/core/styles';

document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
window.addEventListener('resize',
    () => document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`));

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#50A0BB',
        },
        secondary: {
            main: '#777',
        },
        buttonHighlight: {
            main: 'rgba(0, 162, 255, 0.6)',
        }
    }
});

export default theme;
