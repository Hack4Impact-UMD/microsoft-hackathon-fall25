import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

type CustomTaskStepProps = {
    taskName: string;
    setTaskName: (name: string) => void;
    onCreate: () => void;
    onModalClose: () => void;
};

export default function CustomTaskStep({ taskName, setTaskName, onCreate, onModalClose }: CustomTaskStepProps) {
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Custom Task</h2>
                <button className="text-gray-500 hover:text-gray-700" onClick={onModalClose}>
                    <CloseIcon />
                </button>
            </div>
            <div className="relative mb-4">
                <input
                    type="text"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    placeholder="Search..."
                    className="w-full p-2 border rounded-md"
                />
                <button className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500">
                    <SearchIcon />
                </button>
            </div>
            <button 
                onClick={onCreate}
                className="w-full p-2 border rounded-md mb-4">
                Create "{taskName}" +
            </button>
            <button 
                onClick={onCreate}
                className="w-full p-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
                DONE
                </button>
        </div>
    );
}