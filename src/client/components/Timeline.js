import React, { useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = width => makeStyles(theme => ({
    wrapper: {
        width,
        height: '50px',
        overflowX: 'scroll',
        backgroundColor: theme.palette.primary.main
    },
    inner: {
        width: width * 100,
        height: '50px',
    }
}));

const Timeline = ({ width, onTimelineSelect }) => {
    const classes = useStyles(width)();

    const wrapperRef = useRef();

    useEffect(() => {
        wrapperRef.current && wrapperRef.current.addEventListener('scroll', () => {
            onTimelineSelect(wrapperRef.current.scrollLeft / wrapperRef.current.scrollLeftMax);
        });
    }, wrapperRef.current);

    return (
        <>
            <div ref={wrapperRef} className={classes.wrapper}>
                <div className={classes.inner} />
            </div>
        </>
    );
};

export default Timeline;
