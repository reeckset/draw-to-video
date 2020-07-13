import useMediaQuery from '@material-ui/core/useMediaQuery';

export const isMobile = theme => useMediaQuery(theme.breakpoints.down('md'));

export const isNotMobile = theme => useMediaQuery(theme.breakpoints.up('md'));
