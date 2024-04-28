'use client';
import React, { useState, useEffect } from 'react';
import SMarquee from './SMarquee';
import useWindowSize from './useWindowSize';

const Header = () => {
    const [data, setData] = useState(null);
    const windowSize = useWindowSize();
    const isDesktop = windowSize.width >= 1024; 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "https://live.nepsesharehub.com/v1/nepselive/live-nepse"
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, []);

    return (
        <div style={{ overflowX: isDesktop ? 'hidden' : 'auto' }}>
            <SMarquee data={data} />
        </div>
    );
};

export default Header;
