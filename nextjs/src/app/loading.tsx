import { RoundDots } from '~/components/atoms/spinners/round-dots';

const Loading: React.FC = () => {
    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center self-center">
            <RoundDots />
            <span className="text-base-content animate-pulse text-xl font-medium">Loading</span>
        </div>
    );
};

export default Loading;
