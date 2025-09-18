import { GroceryListIngredient } from '../shared/types'
import { useState } from 'react';


export default function IngredientCard({ingredient, quantity, purchased_status}: GroceryListIngredient) {
    const [currentQuantity, setCurrentQuanity] = useState<string>(quantity);

    return (
        <div className="w-[223px] h-[132px] justify-between items-center rounded-[10px] border-[15px] border-white">
            <div className="flex flex-row items-center gap-10">
                <div className="flex flex-col items-center">
                    <img 
                        className="h-[78px]"
                        src={ingredient.image_id}
                    ></img>
                    <p className="">{ingredient.name}</p>
                </div>
                <div className="flex flex-row max-w-[68px] h-[25px] items-center justify-center space-x-1">
                    <button 
                        className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[12px] border-b-[#D9D9D9]" 
                        onClick={() => setCurrentQuanity(String(Number(currentQuantity) + 1))}
                    ></button>

                    <input 
                        type="text"
                        className="w-[28px] h-[25px] border-[1px] border-[#D9D9D9] text-center font-bold"
                        value = {currentQuantity}
                        onChange = {e => setCurrentQuanity(e.target.value)}
                    />

                    <button 
                        className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[12px] border-t-[#D9D9D9]"
                        onClick={() => {
                            if (Number(currentQuantity) > 0) {
                                setCurrentQuanity(String(Number(currentQuantity) - 1));
                            }}}
                    ></button>
                </div>
                
            </div>
        </div>
    )
}