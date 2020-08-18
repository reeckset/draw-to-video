import React, { useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = width => makeStyles(() => ({
    wrapper: {
        width,
        height: '50px',
        overflowX: 'scroll',
        overflowY: 'hidden',
    },
    inner: {
        width: width * 100,
        height: '50px',
    }
}));

const Timeline = ({ width, timelineState, onTimelineSelect }) => {
    const classes = useStyles(width)();

    const wrapperRef = useRef();

    useEffect(() => {
        wrapperRef.current && wrapperRef.current.addEventListener('scroll', () => {
            onTimelineSelect(wrapperRef.current.scrollLeft / wrapperRef.current.scrollWidth);
        });

        wrapperRef.current.scrollLeft = wrapperRef.current.scrollWidth;
    }, [wrapperRef.current]);

    useEffect(() => {
        wrapperRef.current
        && (wrapperRef.current.scrollLeft = (timelineState === null ? 1 : timelineState) * wrapperRef.current.scrollWidth
        );
    }, [timelineState]);

    return (
        <>
            <div ref={wrapperRef} className={classes.wrapper}>
                <div className={classes.inner} />
            </div>
        </>
    );
};

export default Timeline;
