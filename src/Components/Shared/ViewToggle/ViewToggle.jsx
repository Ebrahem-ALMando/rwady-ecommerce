"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Grid3X3, List } from 'lucide-react';
import styles from './ViewToggle.module.css';

const ViewToggle = ({ viewMode, onViewChange }) => {
    return (
        <div className={styles.container}>
            <motion.button
                className={`${styles.toggleButton} ${viewMode === 'grid' ? styles.active : ''}`}
                onClick={() => onViewChange('grid')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                <Grid3X3 size={18} />
            </motion.button>
            
            <motion.button
                className={`${styles.toggleButton} ${viewMode === 'list' ? styles.active : ''}`}
                onClick={() => onViewChange('list')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                <List size={18} />
            </motion.button>
        </div>
    );
};

export default ViewToggle; 