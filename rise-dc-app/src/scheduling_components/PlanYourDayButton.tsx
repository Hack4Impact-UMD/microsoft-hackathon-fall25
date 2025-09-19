export function PlanYourDayButton() {
    function openPlanner() {

    }

    return (
        <div
            className="bg-[#EB5904] text-white font-light pt-6 pr-25 pb-6 pl-25 rounded-lg text-[1.2rem] mt-[15rem] cursor-pointer"
            onClick={() => openPlanner()}
        >
            <p>
                Let's plan your day!
            </p>
        </div>
    )
}