
export default function StaffHome() {
    return (
        <div className="flex flex-col py-10 items-center justify-center mt-0 pt-0">
            
            <div className="flex max-w-100 text-center pt-3 pr-15 pb-4 pl-15 items-center justify-center bg-[#0C77D9] rounded-b-xl pointer-events-none">
                <p className="text-white font-light text-[1.2rem]">Participants</p>
            </div>

            <h1 className="pt-30 text-3xl">Choose a Participant</h1>

            <select className="w-[90%] max-w-md p-3 rounded-lg bg-white shadow-lg border border-gray-300 focus:outline-none mt-10">
                <option>Select a participant</option>
                <option>example 1</option>
                <option>example 2</option>
                <option>example 3</option>
            </select>

        </div>

    );
}