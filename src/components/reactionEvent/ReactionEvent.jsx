import React from 'react';
import { motion } from 'framer-motion';
import './reactionEvent.css';

const ReactionEvent = () => {
    var arrow = '=>';

    return (
        <div className='reactions__reactionEvent'>
            <div className='reactions__reactionEvent-operation'>
                <div className='reactions__reactionEvent-element'>
                    <p>+</p>
                </div>

                <div className='reactions__reactionEvent-connector'>
                    <p>+</p>
                </div>

                <div className='reactions__reactionEvent-element'>
                    <p>+</p>
                </div>

                <div className='reactions__reactionEvent-result_button'>
                    <motion.p whileHover={{ color: "rgb(159, 166, 248)" }}>{arrow}</motion.p>
                </div>
            </div>

            <div className='reactions__reactionEvent-instruction'>
                <p>Lohista elemendid siia</p>
            </div>
        </div>
    )
}

export default ReactionEvent
