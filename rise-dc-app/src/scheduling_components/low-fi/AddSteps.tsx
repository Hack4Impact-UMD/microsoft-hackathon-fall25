import StarIcon from '@mui/icons-material/Star';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';

type AddStepsStepProps = {
    steps: string[];
    setSteps: (steps: string[]) => void;
    onDone: () => void;
    taskName: string;
    onModalClose: () => void;
};

export default function AddStepsStep({ steps, setSteps, onDone, taskName, onModalClose }: AddStepsStepProps) {
    const addStep = () => {
        setSteps([...steps, '']);
    };

    const updateStep = (index: number, value: string) => {
        const newSteps = [...steps];
        newSteps[index] = value;
        setSteps(newSteps);
    };

    return (
        <div className="relative flex flex-col items-center p-4">
            <div className="absolute top-2 left-2">
                <button className="p-1 bg-gray-200 rounded-md text-gray-500 hover:text-gray-700" onClick={onModalClose}>
                        <CloseIcon sx={{ fontSize: 40 }}/>
                </button>
            </div>
            <div className="flex justify-center mb-1">
                <StarIcon sx={{ fontSize: 100 }}/>
            </div>
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-bold">{taskName}</h2>
            </div>
            <div className="w-full">
                <p className="mb-4 text-lg">Add Steps</p>
            </div>
            <div className="w-full bg-gray-100 p-4 rounded-md">
                {steps.map((step, index) => (
                    <div key={index} className="relative flex items-center mb-2">
                        <input
                            type="text"
                            value={step}
                            onChange={(e) => updateStep(index, e.target.value)}
                            className="w-full p-2 pr-10 border rounded-md"
                        />
                        <button className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                            <MenuIcon/>
                        </button>
                    </div>
                ))}
                <button onClick={addStep} className="w-full p-2 border rounded-md text-2xl font-bold">
                    +
                </button>
            </div>
            <button 
                onClick={onDone}
                className="w-full p-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
                DONE
            </button>
        </div>
    );
}
