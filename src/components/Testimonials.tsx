import React from 'react';
import Marquee from './ui/marquee';

interface Testimonial {
    name: string;
    feedback: string;
    rating: number; // Rating out of 5
}

interface TestimonialsProps {
    testimonials: Testimonial[];
}

const Testimonials: React.FC<TestimonialsProps> = ( { testimonials } ) => {
    return (
        <Marquee className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4" pauseOnHover={true}>
            {testimonials.map( ( testimonial, index ) => (
                <div key={index} className="p-4 bg-white dark:bg-gray-900 shadow-md rounded-lg m-2 w-72">
                    <div className="mb-2">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{testimonial.name}</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">"{testimonial.feedback}"</p>
                    <div className="flex items-center">
                        {Array.from( { length: 5 } ).map( ( _, i ) => (
                            <span key={i} className={`text-yellow-400 ${ i < testimonial.rating ? 'text-yellow-500' : 'text-gray-300' }`}>
                                ★
                            </span>
                        ) )}
                    </div>
                </div>
            ) )}
        </Marquee>
    );
};

export default Testimonials;
