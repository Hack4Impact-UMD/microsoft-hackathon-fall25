import { GroceryListIngredient } from '../shared/types'
import { useState } from 'react';

type GroceryListIngredientCardProps = {
    item: GroceryListIngredient; 
};

export default function GroceryListIngredientCard({ item }: GroceryListIngredientCardProps) {
    const { ingredient, quantity } = item;
    const [currentQuantity, setCurrentQuanity] = useState<string>(quantity);

    return (
        <div className="w-full max-w-[20rem] justify-between items-center rounded-[12px] border-[1.5rem] border-white bg-white p-4">
            <div className="flex flex-row items-center gap-6">
                <div className="flex flex-col items-center">
                    <img 
                        className="h-32 w-auto max-w-full object-cover"
                        src={ingredient.image_id}
                        alt={ingredient.name}
                    />
                    <p className="text-center text-lg font-semibold">{ingredient.name}</p>
                </div>
                <div className="flex flex-row max-w-[6rem] h-8 items-center justify-center space-x-2">
                    <button 
                        className="w-0 h-0 border-l-[0.75rem] border-l-transparent border-r-[0.75rem] border-r-transparent border-b-[1rem] border-b-[#D9D9D9]" 
                        onClick={() => setCurrentQuanity(String(Number(currentQuantity) + 1))}
                    ></button>

                    <input 
                        type="text"
                        className="w-10 h-8 border-[1px] border-[#D9D9D9] text-center font-bold text-lg"
                        value={currentQuantity}
                        onChange={e => setCurrentQuanity(e.target.value)}
                    />

                    <button 
                        className="w-0 h-0 border-l-[0.75rem] border-l-transparent border-r-[0.75rem] border-r-transparent border-t-[1rem] border-t-[#D9D9D9]"
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
