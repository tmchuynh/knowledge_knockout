import {
    Trophy,
    Medal,
    Star,
    Zap,
    Calendar,
    Flame,
    Repeat,
    Footprints,
    Target,
    Crown,
    BookOpen,
    Scroll,
    FlaskConical,
    Book,
    Gift,
    Sparkles,
    Timer,
    Users,
    MessageCircle,
    Diamond,
    UserPlus,
    Sunrise,
    Rocket,
    Search,
    Lightbulb,
    Compass,
    ShoppingBag,
    Hourglass,
    BadgeCheck,
} from 'lucide-react';

const badgesData = [
    {
        category: 'Completion Badges',
        description: 'Earn badges by completing quizzes and achieving milestones.',
        badges: [
            {
                color: 'emerald',
                icon: Trophy,
                title: 'Bronze Finisher',
                requirement: 'Complete 10 quizzes',
            },
            {
                color: 'emerald',
                icon: Medal,
                title: 'Silver Achiever',
                requirement: 'Complete 25 quizzes',
            },
            {
                color: 'emerald',
                icon: Star,
                title: 'Gold Master',
                requirement: 'Complete 50 quizzes',
            },
            {
                color: 'emerald',
                icon: Crown,
                title: 'Quiz Champion',
                requirement: 'Complete 100 quizzes',
            },
        ],
    },
    {
        category: 'Performance-Based Badges',
        description: 'Awarded for high scores and excellent performance.',
        badges: [
            {
                color: 'blue',
                icon: Star,
                title: 'Perfect Score',
                requirement: 'Achieve 100% on a quiz',
            },
            {
                color: 'blue',
                icon: Target,
                title: 'Accuracy Ace',
                requirement: 'Maintain a 90% or higher accuracy rate for 10 consecutive quizzes',
            },
            {
                color: 'blue',
                icon: Zap,
                title: 'Speed Demon',
                requirement: 'Complete a quiz under a set time limit with high accuracy',
            },
            {
                color: 'blue',
                icon: Flame,
                title: 'Consistent Performer',
                requirement: 'Score above 80% in five consecutive quizzes',
            },
        ],
    },
    {
        category: 'Special Event Badges',
        description: 'Earn exclusive badges during special events and challenges.',
        badges: [
            {
                color: 'pink',
                icon: Gift,
                title: 'Challenge Champion',
                requirement: 'Win a weekly or monthly challenge',
            },
            {
                color: 'pink',
                icon: Sparkles,
                title: 'Event Participant',
                requirement: 'Join a special event or competition',
            },
            {
                color: 'pink',
                icon: Calendar,
                title: 'Seasonal Superstar',
                requirement: 'Participate in a seasonal or holiday-themed quiz event',
            },
            {
                color: 'pink',
                icon: Timer,
                title: 'Trivia Titan',
                requirement: 'Join and complete a timed quiz competition',
            },
        ],
    },
    {
        category: 'Engagement Badges',
        description: 'Recognize consistent engagement and daily activity.',
        badges: [
            {
                color: 'gray',
                icon: Calendar,
                title: 'Daily Streak',
                requirement: 'Log in and complete a quiz for 7 days straight',
            },
            {
                color: 'gray',
                icon: Flame,
                title: 'Weekly Warrior',
                requirement: 'Participate in a quiz every day for a week',
            },
            {
                color: 'gray',
                icon: Repeat,
                title: 'Monthly Marathoner',
                requirement: 'Engage in quizzes every day for a full month',
            },
            {
                color: 'gray',
                icon: Repeat,
                title: 'Persistent Learner',
                requirement: 'Return to review a quiz three times or more',
            },
        ],
    },
    {
        category: 'Milestone Badges',
        description: 'Celebrate reaching significant learning milestones.',
        badges: [
            {
                color: 'indigo',
                icon: Footprints,
                title: 'First Step',
                requirement: 'Complete your first quiz',
            },
            {
                color: 'indigo',
                icon: Target,
                title: 'Milestone Maker',
                requirement: 'Reach 10, 50, or 100 completed quizzes',
            },
            {
                color: 'indigo',
                icon: Crown,
                title: 'Century Club',
                requirement: 'Complete 100 quizzes',
            },
            {
                color: 'indigo',
                icon: Crown,
                title: 'Quiz Legend',
                requirement: 'Reach 500 quizzes completed',
            },
        ],
    },
    {
        category: 'Reward-Based Recognition',
        description: 'Collect badges as a token of appreciation and rewards.',
        badges: [
            {
                color: 'sky',
                icon: ShoppingBag,
                title: 'Gift Card Winner',
                requirement: 'Redeem earned points for gift cards or prizes',
            },
            {
                color: 'sky',
                icon: Hourglass,
                title: 'Early Bird Access',
                requirement: 'Gain exclusive early access to new content or quiz features',
            },
            {
                color: 'sky',
                icon: Diamond,
                title: 'Premium Upgrade',
                requirement: 'Earn enough points for a temporary premium subscription',
            },
            {
                color: 'sky',
                icon: BadgeCheck,
                title: 'Profile Decoration',
                requirement: 'Unlock special themes or avatars for your profile',
            },
        ],
    },
    {
        category: 'Subject-Specific Badges',
        description: 'Showcase your expertise in various subjects.',
        badges: [
            {
                color: 'red',
                icon: BookOpen,
                title: 'Math Whiz',
                requirement: 'Score 90% or higher on 10 math quizzes',
            },
            {
                color: 'red',
                icon: Scroll,
                title: 'History Buff',
                requirement: 'Complete 10 history quizzes with an average score of 85% or higher',
            },
            {
                color: 'red',
                icon: FlaskConical,
                title: 'Science Scholar',
                requirement: 'Master 5 advanced science quizzes with perfect scores',
            },
            {
                color: 'red',
                icon: Book,
                title: 'Literature Lover',
                requirement: 'Finish 15 literature quizzes and maintain an average score of 80%',
            },
        ],
    },
    {
        category: 'Community and Social Badges',
        description: 'Reward contributions and collaboration within the community.',
        badges: [
            {
                color: 'cyan',
                icon: Users,
                title: 'Collaborative Learner',
                requirement: 'Participate in a group quiz or discussion',
            },
            {
                color: 'cyan',
                icon: MessageCircle,
                title: 'Helpful Peer',
                requirement: 'Leave feedback on 10 quizzes or discussions',
            },
            {
                color: 'cyan',
                icon: Diamond,
                title: 'Top Contributor',
                requirement: 'Consistently participate and contribute to the community',
            },
            {
                color: 'cyan',
                icon: UserPlus,
                title: 'Motivator',
                requirement: 'Encourage and invite friends to join and participate in quizzes',
            },
        ],
    },
    {
        category: 'Special Recognition Badges',
        description: 'Unique badges for special contributions and early participation.',
        badges: [
            {
                color: 'orange',
                icon: Sunrise,
                title: 'Early Adopter',
                requirement: 'Join and complete a quiz in the platform\'s early stages',
            },
            {
                color: 'orange',
                icon: FlaskConical,
                title: 'Beta Tester',
                requirement: 'Participate in testing new quiz features or challenges',
            },
            {
                color: 'orange',
                icon: Star,
                title: 'Feedback Star',
                requirement: 'Provide valuable feedback that helps improve quizzes or content',
            },
            {
                color: 'orange',
                icon: Rocket,
                title: 'Innovation Explorer',
                requirement: 'Be the first to try new types of quizzes or game modes',
            },
        ],
    },
    {
        category: 'Mystery and Secret Badges',
        description: 'Uncover hidden challenges and secrets to earn these badges.',
        badges: [
            {
                color: 'fuchsia',
                icon: Search,
                title: 'Hidden Gem',
                requirement: 'Find and complete a hidden or “easter egg” quiz',
            },
            {
                color: 'fuchsia',
                icon: Compass,
                title: 'Mystery Solver',
                requirement: 'Uncover and solve a secret challenge',
            },
            {
                color: 'fuchsia',
                icon: Lightbulb,
                title: 'Trivia Detective',
                requirement: 'Complete a quiz with tricky, hidden questions',
            },
            {
                color: 'fuchsia',
                icon: Target,
                title: 'First Attempt Winner',
                requirement: 'Get a perfect score on the first attempt at a new quiz',
            },
        ],
    },
];

export default badgesData;
