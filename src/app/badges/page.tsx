import React from 'react';
import badgesData from './badgesData';

const getBgColorClass = ( color: string ) => {
    switch ( color ) {
        case 'amber':
            return 'bg-amber-400';
        case 'blue':
            return 'bg-blue-400';
        case 'red':
            return 'bg-red-400';
        case 'purple':
            return 'bg-purple-400';
        case 'teal':
            return 'bg-teal-400';
        case 'green':
            return 'bg-green-400';
        case 'pink':
            return 'bg-pink-400';
        case 'emerald':
            return 'bg-emerald-400';
        case 'indigo':
            return 'bg-indigo-400';
        case 'fuchsia':
            return 'bg-fuchsia-400';
        case 'lime':
            return 'bg-lime-400';
        case 'yellow':
            return 'bg-yellow-400';
        case 'sky':
            return 'bg-sky-400';
        case 'cyan':
            return 'bg-cyan-400';
        case 'violet':
            return 'bg-violet-400';
        case 'mint':
            return 'bg-mint-400';
        case 'brown':
            return 'bg-brown-400';
        case 'rose':
            return 'bg-rose-400';
        case 'gray':
            return 'bg-gray-400';
        case 'orange':
            return 'bg-orange-400';
        default:
            return 'bg-gray-400';
    }
};


const BadgesPage: React.FC = () => {
    return (
        <div className="flex flex-col justify-center items-center px-6 py-4 lg:px-8 container dark:border-gray-100 dark:bg-gray-800 dark:text-white rounded-2xl mx-auto my-4 w-full lg:w-11/12">
            <h1 className="text-center">Available Badges</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {badgesData.map( ( category, index ) => (
                    <div key={index} className="p-6 rounded-lg shadow-md border hover:shadow-md">
                        <div className="flex flex-col items-center mb-4">
                            <h5 className="text-center">{category.category}</h5>
                        </div>
                        <p className="text-neutral-600 text-center text-sm mb-4">{category.description}</p>
                        <div className="grid grid-cols-3 gap-4">
                            {category.badges.map( ( badge, badgeIndex ) => {
                                return (
                                    <div key={badgeIndex} className="flex flex-col items-center mb-2">
                                        <div className={`p-2 ${ getBgColorClass( badge.color ) } rounded-full`}>
                                            <badge.icon className="text-white w-8 h-8" />
                                        </div>
                                        <div className="mt-2 text-center">
                                            <h4 className="font-semibold">{badge.title}</h4>
                                            <p className="text-neutral-600 text-sm">{badge.requirement}</p>
                                        </div>
                                    </div>
                                );
                            } )}
                        </div>
                    </div>
                ) )}
            </div>
        </div>
    );
};

export default BadgesPage;
