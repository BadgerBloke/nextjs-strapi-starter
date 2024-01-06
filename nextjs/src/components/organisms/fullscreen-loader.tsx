import { RoundDots } from '../atoms/spinners/round-dots';

const FullscreenLoader = () => {
    return (
        <div className="flex h-full w-full items-center justify-center">
            <div className="flex w-fit flex-col items-center justify-center gap-2">
                <RoundDots />
                <p className="text-lg">Please wait...</p>
            </div>
        </div>
    );
};

export default FullscreenLoader;
